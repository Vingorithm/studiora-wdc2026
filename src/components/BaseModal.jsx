// src/components/BaseModal.jsx
import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * BaseModal — shared foundation for ALL modals in Studiora.
 *
 * Props:
 *   isOpen         {boolean}        — controls visibility
 *   onClose        {() => void}     — called on ESC / backdrop click
 *   id             {string}         — used to generate aria-labelledby IDs
 *   size           {'md'|'lg'}      — max-width variant (default 'lg' = max-w-2xl)
 *   showAuroraBar  {boolean}        — shows the top gradient accent bar (default true)
 *   className      {string}         — extra classes on the panel
 *   children       {ReactNode}
 */
export default function BaseModal({
  isOpen,
  onClose,
  id = 'modal',
  size = 'lg',
  showAuroraBar = true,
  className = '',
  children,
}) {
  const panelRef      = useRef(null)
  const previousFocus = useRef(null)

  // ── Focus trap ──────────────────────────────────────────────────────────
  const trapFocus = useCallback((e) => {
    if (!panelRef.current) return
    const focusable = Array.from(panelRef.current.querySelectorAll(FOCUSABLE))
    if (!focusable.length) return
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }
    if (e.key === 'Escape') { e.preventDefault(); onClose() }
  }, [onClose])

  // ── Open / close side-effects ────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return

    // Save previously focused element
    previousFocus.current = document.activeElement
    // Lock body scroll
    document.body.style.overflow = 'hidden'
    // Attach keyboard handler
    document.addEventListener('keydown', trapFocus)
    // Move focus into modal on next tick (after animation frame)
    const raf = requestAnimationFrame(() => {
      if (!panelRef.current) return
      const focusable = panelRef.current.querySelectorAll(FOCUSABLE)
      if (focusable.length) focusable[0].focus()
    })

    return () => {
      document.body.style.overflow   = ''
      document.removeEventListener('keydown', trapFocus)
      cancelAnimationFrame(raf)
      // Restore focus to trigger element
      if (previousFocus.current?.focus) previousFocus.current.focus()
    }
  }, [isOpen, trapFocus])

  if (!isOpen) return null

  const sizeClass = size === 'md' ? 'sm:max-w-md' : 'sm:max-w-2xl'

  return createPortal(
    // ── Backdrop ────────────────────────────────────────────────────────────
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}
      aria-hidden="true"                  // backdrop is decorative
      onClick={onClose}
    >
      {/* ── Panel ─────────────────────────────────────────────────────────── */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-desc`}
        className={`
          relative w-full ${sizeClass}
          bg-white
          rounded-t-3xl sm:rounded-3xl
          shadow-2xl
          flex flex-col
          overflow-hidden
          ${className}
        `}
        style={{
          maxHeight: '92dvh',
          animation: 'studiorModalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Aurora accent bar — consistent on every modal */}
        {showAuroraBar && (
          <div
            className="h-1.5 w-full flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#5D8BF4,#C4B5FD)' }}
            aria-hidden="true"
          />
        )}

        {children}
      </div>

      {/* Keyframe injected once at portal root */}
      <style>{`
        @keyframes studiorModalIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @media (prefers-reduced-motion: reduce) {
          .studiora-modal-panel { animation: none !important; }
        }
      `}</style>
    </div>,
    document.body
  )
}

// ── Sub-components exported for composing modal layouts ─────────────────────

/**
 * BaseModal.Header
 * Standardised header: icon + title/subtitle column + close button.
 *
 * Props:
 *   id          {string}   — must match BaseModal id prop (generates aria id)
 *   icon        {ReactNode} — optional 32×32 icon element
 *   title       {string}   — primary title (mapped to aria-labelledby)
 *   subtitle    {string}   — optional muted subtitle line
 *   onClose     {fn}
 */
BaseModal.Header = function ModalHeader({ id, icon, title, subtitle, onClose }) {
  return (
    <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 flex-shrink-0 gap-4">
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-base flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#5D8BF4,#C4B5FD)' }}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h2
            id={`${id}-title`}
            className="text-sm font-bold font-poppins text-darkText leading-snug truncate"
          >
            {title}
          </h2>
          {subtitle && (
            <p
              id={`${id}-desc`}
              className="text-xs text-slate-400 font-inter leading-none mt-0.5"
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onClose}
        aria-label="Close dialog"
        className="
          w-9 h-9 rounded-xl flex-shrink-0
          flex items-center justify-center
          text-slate-400 hover:text-slate-700
          bg-slate-100 hover:bg-slate-200
          transition-all duration-150
          text-lg leading-none
          focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none
        "
      >
        ×
      </button>
    </div>
  )
}

/**
 * BaseModal.Body
 * Scrollable content area with consistent padding.
 */
BaseModal.Body = function ModalBody({ children, className = '' }) {
  return (
    <div
      className={`flex-1 overflow-y-auto px-6 py-6 ${className}`}
      style={{ overscrollBehavior: 'contain' }}
    >
      {children}
    </div>
  )
}

/**
 * BaseModal.Footer
 * Sticky footer with consistent background + padding.
 * Left slot: status/meta text. Right slot: action buttons.
 */
BaseModal.Footer = function ModalFooter({ meta, children }) {
  return (
    <div className="
      flex items-center justify-between
      px-6 py-4
      border-t border-slate-100
      bg-slate-50/60
      flex-shrink-0
      rounded-b-3xl
      gap-4
    ">
      {meta ? (
        <p className="text-xs text-slate-400 font-inter flex-shrink-0">{meta}</p>
      ) : (
        <div />
      )}
      <div className="flex items-center gap-2 flex-wrap justify-end">
        {children}
      </div>
    </div>
  )
}