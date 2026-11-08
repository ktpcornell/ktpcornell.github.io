import { describe, expect, it } from 'vitest'
import { countdownText, formatRemaining, getCountdownState, type CountdownEvent } from './countdown'
import { COUNTDOWN_CLOSED_MESSAGE, COUNTDOWN_EVENTS } from '../content/recruitment'

// Local-time dates, matching how the live page (and recruitment.ts) builds them.
const at = (d: number, h: number, m = 0, s = 0, ms = 0) => new Date(2026, 8, d, h, m, s, ms)

const resumeReview: CountdownEvent = {
  name: 'Resume Review',
  location: 'Goldwin Smith Hall G64',
  start: at(8, 17),
  end: at(8, 18),
}
const infoSession: CountdownEvent = {
  name: 'Information Session 2',
  location: 'Caldwell 100',
  start: at(9, 17),
  end: at(9, 18),
}
const deadline: CountdownEvent = {
  name: 'Applications close',
  location: 'Online',
  start: at(9, 23, 59),
  end: at(9, 23, 59),
  deadline: true,
}
const EVENTS = [resumeReview, infoSession, deadline]

describe('getCountdownState', () => {
  it('counts down to the first event before anything starts', () => {
    const now = at(7, 12)
    expect(getCountdownState(EVENTS, now)).toEqual({
      kind: 'upcoming',
      event: resumeReview,
      remainingMs: resumeReview.start.getTime() - now.getTime(),
    })
  })

  it('is live at the exact start instant', () => {
    expect(getCountdownState(EVENTS, resumeReview.start)).toEqual({ kind: 'live', event: resumeReview })
  })

  it('is live during the event', () => {
    expect(getCountdownState(EVENTS, at(8, 17, 30))).toEqual({ kind: 'live', event: resumeReview })
  })

  it('is upcoming one millisecond before the start', () => {
    const state = getCountdownState(EVENTS, resumeReview.start.getTime() - 1)
    expect(state).toEqual({ kind: 'upcoming', event: resumeReview, remainingMs: 1 })
  })

  it('moves to the next event at the exact end instant (end is exclusive)', () => {
    const state = getCountdownState(EVENTS, resumeReview.end)
    expect(state.kind).toBe('upcoming')
    expect(state.kind === 'upcoming' && state.event).toBe(infoSession)
  })

  it('counts down to the next event in the gap between events', () => {
    const now = at(9, 9)
    expect(getCountdownState(EVENTS, now)).toEqual({
      kind: 'upcoming',
      event: infoSession,
      remainingMs: infoSession.start.getTime() - now.getTime(),
    })
  })

  it('counts down to the deadline after the last session ends', () => {
    const state = getCountdownState(EVENTS, infoSession.end)
    expect(state.kind === 'upcoming' && state.event).toBe(deadline)
  })

  it('never shows a zero-length deadline as live; it is closed at that instant', () => {
    expect(getCountdownState(EVENTS, deadline.start.getTime() - 1)).toEqual({
      kind: 'upcoming',
      event: deadline,
      remainingMs: 1,
    })
    expect(getCountdownState(EVENTS, deadline.start)).toEqual({ kind: 'closed' })
  })

  it('is closed after every event has passed', () => {
    expect(getCountdownState(EVENTS, at(20, 0))).toEqual({ kind: 'closed' })
  })

  it('is closed for an empty list', () => {
    expect(getCountdownState([], at(1, 0))).toEqual({ kind: 'closed' })
  })

  it('walks events in list order, like live', () => {
    // An earlier-listed upcoming event wins even if a later-listed one is live (live's loop does the same).
    const later: CountdownEvent = { ...resumeReview, start: at(1, 0), end: at(30, 0), name: 'Long event' }
    const state = getCountdownState([infoSession, later], at(8, 17))
    expect(state.kind === 'upcoming' && state.event).toBe(infoSession)
  })

  it('accepts a Date or epoch milliseconds for now', () => {
    const now = at(8, 17, 15)
    expect(getCountdownState(EVENTS, now)).toEqual(getCountdownState(EVENTS, now.getTime()))
  })

  it('runs against the real Fall 2026 events', () => {
    expect(getCountdownState(COUNTDOWN_EVENTS, at(1, 0)).kind).toBe('upcoming')
    expect(getCountdownState(COUNTDOWN_EVENTS, at(9, 17, 30)).kind).toBe('live')
    expect(getCountdownState(COUNTDOWN_EVENTS, new Date(2026, 10, 6))).toEqual({ kind: 'closed' })
  })
})

describe('formatRemaining', () => {
  it('formats zero', () => {
    expect(formatRemaining(0)).toBe('0d 0h 0m 0s')
  })

  it('formats days, hours, minutes and seconds', () => {
    const ms = ((1 * 24 + 2) * 60 * 60 + 3 * 60 + 4) * 1000
    expect(formatRemaining(ms)).toBe('1d 2h 3m 4s')
  })

  it('floors partial seconds', () => {
    expect(formatRemaining(999)).toBe('0d 0h 0m 0s')
    expect(formatRemaining(59_999)).toBe('0d 0h 0m 59s')
  })
})

describe('countdownText', () => {
  it('matches live wording for an upcoming event', () => {
    expect(countdownText({ kind: 'upcoming', event: infoSession, remainingMs: 61_000 }, 'closed')).toBe(
      'Information Session 2 starts in 0d 0h 1m 1s · Caldwell 100',
    )
  })

  it('matches live wording for the deadline', () => {
    expect(countdownText({ kind: 'upcoming', event: deadline, remainingMs: 1000 }, 'closed')).toBe(
      'Applications close in 0d 0h 0m 1s',
    )
  })

  it('matches live wording for happening now', () => {
    expect(countdownText({ kind: 'live', event: resumeReview }, 'closed')).toBe(
      'Resume Review is happening now in Goldwin Smith Hall G64!',
    )
  })

  it('shows the closed message', () => {
    expect(countdownText({ kind: 'closed' }, COUNTDOWN_CLOSED_MESSAGE)).toBe(
      'Applications for Fall 2026 are now closed.',
    )
  })
})
