import { useEffect, useState } from 'react'

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

  useEffect(() => {
    let phraseIndex = 0
    let charIndex = 0
    let deleting = false
    let timeoutId: ReturnType<typeof setTimeout>

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex]

      if (deleting) {
        setText(currentPhrase.substring(0, charIndex - 1))
        charIndex--

        if (charIndex === 0) {
          deleting = false
          phraseIndex = (phraseIndex + 1) % phrases.length
        }

        timeoutId = setTimeout(typeLoop, deleteSpeed)
        return
      }

      setText(currentPhrase.substring(0, charIndex + 1))
      charIndex++

      if (charIndex === currentPhrase.length) {
        deleting = true
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
