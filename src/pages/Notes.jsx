import { useState, useEffect } from 'react'
import NoteCard from '../components/NoteCard'

const STORAGE_KEY = 'studiora_notes'

const defaultNotes = [
  {
    id: 1, title: 'Integration Techniques', subject: 'Mathematics',
    content: 'Key methods: substitution, integration by parts, partial fractions. Remember: ∫uv dx = u∫v dx – ∫(u′∫v dx)dx. Practice the LIATE rule for choosing u in integration by parts.',
    tags: ['calculus', 'exam'], highlighted: true, checklist: [
      { text: 'Review substitution method', done: true },
      { text: 'Practice integration by parts', done: false },
      { text: 'Complete practice problems', done: false },
    ], updatedAt: new Date().toISOString()
  },
  {
    id: 2, title: 'Hamlet Analysis – Key Themes', subject: 'English',
    content: 'Major themes: mortality (To be or not to be), revenge vs. justice, corruption in the Danish court. Claudius represents political corruption. Ophelia\'s madness mirrors Hamlet\'s feigned insanity.',
    tags: ['literature', 'essay'], highlighted: false, checklist: [], updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3, title: 'Newton\'s Laws Summary', subject: 'Physics',
    content: '1st Law: An object at rest stays at rest unless acted upon by force. 2nd: F = ma. 3rd: For every action there is an equal and opposite reaction. Apply these to pendulum lab analysis.',
    tags: ['mechanics', 'lab'], highlighted: false, checklist: [
      { text: 'Write lab introduction', done: true },
      { text: 'Analyze data tables', done: true },
      { text: 'Write conclusion', done: false },
    ], updatedAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 4, title: 'Marketing Mix – 4Ps', subject: 'Marketing',
    content: 'Product, Price, Place, Promotion. For group project: focus on digital promotion strategies. Research Nike\'s 4Ps as case study. Meeting Thursday 3pm.',
    tags: ['group-project', 'framework'], highlighted: true, checklist: [], updatedAt: new Date(Date.now() - 3 * 86400000).toISOString()
  },
]

