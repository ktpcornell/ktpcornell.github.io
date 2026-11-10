import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { SIGN_IN_URL } from '@/config'

/**
 * Site navigation. On desktop (lg+) the links sit inline in the bar. Below lg they live behind a
 * hamburger, and opening it is a small show (ported from coursemap's TopBarMenu): the three bars
 * fold into an X, the menu opens as a circle growing out of the button, and the rows rise in one
 * after another. Closing reverses the circle. Under reduced motion it simply appears.
 */

const PANEL_MAX_W = 312
const GAP = 8
const EDGE = 16

type Pos = { top: number; right: number; width: number; ox: number; oy: number }

function prefersReducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

/** Radius that covers the whole panel from the button's centre. */
function reach(panel: HTMLElement, pos: Pos) {
  const dx = Math.max(pos.ox, panel.offsetWidth - pos.ox)
  const dy = Math.max(Math.abs(pos.oy), panel.offsetHeight - pos.oy)
  return Math.ceil(Math.hypot(dx, dy))
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  // Only drives how the hamburger looks while the circle shrinks; the logic reads closeTimer.
  const [closing, setClosing] = useState(false)
  const [pos, setPos] = useState<Pos | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)
  const played = useRef(false) // the opening show has run for this open
  const { pathname } = useLocation()

  // Where the panel goes: just under the bar (the logo makes the bar taller than the button),
  // right edge lined up with the button. The circle grows from the button's centre, measured in
  // the panel's own box, so its y is negative (the button sits above the panel).
  const measure = (): Pos | null => {
    if (!toggleRef.current || !navRef.current) return null
    const r = toggleRef.current.getBoundingClientRect()
    const top = navRef.current.getBoundingClientRect().bottom + GAP
    const right = Math.max(EDGE, window.innerWidth - r.right)
    const width = Math.min(PANEL_MAX_W, window.innerWidth - right - EDGE)
    const left = window.innerWidth - right - width
    return { top, right, width, ox: r.left + r.width / 2 - left, oy: r.top + r.height / 2 - top }
  }

  const openMenu = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = undefined
    played.current = false
    setClosing(false)
    setPos(measure())
    setOpen(true)
  }

  // Close for good, no animation: a link was followed, the page changed, or the circle finished.
  const closeNow = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = undefined
    setClosing(false)
    setOpen(false)
  }

  // Close by shrinking the circle back into the button. A timer (not the animation's finish
  // event) ends it, so the menu always goes away even if the animation is interrupted.
  const close = () => {
    const panel = panelRef.current
    if (closeTimer.current !== undefined || !panel || !pos || prefersReducedMotion() || !panel.animate) {
      closeNow()
      return
    }
    setClosing(true)
    const at = `at ${pos.ox}px ${pos.oy}px`
    panel.animate(
      [{ clipPath: `circle(${reach(panel, pos)}px ${at})` }, { clipPath: `circle(0px ${at})` }],
      { duration: 240, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' },
    )
    closeTimer.current = window.setTimeout(closeNow, 240)
  }

  // Live's Home link scrolls to the top even when you're already on Home; a same-route
  // <Link> click doesn't change the location, so ScrollToTop wouldn't fire.
  const goHome = () => {
    closeNow()
    if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // The opening show, once per open.
  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!open || !pos || !panel || played.current) return
    played.current = true
    if (prefersReducedMotion() || !panel.animate) return
    const at = `at ${pos.ox}px ${pos.oy}px`
    panel.animate(
      [{ clipPath: `circle(0px ${at})` }, { clipPath: `circle(${reach(panel, pos)}px ${at})` }],
      { duration: 520, easing: 'cubic-bezier(.16,1,.3,1)' },
    )
    panel.querySelectorAll<HTMLElement>('[data-menu-row]').forEach((row, i) => {
      row.animate(
        [
          { opacity: 0, transform: 'translateY(12px) scale(.97)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 340, delay: 90 + i * 26, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' },
      )
    })
  }, [open, pos])

  // Escape, a tap outside, or a resize closes it.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      close()
      toggleRef.current?.focus()
    }
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (panelRef.current?.contains(t) || toggleRef.current?.contains(t)) return
      close()
    }
    const onResize = () => closeNow()
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown, true)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown, true)
      window.removeEventListener('resize', onResize)
    }
  })

  // A new page never keeps an old menu open; and never leave a timer behind.
  useEffect(() => {
    closeNow()
  }, [pathname])
  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  const desktopLink = ({ isActive }: { isActive: boolean }) =>
    `block px-5 py-3 text-base font-medium transition-colors no-underline ${
      isActive ? 'text-ktp-accent' : 'text-white hover:text-ktp-accent'
    }`
  const mobileLink = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-2.5 text-base font-medium transition-colors no-underline hover:bg-white/10 ${
      isActive ? 'text-ktp-accent' : 'text-white'
    }`

  return (
    <nav ref={navRef} className="bg-ktp-primary sticky top-0 z-50">
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
          className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
            open && !closing ? 'border-white/40 bg-white/10' : 'border-white/15 hover:bg-white/10'
          }`}
          onClick={() => (open ? close() : openMenu())}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <Burger open={open && !closing} />
        </button>

        {/* Nav links (desktop) */}
        <ul className="hidden lg:flex flex-row items-center list-none m-0 p-0 ms-auto">
          <li>
            <NavLink className={desktopLink} to="/" end onClick={goHome}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={desktopLink} to="/about">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink className={desktopLink} to="/members">
              Members
            </NavLink>
          </li>
          <li>
            <a
              className="block px-5 py-3 text-base font-medium text-white hover:text-ktp-accent transition-colors no-underline"
              href="#contact-footer"
            >
              Contact Us
            </a>
          </li>
          <li>
            <NavLink
              to="/join"
              className="inline-block mx-4 px-5 py-2 rounded-full bg-ktp-accent text-ktp-primary text-sm font-bold hover:bg-white transition-colors no-underline"
            >
              Apply
            </NavLink>
          </li>
          {/* Member sign-in to KTP Manager. Outlined (not filled like Apply) so it reads as a
              different kind of action: for brothers, not applicants. transition-none: text and
              background swap on hover, and fading both makes the label blink out mid-fade. */}
          {SIGN_IN_URL && (
            <li>
              <a
                className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border-2 border-white text-white text-sm font-bold hover:bg-white hover:text-ktp-primary transition-none no-underline"
                href={SIGN_IN_URL}
              >
                <LogIn size={16} aria-hidden="true" />
                Member Sign In
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* Nav links (mobile): a floating panel under the hamburger */}
      {open && pos && (
        <div
          id="mobile-nav"
          ref={panelRef}
          style={{ position: 'fixed', top: pos.top, right: pos.right, width: pos.width }}
          className="lg:hidden z-50 flex max-h-[calc(100vh-6rem)] flex-col overflow-y-auto rounded-2xl border border-white/15 bg-ktp-primary p-2 shadow-2xl"
        >
          <ul className="flex flex-col list-none m-0 p-0">
            <li data-menu-row>
              <NavLink className={mobileLink} to="/" end onClick={goHome}>
                Home
              </NavLink>
            </li>
            <li data-menu-row>
              <NavLink className={mobileLink} to="/about" onClick={closeNow}>
                About Us
              </NavLink>
            </li>
            <li data-menu-row>
              <NavLink className={mobileLink} to="/members" onClick={closeNow}>
                Members
              </NavLink>
            </li>
            <li data-menu-row>
              <a
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-white transition-colors no-underline hover:bg-white/10"
                href="#contact-footer"
                onClick={closeNow}
              >
                Contact Us
              </a>
            </li>
          </ul>
          <div className="mt-1 flex flex-col gap-2 border-t border-white/15 px-1 pt-3 pb-1">
            <NavLink
              data-menu-row
              to="/join"
              onClick={closeNow}
              className="block w-full px-5 py-2.5 rounded-full bg-ktp-accent text-center text-ktp-primary text-sm font-bold hover:bg-white transition-colors no-underline"
            >
              Apply
            </NavLink>
            {SIGN_IN_URL && (
              <a
                data-menu-row
                className="flex w-full items-center justify-center gap-2 px-5 py-2 rounded-full border-2 border-white text-white text-sm font-bold hover:bg-white hover:text-ktp-primary transition-none no-underline"
                href={SIGN_IN_URL}
                onClick={closeNow}
              >
                <LogIn size={16} aria-hidden="true" />
                Member Sign In
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

/** Three bars that fold into an X. Whole-pixel geometry (2px bars at 0, 6 and 12px in a 14px box)
 *  so they render crisp on any display scale. */
function Burger({ open }: { open: boolean }) {
  const bar =
    'absolute left-0 h-[2px] w-5 rounded-full bg-white transition-[transform,opacity] duration-300 ease-[cubic-bezier(.16,1,.3,1)]'
  return (
    <span aria-hidden="true" className="relative block h-3.5 w-5">
      <span className={`${bar} top-0 ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
      <span className={`${bar} top-[6px] ${open ? 'scale-x-0 opacity-0' : ''}`} />
      <span className={`${bar} top-[12px] ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
    </span>
  )
}
