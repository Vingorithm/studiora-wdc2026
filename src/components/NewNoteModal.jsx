// src/components/NewNoteModal.jsx
import { useRef, useState, useEffect } from 'react'
import { LiaHashtagSolid } from 'react-icons/lia'
import BaseModal from './BaseModal'

// ─── Storage helpers ──────────────────────────────────────────────────────────
const STORAGE_KEY = 'studiora_notes'
function loadNotes() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}
function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

// ─── Formatting toolbar ───────────────────────────────────────────────────────
const TOOLS = [
  { cmd: 'bold',                label: 'B',  title: 'Bold',          style: 'font-bold'     },
  { cmd: 'italic',              label: 'I',  title: 'Italic',        style: 'italic'        },
  { cmd: 'underline',           label: 'U',  title: 'Underline',     style: 'underline'     },
  { cmd: 'highlight',           label: '✦', title: 'Highlight',     style: ''              },
  { divider: true },
  { cmd: 'h1',                  label: 'H1', title: 'Heading 1',     style: 'font-bold text-xs' },
  { cmd: 'h2',                  label: 'H2', title: 'Heading 2',     style: 'font-bold text-xs' },
  { divider: true },
  { cmd: 'insertUnorderedList', label: '•—', title: 'Bullet list',   style: 'text-sm'       },
  { cmd: 'insertOrderedList',   label: '1.', title: 'Numbered list', style: 'text-xs font-bold' },
  { cmd: 'checklist',           label: '☑', title: 'Checklist',     style: ''              },
  { divider: true },
  { cmd: 'removeFormat',        label: '✕', title: 'Clear format',  style: 'text-xs'       },
]

