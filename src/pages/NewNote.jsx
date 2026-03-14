import { useRef, useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Toolbar from '../components/Toolbar'
import TagInput from '../components/TagInput'
import { LiaHashtagSolid } from "react-icons/lia";

const STORAGE_KEY = 'studiora_notes'

function loadNotes() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export default function NewNote() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')

  const editorRef = useRef(null)
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [tags, setTags] = useState([])
  const [saved, setSaved] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [hasContent, setHasContent] = useState(false)

  // Load existing note if editing
  useEffect(() => {
    if (editId) {
      const notes = loadNotes()
      const note = notes.find(n => String(n.id) === String(editId))
      if (note) {
        setTitle(note.title || '')
        setSubject(note.subject || '')
        setTags(note.tags || [])
        if (editorRef.current) {
          editorRef.current.innerHTML = note.content || ''
          updateWordCount()
        }
      }
    }
  }, [editId, editorRef.current])

  const updateWordCount = () => {
    if (!editorRef.current) return
    const text = editorRef.current.innerText || ''
    const words = text.trim().split(/\s+/).filter(Boolean).length
    setWordCount(words)
    setHasContent(text.trim().length > 0)
  }

  const handleSave = () => {
    const content = editorRef.current ? editorRef.current.innerHTML : ''
    const notes = loadNotes()

    if (editId) {
      const updated = notes.map(n =>
        String(n.id) === String(editId)
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      saveNotes([newNote, ...notes])
    }

    setSaved(true)
    setTimeout(() => navigate('/notes'), 800)
  }

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      handleSave()
    }
  }

  return (
    <div className="min-h-screen bg-background" onKeyDown={handleKeyDown}>
      {/* Top action bar */}
      <div className="sticky top-[64px] z-30 bg-background/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate('/notes')}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-700 font-inter text-sm transition-colors"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Notes
          </button>

          <div className="flex items-center gap-3">
            {wordCount > 0 && (
              <span className="text-xs text-slate-400 font-inter hidden sm:inline">
                {wordCount} word{wordCount !== 1 ? 's' : ''}
              </span>
            )}
            <span className="text-xs text-slate-400 font-inter hidden sm:inline">
              {editId ? 'Editing note' : 'New note'} · Ctrl+S to save
            </span>
            {saved ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success font-inter bg-success/10 px-3 py-1.5 rounded-lg">
                ✓ Saved!
              </span>
            ) : (
              <button
                onClick={handleSave}
                className="btn-primary text-sm py-2 px-5"
              >
                {editId ? 'Update Note' : 'Save Note'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
        {/* Subject field */}
        <div className="mb-4">
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Subject (e.g. Mathematics)"
            className="w-full bg-transparent text-sm font-semibold font-inter text-primary placeholder-slate-300 outline-none border-none"
          />
        </div>

        {/* Title */}
        <div className="mb-6">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Untitled Note"
            className="w-full bg-transparent text-4xl sm:text-5xl font-extrabold font-poppins text-darkText placeholder-slate-200 outline-none border-none leading-tight resize-none"
            style={{ caretColor: '#5D8BF4' }}
          />
        </div>

        {/* Tags */}
        <div className="mb-8 flex items-start gap-2">
          <span className="text-slate-300 font-inter text-sm mt-0.5 flex-shrink-0"><LiaHashtagSolid /></span>
          <TagInput tags={tags} onChange={setTags} />
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 mb-6" />

        {/* Toolbar */}
        <div className="mb-4">
          <Toolbar editorRef={editorRef} />
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={updateWordCount}
          data-placeholder="Start writing your notes… Press '/' for blocks."
          className="note-editor min-h-[420px] outline-none text-darkText font-inter text-base leading-8 focus:outline-none"
          style={{ caretColor: '#5D8BF4' }}
        />

        {/* Bottom save bar */}
        <div className="mt-16 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-inter">
            {wordCount} words · Auto-saves to your local library
          </p>
          <div className="flex gap-3">
            <button onClick={() => navigate('/notes')} className="btn-secondary text-sm py-2.5 px-6">
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary text-sm py-2.5 px-8">
              {editId ? '✓ Update Note' : '✓ Save Note'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}