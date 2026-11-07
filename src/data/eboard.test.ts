import { describe, expect, it } from 'vitest'
import type { Member } from '@/types/member'
import { EBOARD_ORDER, eboardRank, sortEboard } from './eboard'

const m = (name: string, role?: string): Member => ({ name, role, major: '', photo: '', hometown: '' })
const names = (list: Member[]) => list.map((x) => x.name)

describe('eboard order (D9)', () => {
  it("matches today's live order", () => {
    expect(EBOARD_ORDER).toEqual([
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
    ])
  })

  it('sorts by position, whatever order the payload uses', () => {
    const shuffled = [m('C', 'VP Committees'), m('P', 'President'), m('F', 'VP Finance'), m('T', 'VP NME - Technical')]
    expect(names(sortEboard(shuffled))).toEqual(['P', 'T', 'F', 'C'])
  })

  it('sorts a two-position role by its best position, whatever the join order', () => {
    const list = [m('M', 'VP Marketing'), m('L', 'VP Finance / VP Committees')]
    expect(names(sortEboard(list))).toEqual(['L', 'M'])
    // KTP Manager joins positions A-Z, so the better-ranked one can come second.
    const az = [m('F', 'VP Finance'), m('X', 'VP Committees / VP External Affairs')]
    expect(names(sortEboard(az))).toEqual(['X', 'F'])
    expect(eboardRank('VP Committees / VP External Affairs')).toBe(EBOARD_ORDER.indexOf('VP External Affairs'))
  })

  it('puts unknown positions last, then by name', () => {
    const list = [m('Zed', 'VP Vibes'), m('Amy', 'Social Chair'), m('P', 'President'), m('Nobody')]
    expect(names(sortEboard(list))).toEqual(['P', 'Amy', 'Nobody', 'Zed'])
    expect(eboardRank('VP Vibes')).toBe(EBOARD_ORDER.length)
    expect(eboardRank(undefined)).toBe(EBOARD_ORDER.length)
  })

  it('breaks a tie between two holders of one position by name', () => {
    const list = [m('Will', 'VP Brotherhood'), m('Rohan', 'VP Brotherhood')]
    expect(names(sortEboard(list))).toEqual(['Rohan', 'Will'])
  })

  it('ignores case, extra spaces and en dashes', () => {
    expect(eboardRank('vp  nme – technical')).toBe(EBOARD_ORDER.indexOf('VP NME - Technical'))
  })

  it('does not mutate its input', () => {
    const list = [m('C', 'VP Committees'), m('P', 'President')]
    sortEboard(list)
    expect(names(list)).toEqual(['C', 'P'])
  })
})
