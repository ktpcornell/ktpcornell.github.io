import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/services/authService'

export function PortalNavbar() {
  const { appUser } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const linkClass = (path: string) =>
    `text-sm font-medium no-underline transition-colors ${
      pathname === path ? 'text-ktp-cyan' : 'text-white hover:text-ktp-cyan'
    }`

  return (
    <nav className="bg-ktp-navy sticky top-0 z-50 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex flex-col items-center no-underline">
          <img src="/navbarlogo.png" alt="KTP" className="h-9" />
          <span className="text-white text-[11px] mt-0.5">Member Portal</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/portal" className={linkClass('/portal')}>
            Announcements
          </Link>
          <Link to="/portal/alumni" className={linkClass('/portal/alumni')}>
            Alumni
          </Link>
          <Link to="/" className="text-sm font-medium text-white hover:text-ktp-cyan no-underline transition-colors">
            Public Site
          </Link>
          {appUser?.isAdmin && (
            <Link to="/admin" className="text-sm font-medium text-ktp-cyan hover:text-white no-underline transition-colors">
              Admin
            </Link>
          )}
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-full text-sm font-bold bg-ktp-cyan text-ktp-navy hover:bg-white transition-colors border-none cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  )
}
