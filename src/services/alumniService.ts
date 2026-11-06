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
import type { AlumniEntry, AlumniFormData } from '@/types/alumni'

const COL = 'alumni'

export async function createAlumni(data: AlumniFormData) {
  return addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateAlumni(id: string, data: Partial<AlumniFormData>) {
  return updateDoc(doc(db, COL, id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteAlumni(id: string) {
  return deleteDoc(doc(db, COL, id))
}

export async function listAlumni() {
  const q = query(collection(db, COL), orderBy('graduationYear', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as AlumniEntry[]
}
