/**
 * The ONE place the site reads member data from.
 *
 * Today it is the repo's own `data/members.json` (the file KTP Manager's profile sync
 * edits through pull requests), bundled at build time, so there is no loading state and
 * nothing to fail. When member data moves to KTP Manager's backend (Supabase), this module
 * becomes an async fetch and the pages gain a loading state. No page should import the
 * JSON directly; go through `getMembers()`.
 */
import raw from '../../data/members.json'
import type { Member, MembersData } from '@/types/member'

const members = raw as unknown as MembersData

export function getMembers(): MembersData {
  return members
}

export type { Member, MembersData }