function NoteModal({ note, onSave, onClose }) {
  const [form, setForm] = useState(note || {
    title: '', subject: '', content: '', tags: [], highlighted: false,
    checklist: [],
  })
  const [tagInput, setTagInput] = useState('')
  const [newCheckItem, setNewCheckItem] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const addTag = () => {
    const t = tagInput.trim().replace(/\s+/g, '-').toLowerCase()
    if (t && !form.tags.includes(t)) {
      set('tags', [...form.tags, t])
    }
    setTagInput('')
  }

  const addCheckItem = () => {
    if (newCheckItem.trim()) {
      set('checklist', [...form.checklist, { text: newCheckItem.trim(), done: false }])
      setNewCheckItem('')
    }
  }

  const toggleCheck = (i) => {
    const updated = form.checklist.map((item, idx) => idx === i ? { ...item, done: !item.done } : item)
    set('checklist', updated)
  }

  const removeCheck = (i) => set('checklist', form.checklist.filter((_, idx) => idx !== i))

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-6 animate-slide-up my-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold font-poppins text-darkText text-lg">{note ? 'Edit Note' : 'New Note'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">×</button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block">Title *</label>
              <input className="input-field" placeholder="Note title..." value={form.title} onChange={e => set('title', e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block">Subject</label>
              <input className="input-field" placeholder="e.g. Physics" value={form.subject} onChange={e => set('subject', e.target.value)} />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block">Content</label>
            <textarea className="input-field resize-none" rows={5} placeholder="Write your notes here..." value={form.content} onChange={e => set('content', e.target.value)} />
          </div>

          {/* Tags */}
          <div>
            <label className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block">Tags</label>
            <div className="flex gap-2">
              <input
                className="input-field"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button onClick={addTag} className="px-3 py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors">+</button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {form.tags.map(t => (
                  <span key={t} className="note-tag cursor-pointer hover:bg-danger/10 hover:text-danger" onClick={() => set('tags', form.tags.filter(x => x !== t))}>
                    #{t} ×
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Checklist */}
          <div>
            <label className="text-xs font-semibold text-slate-500 font-inter uppercase tracking-wide mb-1.5 block">Checklist</label>
            <div className="space-y-2 mb-2">
              {form.checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <button
                    onClick={() => toggleCheck(i)}
                    className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${item.done ? 'bg-success border-success text-white' : 'border-slate-300'}`}
                  >
                    {item.done && <span style={{ fontSize: '9px' }}>✓</span>}
                  </button>
                  <span className={`text-sm font-inter flex-1 ${item.done ? 'line-through text-slate-400' : 'text-slate-600'}`}>{item.text}</span>
                  <button onClick={() => removeCheck(i)} className="text-slate-300 hover:text-danger text-xs">×</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="input-field"
                placeholder="Add checklist item..."
                value={newCheckItem}
                onChange={e => setNewCheckItem(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCheckItem())}
              />
              <button onClick={addCheckItem} className="px-3 py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors">+</button>
            </div>
          </div>

          {/* Highlight */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => set('highlighted', !form.highlighted)}
              className={`w-10 h-6 rounded-full transition-colors duration-300 ${form.highlighted ? 'bg-accent' : 'bg-slate-200'} relative`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${form.highlighted ? 'translate-x-5' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm font-inter text-slate-600">Mark as highlighted ✨</span>
          </label>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          <button
            onClick={() => form.title.trim() && onSave({ ...form, updatedAt: new Date().toISOString() })}
            className="btn-primary flex-1"
            disabled={!form.title.trim()}
          >
            {note ? 'Save Changes' : 'Add Note'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editNote, setEditNote] = useState(null)
  const [search, setSearch] = useState('')
  const [filterTag, setFilterTag] = useState('')
  const [filterSubject, setFilterSubject] = useState('')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    setNotes(stored || defaultNotes)
  }, [])

  const save = (n) => { localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); setNotes(n) }

  const handleSave = (form) => {
    if (editNote) {
      save(notes.map(n => n.id === editNote.id ? { ...form, id: editNote.id } : n))
    } else {
      save([...notes, { ...form, id: Date.now() }])
    }
    setModalOpen(false)
    setEditNote(null)
  }

  const handleDelete = (id) => save(notes.filter(n => n.id !== id))

  const allTags = [...new Set(notes.flatMap(n => n.tags))]
  const allSubjects = [...new Set(notes.map(n => n.subject).filter(Boolean))]

  const filtered = notes.filter(n => {
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase())
    const matchTag = !filterTag || n.tags.includes(filterTag)
    const matchSubject = !filterSubject || n.subject === filterSubject
    return matchSearch && matchTag && matchSubject
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="section-title mb-1">My Notes</h1>
          <p className="text-sm text-slate-500 font-inter">{notes.length} notes across {allSubjects.length} subjects</p>
        </div>
        <button onClick={() => { setEditNote(null); setModalOpen(true) }} className="btn-primary text-sm py-2.5 px-5">
          + New Note
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          className="input-field max-w-xs"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="input-field max-w-[160px]" value={filterSubject} onChange={e => setFilterSubject(e.target.value)}>
          <option value="">All Subjects</option>
          {allSubjects.map(s => <option key={s}>{s}</option>)}
        </select>
        {filterTag && (
          <button onClick={() => setFilterTag('')} className="flex items-center gap-1 text-sm text-primary bg-primary/10 px-3 py-2 rounded-xl font-inter font-medium hover:bg-primary/20 transition-colors">
            #{filterTag} ×
          </button>
        )}
      </div>

      {/* Tags cloud */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allTags.map(t => (
            <button
              key={t}
              onClick={() => setFilterTag(filterTag === t ? '' : t)}
              className={`text-xs font-semibold font-inter px-3 py-1.5 rounded-xl transition-all ${filterTag === t ? 'bg-primary text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-primary/30'}`}
            >
              #{t}
            </button>
          ))}
        </div>
      )}

      {/* Notes grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-5xl mb-4">📝</p>
          <p className="font-poppins font-semibold text-lg text-slate-500">No notes found</p>
          <p className="font-inter text-sm mt-2">Create your first note to get started.</p>
          <button onClick={() => { setEditNote(null); setModalOpen(true) }} className="btn-primary mt-6">+ Add Note</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={n => { setEditNote(n); setModalOpen(true) }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {modalOpen && (
        <NoteModal
          note={editNote}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditNote(null) }}
        />
      )}
    </div>
  )
}