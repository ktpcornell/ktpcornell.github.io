import { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { AppUser } from '@/types/user'
import { useAuth } from '@/hooks/useAuth'
import { Spinner } from '@/design-system/components/Spinner'
import { Switch } from '@/design-system/components/Switch'
import {
  DataTable,
  DataTableHead,
  DataTableHeadCell,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableEmptyState,
} from '@/design-system/components/DataTable'

export function UserTable() {
  const { currentUser } = useAuth()
  const [users, setUsers] = useState<AppUser[]>([])
  const [loading, setLoading] = useState(true)

  const loadUsers = async () => {
    const snap = await getDocs(collection(db, 'users'))
    setUsers(snap.docs.map((d) => d.data() as AppUser))
    setLoading(false)
  }

  useEffect(() => {
    loadUsers()
  }, [])

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
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    )
  }

  return (
    <DataTable>
      <DataTableHead>
        <tr>
          <DataTableHeadCell>Email</DataTableHeadCell>
          <DataTableHeadCell>UID</DataTableHeadCell>
          <DataTableHeadCell align="center">Admin</DataTableHeadCell>
        </tr>
      </DataTableHead>
      <DataTableBody>
        {users.length === 0 && <DataTableEmptyState colSpan={3} message="No users found." />}
        {users.map((user, i) => (
          <DataTableRow key={user.uid} index={i}>
            <DataTableCell>{user.email}</DataTableCell>
            <DataTableCell variant="mono">{user.uid.slice(0, 16)}…</DataTableCell>
            <DataTableCell className="text-center">
              <Switch
                checked={user.isAdmin}
                onCheckedChange={() => toggleAdmin(user.uid, user.isAdmin)}
                disabled={user.uid === currentUser?.uid}
                aria-label={`Toggle admin for ${user.email}`}
              />
            </DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </DataTable>
  )
}
