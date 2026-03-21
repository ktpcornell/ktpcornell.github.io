import { useAnnouncements } from '@/hooks/useAnnouncements'
import { AnnouncementCard } from './AnnouncementCard'

export function AnnouncementList() {
  const { announcements, loading, error } = useAnnouncements()

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-ktp-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load announcements: {error}
      </div>
    )
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-12" style={{ color: 'var(--p-color)' }}>
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
