import { describe, expect, it } from 'vitest'
import type { Member, MembersData } from '@/types/member'
import { CLASSES, groupMembers } from './classes'

function member(name: string, role = ''): Member {
  return {
    name,
    major: "Computer Science '28",
    photo: `images/headshots/${name}.jpg`,
    hometown: 'Ithaca, NY',
    linkedin: '',
    email: '',
    description: '',
    role,
  }
}

function data(overrides: Partial<MembersData> & Record<string, Member[] | undefined>): MembersData {
  return {
    eboard: [member('E')],
    gamma: [member('G')],
    beta: [member('B')],
    alpha: [member('A')],
    founders: [member('F')],
    ...overrides,
  } as MembersData
}

const keys = (d: MembersData) => groupMembers(d).map((g) => g.config.key)

describe('groupMembers', () => {
  it('returns classes in the configured order, whatever the JSON key order', () => {
    const shuffled = { founders: [member('F')], alpha: [member('A')], eboard: [member('E')], beta: [member('B')], gamma: [member('G')] }
    expect(keys(shuffled as MembersData)).toEqual(['eboard', 'gamma', 'beta', 'alpha', 'founders'])
  })

  it('carries the live labels, semesters and class photos', () => {
    const [eboard, gamma, beta, alpha, founders] = groupMembers(data({}))
    expect(eboard.config).toMatchObject({ label: 'Executive board', classPhoto: 'images/classpictures/Fall2025Eboard.JPEG' })
    expect(gamma.config).toMatchObject({ label: 'Gamma Class', semester: 'Spring 2026', classPhoto: 'images/classpictures/sp26gammaclass.JPG' })
    expect(beta.config).toMatchObject({ label: 'Beta Class', semester: 'Fall 2025' })
    expect(alpha.config).toMatchObject({ label: 'Alpha Class', semester: 'Spring 2025' })
    expect(founders.config.semester).toBeUndefined()
    expect(founders.config.classPhoto).toBeUndefined()
  })

  it('appends a class that is in the data but not the config, with a generic heading', () => {
    const groups = groupMembers(data({ delta: [member('D')] }))
    expect(groups.map((g) => g.config.key)).toEqual(['eboard', 'gamma', 'beta', 'alpha', 'founders', 'delta'])
    const delta = groups[groups.length - 1]
    expect(delta.config).toEqual({ key: 'delta', label: 'Delta Class' })
    expect(delta.members.map((m) => m.name)).toEqual(['D'])
  })

  it('skips a class that is empty or missing', () => {
    expect(keys(data({ gamma: [] }))).toEqual(['eboard', 'beta', 'alpha', 'founders'])
    expect(keys(data({ gamma: undefined, delta: [] }))).toEqual(['eboard', 'beta', 'alpha', 'founders'])
  })

  it('shows an eboard member in both the eboard and their own class', () => {
    const greg = member('Gregory Parent', 'President')
    const groups = groupMembers(data({ eboard: [greg], alpha: [greg, member('A')] }))
    const eboard = groups.find((g) => g.config.key === 'eboard')!
    const alpha = groups.find((g) => g.config.key === 'alpha')!
    expect(eboard.members).toContain(greg)
    expect(alpha.members).toContain(greg)
    expect(alpha.members).toHaveLength(2)
  })

  it('has every configured key in the real config exactly once', () => {
    const configKeys = CLASSES.map((c) => c.key)
    expect(new Set(configKeys).size).toBe(configKeys.length)
  })
})
