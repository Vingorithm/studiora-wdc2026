import { useRef, useState, useEffect } from 'react'
import { LiaHashtagSolid } from 'react-icons/lia'

// ─── Storage helpers ────────────────────────────────────────────────────────
const STORAGE_KEY = 'studiora_notes'
function loadNotes() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}
function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

// ─── Inline Toolbar (same logic as your Toolbar component) ──────────────────
const tools = [
  { cmd: 'bold',                label: 'B',   title: 'Bold',             style: 'font-bold' },
  { cmd: 'italic',              label: 'I',   title: 'Italic',           style: 'italic' },
  { cmd: 'underline',           label: 'U',   title: 'Underline',        style: 'underline' },
  { cmd: 'highlight',           label: '✦',   title: 'Highlight',        style: '' },
  { divider: true },
  { cmd: 'h1',                  label: 'H1',  title: 'Heading 1',        style: 'font-bold text-xs' },
  { cmd: 'h2',                  label: 'H2',  title: 'Heading 2',        style: 'font-bold text-xs' },
  { divider: true },
  { cmd: 'insertUnorderedList', label: '•—',  title: 'Bullet List',      style: 'text-sm' },
  { cmd: 'insertOrderedList',   label: '1.',  title: 'Numbered List',    style: 'text-xs font-bold' },
  { cmd: 'checklist',           label: '☑',   title: 'Checklist',        style: '' },
  { divider: true },
  { cmd: 'removeFormat',        label: '✕',   title: 'Clear Formatting', style: 'text-xs' },
]

