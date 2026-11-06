/**
 * The Members page's sections, in page order. Matches live `members.html` (53-107): Executive
 * board, Gamma, Beta, Alpha, Founders. A new pledge class goes here (newest class right after
 * the Executive board); until it does, `groupMembers` still renders it at the end.
 */
import type { Member, MembersData } from '@/types/member'

export interface ClassConfig {
  /** The key in `data/members.json`. */
  key: string
  label: string
  /** The pledge semester shown under the heading. Omitted for the eboard and founders. */
  semester?: string
  /** Repo image path of the group photo. */
  classPhoto?: string
}

export interface ClassGroup {
  config: ClassConfig
  members: Member[]
}

export const CLASSES: ClassConfig[] = [
  // Live spells it "Executive board" (members.html:54).
  { key: 'eboard', label: 'Executive board', classPhoto: 'images/classpictures/Fall2025Eboard.JPEG' },
  {
    key: 'gamma',
    label: 'Gamma Class',
    semester: 'Spring 2026',
    classPhoto: 'images/classpictures/sp26gammaclass.JPG',
  },
  {
    key: 'beta',
    label: 'Beta Class',
    semester: 'Fall 2025',
    classPhoto: 'images/classpictures/betaclass.png',
  },
  {
    key: 'alpha',
    label: 'Alpha Class',
    semester: 'Spring 2025',
    classPhoto: 'images/classpictures/alphaclass.png',
  },
  { key: 'founders', label: 'Founders' },
]

function fallbackLabel(key: string): string {
  return `${key.charAt(0).toUpperCase()}${key.slice(1)} Class`
}

/**
 * Configured classes in `classes` order, then any key in the data that isn't configured (in the
 * data's own key order) under a generic "<Key> Class" heading. Missing or empty classes are
 * skipped. Members are passed through untouched, so an eboard member also appears in their
 * own class, as on live.
 */
export function groupMembers(data: MembersData, classes: ClassConfig[] = CLASSES): ClassGroup[] {
  const groups: ClassGroup[] = []
  const configured = new Set(classes.map((c) => c.key))

  for (const config of classes) {
    const members = data[config.key]
    if (Array.isArray(members) && members.length > 0) groups.push({ config, members })
  }

  for (const key of Object.keys(data)) {
    if (configured.has(key)) continue
    const members = data[key]
    if (Array.isArray(members) && members.length > 0) {
      groups.push({ config: { key, label: fallbackLabel(key) }, members })
    }
  }

  return groups
}
