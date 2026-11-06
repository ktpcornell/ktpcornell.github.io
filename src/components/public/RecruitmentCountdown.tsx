import { useEffect, useState } from 'react'
import { countdownText, getCountdownState, type CountdownEvent } from '@/lib/countdown'

interface RecruitmentCountdownProps {
  events: readonly CountdownEvent[]
  closedMessage: string
  className?: string
}

/**
 * Live join.html's #countdown-timer. Ticks once a second; only this component re-renders.
 * Stops ticking once the state is "closed" (live clears its interval there too).
 */
export function RecruitmentCountdown({ events, closedMessage, className }: RecruitmentCountdownProps) {
  const [now, setNow] = useState(() => Date.now())
  const state = getCountdownState(events, now)
  const closed = state.kind === 'closed'

  useEffect(() => {
    if (closed) return
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [closed])

  return (
    <div role="timer" className={['mt-6 font-semibold text-ktp-primary', className].filter(Boolean).join(' ')}>
      {countdownText(state, closedMessage)}
    </div>
  )
}
