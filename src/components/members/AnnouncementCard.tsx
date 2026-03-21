import type { Announcement } from '@/types/announcement'

interface AnnouncementCardProps {
  announcement: Announcement
}

function formatDate(ts: { seconds: number } | null): string {
  if (!ts) return ''
  return new Date(ts.seconds * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden mb-4 border"
      style={{ borderColor: announcement.pinned ? 'var(--primary-color)' : '#e5e7eb' }}
    >
      {/* Card header */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ background: 'var(--navbar-bg-color)' }}>
        <h5 className="text-white mb-0 font-semibold">{announcement.title}</h5>
        {announcement.pinned && (
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: 'var(--primary-color)', color: '#fff' }}
          >
            Pinned
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="px-6 py-5">
        <p className="mb-4 whitespace-pre-wrap">{announcement.body}</p>
        <div className="flex items-center justify-between text-sm" style={{ color: 'var(--p-color)' }}>
          <span>Posted by {announcement.authorName}</span>
          <span>{formatDate(announcement.createdAt as unknown as { seconds: number })}</span>
        </div>
      </div>
    </div>
  )
}
