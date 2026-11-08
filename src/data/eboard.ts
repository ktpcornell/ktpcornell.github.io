/**
 * The Executive board section's order (spec D9). KTP Manager returns the eboard unordered;
 * `getMembers()` sorts it with this list. A position missing from the list sorts last, then by
 * name. A member holding two positions ("VP Finance / VP Committees") sorts by the first.
 *
 * The names must match KTP Manager's position names. Matching ignores case, spacing, and
 * en/em dashes versus hyphens.
 */
import type { Member } from '@/types/member'

export const EBOARD_ORDER: string[] = [
  'President',
  'VP Internal Affairs',
  'VP External Affairs',
  'VP NME - Technical',
  'VP NME - Professional',
  'VP Finance',
  'VP Marketing',
  'VP Brotherhood',
  'VP Recruitment',
  'VP Committees',
]

function normalize(position: string): string {
  return position.replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim().toLowerCase()
}

/**
 * The best (lowest) index of any of a role's positions in `order`, or `order.length`
 * when none is listed. KTP Manager joins several positions A–Z ("VP Committees / VP
 * External Affairs"), so ranking by the first one would sort that person too low.
 */
export function eboardRank(role: string | undefined, order: string[] = EBOARD_ORDER): number {
  const ranks = (role ?? '')
    .split('/')
    .map((part) => order.findIndex((p) => normalize(p) === normalize(part)))
    .filter((i) => i !== -1)
  return ranks.length ? Math.min(...ranks) : order.length
}

/** A sorted copy: by position, then by name (so ties don't depend on the payload's order). */
export function sortEboard(members: Member[], order: string[] = EBOARD_ORDER): Member[] {
  return [...members].sort(
    (a, b) => eboardRank(a.role, order) - eboardRank(b.role, order) || a.name.localeCompare(b.name, 'en'),
  )
}

/*
 * PUBLIC TITLES (Michael, 2026-11-08). The manager's position names are the source of truth for
 * WHO is on the eboard; these three settings only change how the public site LABELS them. Each one
 * is reversible by deleting its line: the site then shows the manager's own name again.
 */

/** Manager position name -> the title shown on ktpcornell.com. */
export const EBOARD_TITLES: Record<string, string> = {
  'VP of Internal Affairs': 'VP Internal Affairs',
  'VP of External Affairs': 'VP External Affairs',
  'VP of Finance': 'VP Finance',
}

/** Per-member titles, for one manager position that covers two public roles (keyed by email). */
export const EBOARD_MEMBER_TITLES: Record<string, Record<string, string>> = {
  'la453@cornell.edu': { 'VP NME': 'VP NME - Technical' },
  'gbm66@cornell.edu': { 'VP NME': 'VP NME - Professional' },
}

/** Manager positions never shown in the public Executive board section. */
export const EBOARD_HIDDEN: string[] = ['Presidential Advisor']

function lookup(map: Record<string, string> | undefined, position: string): string | undefined {
  if (!map) return undefined
  const key = Object.keys(map).find((k) => normalize(k) === normalize(position))
  return key === undefined ? undefined : map[key]
}

/**
 * The eboard as the public site shows it: hidden positions dropped (a member left with none is
 * dropped from the section, not from their class), the rest relabelled by EBOARD_MEMBER_TITLES
 * then EBOARD_TITLES. Positions with no mapping keep the manager's name.
 */
export function publicEboard(members: Member[]): Member[] {
  return members.flatMap((m) => {
    const parts = (m.role ?? '')
      .split('/')
      .map((p) => p.trim())
      .filter((p) => p && !EBOARD_HIDDEN.some((h) => normalize(h) === normalize(p)))
      .map((p) => lookup(EBOARD_MEMBER_TITLES[(m.email ?? '').toLowerCase()], p) ?? lookup(EBOARD_TITLES, p) ?? p)
    return parts.length ? [{ ...m, role: parts.join(' / ') }] : []
  })
}
