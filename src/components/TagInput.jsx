import { useState } from 'react'

export default function TagInput({ tags, onChange }) {
  const [input, setInput] = useState('')

  const add = () => {
    const t = input.trim().replace(/\s+/g, '-').toLowerCase()
    if (t && !tags.includes(t)) onChange([...tags, t])
    setInput('')
  }

  const remove = (tag) => onChange(tags.filter(t => t !== tag))

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map(tag => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold font-inter shadow-sm cursor-default select-none transition-all"
          style={{ background: 'linear-gradient(135deg, #EEF2FF, #F5F3FF)', color: '#7C3AED', border: '1px solid #C4B5FD55' }}
        >
          #{tag}
          <button
            onClick={() => remove(tag)}
            className="ml-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors text-purple-400 hover:text-purple-700"
            style={{ fontSize: '10px', lineHeight: 1 }}
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add() }
          if (e.key === 'Backspace' && !input && tags.length) remove(tags[tags.length - 1])
        }}
        placeholder={tags.length === 0 ? 'Add tags… (press Enter)' : 'Add more…'}
        className="flex-1 min-w-[120px] bg-transparent text-sm text-slate-600 font-inter placeholder-slate-300 outline-none"
      />
    </div>
  )
}