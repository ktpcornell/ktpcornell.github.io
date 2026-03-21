import type { Timestamp } from 'firebase/firestore'

export interface Announcement {
  id: string
  title: string
  body: string
  authorUid: string
  authorName: string
  pinned: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type AnnouncementFormData = Pick<Announcement, 'title' | 'body' | 'pinned'>
