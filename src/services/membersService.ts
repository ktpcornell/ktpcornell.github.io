import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Member, MembersData } from '@/types/member'

export async function fetchMembers(): Promise<MembersData> {
  const q = query(collection(db, 'members'), orderBy('ktpClass'), orderBy('order'))
  const snap = await getDocs(q)

  const grouped: MembersData = { eboard: [], alpha: [], beta: [], founders: [] }

  snap.docs.forEach((doc) => {
    const data = doc.data() as Member & { ktpClass: string; order: number }
    const cls = data.ktpClass as keyof MembersData
    if (!grouped[cls]) grouped[cls] = []
    grouped[cls]!.push({
      name: data.name,
      major: data.major,
      photo: data.photo,
      hometown: data.hometown,
      linkedin: data.linkedin,
      email: data.email,
      description: data.description,
      role: data.role,
    })
  })

  return grouped
}
