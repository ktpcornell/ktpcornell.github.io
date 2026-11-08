/**
 * The pure half of `scripts/fetch-members.mjs`: payload validation, the member floor, and the
 * mapping from KTP Manager's payload to the site's `MembersData` shape. No I/O here, so Vitest
 * can test it directly (`members-build.test.mjs`).
 *
 * Plain JavaScript (JSDoc types) on purpose: the build runs it with plain `node` (Node 20 in CI
 * can't run TypeScript). The payload's TypeScript types live in `src/types/membersPayload.ts`;
 * KTP Manager's `src/lib/public-members.ts` is the source of truth for both.
 *
 * The eboard is NOT sorted here. Its order lives in the site's code (`src/data/eboard.ts`) and
 * `getMembers()` applies it, so the order list stays TypeScript and covers both data sources.
 */

/** Spec D12: fewer listed cards than this fails the build. Raise it as the club grows. */
export const DEFAULT_MIN_MEMBERS = 40

/** Where downloaded headshots live, relative to the repo root (and as `photo` paths). */
export const DB_HEADSHOT_DIR = 'images/headshots/db'

/** A section key: lowercase, as `src/data/classes.ts` expects. */
const CLASS_KEY = /^[a-z][a-z0-9_-]*$/
/** A headshot file name we will write to disk: one path segment, no traversal. */
const PHOTO_FILE = /^[A-Za-z0-9][A-Za-z0-9._-]*$/
const STRING_FIELDS = ['name', 'major', 'hometown', 'linkedin', 'email', 'description', 'role']

const isObject = (v) => typeof v === 'object' && v !== null && !Array.isArray(v)

function checkMember(m, where, errors) {
  if (!isObject(m)) {
    errors.push(`${where}: not an object`)
    return
  }
  for (const f of STRING_FIELDS) {
    if (typeof m[f] !== 'string') errors.push(`${where}.${f}: expected a string, got ${typeof m[f]}`)
  }
  if (typeof m.name === 'string' && m.name.trim() === '') errors.push(`${where}.name: empty`)
  if (m.photo === null) return
  if (!isObject(m.photo)) {
    errors.push(`${where}.photo: expected { url, file } or null`)
    return
  }
  if (typeof m.photo.url !== 'string' || !/^https?:\/\//i.test(m.photo.url)) {
    errors.push(`${where}.photo.url: expected an http(s) URL`)
  }
  if (typeof m.photo.file !== 'string' || !PHOTO_FILE.test(m.photo.file) || m.photo.file.includes('..')) {
    errors.push(`${where}.photo.file: expected a plain file name, got ${JSON.stringify(m.photo.file)}`)
  }
}

/**
 * Every problem with the payload's shape, as readable lines. Empty means valid.
 * @param {unknown} p
 * @returns {string[]}
 */
export function validatePayload(p) {
  const errors = []
  if (!isObject(p)) return ['payload: expected a JSON object']
  if (typeof p.version !== 'string' || p.version === '') errors.push('version: expected a non-empty string')
  if (typeof p.generatedAt !== 'string') errors.push('generatedAt: expected a string')

  if (!isObject(p.classes)) {
    errors.push('classes: expected an object of section key -> members')
  } else {
    for (const [key, list] of Object.entries(p.classes)) {
      if (!CLASS_KEY.test(key)) errors.push(`classes.${key}: section keys must be lowercase (a-z, 0-9, - or _)`)
      if (key === 'eboard') errors.push('classes.eboard: "eboard" is reserved for the eboard section')
      if (!Array.isArray(list)) {
        errors.push(`classes.${key}: expected an array`)
        continue
      }
      list.forEach((m, i) => checkMember(m, `classes.${key}[${i}]`, errors))
    }
  }

  if (!Array.isArray(p.eboard)) errors.push('eboard: expected an array')
  else p.eboard.forEach((m, i) => checkMember(m, `eboard[${i}]`, errors))

  if (!isObject(p.cards)) errors.push('cards: expected an object of email -> hash')
  else {
    for (const [k, v] of Object.entries(p.cards)) {
      if (typeof v !== 'string') errors.push(`cards[${JSON.stringify(k)}]: expected a string hash`)
    }
  }
  return errors
}

/** The identity of a card: its email (the join key), else its name. */
function cardKey(m) {
  const email = (m.email ?? '').trim().toLowerCase()
  return email || `name:${(m.name ?? '').trim().toLowerCase()}`
}

/**
 * Distinct listed cards across the class sections (the eboard section repeats people who are
 * already in a class, so it doesn't count).
 * @param {{ classes: Record<string, Array<{ email: string, name: string }>> }} payload
 */
export function countListedCards(payload) {
  const seen = new Set()
  for (const list of Object.values(payload.classes)) for (const m of list) seen.add(cardKey(m))
  return seen.size
}

