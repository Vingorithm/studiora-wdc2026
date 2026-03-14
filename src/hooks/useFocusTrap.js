import { useEffect } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

/**
 * Traps keyboard focus inside `ref` element while `isActive` is true.
 * Also calls `onClose` when Escape is pressed.
 */
export default function useFocusTrap(ref, isActive, onClose) {
  useEffect(() => {
    if (!isActive || !ref.current) return

    // Store previously focused element so we can restore it on close
    const previouslyFocused = document.activeElement

    // Focus the first focusable element inside the modal
    const focusable = ref.current.querySelectorAll(FOCUSABLE)
    if (focusable.length) focusable[0].focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusableEls = Array.from(ref.current.querySelectorAll(FOCUSABLE))
      if (!focusableEls.length) return

      const first = focusableEls[0]
      const last  = focusableEls[focusableEls.length - 1]

      if (e.shiftKey) {
        // Shift+Tab: wrap from first → last
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        // Tab: wrap from last → first
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Restore focus to the element that triggered the modal
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus()
      }
    }
  }, [isActive, ref, onClose])
}