import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('keeps a heading size when a text color is added', () => {
    expect(cn('text-heading-1 font-bold', 'text-white')).toBe('text-heading-1 font-bold text-white')
  })

  it('still lets a later heading size replace an earlier one', () => {
    expect(cn('text-heading-1', 'text-heading-3')).toBe('text-heading-3')
  })

  it('still merges conflicting colors', () => {
    expect(cn('text-white', 'text-ktp-primary')).toBe('text-ktp-primary')
  })
})
