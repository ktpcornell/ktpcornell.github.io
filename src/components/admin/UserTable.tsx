import { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { AppUser } from '@/types/user'
import { useAuth } from '@/hooks/useAuth'

export function UserTable() {
  const { currentUser } = useAuth()
  const [users, setUsers] = useState<AppUser[]>([])
  const [loading, setLoading] = useState(true)

  const loadUsers = async () => {
    const snap = await getDocs(collection(db, 'users'))
    setUsers(snap.docs.map((d) => d.data() as AppUser))
    setLoading(false)
  }

  useEffect(() => { loadUsers() }, [])

  const toggleAdmin = async (uid: string, current: boolean) => {
    if (uid === currentUser?.uid) {
      alert('You cannot change your own admin status.')
      return
    }
    await updateDoc(doc(db, 'users', uid), { isAdmin: !current })
    setUsers((prev) =>
      prev.map((u) => (u.uid === uid ? { ...u, isAdmin: !current } : u)),
    )
  }

  if (loading) {
    return <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-ktp-cyan border-t-transparent rounded-full animate-spin" /></div>
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'var(--navbar-bg-color)' }}>
            <th className="text-white text-left px-4 py-3">Email</th>
            <th className="text-white text-left px-4 py-3">UID</th>
            <th className="text-white text-center px-4 py-3">Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.uid} style={{ background: i % 2 === 0 ? '#fff' : 'var(--section-bg-color)' }}>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--p-color)' }}>
                {user.uid.slice(0, 16)}…
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => toggleAdmin(user.uid, user.isAdmin)}
                  className="relative inline-flex items-center w-10 h-5 rounded-full transition-colors focus:outline-none"
                  style={{
                    background: user.isAdmin ? 'var(--primary-color)' : '#d1d5db',
                    cursor: user.uid === currentUser?.uid ? 'not-allowed' : 'pointer',
                  }}
                  title={user.uid === currentUser?.uid ? 'Cannot change own role' : undefined}
                >
                  <span
                    className="inline-block w-4 h-4 bg-white rounded-full shadow transition-transform"
                    style={{ transform: user.isAdmin ? 'translateX(20px)' : 'translateX(2px)' }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
