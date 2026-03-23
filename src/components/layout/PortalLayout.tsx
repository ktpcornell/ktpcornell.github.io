import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { signOut } from '@/services/authService'
import { useAuth } from '@/hooks/useAuth'

const NAV_LINKS = [
  { to: '/portal', label: 'Announcements', end: true },
  { to: '/portal/alumni', label: 'Alumni' },
]

const NAV_LINK_BASE =
  'block pr-4 py-2 pl-4 rounded-lg text-sm transition-colors no-underline'
const NAV_LINK_ACTIVE =
  'border-l-2 border-ktp-accent bg-ktp-surface text-ktp-primary font-medium !pl-[14px] cursor-default hover:bg-ktp-surface hover:text-ktp-primary'
const NAV_LINK_INACTIVE = 'text-ktp-muted hover:text-ktp-primary hover:bg-gray-100'

export function PortalLayout() {
  const navigate = useNavigate()
  const { appUser } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top nav */}
      <nav className="bg-ktp-primary sticky top-0 z-50 h-16 flex items-center">
        {/* Logo — same width as sidebar, centered */}
        <div className="hidden lg:flex w-56 shrink-0 h-full flex-col items-center justify-center border-r border-white/20">
          <Link to="/" className="no-underline flex flex-col items-center gap-0.5">
            <img src="/logo.svg" alt="KTP" className="h-10" />
            <span className="text-white/60 text-[11px]">Member Portal</span>
          </Link>
        </div>
        {/* Title + actions */}
        <div className="flex-1 flex items-center justify-between px-6">
          <span className="text-white/90 text-sm font-medium tracking-wide">
            Member Portal
          </span>
          <div className="flex items-center gap-1">
            {appUser?.isAdmin && (
              <>
                <Button variant="ghost" size="sm" asChild className="text-white/70 hover:text-white hover:bg-white/10">
                  <Link to="/admin">Admin Dashboard</Link>
                </Button>
                <Separator orientation="vertical" className="h-4 bg-white/20 mx-1" />
              </>
            )}
            <Button variant="ghost" size="sm" asChild className="text-white/70 hover:text-white hover:bg-white/10">
              <Link to="/">← Public Site</Link>
            </Button>
            <Separator orientation="vertical" className="h-4 bg-white/20 mx-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Sidebar + content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto border-r border-gray-200 bg-gray-50/50">
          <nav className="flex flex-col py-4 px-2 gap-0.5">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `${NAV_LINK_BASE} ${isActive ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Page content */}
        <main className="flex-1 min-w-0 bg-ktp-surface">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