function ModalToolbar({ editorRef }) {
  const exec = (cmd) => {
    const editor = editorRef.current
    if (!editor) return
    editor.focus()
    if (cmd === 'highlight') { document.execCommand('hiliteColor', false, '#FEF9C3'); return }
    if (cmd === 'h1')        { document.execCommand('formatBlock', false, '<h1>'); return }
    if (cmd === 'h2')        { document.execCommand('formatBlock', false, '<h2>'); return }
    if (cmd === 'checklist') {
      const sel = window.getSelection()
      if (!sel.rangeCount) return
      const range = sel.getRangeAt(0)
      const label = document.createElement('label')
      label.className = 'checklist-item'
      label.contentEditable = 'false'
      const cb = document.createElement('input')
      cb.type = 'checkbox'
      cb.className = 'mr-2 accent-primary'
      const span = document.createElement('span')
      span.contentEditable = 'true'
      span.textContent = sel.toString() || 'Checklist item'
      label.appendChild(cb)
      label.appendChild(span)
      const wrapper = document.createElement('div')
      wrapper.appendChild(label)
      range.deleteContents()
      range.insertNode(wrapper)
      range.collapse(false)
      sel.removeAllRanges()
      sel.addRange(range)
      return
    }
    document.execCommand(cmd, false, null)
  }

  const isActive = (cmd) => {
    try {
      if (cmd === 'h1') return document.queryCommandValue('formatBlock') === 'h1'
      if (cmd === 'h2') return document.queryCommandValue('formatBlock') === 'h2'
      if (['highlight', 'checklist', 'removeFormat'].includes(cmd)) return false
      return document.queryCommandState(cmd)
    } catch { return false }
  }

  return (
    <div className="flex items-center flex-wrap gap-0.5 px-3 py-2 bg-white border border-slate-100 rounded-xl shadow-sm">
      {tools.map((tool, i) => {
        if (tool.divider) return <div key={i} className="w-px h-5 bg-slate-200 mx-1" />
        const active = isActive(tool.cmd)
        return (
          <button
            key={tool.cmd}
            title={tool.title}
            onMouseDown={e => { e.preventDefault(); exec(tool.cmd) }}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 font-inter text-sm select-none
              ${tool.style}
              ${active
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-500 hover:bg-primary/10 hover:text-primary'
              }`}
          >
            {tool.label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Inline TagInput ─────────────────────────────────────────────────────────
function ModalTagInput({ tags, onChange }) {
  const [input, setInput] = useState('')

  const addTag = (val) => {
    const trimmed = val.trim().replace(/^#+/, '')
    if (trimmed && !tags.includes(trimmed)) onChange([...tags, trimmed])
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(input) }
    if (e.key === 'Backspace' && !input && tags.length) onChange(tags.slice(0, -1))
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tags.map(tag => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 text-xs font-medium font-inter px-2.5 py-1 rounded-full"
          style={{ background: '#F5F3FF', color: '#7C3AED', border: '1px solid #C4B5FD44' }}
        >
          #{tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter(t => t !== tag))}
            className="ml-0.5 text-purple-400 hover:text-purple-700 leading-none"
          >×</button>
        </span>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKey}
        onBlur={() => input && addTag(input)}
        placeholder={tags.length === 0 ? 'Add tags…' : ''}
        className="text-sm font-inter text-slate-500 placeholder-slate-300 bg-transparent outline-none border-none min-w-[80px]"
      />
    </div>
  )
}

// ─── Main Modal ──────────────────────────────────────────────────────────────
/**
 * NewNoteModal
 *
 * Props:
 *   isOpen   {boolean}         – controls visibility
 *   onClose  {() => void}      – called when the modal should close
 *   editNote {object|null}     – if provided, the note to edit (with id, title, subject, tags, content)
 */
export default function NewNoteModal({ isOpen, onClose, editNote = null }) {
  const editorRef  = useRef(null)
  const modalRef   = useRef(null)

  const [title,     setTitle]     = useState('')
  const [subject,   setSubject]   = useState('')
  const [tags,      setTags]      = useState([])
  const [saved,     setSaved]     = useState(false)
  const [wordCount, setWordCount] = useState(0)

  // ── Populate fields when opening (create vs edit) ──────────────────────────
  useEffect(() => {
    if (!isOpen) return
    setSaved(false)
    if (editNote) {
      setTitle(editNote.title || '')
      setSubject(editNote.subject || '')
      setTags(editNote.tags || [])
      // Defer so the editor DOM is ready
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = editNote.content || ''
          updateWordCount()
        }
      }, 0)
    } else {
      setTitle('')
      setSubject('')
      setTags([])
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = ''
          updateWordCount()
        }
      }, 0)
    }
  }, [isOpen, editNote])

  const updateWordCount = () => {
    if (!editorRef.current) return
    const text  = editorRef.current.innerText || ''
    const words = text.trim().split(/\s+/).filter(Boolean).length
    setWordCount(words)
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = () => {
    const content = editorRef.current ? editorRef.current.innerHTML : ''
    const notes   = loadNotes()

    if (editNote) {
      const updated = notes.map(n =>
        String(n.id) === String(editNote.id)
          ? { ...n, title: title || 'Untitled Note', subject, content, tags, updatedAt: new Date().toISOString() }
          : n
      )
      saveNotes(updated)
    } else {
      const newNote = {
        id: Date.now(),
        title: title || 'Untitled Note',
        subject,
        content,
        tags,
        highlighted: false,
        checklist: [],
        createdAt:  new Date().toISOString(),
        updatedAt:  new Date().toISOString(),
      }
      saveNotes([newNote, ...notes])
    }

    setSaved(true)
    setTimeout(() => {
      onClose()
    }, 700)
  }

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); handleSave() }
    if (e.key === 'Escape') onClose()
  }

  // ── Click-outside to close ────────────────────────────────────────────────
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) onClose()
  }

  // ── Lock body scroll ──────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* ── Backdrop ─────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{ background: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(4px)' }}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
      >
        {/* ── Modal panel ──────────────────────────────────────────────────── */}
        <div
          ref={modalRef}
          className="relative w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col"
          style={{
            maxHeight: '92dvh',
            animation: 'modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both',
          }}
        >
          {/* ── Header bar ─────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-base"
                style={{ background: 'linear-gradient(135deg,#5D8BF4,#C4B5FD)' }}
              >✍️</div>
              <div>
                <p className="text-xs font-semibold font-inter text-slate-400 leading-none mb-0.5">
                  {editNote ? 'Editing note' : 'New note'} · Ctrl+S to save
                </p>
                {wordCount > 0 && (
                  <p className="text-xs text-slate-300 font-inter leading-none">
                    {wordCount} word{wordCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-150 text-lg leading-none"
                title="Close (Esc)"
              >×</button>
            </div>
          </div>

          {/* ── Scrollable body ──────────────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4" style={{ overscrollBehavior: 'contain' }}>
            {/* Subject */}
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Subject (e.g. Mathematics)"
              className="w-full bg-transparent text-sm font-semibold font-inter text-primary placeholder-slate-300 outline-none border-none"
            />

            {/* Title */}
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Untitled Note"
              className="w-full bg-transparent text-3xl sm:text-4xl font-extrabold font-poppins text-darkText placeholder-slate-200 outline-none border-none leading-tight"
              style={{ caretColor: '#5D8BF4' }}
            />

            {/* Tags */}
            <div className="flex items-start gap-2">
              <span className="text-slate-300 mt-1 flex-shrink-0 text-base"><LiaHashtagSolid /></span>
              <ModalTagInput tags={tags} onChange={setTags} />
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Toolbar */}
            <ModalToolbar editorRef={editorRef} />

            {/* Editor */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={updateWordCount}
              data-placeholder="Start writing your notes… Press '/' for blocks."
              className="note-editor min-h-[220px] outline-none text-darkText font-inter text-base leading-8 focus:outline-none"
              style={{ caretColor: '#5D8BF4' }}
            />
          </div>

          {/* ── Footer ───────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 flex-shrink-0 bg-slate-50/60 rounded-b-3xl">
            <p className="text-xs text-slate-400 font-inter">
              {wordCount} words · Saved to local library
            </p>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="text-sm font-semibold font-inter text-slate-500 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 transition-all duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="text-sm font-semibold font-inter text-white px-6 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{ background: 'linear-gradient(135deg,#5D8BF4,#C4B5FD)', boxShadow: '0 4px 14px rgba(93,139,244,0.3)' }}
              >
                {editNote ? '✓ Update Note' : '✓ Save Note'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Animation keyframe injected once ────────────────────────────────── */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
      `}</style>
    </>
  )
}