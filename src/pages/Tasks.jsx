import { useState, useEffect } from 'react'
import TaskCard from '../components/TaskCard'
import { IoSearchSharp } from "react-icons/io5";
import { FaCalendarAlt, FaClipboard } from "react-icons/fa";

const STORAGE_KEY = 'studiora_tasks'

const defaultTasks = [
  { id: 1, title: 'Calculus Problem Set 3', description: 'Complete exercises 4.1–4.8 on integration', subject: 'Mathematics', priority: 'High', status: 'In Progress', deadline: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
  { id: 2, title: 'Literature Essay Draft', description: 'Write 1500-word analysis of Hamlet', subject: 'English', priority: 'Medium', status: 'To Do', deadline: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0] },
  { id: 3, title: 'Physics Lab Report', description: 'Analyze pendulum experiment data', subject: 'Physics', priority: 'High', status: 'To Do', deadline: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0] },
  { id: 4, title: 'Read Chapter 7-9', description: 'History of the Renaissance', subject: 'History', priority: 'Low', status: 'Done', deadline: '' },
  { id: 5, title: 'Group Project Slides', description: 'Create presentation for Marketing class', subject: 'Marketing', priority: 'Medium', status: 'To Do', deadline: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0] },
  { id: 6, title: 'Statistics Assignment', description: 'Chapter 9: Hypothesis testing problems', subject: 'Statistics', priority: 'Medium', status: 'In Progress', deadline: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
]

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const calendarBlocks = [
  { day: 0, hour: 9, duration: 2, label: 'Calculus', color: 'bg-primary/20 text-primary border-l-2 border-primary' },
  { day: 1, hour: 14, duration: 1, label: 'Literature', color: 'bg-secondary/30 text-purple-600 border-l-2 border-purple-400' },
  { day: 2, hour: 10, duration: 2, label: 'Physics Lab', color: 'bg-danger/15 text-red-500 border-l-2 border-red-400' },
  { day: 3, hour: 15, duration: 1, label: 'Statistics', color: 'bg-accent/20 text-orange-500 border-l-2 border-orange-400' },
  { day: 4, hour: 9, duration: 3, label: 'Group Project', color: 'bg-success/15 text-emerald-600 border-l-2 border-emerald-500' },
]

