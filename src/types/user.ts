import type { Timestamp } from 'firebase/firestore'

export interface AppUser {
  uid: string
  email: string
  displayName?: string
  isAdmin: boolean
  createdAt: Timestamp
}
