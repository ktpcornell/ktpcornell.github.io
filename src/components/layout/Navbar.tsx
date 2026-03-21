import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/services/authService'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { currentUser, appUser } = useAuth()
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-5 py-3 text-sm font-medium transition-colors no-underline ${
      isActive ? 'text-ktp-cyan' : 'text-white hover:text-ktp-cyan'
    }`

  return (
    <nav className="bg-ktp-navy sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Brand */}
        <Link to="/" className="flex flex-col items-center no-underline" onClick={closeMenu}>
          <img src="/navbarlogo.png" alt="KTP Logo" className="h-10" />
          <span className="text-white text-xs">Alpha Epsilon Chapter</span>
        </Link>

        {/* Hamburger (mobile) */}
        <button
          ref={toggleRef}
          className="lg:hidden text-white p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav links */}
        <div
          id="main-nav"
          ref={menuRef}
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } lg:flex flex-col lg:flex-row absolute lg:static top-full left-0 right-0 bg-ktp-navy lg:bg-transparent z-50 lg:z-auto pb-4 lg:pb-0 transition-all`}
        >
          <ul className="flex flex-col lg:flex-row items-start lg:items-center list-none m-0 p-0 ms-auto">
            <li>
              <NavLink className={navLinkClass} to="/" end onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/about" onClick={closeMenu}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/members" onClick={closeMenu}>
                Members
              </NavLink>
            </li>
            <li>
              <a
                className="block px-5 py-3 text-sm font-medium text-white hover:text-ktp-cyan transition-colors no-underline"
                href="#contact-footer"
                onClick={closeMenu}
              >
                Contact Us
              </a>
            </li>
            {currentUser && (
              <li>
                <NavLink className={navLinkClass} to="/portal" onClick={closeMenu}>
                  Portal
                </NavLink>
              </li>
            )}
            {appUser?.isAdmin && (
              <li>
                <NavLink className={navLinkClass} to="/admin" onClick={closeMenu}>
                  Admin
                </NavLink>
              </li>
            )}
            {currentUser ? (
              <li>
                <button
                  className="block px-5 py-3 text-sm font-medium text-white hover:text-ktp-cyan transition-colors bg-transparent border-none cursor-pointer"
                  onClick={() => { handleSignOut(); closeMenu() }}
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <>
                <li>
                  <NavLink className={navLinkClass} to="/login" onClick={closeMenu}>
                    Member Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/join"
                    onClick={closeMenu}
                    className="inline-block mx-4 my-2 lg:my-0 px-5 py-2 rounded-full bg-ktp-cyan text-ktp-navy text-sm font-bold hover:bg-white transition-colors no-underline"
                  >
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
