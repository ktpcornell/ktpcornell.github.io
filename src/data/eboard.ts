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

/** Index of a role's first position in `order`, or `order.length` when it isn't listed. */
export function eboardRank(role: string | undefined, order: string[] = EBOARD_ORDER): number {
  const first = normalize((role ?? '').split('/')[0] ?? '')
  const i = order.findIndex((p) => normalize(p) === first)
  return i === -1 ? order.length : i
}

/** A sorted copy: by position, then by name (so ties don't depend on the payload's order). */
export function sortEboard(members: Member[], order: string[] = EBOARD_ORDER): Member[] {
  return [...members].sort(
    (a, b) => eboardRank(a.role, order) - eboardRank(b.role, order) || a.name.localeCompare(b.name, 'en'),
  )
}
