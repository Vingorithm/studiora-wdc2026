// src/components/NoteViewModal.jsx
import { useEffect } from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'
import { FaBook } from 'react-icons/fa6'
import BaseModal from './BaseModal'

export default function NoteViewModal({ note, onClose, onDelete, onEdit }) {
  if (!note) return null

  const handleEdit = () => {
    onClose()
    onEdit(note)
  }

  const handleDelete = () => {
    onDelete(note.id)
    onClose()
  }

  const formattedDate = new Date(note.createdAt || note.updatedAt)
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <BaseModal isOpen={!!note} onClose={onClose} id="note-view" showAuroraBar>
      {/* Header */}
      <BaseModal.Header
        id="note-view"
        icon={<FaBook size={14} />}
        title={note.title || 'Untitled Note'}
        subtitle={
          note.subject
            ? `${note.subject} · ${formattedDate}`
            : formattedDate
        }
        onClose={onClose}
      />

      {/* Body */}
      <BaseModal.Body className="space-y-5">
        {/* Tags */}
        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2" role="list" aria-label="Note tags">
            {note.tags.map(tag => (
              <span
                key={tag}
                role="listitem"
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-inter"
                style={{
                  background: 'linear-gradient(135deg,#EEF2FF,#F5F3FF)',
                  color: '#7C3AED',
                  border: '1px solid #C4B5FD55',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Note content */}
        <div
          className="note-view-content text-slate-700 font-inter leading-relaxed min-h-[120px]"
          dangerouslySetInnerHTML={{
            __html: note.content || '<p class="text-slate-400 italic">No content.</p>',
          }}
        />
      </BaseModal.Body>

      {/* Footer */}
      <BaseModal.Footer>
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 btn-primary text-sm py-2.5 px-5 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
        >
          <MdEdit size={15} aria-hidden="true" />
          Edit Note
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold font-inter text-danger bg-danger/8 hover:bg-danger/15 transition-colors focus-visible:ring-2 focus-visible:ring-danger/40 focus-visible:outline-none"
        >
          <MdDelete size={15} aria-hidden="true" />
          Delete
        </button>
        <button
          onClick={onClose}
          className="btn-secondary text-sm py-2.5 px-5 ml-auto focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none"
        >
          Close
        </button>
      </BaseModal.Footer>
    </BaseModal>
  )
}