import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  type QueryConstraint,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { AlumniEntry } from '@/types/alumni'

export function useAlumni(filterClass?: string) {
  const [alumni, setAlumni] = useState<AlumniEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const constraints: QueryConstraint[] = [orderBy('graduationYear', 'asc')]
    if (filterClass) {
      constraints.unshift(where('ktpClass', '==', filterClass))
    }

    const q = query(collection(db, 'alumni'), ...constraints)

    getDocs(q)
      .then((snapshot) => {
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as AlumniEntry[]
        setAlumni(data)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [filterClass])

  return { alumni, loading, error }
}
