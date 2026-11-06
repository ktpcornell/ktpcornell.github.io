import { describe, it, expect } from 'vitest'
import { safeHttpUrl } from './safeUrl'
import { getMembers } from '@/data/members'

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
    expect(safeHttpUrl('linkedin.com/in/someone')).toBeNull()
  })

  it('accepts every LinkedIn link currently in members.json', () => {
    const bad = Object.values(getMembers())
      .flat()
      .filter((m) => m && m.linkedin && !safeHttpUrl(m.linkedin))
      .map((m) => `${m!.name}: ${m!.linkedin}`)
    expect(bad).toEqual([])
  })
})
