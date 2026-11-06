import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to the top when the route changes, unless the URL targets an anchor
 * (e.g. /#our-history or /join#faq), in which case it scrolls that element into view.
 * Without this, clicking a footer link left you mid-page on the new page.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // A malformed hash (e.g. "#%E0") makes decodeURIComponent throw, which would blank the app.
      let id = hash.slice(1)
      try {
        id = decodeURIComponent(id)
      } catch {
        /* keep the raw value */
      }
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
