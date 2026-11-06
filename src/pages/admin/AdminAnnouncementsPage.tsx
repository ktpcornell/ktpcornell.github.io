import { useEffect, useState } from 'react'
import { AnnouncementForm } from '@/components/admin/AnnouncementForm'
import { listAnnouncements, deleteAnnouncement } from '@/services/announcementsService'
import type { Announcement } from '@/types/announcement'
import { Button } from '@/design-system/components/Button'
import { Badge } from '@/design-system/components/Badge'
import { Card, CardHeader, CardBody } from '@/design-system/components/Card'
import { Caption } from '@/design-system/components/Typography'
import { Spinner } from '@/design-system/components/Spinner'

function formatDate(ts: { seconds: number } | null): string {
  if (!ts) return ''
  return new Date(ts.seconds * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
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

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return
    await deleteAnnouncement(id)
    load()
  }

  return (
    <div className="p-8 bg-ktp-bg-surface min-h-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-ktp-primary">Announcements</h2>
          <Button
            variant="primary"
            onClick={() => {
              setEditing(undefined)
              setShowForm(true)
            }}
          >
            + New Announcement
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : announcements.length === 0 ? (
          <p className="text-ktp-fg-body">No announcements yet.</p>
        ) : (
          <div className="space-y-4">
            {announcements.map((a) => (
              <Card key={a.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <h6 className="text-white mb-0">{a.title}</h6>
                    {a.pinned && <Badge variant="cyan">Pinned</Badge>}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="transparent"
                      size="sm"
                      onClick={() => {
                        setEditing(a)
                        setShowForm(true)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(a.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="mb-2 text-sm">
                    {a.body.slice(0, 200)}
                    {a.body.length > 200 ? '…' : ''}
                  </p>
                  <Caption>
                    By {a.authorName} · {formatDate(a.createdAt as unknown as { seconds: number })}
                  </Caption>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

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
