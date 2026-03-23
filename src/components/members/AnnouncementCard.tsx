import type { Announcement } from '@/types/announcement'
import { Card, CardHeader, CardBody } from '@/design-system/components/Card'
import { Badge } from '@/design-system/components/Badge'
import { Caption } from '@/design-system/components/Typography'

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
    <Card
      variant={announcement.pinned ? 'elevated' : 'default'}
      className={`mb-4 ${announcement.pinned ? 'border-l-4 border-l-ktp-cyan' : ''}`}
    >
      <CardHeader>
        <h5 className="text-white mb-0 font-semibold">{announcement.title}</h5>
        {announcement.pinned && <Badge variant="cyan">Pinned</Badge>}
      </CardHeader>
      <CardBody>
        <p className="mb-4 whitespace-pre-wrap">{announcement.body}</p>
        <div className="flex items-center justify-between">
          <Caption>Posted by {announcement.authorName}</Caption>
          <Caption>{formatDate(announcement.createdAt as unknown as { seconds: number })}</Caption>
        </div>
      </CardBody>
    </Card>
  )
}
