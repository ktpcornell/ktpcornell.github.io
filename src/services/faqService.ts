import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface FaqItem {
  question: string
  answer: string
}

export async function fetchFaq(): Promise<FaqItem[]> {
  const q = query(collection(db, 'faq'), orderBy('order'))
  const snap = await getDocs(q)
  return snap.docs.map((doc) => {
    const d = doc.data()
    return { question: d.question as string, answer: d.answer as string }
  })
}
