import { useEffect, useState } from 'react'
import { collection, getCountFromServer } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from '@/design-system/components/Button'
import { Card, CardBody } from '@/design-system/components/Card'
import { SectionTitle } from '@/design-system/components/SectionTitle'

interface StatCard {
  label: string
  collection: string
  headerClass: string
  valueClass: string
}

const STATS: StatCard[] = [
  {
    label: 'Announcements',
    collection: 'announcements',
    headerClass: 'bg-ktp-primary',
    valueClass: 'text-ktp-primary',
  },
  {
    label: 'Alumni Entries',
    collection: 'alumni',
    headerClass: 'bg-ktp-accent',
    valueClass: 'text-ktp-primary',
  },
  {
    label: 'Registered Users',
    collection: 'users',
    headerClass: 'bg-gray-800',
    valueClass: 'text-gray-800',
  },
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
    <div className="p-8 bg-ktp-surface min-h-full">
        <SectionTitle title="Admin Dashboard" subtitle="Manage your chapter content from here." align="left" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {STATS.map((s) => (
            <Card key={s.collection}>
              <div className={`px-6 py-3 ${s.headerClass}`}>
                <p className="text-white text-sm font-medium mb-0">{s.label}</p>
              </div>
              <CardBody>
                <span className={`text-4xl font-bold ${s.valueClass}`}>
                  {counts[s.collection] ?? '—'}
                </span>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card>
          <CardBody>
            <h5 className="mb-4 text-ktp-primary">Quick Links</h5>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" asChild>
                <a href="/admin/announcements">Manage Announcements</a>
              </Button>
              <Button variant="primary" asChild>
                <a href="/admin/alumni">Manage Alumni</a>
              </Button>
              <Button variant="primary" asChild>
                <a href="/admin/users">Manage Users</a>
              </Button>
            </div>
          </CardBody>
        </Card>
    </div>
  )
}
