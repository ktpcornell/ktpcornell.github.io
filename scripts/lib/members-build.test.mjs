import { describe, expect, it } from 'vitest'
import {
  DEFAULT_MIN_MEMBERS,
  FILE_MODE_VERSION,
  checkFloor,
  chooseSource,
  countListedCards,
  orphanDerived,
  parseMinMembers,
  photosToDownload,
  toMembersData,
  validatePayload,
  versionFile,
} from './members-build.mjs'

function pm(name, extra = {}) {
  return {
    name,
    major: "Computer Science '28",
    hometown: 'Ithaca, NY',
    linkedin: `https://www.linkedin.com/in/${name.toLowerCase()}`,
    email: `${name.toLowerCase()}@cornell.edu`,
    description: `${name} likes KTP.`,
    role: '',
    photo: { url: `https://storage.example/${name}.jpg?token=x`, file: `ck${name}-1.jpg` },
    ...extra,
  }
}

function payload(overrides = {}) {
  return {
    version: 'v1',
    generatedAt: '2026-11-07T00:00:00.000Z',
    classes: { alpha: [pm('Ann'), pm('Bob')], gamma: [pm('Cy', { photo: null })] },
    eboard: [pm('Ann', { role: 'President' })],
    cards: { 'ann@cornell.edu': 'h1', 'bob@cornell.edu': 'h2', 'cy@cornell.edu': 'h3' },
    ...overrides,
  }
}

describe('validatePayload', () => {
  it('accepts the contract shape', () => {
    expect(validatePayload(payload())).toEqual([])
  })

  it('rejects non-objects and missing top-level fields', () => {
    expect(validatePayload(null)).toHaveLength(1)
    expect(validatePayload([])).toHaveLength(1)
    const errs = validatePayload({})
    expect(errs.join('\n')).toMatch(/version/)
    expect(errs.join('\n')).toMatch(/classes/)
    expect(errs.join('\n')).toMatch(/eboard/)
    expect(errs.join('\n')).toMatch(/cards/)
  })

  it('names the bad field of a bad member', () => {
    const p = payload({ classes: { alpha: [pm('Ann', { hometown: 3 })] } })
    expect(validatePayload(p)).toEqual(['classes.alpha[0].hometown: expected a string, got number'])
  })

  it('rejects photo file names that could escape the headshot folder', () => {
    for (const file of ['../x.jpg', 'a/b.jpg', 'a\\b.jpg', '', '.hidden', 'x..jpg']) {
      const p = payload({ eboard: [pm('Ann', { photo: { url: 'https://s/x', file } })] })
      expect(validatePayload(p).join('\n'), file).toMatch(/photo\.file/)
    }
  })

  it('rejects a non-http photo url, uppercase section keys and a class called eboard', () => {
    expect(validatePayload(payload({ eboard: [pm('A', { photo: { url: 'file:///etc/passwd', file: 'a.jpg' } })] })).join()).toMatch(
      /photo\.url/,
    )
    expect(validatePayload(payload({ classes: { Alpha: [] } })).join()).toMatch(/lowercase/)
    expect(validatePayload(payload({ classes: { eboard: [] } })).join()).toMatch(/reserved/)
  })
})

describe('the floor (D12)', () => {
  it('counts distinct cards across classes, by email, ignoring the eboard section', () => {
    const p = payload({ classes: { alpha: [pm('Ann'), pm('Bob')], founders: [pm('Ann')] } })
    expect(countListedCards(p)).toBe(2)
  })

  it('falls back to the name when a card has no email', () => {
    const p = payload({ classes: { alpha: [pm('Ann', { email: '' }), pm('Bob', { email: '' })] } })
    expect(countListedCards(p)).toBe(2)
  })

  it('fails below the floor and passes at it', () => {
    expect(checkFloor(payload(), 4)).toMatch(/listed 3 cards, below the floor of 4/)
    expect(checkFloor(payload(), 3)).toBeNull()
  })

  it('defaults to 40 and refuses a typo instead of disabling the check', () => {
    expect(DEFAULT_MIN_MEMBERS).toBe(40)
    expect(parseMinMembers(undefined)).toBe(40)
    expect(parseMinMembers(' ')).toBe(40)
    expect(parseMinMembers('1')).toBe(1)
    expect(() => parseMinMembers('forty')).toThrow(/MIN_MEMBERS/)
    expect(() => parseMinMembers('-1')).toThrow(/MIN_MEMBERS/)
  })
})

