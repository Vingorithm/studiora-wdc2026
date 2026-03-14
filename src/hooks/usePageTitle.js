import { useEffect } from 'react'

/**
 * Sets the document title for the current page.
 * Automatically appends " · Studiora" suffix.
 * Pass null to use the default homepage title.
 */
export default function usePageTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title ? `${title} · Studiora` : 'Studiora | Illuminate Your Future.'
    return () => { document.title = prev }
  }, [title])
}