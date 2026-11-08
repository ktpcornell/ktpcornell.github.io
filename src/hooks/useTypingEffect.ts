import { useEffect, useRef, useState } from 'react'

interface TypingOptions {
  phrases: string[]
  typeSpeed?: number
  deleteSpeed?: number
  holdDelay?: number
  /** false stops the loop (e.g. prefers-reduced-motion); the text stays where it was. */
  enabled?: boolean
}

/**
 * Types and deletes each phrase in turn, forever, at live's timings (110 / 60 / 1200 ms).
 * It re-renders its caller on every keystroke, so call it only from a leaf that renders the
 * text alone (`<TypedText>`), never from a page. `phrases` must be a stable array.
 */

export function useTypingEffect({
  phrases,
  typeSpeed = 110,
  deleteSpeed = 60,
  holdDelay = 1200,
  enabled = true,
}: TypingOptions) {
  const [text, setText] = useState('')
  const phraseIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const deletingRef = useRef(false)

  useEffect(() => {
    if (!enabled || phrases.length === 0) return

    let timeoutId: ReturnType<typeof setTimeout>

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndexRef.current]

      if (deletingRef.current) {
        charIndexRef.current--
        setText(currentPhrase.substring(0, charIndexRef.current))

        if (charIndexRef.current === 0) {
          deletingRef.current = false
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length
        }

        timeoutId = setTimeout(typeLoop, deleteSpeed)
        return
      }

      charIndexRef.current++
      setText(currentPhrase.substring(0, charIndexRef.current))

      if (charIndexRef.current === currentPhrase.length) {
        deletingRef.current = true
        timeoutId = setTimeout(typeLoop, holdDelay)
        return
      }

      timeoutId = setTimeout(typeLoop, typeSpeed)
    }

    timeoutId = setTimeout(typeLoop, typeSpeed)
    return () => clearTimeout(timeoutId)
  }, [phrases, typeSpeed, deleteSpeed, holdDelay, enabled])

  return text
}
