import { NavLink, useNavigate } from 'react-router-dom'
import { signOut } from '@/services/authService'

const links = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/announcements', label: 'Announcements' },
  { to: '/admin/alumni', label: 'Alumni' },
  { to: '/admin/users', label: 'Users' },
]

export function AdminSidebar() {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <aside
      className="flex flex-col"
      style={{
        background: 'var(--navbar-bg-color)',
        width: 220,
        minHeight: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10">
        <NavLink to="/" className="flex flex-col items-center no-underline">
          <img src="/navbarlogo.png" alt="KTP" style={{ height: 36 }} />
          <span className="text-white mt-1" style={{ fontSize: 11 }}>Admin Dashboard</span>
        </NavLink>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg mb-1 text-sm font-medium transition-all no-underline ${
                isActive
                  ? 'text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? { borderLeft: '3px solid var(--primary-color)', background: 'rgba(255,255,255,0.1)' }
                : { borderLeft: '3px solid transparent' }
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="px-4 py-6 border-t border-white/10 space-y-2">
        <NavLink to="/portal" className="flex px-4 py-2 text-sm text-white/70 hover:text-white no-underline">
          Member Portal
        </NavLink>
        <button
          onClick={handleSignOut}
          className="w-full text-left px-4 py-2 text-sm text-white/70 hover:text-white"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
