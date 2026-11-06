import { useSyncExternalStore } from 'react'
import { useTypingEffect } from '@/hooks/useTypingEffect'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {}
  const mql = window.matchMedia(REDUCED_MOTION)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(REDUCED_MOTION).matches
}

interface TypedTextProps {
  /** Must be a stable (module-level) array. */
  phrases: string[]
  className?: string
  /** Where the typed text sits inside the reserved box: 'center' for the hero, 'start' inline. */
  align?: 'start' | 'center'
}

/**
 * The typing animation, owned by a leaf so only this text re-renders every 60-110 ms.
 *
 * The visible box is sized to the longest phrase (an invisible copy sits in the same grid
 * cell), so typing never changes the line's width: no relayout of the heading and no
 * re-wrapping on phones. Screen readers get the phrase list once instead of every keystroke.
 * With prefers-reduced-motion the first phrase shows statically.
 */
export function TypedText({ phrases, className, align = 'start' }: TypedTextProps) {
  const reduced = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false)
  const typed = useTypingEffect({ phrases, enabled: !reduced })
  const text = reduced ? (phrases[0] ?? '') : typed
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), '')

  return (
    <span className={className}>
      <span className="sr-only">{phrases.join(', ')}</span>
      <span
        aria-hidden="true"
        style={{ display: 'inline-grid', justifyItems: align, whiteSpace: 'nowrap' }}
      >
        <span style={{ gridArea: '1 / 1', visibility: 'hidden' }}>{longest}</span>
        <span style={{ gridArea: '1 / 1' }}>{text}</span>
      </span>
    </span>
  )
}
