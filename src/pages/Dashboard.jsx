import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
<<<<<<< HEAD
import usePageTitle from '../hooks/usePageTitle'
import { getWeekHours } from '../hooks/useStudyData'
=======
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
import StatCard from '../components/StatCard'
import { FaTasks } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { BsFire } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getStoredTasks() {
<<<<<<< HEAD
  try { return JSON.parse(localStorage.getItem('studiora_tasks') || '[]') } catch { return [] }
}
function getStoredSessions() {
  try { return parseInt(localStorage.getItem('studiora_sessions') || '0') } catch { return 0 }
}
function getStreak() {
  try { return parseInt(localStorage.getItem('studiora_streak') || '0') } catch { return 0 }
=======
  try {
    return JSON.parse(localStorage.getItem('studiora_tasks') || '[]')
  } catch { return [] }
}

function getStoredSessions() {
  try {
    return parseInt(localStorage.getItem('studiora_sessions') || '0')
  } catch { return 0 }
}

function getStreak() {
  try {
    return parseInt(localStorage.getItem('studiora_streak') || '7')
  } catch { return 7 }
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
}

const defaultTasks = [
  { id: 1, title: 'Calculus Problem Set 3', subject: 'Mathematics', priority: 'High', status: 'In Progress', deadline: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
  { id: 2, title: 'Literature Essay Draft', subject: 'English', priority: 'Medium', status: 'To Do', deadline: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0] },
  { id: 3, title: 'Physics Lab Report', subject: 'Physics', priority: 'High', status: 'To Do', deadline: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0] },
  { id: 4, title: 'Read Chapter 7-9', subject: 'History', priority: 'Low', status: 'Done', deadline: '' },
]

export default function Dashboard() {
<<<<<<< HEAD
  usePageTitle('Dashboard')
  const navigate     = useNavigate()
  const chartRef     = useRef(null)
  const chartInstance = useRef(null)
  const barRef       = useRef(null)
  const barInstance  = useRef(null)
  const [tasks, setTasks]     = useState([])
  const [sessions, setSessions] = useState(getStoredSessions)
  const [streak, setStreak]     = useState(getStreak)

  // Refresh stats whenever the tab gains focus (user comes back from Focus page)
  useEffect(() => {
    const refresh = () => {
      setSessions(getStoredSessions())
      setStreak(getStreak())
    }
    window.addEventListener('focus', refresh)
    return () => window.removeEventListener('focus', refresh)
  }, [])

  useEffect(() => {
    try {
      const stored = getStoredTasks()
      setTasks(stored.length ? stored : defaultTasks)
    } catch {
      setTasks(defaultTasks)
    }
  }, [])

  const done       = tasks.filter(t => t.status === 'Done').length
  const inProgress = tasks.filter(t => t.status === 'In Progress').length
  const total      = tasks.length

  // ── Study hours line chart — real persisted data ──────────────────────────
=======
  const navigate = useNavigate()
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const barRef = useRef(null)
  const barInstance = useRef(null)
  const [tasks, setTasks] = useState([])
  const sessions = getStoredSessions()
  const streak = getStreak()

  useEffect(() => {
    const stored = getStoredTasks()
    setTasks(stored.length ? stored : defaultTasks)
  }, [])

  const done = tasks.filter(t => t.status === 'Done').length
  const inProgress = tasks.filter(t => t.status === 'In Progress').length
  const total = tasks.length

  // Study hours chart
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
  useEffect(() => {
    if (!chartRef.current || typeof Chart === 'undefined') return
    if (chartInstance.current) chartInstance.current.destroy()

<<<<<<< HEAD
    const weekHours = getWeekHours()  // real data from useStudyData

=======
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: DAYS,
        datasets: [{
          label: 'Study Hours',
<<<<<<< HEAD
          data: weekHours,
=======
          data: [4, 6, 5, 8, 7, 9, 6],
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
          borderColor: '#5D8BF4',
          backgroundColor: 'rgba(93, 139, 244, 0.12)',
          borderWidth: 2.5,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#5D8BF4',
          pointRadius: 5,
          pointHoverRadius: 7,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1E293B',
            titleColor: '#fff',
            bodyColor: '#94A3B8',
            cornerRadius: 10,
            padding: 10,
            callbacks: { label: ctx => ` ${ctx.raw}h studied` }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 }, color: '#94A3B8' } },
          y: { grid: { color: '#F1F5F9' }, ticks: { font: { family: 'Inter', size: 11 }, color: '#94A3B8' }, beginAtZero: true }
        }
      }
    })
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
<<<<<<< HEAD
  }, [])   // runs once; data is read fresh from localStorage each render

  // ── Task doughnut chart ───────────────────────────────────────────────────
