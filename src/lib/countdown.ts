/**
 * The Join page countdown, as pure functions so the state logic is testable.
 * Mirrors live `join.html:150-185` exactly:
 *  - Walk the events in list order.
 *  - The first event with start <= now < end is "live" (happening now).
 *  - Otherwise the first event with now < start is "upcoming".
 *  - Past events (now >= end) are skipped. When every event is past, the state is "closed".
 * An event whose start equals its end (the application deadline) can never be live: at that
 * instant it is already past.
 */

export interface CountdownEvent {
  name: string
  location: string
  start: Date
  end: Date
  /** The application deadline: phrased "Applications close in …" instead of "<name> starts in …". */
  deadline?: boolean
}

export type CountdownState =
  | { kind: 'upcoming'; event: CountdownEvent; remainingMs: number }
  | { kind: 'live'; event: CountdownEvent }
  | { kind: 'closed' }

export function getCountdownState(events: readonly CountdownEvent[], now: Date | number): CountdownState {
  const t = typeof now === 'number' ? now : now.getTime()
  for (const event of events) {
    const start = event.start.getTime()
    const end = event.end.getTime()
    if (t >= start && t < end) return { kind: 'live', event }
    if (t < start) return { kind: 'upcoming', event, remainingMs: start - t }
  }
  return { kind: 'closed' }
}

/** Live's formatDiff: "<d>d <h>h <m>m <s>s", each part floored. */
export function formatRemaining(ms: number): string {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24))
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((ms / (1000 * 60)) % 60)
  const seconds = Math.floor((ms / 1000) % 60)
  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

/** The text live puts in #countdown-timer for a given state. */
export function countdownText(state: CountdownState, closedMessage: string): string {
  switch (state.kind) {
    case 'live':
      return `${state.event.name} is happening now in ${state.event.location}!`
    case 'upcoming':
      return state.event.deadline
        ? `Applications close in ${formatRemaining(state.remainingMs)}`
        : `${state.event.name} starts in ${formatRemaining(state.remainingMs)} · ${state.event.location}`
    case 'closed':
      return closedMessage
  }
}