function TaskModal({ task, onSave, onClose }) {
  const [form, setForm] = useState(task || {
    title: '', description: '', subject: '', priority: 'Medium', status: 'To Do', deadline: ''
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold font-poppins text-darkText text-lg">{task ? 'Edit Task' : 'New Task'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors">×</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block">Title *</label>
            <input className="input-field" placeholder="Task title..." value={form.title} onChange={e => set('title', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block">Description</label>
            <textarea className="input-field resize-none" rows={2} placeholder="Brief description..." value={form.description} onChange={e => set('description', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block">Subject</label>
              <input className="input-field" placeholder="e.g. Math" value={form.subject} onChange={e => set('subject', e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block">Deadline</label>
              <input type="date" className="input-field" value={form.deadline} onChange={e => set('deadline', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block">Priority</label>
              <select className="input-field" value={form.priority} onChange={e => set('priority', e.target.value)}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block">Status</label>
              <select className="input-field" value={form.status} onChange={e => set('status', e.target.value)}>
                <option>To Do</option><option>In Progress</option><option>Done</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          <button
            onClick={() => form.title.trim() && onSave(form)}
            className="btn-primary flex-1"
            disabled={!form.title.trim()}
          >
            {task ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [view, setView] = useState('board') // 'board' | 'calendar'
  const [search, setSearch] = useState('')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    setTasks(stored || defaultTasks)
  }, [])

  const save = (t) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(t))
    setTasks(t)
  }

  const handleSave = (form) => {
    if (editTask) {
      save(tasks.map(t => t.id === editTask.id ? { ...form, id: editTask.id } : t))
    } else {
      save([...tasks, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
    setEditTask(null)
  }

  const handleDelete = (id) => save(tasks.filter(t => t.id !== id))
  const handleStatusChange = (id, status) => save(tasks.map(t => t.id === id ? { ...t, status } : t))

  const filters = ['All', 'To Do', 'In Progress', 'Done']
  const filtered = tasks
    .filter(t => filter === 'All' || t.status === filter)
    .filter(t => !search || t.title.toLowerCase().includes(search.toLowerCase()) || (t.subject || '').toLowerCase().includes(search.toLowerCase()))

  const counts = {
    All: tasks.length,
    'To Do': tasks.filter(t => t.status === 'To Do').length,
    'In Progress': tasks.filter(t => t.status === 'In Progress').length,
    'Done': tasks.filter(t => t.status === 'Done').length,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="section-title mb-1">Task Manager</h1>
          <p className="text-sm text-slate-500 font-inter">{tasks.filter(t => t.status !== 'Done').length} active tasks</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-xl border border-slate-200 overflow-hidden">
            <button onClick={() => setView('board')} className={`px-4 py-2 text-sm font-inter font-medium transition-colors flex items-center gap-1 ${view === 'board' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
              <FaClipboard /> Board
            </button>
            <button onClick={() => setView('calendar')} className={`px-4 py-2 text-sm font-inter font-medium transition-colors flex items-center gap-1 ${view === 'calendar' ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
              <FaCalendarAlt /> Calendar
            </button>
          </div>
          <button onClick={() => { setEditTask(null); setModalOpen(true) }} className="btn-primary text-sm py-2.5 px-5">
            + Add Task
          </button>
        </div>
      </div>

      {view === 'board' ? (
        <>
          {/* Search + filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"><IoSearchSharp /></span>
              <input className="input-field pl-9 w-full sm:w-72"
                placeholder="Search tasks..."
                value={search}
                onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium font-inter transition-all duration-200 ${filter === f ? 'bg-primary text-white shadow-soft' : 'bg-white text-slate-500 border border-slate-200 hover:border-primary/30'
                    }`}
                >
                  {f} <span className="ml-1.5 opacity-70">{counts[f]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Kanban columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['To Do', 'In Progress', 'Done'].map(col => {
              const colTasks = filtered.filter(t => t.status === col)
              const colColors = { 'To Do': 'bg-slate-400', 'In Progress': 'bg-primary', 'Done': 'bg-success' }
              return (
                <div key={col}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2.5 h-2.5 rounded-full ${colColors[col]}`} />
                    <h2 className="font-bold font-poppins text-darkText text-sm">{col}</h2>
                    <span className="ml-auto bg-slate-100 text-slate-500 text-xs font-semibold font-inter px-2 py-0.5 rounded-lg">{colTasks.length}</span>
                  </div>
                  <div className="space-y-3 min-h-[100px]">
                    {colTasks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={t => { setEditTask(t); setModalOpen(true) }}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                    {colTasks.length === 0 && (
                      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-300 text-sm font-inter">
                        No tasks here
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        /* Calendar view */
        <div className="card overflow-x-auto">
          <h2 className="font-bold font-poppins text-darkText mb-4">
            Week of {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
          <div className="min-w-[700px]">
            {/* Day headers */}
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className="text-xs text-slate-400 font-inter p-2" />
              {DAYS.map((d, i) => {
                const today = new Date()
                const dayOfWeek = today.getDay()
                const diff = i - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
                const target = new Date(today)
                target.setDate(today.getDate() + diff)
                const isToday = diff === 0
                return (
                  <div key={d} className={`text-center py-2 rounded-xl ${isToday ? 'bg-primary text-white' : 'text-slate-500'}`}>
                    <p className="text-xs font-semibold font-inter">{d}</p>
                    <p className="text-sm font-bold font-poppins">{target.getDate()}</p>
                  </div>
                )
              })}
            </div>

            {/* Time grid */}
            <div className="relative">
              {HOURS.map(h => (
                <div key={h} className="grid grid-cols-8 gap-1 border-t border-slate-50">
                  <div className="text-xs text-slate-300 font-inter py-3 px-2">{h}:00</div>
                  {DAYS.map((d, di) => {
                    const block = calendarBlocks.find(b => b.day === di && b.hour === h)
                    const taskDue = tasks.find(t => t.deadline && new Date(t.deadline).getDay() === (di + 1) % 7)
                    return (
                      <div key={d} className="relative h-10 border-l border-slate-50 hover:bg-primary/3 transition-colors rounded-r-lg">
                        {block && (
                          <div className={`absolute inset-x-1 top-0.5 rounded-lg px-2 py-1 text-xs font-semibold font-inter truncate ${block.color}`}
                            style={{ height: `${block.duration * 40 - 4}px` }}>
                            {block.label}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <TaskModal
          task={editTask}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditTask(null) }}
        />
      )}
    </div>
  )
}