=======
  }, [])

  // Tasks bar chart
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
  useEffect(() => {
    if (!barRef.current || typeof Chart === 'undefined') return
    if (barInstance.current) barInstance.current.destroy()

    barInstance.current = new Chart(barRef.current, {
      type: 'doughnut',
      data: {
        labels: ['Done', 'In Progress', 'To Do'],
        datasets: [{
          data: [done, inProgress, Math.max(0, total - done - inProgress)],
          backgroundColor: ['#22C55E', '#5D8BF4', '#E2E8F0'],
          borderWidth: 0,
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { family: 'Inter', size: 11 }, color: '#64748B', padding: 16, usePointStyle: true }
          },
          tooltip: {
            backgroundColor: '#1E293B',
            titleColor: '#fff',
            bodyColor: '#94A3B8',
            cornerRadius: 10,
          }
        }
      }
    })
    return () => { if (barInstance.current) barInstance.current.destroy() }
  }, [tasks])

  const todayTasks = tasks.filter(t => t.status !== 'Done').slice(0, 4)

  const weekDays = DAYS.map((d, i) => {
    const date = new Date()
<<<<<<< HEAD
    const day  = date.getDay()
=======
    const day = date.getDay()
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
    const diff = i - (day === 0 ? 6 : day - 1)
    const target = new Date(date)
    target.setDate(date.getDate() + diff)
    return { label: d, date: target.getDate(), isToday: diff === 0 }
  })

<<<<<<< HEAD
  const totalFocusMinutes = parseInt(localStorage.getItem('studiora_focus_minutes') || '0')
  const focusHours = Math.floor(totalFocusMinutes / 60)
  const focusMins  = totalFocusMinutes % 60
  const focusLabel = focusHours > 0 ? `${focusHours}h ${focusMins}m` : `${focusMins}m`

=======
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
<<<<<<< HEAD
          <h1 className="section-title mb-1">Good morning!</h1>
          <p className="text-slate-500 font-inter text-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button onClick={() => navigate('/tasks')} className="btn-primary text-sm py-2.5 px-5">
          + New Task
        </button>
=======
          <h1 className="section-title mb-1">Good morning! </h1>
          <p className="text-slate-500 font-inter text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/tasks')} className="btn-primary text-sm py-2.5 px-5">
            + New Task
          </button>
        </div>
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
<<<<<<< HEAD
        <StatCard title="Total Tasks"   value={total}          icon={<FaTasks />}         trend={12} color="primary"   subtitle="This semester" />
        <StatCard title="Focus Time"    value={focusLabel}     icon={<MdAccessTimeFilled />} trend={8} color="secondary" subtitle="All time" />
        <StatCard title="Study Streak"  value={`${streak} days`} icon={<BsFire />}         trend={0}  color="accent"    subtitle="Keep it up!" />
        <StatCard title="Completed"     value={done}           icon={<FaCircleCheck />}   trend={15} color="success"   subtitle={`of ${total} tasks`} />
=======
        <StatCard title="Total Tasks" value={total} icon=<FaTasks /> trend={12} color="primary" subtitle="This semester" />
        <StatCard title="Focus Hours" value={`${sessions + 12}h`} icon=<MdAccessTimeFilled /> trend={8} color="secondary" subtitle="This week" />
        <StatCard title="Study Streak" value={`${streak} days`} icon=<BsFire /> trend={0} color="accent" subtitle="Keep it up!" />
        <StatCard title="Completed" value={done} icon=<FaCircleCheck /> trend={15} color="success" subtitle={`of ${total} tasks`} />
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
<<<<<<< HEAD
=======
        {/* Study Hours Chart */}
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold font-poppins text-darkText">Weekly Study Hours</h2>
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-lg font-semibold font-inter">This Week</span>
          </div>
          <div style={{ height: '200px' }}>