describe('toMembersData', () => {
  it('maps to the site shape, eboard first, with repo photo paths', () => {
    const data = toMembersData(payload())
    expect(Object.keys(data)).toEqual(['eboard', 'alpha', 'gamma'])
    expect(data.eboard[0]).toEqual({
      name: 'Ann',
      major: "Computer Science '28",
      photo: 'images/headshots/db/ckAnn-1.jpg',
      hometown: 'Ithaca, NY',
      linkedin: 'https://www.linkedin.com/in/ann',
      email: 'ann@cornell.edu',
      description: 'Ann likes KTP.',
      role: 'President',
    })
    expect(data.gamma[0].photo).toBe('')
  })

  it('blanks the photo of a failed download so the card shows its placeholder', () => {
    const data = toMembersData(payload(), new Set(['ckBob-1.jpg']))
    expect(data.alpha.map((m) => m.photo)).toEqual(['images/headshots/db/ckAnn-1.jpg', ''])
  })

  it('lists each headshot once, even when a member is in the eboard and a class', () => {
    expect([...photosToDownload(payload()).keys()]).toEqual(['ckAnn-1.jpg', 'ckBob-1.jpg'])
  })
})

describe('the version file', () => {
  it('carries the version and the card hashes, nothing else', () => {
    const p = payload()
    expect(versionFile(p)).toEqual({ version: 'v1', cards: p.cards })
    expect(FILE_MODE_VERSION).toEqual({ version: 'file', cards: {} })
  })
})

describe('chooseSource', () => {
  it('uses the endpoint when it and the token are set', () => {
    expect(chooseSource({ MEMBERS_ENDPOINT: 'https://m/api', MEMBERS_TOKEN: 't', CI: 'true' }).mode).toBe('endpoint')
  })

  it('needs a token with the endpoint', () => {
    expect(chooseSource({ MEMBERS_ENDPOINT: 'https://m/api' })).toMatchObject({ mode: 'error' })
  })

  it('fails in CI without an endpoint, unless MEMBERS_SOURCE=file', () => {
    expect(chooseSource({ CI: 'true' })).toMatchObject({ mode: 'error', message: expect.stringMatching(/required in CI/) })
    expect(chooseSource({ CI: 'true', MEMBERS_ENDPOINT: '' })).toMatchObject({ mode: 'error' })
    expect(chooseSource({ CI: 'true', MEMBERS_SOURCE: 'file' })).toEqual({ mode: 'file' })
  })

  it('falls back to the file locally, and MEMBERS_SOURCE=file wins over an endpoint', () => {
    expect(chooseSource({})).toEqual({ mode: 'file' })
    expect(chooseSource({ MEMBERS_SOURCE: 'file', MEMBERS_ENDPOINT: 'https://m/api', MEMBERS_TOKEN: 't' })).toEqual({
      mode: 'file',
    })
  })
})

describe('orphanDerived', () => {
  it('finds WebP copies whose headshot is gone, keeping the ones still used', () => {
    const names = ['a-1-jpg-400.webp', 'a-1-jpg-800.webp', 'old-2-jpg-400.webp', 'b-png-400.webp.part', 'notes.txt']
    expect(orphanDerived(names, ['a-1.jpg', 'b.PNG'])).toEqual(['old-2-jpg-400.webp'])
  })
})
