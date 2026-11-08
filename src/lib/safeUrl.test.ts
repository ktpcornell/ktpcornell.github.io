import { describe, it, expect } from 'vitest'
import { safeHttpUrl } from './safeUrl'
import type { MembersData } from '@/types/member'

// Whichever member data exists: data/members.json (until cutover) and the build-written
// members.generated.json (after `npm run members:fetch`). Globbed, so a fresh clone without the
// generated file still runs the tests.
const memberFiles = import.meta.glob<MembersData>(
  ['../../data/members.json', '../data/members.generated.json'],
  { eager: true, import: 'default' },
)

describe('safeHttpUrl', () => {
  it('keeps http and https links', () => {
    expect(safeHttpUrl('https://www.linkedin.com/in/someone')).toBe('https://www.linkedin.com/in/someone')
    expect(safeHttpUrl('http://example.com/')).toBe('http://example.com/')
  })

  it('rejects script and other schemes', () => {
    expect(safeHttpUrl('javascript:alert(1)')).toBeNull()
    expect(safeHttpUrl(' JavaScript:alert(1)')).toBeNull()
    expect(safeHttpUrl('data:text/html,hi')).toBeNull()
    expect(safeHttpUrl('mailto:a@b.c')).toBeNull()
  })

  it('rejects empty and relative values', () => {
    expect(safeHttpUrl('')).toBeNull()
    expect(safeHttpUrl(undefined)).toBeNull()
    expect(safeHttpUrl('/in/someone')).toBeNull()
    expect(safeHttpUrl('not a url')).toBeNull()
  })

  it('treats a scheme-less host/path as https', () => {
    expect(safeHttpUrl('linkedin.com/in/someone')).toBe('https://linkedin.com/in/someone')
    expect(safeHttpUrl('www.linkedin.com/in/someone/')).toBe('https://www.linkedin.com/in/someone/')
  })

  it('accepts every LinkedIn link in the member data', () => {
    const bad = Object.values(memberFiles)
      .flatMap((data) => Object.values(data))
      .flat()
      .filter((m) => m && m.linkedin && !safeHttpUrl(m.linkedin))
      .map((m) => `${m!.name}: ${m!.linkedin}`)
    expect(bad).toEqual([])
  })
})
