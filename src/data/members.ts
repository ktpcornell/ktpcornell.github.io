/**
 * The ONE place the site reads member data from.
 *
 * `members.generated.json` is written at build time by `scripts/fetch-members.mjs` (it runs first
 * in `npm run dev` and `npm run build`): from KTP Manager's members endpoint when MEMBERS_ENDPOINT
 * is set (every deploy), else copied from `data/members.json` (local dev, the PR check). It is
 * gitignored. If it's missing, run `npm run members:fetch`.
 *
 * The data is bundled, so there is no loading state and nothing to fail at runtime. No page
 * should import the JSON directly; go through `getMembers()`.
 */
import raw from './members.generated.json'
import type { Member, MembersData } from '@/types/member'
import { publicEboard, sortEboard } from './eboard'

const data = raw as unknown as MembersData
const members: MembersData = { ...data, eboard: sortEboard(publicEboard(data.eboard ?? [])) }

export function getMembers(): MembersData {
  return members
}

export type { Member, MembersData }