/**
 * Parse `MIN_MEMBERS` from the environment. Unset or blank -> the default. Anything that isn't a
 * non-negative integer throws, so a typo can't silently disable the floor.
 * @param {string | undefined} raw
 */
export function parseMinMembers(raw) {
  if (raw === undefined || raw.trim() === '') return DEFAULT_MIN_MEMBERS
  const n = Number(raw)
  if (!Number.isInteger(n) || n < 0) throw new Error(`MIN_MEMBERS must be a non-negative integer, got "${raw}"`)
  return n
}

/**
 * The floor check (spec D12). Returns an error message, or null when the payload clears it.
 * @param {{ classes: Record<string, unknown[]> }} payload
 * @param {number} min
 */
export function checkFloor(payload, min) {
  const n = countListedCards(payload)
  if (n >= min) return null
  return (
    `the members endpoint listed ${n} card${n === 1 ? '' : 's'}, below the floor of ${min}. ` +
    `Refusing to publish a Members page that small. If the club really shrank, lower ` +
    `DEFAULT_MIN_MEMBERS in scripts/lib/members-build.mjs (MIN_MEMBERS overrides it for local testing).`
  )
}

/**
 * Every distinct headshot the payload references, by file name.
 * @returns {Map<string, string>} file -> signed url
 */
export function photosToDownload(payload) {
  const out = new Map()
  const all = [...payload.eboard, ...Object.values(payload.classes).flat()]
  for (const m of all) if (m.photo && !out.has(m.photo.file)) out.set(m.photo.file, m.photo.url)
  return out
}

/**
 * Payload -> the site's `MembersData` (`{ eboard: Member[], <classKey>: Member[] … }`).
 * `photo` becomes the repo path of the downloaded file, or "" when there is none or its download
 * failed (`failedPhotos`); the card's `<Img>` shows its placeholder for "".
 * @param {any} payload
 * @param {Set<string>} [failedPhotos] file names that didn't download
 */
export function toMembersData(payload, failedPhotos = new Set()) {
  const toMember = (m) => ({
    name: m.name,
    major: m.major,
    photo: m.photo && !failedPhotos.has(m.photo.file) ? `${DB_HEADSHOT_DIR}/${m.photo.file}` : '',
    hometown: m.hometown,
    linkedin: m.linkedin,
    email: m.email,
    description: m.description,
    role: m.role,
  })
  const data = { eboard: payload.eboard.map(toMember) }
  for (const [key, list] of Object.entries(payload.classes)) data[key] = list.map(toMember)
  return data
}

/** The file KTP Manager reads to show "Live on ktpcornell.com" (spec D11, D14). */
export function versionFile(payload) {
  return { version: payload.version, cards: payload.cards }
}

/** What file mode publishes: no version to match, so the manager never reports "live". */
export const FILE_MODE_VERSION = { version: 'file', cards: {} }

/**
 * Which source to build from.
 * @param {Record<string, string | undefined>} env
 * @returns {{ mode: 'endpoint' } | { mode: 'file' } | { mode: 'error', message: string }}
 */
export function chooseSource(env) {
  const endpoint = (env.MEMBERS_ENDPOINT ?? '').trim()
  if (env.MEMBERS_SOURCE === 'file') return { mode: 'file' }
  if (endpoint) {
    if (!(env.MEMBERS_TOKEN ?? '').trim()) {
      return { mode: 'error', message: 'MEMBERS_TOKEN is required when MEMBERS_ENDPOINT is set.' }
    }
    return { mode: 'endpoint' }
  }
  if (env.CI) {
    return {
      mode: 'error',
      message:
        'MEMBERS_ENDPOINT is required in CI (set the MEMBERS_ENDPOINT Actions variable and the ' +
        'MEMBERS_TOKEN secret). Set MEMBERS_SOURCE=file to build from data/members.json instead.',
    }
  }
  return { mode: 'file' }
}

/**
 * Derived copies (`images-derived/headshots/db/<stem>-<ext>-<width>.webp`) that belong to no
 * kept headshot, so a removed or replaced photo leaves the published site.
 * @param {string[]} derivedNames file names in images-derived/headshots/db
 * @param {string[]} keptFiles headshot file names still referenced
 */
export function orphanDerived(derivedNames, keptFiles) {
  const bases = new Set(
    keptFiles.map((f) => {
      const dot = f.lastIndexOf('.')
      return dot <= 0 ? f : `${f.slice(0, dot)}-${f.slice(dot + 1).toLowerCase()}`
    }),
  )
  return derivedNames.filter((name) => {
    const m = /^(.*)-\d+\.webp(\.part)?$/.exec(name)
    if (!m) return false
    const base = m[1].replace(/~[0-9a-f]{8}$/, '')
    return !bases.has(base)
  })
}
