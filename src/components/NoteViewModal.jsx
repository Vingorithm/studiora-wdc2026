import { useNavigate } from 'react-router-dom'

function stripHtml(html) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

export default function NoteViewModal({ note, onClose, onDelete }) {
  const navigate = useNavigate()

  const handleEdit = () => {
    onClose()
    navigate(`/new-note?edit=${note.id}`)
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl animate-slide-up my-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Aurora header strip */}
        <div className="h-1.5 w-full bg-aurora" />

        <div className="p-8">
          {/* Top bar */}
          <div className="flex items-start justify-between mb-6 gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold font-poppins text-darkText leading-tight break-words">
                {note.title || 'Untitled Note'}
              </h2>
              <p className="text-xs text-slate-400 font-inter mt-1.5">
                {note.subject && <span className="text-primary font-semibold mr-3">📚 {note.subject}</span>}
                {new Date(note.createdAt || note.updatedAt).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric'
                })}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0 text-lg"
            >
              ×
            </button>
          </div>

          {/* Tags */}
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {note.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-inter shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #EEF2FF, #F5F3FF)', color: '#7C3AED', border: '1px solid #C4B5FD55' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div
            className="note-view-content prose-sm max-w-none text-slate-700 font-inter leading-relaxed min-h-[120px] mb-6"
            dangerouslySetInnerHTML={{ __html: note.content || '<p class="text-slate-400 italic">No content.</p>' }}
          />

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleEdit}
              className="btn-primary text-sm py-2.5 px-6 flex items-center gap-2"
            >
              ✏️ Edit Note
            </button>
            <button
              onClick={() => { onDelete(note.id); onClose() }}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold font-inter text-danger bg-danger/8 hover:bg-danger/15 transition-colors"
            >
              🗑 Delete
            </button>
            <button onClick={onClose} className="btn-secondary text-sm py-2.5 px-5 ml-auto">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}