function NoteToolbar({ editorRef }) {
  const exec = (cmd) => {
    const ed = editorRef.current
    if (!ed) return
    ed.focus()
    if (cmd === 'highlight') { document.execCommand('hiliteColor', false, '#FEF9C3'); return }
    if (cmd === 'h1')        { document.execCommand('formatBlock',  false, '<h1>');   return }
    if (cmd === 'h2')        { document.execCommand('formatBlock',  false, '<h2>');   return }
    if (cmd === 'checklist') {
      const sel = window.getSelection()
      if (!sel?.rangeCount) return
      const range = sel.getRangeAt(0)
      const label = document.createElement('label')
      label.className     = 'checklist-item'
      label.contentEditable = 'false'
      const cb  = document.createElement('input')
      cb.type   = 'checkbox'
      cb.className = 'mr-2 accent-primary'
      const span = document.createElement('span')
      span.contentEditable = 'true'
      span.textContent = sel.toString() || 'Checklist item'
      label.append(cb, span)
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
      {TOOLS.map((tool, i) => {
        if (tool.divider) return <div key={i} className="w-px h-5 bg-slate-200 mx-1" aria-hidden="true" />
        const active = isActive(tool.cmd)
        return (
          <button
            key={tool.cmd}
            title={tool.title}
            aria-label={tool.title}
            aria-pressed={active}
            onMouseDown={e => { e.preventDefault(); exec(tool.cmd) }}
            className={`
              w-8 h-8 rounded-lg flex items-center justify-center
              transition-all duration-150 font-inter text-sm select-none
              ${tool.style}
              ${active
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-500 hover:bg-primary/10 hover:text-primary'}
              focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none
            `}
          >
            {tool.label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Tag input ────────────────────────────────────────────────────────────────
function TagInput({ tags, onChange }) {
  const [input, setInput] = useState('')
  const addTag = (val) => {
    const t = val.trim().replace(/^#+/, '')
    if (t && !tags.includes(t)) onChange([...tags, t])
    setInput('')
  }
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(input) }
    if (e.key === 'Backspace' && !input && tags.length) onChange(tags.slice(0, -1))
  }
  return (
    <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Note tags">
      {tags.map(tag => (
        <span key={tag}
          className="inline-flex items-center gap-1 text-xs font-medium font-inter px-2.5 py-1 rounded-full"
          style={{ background: '#F5F3FF', color: '#7C3AED', border: '1px solid #C4B5FD44' }}
        >
          #{tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter(t => t !== tag))}
            aria-label={`Remove tag ${tag}`}
            className="ml-0.5 text-purple-400 hover:text-purple-700 leading-none focus-visible:outline-none focus-visible:text-purple-700"
          >×</button>
        </span>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKey}
        onBlur={() => input && addTag(input)}
        placeholder={tags.length === 0 ? 'Add tags…' : ''}
        aria-label="Add a tag"
        className="text-sm font-inter text-slate-500 placeholder-slate-300 bg-transparent outline-none border-none min-w-[80px]"
      />
    </div>
  )
}

// ─── NewNoteModal ─────────────────────────────────────────────────────────────
export default function NewNoteModal({ isOpen, onClose, editNote = null }) {
  const editorRef = useRef(null)

  const [title,     setTitle]     = useState('')
  const [subject,   setSubject]   = useState('')
  const [tags,      setTags]      = useState([])
  const [wordCount, setWordCount] = useState(0)
  const [saved,     setSaved]     = useState(false)

  // Populate fields when opening
  useEffect(() => {
    if (!isOpen) return
    setSaved(false)
    const src = editNote || { title: '', subject: '', tags: [], content: '' }
    setTitle(src.title || '')
    setSubject(src.subject || '')
    setTags(src.tags || [])
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = src.content || ''
        updateWordCount()
      }
    }, 0)
  }, [isOpen, editNote])

  const updateWordCount = () => {
    const text = editorRef.current?.innerText || ''
    setWordCount(text.trim().split(/\s+/).filter(Boolean).length)
  }

  const handleSave = () => {
    const content = editorRef.current?.innerHTML ?? ''
    const notes   = loadNotes()
    if (editNote) {
      saveNotes(notes.map(n =>
        String(n.id) === String(editNote.id)
          ? { ...n, title: title || 'Untitled Note', subject, content, tags, updatedAt: new Date().toISOString() }
          : n
      ))
    } else {
      saveNotes([{
        id: Date.now(),
        title: title || 'Untitled Note',
        subject, content, tags,
        highlighted: false,
        checklist: [],
        createdAt:  new Date().toISOString(),
        updatedAt:  new Date().toISOString(),
      }, ...notes])
    }
    setSaved(true)
    setTimeout(onClose, 600)
  }

  // Ctrl+S shortcut — ESC is handled by BaseModal
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); handleSave() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, title, subject, tags]) // eslint-disable-line

  const headerSubtitle = saved
    ? '✓ Saved!'
    : `${editNote ? 'Editing' : 'New note'} · Ctrl+S to save${wordCount > 0 ? ` · ${wordCount} words` : ''}`

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} id="new-note" showAuroraBar>
      {/* Header */}
      <BaseModal.Header
        id="new-note"
        icon="✍️"
        title={editNote ? 'Edit Note' : 'New Note'}
        subtitle={headerSubtitle}
        onClose={onClose}
      />

      {/* Body */}
      <BaseModal.Body>
        {/* Subject */}
        <input
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="Subject (e.g. Mathematics)"
          aria-label="Note subject"
          className="w-full bg-transparent text-sm font-semibold font-inter text-primary placeholder-slate-300 outline-none border-none mb-3"
        />

        {/* Title */}
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Untitled Note"
          aria-label="Note title"
          className="w-full bg-transparent text-3xl font-extrabold font-poppins text-darkText placeholder-slate-200 outline-none border-none leading-tight mb-3"
          style={{ caretColor: '#5D8BF4' }}
        />

        {/* Tags */}
        <div className="flex items-start gap-2 mb-4">
          <span className="text-slate-300 mt-1 flex-shrink-0 text-base" aria-hidden="true">
            <LiaHashtagSolid />
          </span>
          <TagInput tags={tags} onChange={setTags} />
        </div>

        <div className="border-t border-slate-100 mb-4" />

        {/* Toolbar */}
        <div className="mb-3">
          <NoteToolbar editorRef={editorRef} />
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={updateWordCount}
          role="textbox"
          aria-multiline="true"
          aria-label="Note content"
          data-placeholder="Start writing your notes…"
          className="note-editor min-h-[220px] outline-none text-darkText font-inter text-base leading-8"
          style={{ caretColor: '#5D8BF4' }}
        />
      </BaseModal.Body>

      {/* Footer */}
      <BaseModal.Footer meta={`${wordCount} words · Saved locally`}>
        <button
          onClick={onClose}
          className="text-sm font-semibold font-inter text-slate-500 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saved}
          className="text-sm font-semibold font-inter text-white px-6 py-2 rounded-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
          style={{ background: 'linear-gradient(135deg,#5D8BF4,#C4B5FD)', boxShadow: '0 4px 14px rgba(93,139,244,0.28)' }}
        >
          {saved ? '✓ Saved!' : editNote ? '✓ Update Note' : '✓ Save Note'}
        </button>
      </BaseModal.Footer>
    </BaseModal>
  )
}