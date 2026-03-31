import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { signOut } from '@/services/authService'
import { LayoutDashboard, Megaphone, Users, UserCog } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type NavLink = {
  to: string
  label: string
  end?: boolean
  icon?: LucideIcon
}

const NAV_LINKS: NavLink[] = [
  { to: '/admin', label: 'Overview', end: true, icon: LayoutDashboard },
  { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/admin/alumni', label: 'Alumni', icon: Users },
  { to: '/admin/users', label: 'Users', icon: UserCog },
]

const NAV_LINK_BASE =
  'flex items-center gap-2.5 pr-4 py-2 pl-4 rounded-lg text-sm transition-colors no-underline'
const NAV_LINK_ACTIVE =
  'border-l-2 border-ktp-accent bg-ktp-bg-surface text-ktp-primary font-medium !pl-[14px] cursor-default hover:bg-ktp-bg-surface hover:text-ktp-primary'
const NAV_LINK_INACTIVE = 'text-ktp-fg-body hover:text-ktp-primary hover:bg-ktp-bg-hover'

export function AdminLayout() {
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
        <div className="hidden lg:flex w-56 shrink-0 h-full items-center justify-center border-r border-ktp-border-dark">
          <Link to="/" className="no-underline">
            <img src="/logo.svg" alt="KTP" className="h-10" />
          </Link>
        </div>
        {/* Title + actions */}
        <div className="flex-1 flex items-center justify-between px-6">
          {/* DS-SKIP: text-white/90 — slight dimming for visual hierarchy on dark nav; requires --ktp-white-dim token to avoid opacity modifier */}
          <span className="text-white/90 text-sm font-medium tracking-wide">
            Admin Portal
          </span>
          <div className="flex items-center gap-5">
            <Link to="/" className="text-sm text-white hover:text-ktp-accent transition-colors no-underline">
              Public Site
            </Link>
            {/* DS-SKIP: <button> — transparent text-only sign-out on dark nav; Button component adds padding/border not suitable here */}
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
        <aside className="hidden lg:flex flex-col w-56 shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto border-r border-ktp-border bg-ktp-bg-panel">
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
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
