import { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'

const subjectColors = [
  'from-blue-400 to-indigo-500',
  'from-purple-400 to-pink-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-red-500',
  'from-sky-400 to-cyan-500',
]

function getColorForSubject(subject) {
  let hash = 0
  for (let i = 0; i < subject.length; i++) {
    hash = subject.charCodeAt(i) + ((hash << 5) - hash)
  }
  return subjectColors[Math.abs(hash) % subjectColors.length]
}

export default function NoteCard({ note, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false)
  const gradient = getColorForSubject(note.subject || 'default')

  return (
    <div className="card card-hover flex flex-col animate-fade-in relative overflow-hidden group">
      {/* Top gradient strip */}
      <div className={`h-1.5 absolute top-0 left-0 right-0 bg-gradient-to-r ${gradient}`} />

      <div className="pt-2">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold font-poppins text-darkText text-sm mb-1 line-clamp-1">{note.title}</h3>
            <span className={`inline-block text-xs font-semibold font-inter px-2 py-0.5 rounded-lg bg-gradient-to-r ${gradient} text-white`}>
              {note.subject}
            </span>
          </div>
          <div className="relative flex-shrink-0 ml-2">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors opacity-0 group-hover:opacity-100"
            >
              ⋯
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-10 min-w-[110px] animate-slide-up">
                <button
                  onClick={() => { onEdit(note); setShowMenu(false) }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 font-inter"
                >
                  <MdEdit/> Edit
                </button>
                <button
                  onClick={() => { onDelete(note.id); setShowMenu(false) }}
                  className="w-full text-left px-3 py-2 text-sm text-danger hover:bg-red-50 font-inter"
                >
                  <MdDelete/> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content preview */}
        <p className="text-xs text-slate-500 font-inter line-clamp-3 mb-3 leading-relaxed">
          {note.content}
        </p>

        {/* Checklist preview */}
        {note.checklist && note.checklist.length > 0 && (
          <div className="mb-3 space-y-1">
            {note.checklist.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-inter">
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-success text-white' : 'border border-slate-300'}`}>
                  {item.done && <span style={{ fontSize: '8px' }}>✓</span>}
                </div>
                <span className={item.done ? 'line-through text-slate-400' : 'text-slate-600'}>{item.text}</span>
              </div>
            ))}
            {note.checklist.length > 3 && (
              <p className="text-xs text-slate-400 font-inter">+{note.checklist.length - 3} more items</p>
            )}
          </div>
        )}

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {note.tags.map(tag => (
              <span key={tag} className="note-tag">#{tag}</span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <span className="text-xs text-slate-400 font-inter">
            {new Date(note.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          {note.highlighted && (
            <span className="text-xs bg-accent/20 text-orange-600 px-2 py-0.5 rounded-lg font-semibold font-inter">✨ Highlighted</span>
          )}
        </div>
      </div>
    </div>
  )
}