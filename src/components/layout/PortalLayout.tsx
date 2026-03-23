import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { signOut } from '@/services/authService'
import { Megaphone, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type NavLink = {
  to: string
  label: string
  end?: boolean
  icon?: LucideIcon
}

const NAV_LINKS: NavLink[] = [
  { to: '/portal', label: 'Announcements', end: true, icon: Megaphone },
  { to: '/portal/alumni', label: 'Alumni', icon: Users },
]

const NAV_LINK_BASE =
  'flex items-center gap-2.5 pr-4 py-2 pl-4 rounded-lg text-sm transition-colors no-underline'
const NAV_LINK_ACTIVE =
  'border-l-2 border-ktp-accent bg-ktp-surface text-ktp-primary font-medium !pl-[14px] cursor-default hover:bg-ktp-surface hover:text-ktp-primary'
const NAV_LINK_INACTIVE = 'text-ktp-muted hover:text-ktp-primary hover:bg-gray-100'

export function PortalLayout() {
  const navigate = useNavigate()


  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top nav */}
      <nav className="bg-ktp-primary sticky top-0 z-50 h-16 flex items-center">
        {/* Logo — same width as sidebar, centered */}
        <div className="hidden lg:flex w-56 shrink-0 h-full items-center justify-center border-r border-white/20">
          <Link to="/" className="no-underline">
            <img src="/logo.svg" alt="KTP" className="h-10" />
          </Link>
        </div>
        {/* Title + actions */}
        <div className="flex-1 flex items-center justify-between px-6">
          <span className="text-white/90 text-sm font-medium tracking-wide">
            Member Portal
          </span>
          <div className="flex items-center gap-5">
            <Link to="/" className="text-sm text-white hover:text-ktp-accent transition-colors no-underline">
              Public Site
            </Link>
            <button
              onClick={handleSignOut}
              className="text-sm text-white hover:text-ktp-accent transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              Sign Out
            </button>
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
                {link.icon && <link.icon size={15} className="shrink-0" />}
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
