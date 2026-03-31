import { useAuth } from '@/hooks/useAuth'
import { AnnouncementList } from '@/components/members/AnnouncementList'
import { Heading } from '@/design-system/components/Typography'

export function PortalHomePage() {
  const { appUser } = useAuth()

  return (
    <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Heading level={2} className="text-ktp-primary">
              Welcome back{appUser?.displayName ? `, ${appUser.displayName.split(' ')[0]}` : ''}
            </Heading>
            <p>Here are the latest announcements from the chapter.</p>
          </div>

          <AnnouncementList />
        </div>
    </div>
  )
}
