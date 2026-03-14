const tools = [
  { cmd: 'bold',          label: 'B',   title: 'Bold',           style: 'font-bold' },
  { cmd: 'italic',        label: 'I',   title: 'Italic',         style: 'italic' },
  { cmd: 'underline',     label: 'U',   title: 'Underline',      style: 'underline' },
  { cmd: 'highlight',     label: '✦',   title: 'Highlight',      style: '' },
  { divider: true },
  { cmd: 'h1',            label: 'H1',  title: 'Heading 1',      style: 'font-bold text-xs' },
  { cmd: 'h2',            label: 'H2',  title: 'Heading 2',      style: 'font-bold text-xs' },
  { divider: true },
  { cmd: 'insertUnorderedList', label: '•—', title: 'Bullet List', style: 'text-sm' },
  { cmd: 'insertOrderedList',   label: '1.', title: 'Numbered List', style: 'text-xs font-bold' },
  { cmd: 'checklist',     label: '☑',   title: 'Checklist',      style: '' },
  { divider: true },
  { cmd: 'removeFormat',  label: '✕',   title: 'Clear Formatting', style: 'text-xs' },
]

export default function Toolbar({ editorRef }) {
  const exec = (cmd) => {
    const editor = editorRef.current
    if (!editor) return
    editor.focus()

    if (cmd === 'highlight') {
      document.execCommand('hiliteColor', false, '#FEF9C3')
      return
    }
    if (cmd === 'h1') {
      document.execCommand('formatBlock', false, '<h1>')
      return
    }
    if (cmd === 'h2') {
      document.execCommand('formatBlock', false, '<h2>')
      return
    }
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
    <div className="flex items-center flex-wrap gap-0.5 px-3 py-2 bg-white border border-slate-100 rounded-2xl shadow-card sticky top-[64px] z-20">
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
                : 'text-slate-500 hover:bg-primary/8 hover:text-primary'
              }`}
          >
            {tool.label}
          </button>
        )
      })}
    </div>
  )
}