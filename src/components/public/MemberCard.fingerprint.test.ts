/**
 * Drift guard for the member card (spec 2026-11-07-live-profiles-design.md, D10).
 *
 * KTP Manager shows brothers a live preview of their card, `src/app/(app)/profile/profile-preview.tsx`,
 * which is a hand-made copy of this site's card. Nothing links the two, so this test hashes what
 * the card looks like here (MemberCard.tsx, the card's rules in legacy.css, and the CSS variables
 * those rules use) and compares it to a recorded value. Any change to the card fails it, which is
 * the reminder to update the manager's copy. Run by the PR check (.github/workflows/check.yml),
 * not by the deploy, so a forgotten update can't block profile updates.
 *
 * Normalized before hashing: line endings, comments and whitespace, so a CRLF checkout or a
 * reformat-only change to unrelated rules doesn't trip it.
 */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const CARD_FINGERPRINT = 'fc8ed52ae05e750259e7589ac42fc8049a4606fc9511dee6f3889658b0845556'

/** The class names MemberCard renders that legacy.css styles. */
const CARD_CLASSES = [
  'member-card',
  'card-inner',
  'card-front',
  'card-back',
  'member-overlay',
  'member-name',
  'member-major',
  'card-bio',
]

const read = (rel: string) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

function normalize(css: string): string {
  return css
    .replace(/\r\n?/g, '\n')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};:,>+~])\s*/g, '$1')
    .trim()
}

interface Block {
  prelude: string
  /** Declarations for a style rule; nested blocks for an at-rule (@media, @supports). */
  body: string | Block[]
}

/** A tiny brace-matching CSS parser: enough for legacy.css (no strings containing braces). */
function parse(css: string): Block[] {
  const blocks: Block[] = []
  let i = 0
  while (i < css.length) {
    const open = css.indexOf('{', i)
    if (open === -1) break
    const prelude = css.slice(i, open).replace(/^[^{}]*;/, '').trim()
    let depth = 1
    let j = open + 1
    while (j < css.length && depth > 0) {
      if (css[j] === '{') depth++
      else if (css[j] === '}') depth--
      j++
    }
    const inner = css.slice(open + 1, j - 1)
    blocks.push({ prelude, body: prelude.startsWith('@') && inner.includes('{') ? parse(inner) : inner.trim() })
    i = j
  }
  return blocks
}

const mentionsCard = (selector: string) =>
  CARD_CLASSES.some((c) => new RegExp(`\\.${c}(?![\\w-])`).test(selector))

/** The card's rules, in file order, at-rules kept around the matching rules inside them. */
function cardRules(blocks: Block[]): string[] {
  const out: string[] = []
  for (const b of blocks) {
    if (Array.isArray(b.body)) {
      const inner = cardRules(b.body)
      if (inner.length) out.push(`${b.prelude}{${inner.join('')}}`)
    } else if (mentionsCard(b.prelude)) {
      out.push(`${b.prelude}{${b.body}}`)
    }
  }
  return out
}

/** Declarations of the custom properties the card's rules use (e.g. --ktp-card-back). */
function cardVariables(rules: string[], themeCss: string): string[] {
  const names = new Set([...rules.join('').matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]))
  const decls: string[] = []
  for (const name of [...names].sort()) {
    for (const m of themeCss.matchAll(new RegExp(`${name}:([^;}]*)`, 'g'))) decls.push(`${name}:${m[1]}`)
  }
  return decls
}

function fingerprintInput() {
  const card = read('./MemberCard.tsx').replace(/\r\n?/g, '\n')
  const rules = cardRules(parse(normalize(read('../../styles/legacy.css'))))
  const variables = cardVariables(rules, normalize(read('../../styles/globals.css')))
  return { card, rules, variables }
}

function fingerprint(): string {
  const { card, rules, variables } = fingerprintInput()
  return createHash('sha256')
    .update(['MemberCard.tsx', card, 'legacy.css', ...rules, 'variables', ...variables].join('\n'))
    .digest('hex')
}

describe('member card drift guard (D10)', () => {
  it('finds the card and its styles (the guard is guarding something)', () => {
    const { card, rules, variables } = fingerprintInput()
    for (const c of CARD_CLASSES) expect(card, `MemberCard.tsx no longer uses .${c}`).toContain(c)
    for (const c of CARD_CLASSES) {
      expect(rules.some((r) => r.includes(`.${c}`)), `no legacy.css rule for .${c}`).toBe(true)
    }
    expect(rules.some((r) => r.startsWith('@supports'))).toBe(true)
    expect(variables.some((v) => v.startsWith('--ktp-card-back:'))).toBe(true)
  })

  it('matches the recorded fingerprint', () => {
    const actual = fingerprint()
    if (actual !== CARD_FINGERPRINT) {
      throw new Error(
        "The member card changed. Update KTP Manager's src/app/(app)/profile/profile-preview.tsx to match, " +
          `then update CARD_FINGERPRINT in this test.\n  recorded: ${CARD_FINGERPRINT}\n  now:      ${actual}`,
      )
    }
  })
})
