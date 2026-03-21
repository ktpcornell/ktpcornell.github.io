import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/services/authService'
import { AnnouncementList } from '@/components/members/AnnouncementList'

export function PortalHomePage() {
  const { appUser } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--section-bg-color)' }}>
      {/* Portal navbar */}
      <nav style={{ background: 'var(--navbar-bg-color)' }} className="sticky top-0 z-50 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex flex-col items-center no-underline">
            <img src="/navbarlogo.png" alt="KTP" style={{ height: 36 }} />
            <span className="text-white" style={{ fontSize: 11 }}>Member Portal</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/portal" className="text-white font-medium hover:text-ktp-cyan transition-colors" style={{ fontSize: 15 }}>
              Announcements
            </Link>
            <Link to="/portal/alumni" className="text-white font-medium hover:text-ktp-cyan transition-colors" style={{ fontSize: 15 }}>
              Alumni
            </Link>
            <Link to="/" className="text-white font-medium hover:text-ktp-cyan transition-colors" style={{ fontSize: 15 }}>
              Public Site
            </Link>
            {appUser?.isAdmin && (
              <Link to="/admin" className="font-medium hover:text-ktp-cyan transition-colors" style={{ fontSize: 15, color: 'var(--primary-color)' }}>
                Admin
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-full text-sm font-bold transition-all"
              style={{ background: 'var(--primary-color)', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Welcome */}
          <div className="mb-8">
            <h2 style={{ color: 'var(--navbar-bg-color)' }}>
              Welcome back{appUser?.displayName ? `, ${appUser.displayName.split(' ')[0]}` : ''}
            </h2>
            <p>Here are the latest announcements from the chapter.</p>
          </div>

          <AnnouncementList />
        </div>
      </div>
    </div>
  )
}
