import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext(null)

const ICONS = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
  warning: '⚠',
}

const COLORS = {
  success: 'bg-emerald-500',
  error:   'bg-red-500',
  info:    'bg-primary',
  warning: 'bg-amber-500',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
    clearTimeout(timers.current[id])
    delete timers.current[id]
  }, [])

  /**
   * toast(message, type?, duration?, onUndo?)
   *   message  – string
   *   type     – 'success' | 'error' | 'info' | 'warning'
   *   duration – ms before auto-dismiss (default 4000)
   *   onUndo   – optional callback; if provided, an "Undo" button is shown
   */
  const toast = useCallback((message, type = 'success', duration = 4000, onUndo = null) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type, onUndo }])
    timers.current[id] = setTimeout(() => dismiss(id), duration)
    return id
  }, [dismiss])

  return (
    <ToastContext.Provider value={toast}>
      {children}

      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 pointer-events-none"
        style={{ minWidth: '300px', maxWidth: '92vw' }}
      >
        {toasts.map(t => (
          <div
            key={t.id}
            role="status"
            className={`
              pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-2xl
              text-white font-inter text-sm font-semibold shadow-lg
              animate-slide-up ${COLORS[t.type]}
            `}
          >
            <span className="text-base leading-none" aria-hidden="true">
              {ICONS[t.type]}
            </span>
            <span className="flex-1">{t.message}</span>

            {/* Undo button — only shown if caller passed onUndo */}
            {t.onUndo && (
              <button
                onClick={() => { t.onUndo(); dismiss(t.id) }}
                className="text-white underline underline-offset-2 font-bold hover:no-underline transition-all text-xs ml-1"
              >
                Undo
              </button>
            )}

            <button
              onClick={() => dismiss(t.id)}
              className="text-white/70 hover:text-white transition-colors text-lg leading-none ml-1"
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}