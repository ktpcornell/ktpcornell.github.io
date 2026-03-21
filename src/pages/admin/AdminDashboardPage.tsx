import { useEffect, useState } from 'react'
import { collection, getCountFromServer } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

interface StatCard {
  label: string
  collection: string
  color: string
}

const STATS: StatCard[] = [
  { label: 'Announcements', collection: 'announcements', color: 'var(--navbar-bg-color)' },
  { label: 'Alumni Entries', collection: 'alumni', color: '#0d6efd' },
  { label: 'Registered Users', collection: 'users', color: 'var(--primary-color)' },
]

export function AdminDashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    STATS.forEach(async (s) => {
      const snap = await getCountFromServer(collection(db, s.collection))
      setCounts((prev) => ({ ...prev, [s.collection]: snap.data().count }))
    })
  }, [])

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-8" style={{ background: 'var(--section-bg-color)' }}>
        <h2 className="mb-2" style={{ color: 'var(--navbar-bg-color)' }}>Admin Dashboard</h2>
        <p className="mb-8">Manage your chapter content from here.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {STATS.map((s) => (
            <div key={s.collection} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-3" style={{ background: s.color }}>
                <p className="text-white text-sm font-medium mb-0">{s.label}</p>
              </div>
              <div className="px-6 py-5">
                <span className="text-4xl font-bold" style={{ color: s.color }}>
                  {counts[s.collection] ?? '—'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h5 className="mb-4" style={{ color: 'var(--navbar-bg-color)' }}>Quick Links</h5>
          <div className="flex flex-wrap gap-4">
            <a href="/admin/announcements" className="custom-btn">Manage Announcements</a>
            <a href="/admin/alumni" className="custom-btn">Manage Alumni</a>
            <a href="/admin/users" className="custom-btn">Manage Users</a>
          </div>
        </div>
      </div>
    </div>
  )
}
