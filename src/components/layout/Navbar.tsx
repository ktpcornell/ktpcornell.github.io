import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/services/authService'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { currentUser, appUser } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="site-navbar">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex flex-col items-center no-underline" onClick={closeMenu}>
          <img src="/navbarlogo.png" alt="KTP Logo" style={{ height: 40 }} />
          <span className="text-white" style={{ fontSize: 12 }}>Alpha Epsilon Chapter</span>
        </Link>

        {/* Hamburger (mobile) */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <div className="navbar-toggler-bars" />
        </button>

        {/* Nav links */}
        <div
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } lg:flex flex-col lg:flex-row absolute lg:static top-full left-0 right-0 bg-ktp-navy lg:bg-transparent z-50 lg:z-auto pb-4 lg:pb-0`}
        >
          <ul className="flex flex-col lg:flex-row items-start lg:items-center list-none m-0 p-0 ms-auto">
            <li>
              <NavLink className="nav-link" to="/" end onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/about" onClick={closeMenu}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/members" onClick={closeMenu}>
                Members
              </NavLink>
            </li>
            <li>
              <a className="nav-link" href="#contact-footer" onClick={closeMenu}>
                Contact Us
              </a>
            </li>
            {currentUser && (
              <li>
                <NavLink className="nav-link" to="/portal" onClick={closeMenu}>
                  Portal
                </NavLink>
              </li>
            )}
            {appUser?.isAdmin && (
              <li>
                <NavLink className="nav-link" to="/admin" onClick={closeMenu}>
                  Admin
                </NavLink>
              </li>
            )}
            {currentUser ? (
              <li>
                <button
                  className="nav-link apply-btn"
                  onClick={() => { handleSignOut(); closeMenu() }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <>
                <li>
                  <NavLink className="nav-link" to="/login" onClick={closeMenu}>
                    Member Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link apply-btn" to="/join" onClick={closeMenu}>
                    Apply
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
