import { useAuth } from '@/hooks/useAuth'
import { AnnouncementList } from '@/components/members/AnnouncementList'

export function PortalHomePage() {
  const { appUser } = useAuth()

  return (
    <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-ktp-primary">
              Welcome back{appUser?.displayName ? `, ${appUser.displayName.split(' ')[0]}` : ''}
            </h2>
            <p>Here are the latest announcements from the chapter.</p>
          </div>

          <AnnouncementList />
        </div>
    </div>
  )
}
