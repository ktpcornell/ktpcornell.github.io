import { useEffect, useRef, useState } from 'react'

interface TypingOptions {
  phrases: string[]
  typeSpeed?: number
  deleteSpeed?: number
  holdDelay?: number
}

export function useTypingEffect({
  phrases,
  typeSpeed = 110,
  deleteSpeed = 60,
  holdDelay = 1200,
}: TypingOptions) {
  const [text, setText] = useState('')
  const phraseIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const deletingRef = useRef(false)

  useEffect(() => {
    if (phrases.length === 0) return

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
  }, [phrases, typeSpeed, deleteSpeed, holdDelay])

  return text
}