<<<<<<< HEAD
            <canvas ref={chartRef} aria-label="Weekly study hours chart" role="img" />
          </div>
        </div>

=======
            <canvas ref={chartRef} />
          </div>
        </div>

        {/* Task status doughnut */}
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold font-poppins text-darkText">Task Status</h2>
          </div>
          <div style={{ height: '200px' }}>
<<<<<<< HEAD
            <canvas ref={barRef} aria-label="Task status distribution chart" role="img" />
=======
            <canvas ref={barRef} />
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's tasks */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold font-poppins text-darkText">Today's Tasks</h2>
            <button onClick={() => navigate('/tasks')} className="text-xs text-primary font-semibold font-inter hover:underline">See all →</button>
          </div>
          {todayTasks.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <p className="text-3xl mb-2">🎉</p>
              <p className="font-inter text-sm">All tasks done! Amazing work.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayTasks.map(task => (
<<<<<<< HEAD
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-primary/5 transition-colors cursor-pointer"
                  onClick={() => navigate('/tasks')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && navigate('/tasks')}
                  aria-label={`Go to ${task.title}`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${task.priority === 'High' ? 'bg-danger' : task.priority === 'Medium' ? 'bg-accent' : 'bg-success'}`} aria-hidden="true" />
=======
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => navigate('/tasks')}>
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${task.priority === 'High' ? 'bg-danger' : task.priority === 'Medium' ? 'bg-accent' : 'bg-success'}`} />
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold font-poppins text-darkText truncate">{task.title}</p>
                    <p className="text-xs text-slate-400 font-inter">{task.subject}</p>
                  </div>
                  <span className={`badge text-xs ${task.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>{task.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Calendar preview */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold font-poppins text-darkText">This Week</h2>
            <span className="text-xs text-slate-400 font-inter">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map(day => (
              <div key={day.label} className="flex flex-col items-center gap-1">
                <span className="text-xs text-slate-400 font-inter font-medium">{day.label}</span>
<<<<<<< HEAD
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold font-poppins transition-all ${day.isToday ? 'bg-aurora text-white shadow-soft' : 'text-darkText hover:bg-primary/5'}`}>
=======
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold font-poppins transition-all ${day.isToday ? 'bg-aurora text-white shadow-soft' : 'text-darkText hover:bg-primary/5'
                  }`}>
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
                  {day.date}
                </div>
              </div>
            ))}
          </div>

<<<<<<< HEAD
=======
          {/* Upcoming deadlines */}
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-3">Upcoming Deadlines</p>
            {tasks.filter(t => t.deadline && t.status !== 'Done').slice(0, 3).map(task => {
              const days = Math.ceil((new Date(task.deadline) - new Date()) / 86400000)
              return (
                <div key={task.id} className="flex items-center justify-between text-xs font-inter">
                  <span className="text-slate-600 truncate flex-1 mr-2">{task.title}</span>
                  <span className={`font-semibold flex-shrink-0 ${days <= 1 ? 'text-danger' : days <= 3 ? 'text-amber-500' : 'text-slate-400'}`}>
                    {days <= 0 ? 'Today' : days === 1 ? 'Tomorrow' : `${days}d`}
                  </span>
                </div>
              )
            })}
<<<<<<< HEAD
            {tasks.filter(t => t.deadline && t.status !== 'Done').length === 0 && (
              <p className="text-xs text-slate-300 font-inter italic">No upcoming deadlines.</p>
            )}
=======
>>>>>>> 15eb2b3c6908e7c695a5487d330defb113f86b40
          </div>
        </div>
      </div>

      {/* Focus CTA */}
      <div className="mt-6 bg-aurora rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold font-poppins text-white text-lg">Ready to focus?</h3>
          <p className="text-white/70 font-inter text-sm mt-1">Start a focus session and get into deep work mode.</p>
        </div>
        <button
          onClick={() => navigate('/focus')}
          className="bg-white text-primary font-bold font-poppins px-8 py-3 rounded-xl hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
        >
          Start Focus Session
        </button>
      </div>
    </div>
  )
}