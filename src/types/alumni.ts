import type { Timestamp } from 'firebase/firestore'

export interface AlumniEntry {
  id: string
  name: string
  ktpClass: string
  graduationYear: number
  major: string
  currentCompany: string
  currentRole: string
  linkedin?: string
  email?: string
  notes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type AlumniFormData = Omit<AlumniEntry, 'id' | 'createdAt' | 'updatedAt'>
