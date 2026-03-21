import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { AnnouncementFormData } from '@/types/announcement'

const COL = 'announcements'

export async function createAnnouncement(
  data: AnnouncementFormData,
  authorUid: string,
  authorName: string,
) {
  return addDoc(collection(db, COL), {
    ...data,
    authorUid,
    authorName,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateAnnouncement(id: string, data: Partial<AnnouncementFormData>) {
  return updateDoc(doc(db, COL, id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteAnnouncement(id: string) {
  return deleteDoc(doc(db, COL, id))
}

export async function listAnnouncements() {
  const q = query(
    collection(db, COL),
    orderBy('pinned', 'desc'),
    orderBy('createdAt', 'desc'),
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
