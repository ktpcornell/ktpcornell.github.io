import { useEffect, useState } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AnnouncementForm } from '@/components/admin/AnnouncementForm'
import { listAnnouncements, deleteAnnouncement } from '@/services/announcementsService'
import type { Announcement } from '@/types/announcement'

function formatDate(ts: { seconds: number } | null): string {
  if (!ts) return ''
  return new Date(ts.seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Announcement | undefined>()

  const load = () => {
    listAnnouncements()
      .then((data) => setAnnouncements(data as Announcement[]))
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return
    await deleteAnnouncement(id)
    load()
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-8" style={{ background: 'var(--section-bg-color)' }}>
        <div className="flex items-center justify-between mb-8">
          <h2 style={{ color: 'var(--navbar-bg-color)' }}>Announcements</h2>
          <button
            className="custom-btn"
            onClick={() => { setEditing(undefined); setShowForm(true) }}
          >
            + New Announcement
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-ktp-cyan border-t-transparent rounded-full animate-spin" />
          </div>
        ) : announcements.length === 0 ? (
          <p style={{ color: 'var(--p-color)' }}>No announcements yet.</p>
        ) : (
          <div className="space-y-4">
            {announcements.map((a) => (
              <div key={a.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 flex items-center justify-between" style={{ background: 'var(--navbar-bg-color)' }}>
                  <div className="flex items-center gap-3">
                    <h6 className="text-white mb-0">{a.title}</h6>
                    {a.pinned && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'var(--primary-color)', color: '#fff' }}>Pinned</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditing(a); setShowForm(true) }}
                      className="text-white text-sm px-3 py-1 rounded-lg border border-white/30 hover:bg-white/10"
                      style={{ background: 'none', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-white text-sm px-3 py-1 rounded-lg border border-red-400/50 hover:bg-red-500/20"
                      style={{ background: 'none', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <p className="mb-2 text-sm">{a.body.slice(0, 200)}{a.body.length > 200 ? '…' : ''}</p>
                  <p className="text-xs" style={{ color: 'var(--p-color)' }}>
                    By {a.authorName} · {formatDate(a.createdAt as unknown as { seconds: number })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <AnnouncementForm
          existing={editing}
          onClose={() => setShowForm(false)}
          onSaved={load}
        />
      )}
    </div>
  )
}
