import { useAnnouncements } from '@/hooks/useAnnouncements'
import { AnnouncementCard } from './AnnouncementCard'
import { Spinner } from '@/design-system/components/Spinner'

export function AnnouncementList() {
  const { announcements, loading, error } = useAnnouncements()

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        Failed to load announcements: {error}
      </div>
    )
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-12 text-ktp-fg-body">
        <p className="text-lg">No announcements yet.</p>
        <p className="text-sm">Check back later for updates from the chapter.</p>
      </div>
    )
  }

  return (
    <div>
      {announcements.map((a) => (
        <AnnouncementCard key={a.id} announcement={a} />
      ))}
    </div>
  )
}
