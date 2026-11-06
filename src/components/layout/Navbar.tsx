import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LogIn, Menu, X } from 'lucide-react'
import { SIGN_IN_URL } from '@/config'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const closeMenu = () => setMenuOpen(false)
  const { pathname } = useLocation()
  // Live's Home link scrolls to the top even when you're already on Home; a same-route
  // <Link> click doesn't change the location, so ScrollToTop wouldn't fire.
  const goHome = () => {
    closeMenu()
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
    `block px-5 py-3 text-base font-medium transition-colors no-underline ${
      isActive ? 'text-ktp-accent' : 'text-white hover:text-ktp-accent'
    }`

  return (
    <nav className="bg-ktp-primary sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Brand */}
        {/* New logo, with the old navbar's "CORNELL CHAPTER" line under it (live: 12px, bold, uppercase) */}
        <Link to="/" className="flex flex-col items-center no-underline" onClick={goHome}>
          <img src="/logo.svg" alt="KTP Logo" className="h-12" />
          <span className="mt-1 text-white text-xs font-bold uppercase leading-none">
            Cornell Chapter
          </span>
        </Link>

        {/* Hamburger (mobile) */}
        {/* DS-SKIP: <button> — icon-only mobile nav toggle requiring ref forwarding and aria-controls; Button component does not expose these */}
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
          } lg:flex flex-col lg:flex-row absolute lg:static top-full left-0 right-0 bg-ktp-primary lg:bg-transparent z-50 lg:z-auto pb-4 lg:pb-0 transition-all`}
        >
          <ul className="flex flex-col lg:flex-row items-start lg:items-center list-none m-0 p-0 ms-auto">
            <li>
              <NavLink className={navLinkClass} to="/" end onClick={goHome}>
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
                className="block px-5 py-3 text-base font-medium text-white hover:text-ktp-accent transition-colors no-underline"
                href="#contact-footer"
                onClick={closeMenu}
              >
                Contact Us
              </a>
            </li>
            <li>
              <NavLink
                to="/join"
                onClick={closeMenu}
                className="inline-block mx-4 my-2 lg:my-0 px-5 py-2 rounded-full bg-ktp-accent text-ktp-primary text-sm font-bold hover:bg-white transition-colors no-underline"
              >
                Apply
              </NavLink>
            </li>
            {/* Member sign-in to KTP Manager. Outlined (not filled like Apply) so it reads as a
                different kind of action: for brothers, not applicants. */}
            {SIGN_IN_URL && (
              <li>
                <a
                  className="inline-flex items-center gap-2 mx-4 lg:ml-0 my-2 lg:my-0 px-5 py-1.5 rounded-full border-2 border-white text-white text-sm font-bold hover:bg-white hover:text-ktp-primary transition-colors no-underline"
                  href={SIGN_IN_URL}
                  onClick={closeMenu}
                >
                  <LogIn size={16} aria-hidden="true" />
                  Member Sign In
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
