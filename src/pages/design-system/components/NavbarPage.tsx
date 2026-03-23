import { Menu, X, Megaphone, Users, LayoutDashboard, UserCog } from 'lucide-react'
import { Caption } from '@/design-system/components/Typography'

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-6 md:p-12 flex flex-col gap-6 border-b border-gray-100 last:border-0">
      {children}
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Caption>{children}</Caption>
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
      {children}
    </code>
  )
}

/** Static mockup of the desktop navbar */
function DesktopNavPreview({ authState }: { authState: 'guest' | 'member' | 'admin' }) {
  const linkClass = 'px-5 py-3 text-base font-medium text-white hover:text-ktp-accent transition-colors no-underline cursor-default'
  const activeClass = 'px-5 py-3 text-base font-medium text-ktp-accent transition-colors no-underline cursor-default'

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <nav className="bg-ktp-primary">
        <div className="px-4 flex items-center justify-between py-5">
          {/* Brand */}
          <div className="flex flex-col items-center">
            <img src="/logo.svg" alt="KTP Logo" className="h-14" />
          </div>

          {/* Nav links */}
          <ul className="flex flex-row items-center list-none m-0 p-0 ms-auto gap-0">
            <li><span className={activeClass}>Home</span></li>
            <li><span className={linkClass}>About Us</span></li>
            <li><span className={linkClass}>Members</span></li>
            <li><span className={linkClass}>Contact Us</span></li>
            {(authState === 'member' || authState === 'admin') && (
              <li><span className={linkClass}>Portal</span></li>
            )}
            {authState === 'admin' && (
              <li><span className={linkClass}>Admin</span></li>
            )}
            {authState === 'guest' ? (
              <>
                <li><span className={linkClass}>Member Login</span></li>
                <li>
                  <span className="inline-block mx-4 px-5 py-2 rounded-full bg-ktp-accent text-ktp-primary text-sm font-bold cursor-default">
                    Apply
                  </span>
                </li>
              </>
            ) : (
              <li>
                <button className="block px-5 py-3 text-base font-medium text-white hover:text-ktp-accent transition-colors bg-transparent border-none cursor-pointer">
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

/** Static mockup of the mobile navbar */
function MobileNavPreview({ menuOpen }: { menuOpen: boolean }) {
  const linkClass = 'block px-5 py-3 text-base font-medium text-white hover:text-ktp-accent transition-colors no-underline cursor-default'

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm max-w-sm">
      <nav className="bg-ktp-primary relative">
        <div className="px-4 flex items-center justify-between py-5">
          {/* Brand */}
          <div className="flex flex-col items-center">
            <img src="/logo.svg" alt="KTP Logo" className="h-14" />
          </div>

          {/* Hamburger */}
          <button className="text-white p-2 bg-transparent border-none cursor-pointer">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="flex flex-col bg-ktp-primary pb-4">
            <ul className="flex flex-col items-start list-none m-0 p-0">
              <li><span className={linkClass}>Home</span></li>
              <li><span className={linkClass}>About Us</span></li>
              <li><span className={linkClass}>Members</span></li>
              <li><span className={linkClass}>Contact Us</span></li>
              <li><span className={linkClass}>Member Login</span></li>
              <li>
                <span className="inline-block mx-4 my-2 px-5 py-2 rounded-full bg-ktp-accent text-ktp-primary text-sm font-bold cursor-default">
                  Apply
                </span>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  )
}

/** Design System top bar mockup */
function DesignSystemNavPreview() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <nav className="bg-ktp-primary h-16 flex items-center">
        {/* Logo section — same width as sidebar */}
        <div className="w-56 shrink-0 h-full flex items-center justify-center border-r border-white/20">
          <img src="/logo.svg" alt="KTP" className="h-10" />
        </div>
        {/* Title + back link */}
        <div className="flex-1 flex items-center justify-between px-6">
          <span className="text-white/90 text-sm font-medium tracking-wide">Design System</span>
          <span className="text-sm text-white cursor-default">Public Site</span>
        </div>
      </nav>
      {/* Sidebar hint */}
      <div className="flex">
        <div className="w-56 shrink-0 border-r border-gray-200 bg-gray-50/50 flex flex-col py-4 px-2 gap-0.5">
          <span className="text-xs text-ktp-accent font-semibold uppercase tracking-widest px-4 py-1.5">Styles</span>
          <span className="text-xs text-ktp-primary font-medium px-4 py-2 rounded-lg bg-ktp-surface border-l-2 border-ktp-accent !pl-[14px]">Colors</span>
          <span className="text-xs text-ktp-muted px-4 py-2">Typography</span>
        </div>
        <div className="flex-1 bg-ktp-surface flex items-center px-8">
          <span className="text-xs text-ktp-muted italic">page content</span>
        </div>
      </div>
    </div>
  )
}

/** Portal layout mockup */
function PortalNavPreview({ isAdmin }: { isAdmin?: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      {/* Top bar */}
      <nav className="bg-ktp-primary h-16 flex items-center">
        <div className="w-56 shrink-0 h-full flex items-center justify-center border-r border-white/20">
          <img src="/logo.svg" alt="KTP" className="h-10" />
        </div>
        <div className="flex-1 flex items-center justify-between px-6">
          <span className="text-white/90 text-sm font-medium tracking-wide">Member Portal</span>
          <div className="flex items-center gap-5 text-sm">
            {isAdmin && <span className="text-white cursor-default">Admin Dashboard</span>}
            <span className="text-white cursor-default">Public Site</span>
            <span className="text-white cursor-default">Sign Out</span>
          </div>
        </div>
      </nav>
      {/* Sidebar hint */}
      <div className="flex">
        <div className="w-56 shrink-0 border-r border-gray-200 bg-gray-50/50 flex flex-col py-4 px-2 gap-0.5">
          <span className="flex items-center gap-2.5 text-xs text-ktp-primary font-medium px-4 py-2 rounded-lg bg-ktp-surface border-l-2 border-ktp-accent !pl-[14px]">
            <Megaphone size={13} />Announcements
          </span>
          <span className="flex items-center gap-2.5 text-xs text-ktp-muted px-4 py-2">
            <Users size={13} />Alumni
          </span>
        </div>
        <div className="flex-1 bg-ktp-surface flex items-center px-8">
          <span className="text-xs text-ktp-muted italic">page content</span>
        </div>
      </div>
    </div>
  )
}

/** Admin layout mockup */
function AdminNavPreview() {
  const links = [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'Announcements', icon: Megaphone },
    { label: 'Alumni', icon: Users },
    { label: 'Users', icon: UserCog },
  ]

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      {/* Top bar */}
      <nav className="bg-ktp-primary h-16 flex items-center">
        <div className="w-56 shrink-0 h-full flex items-center justify-center border-r border-white/20">
          <img src="/logo.svg" alt="KTP" className="h-10" />
        </div>
        <div className="flex-1 flex items-center justify-between px-6">
          <span className="text-white/90 text-sm font-medium tracking-wide">Admin Portal</span>
          <div className="flex items-center gap-5 text-sm">
            <span className="text-white cursor-default">Public Site</span>
            <span className="text-white cursor-default">Sign Out</span>
          </div>
        </div>
      </nav>
      {/* Sidebar hint */}
      <div className="flex">
        <div className="w-56 shrink-0 border-r border-gray-200 bg-gray-50/50 flex flex-col py-4 px-2 gap-0.5">
          {links.map(({ label, icon: Icon }, i) => (
            <span
              key={label}
              className={`flex items-center gap-2.5 text-xs px-4 py-2 rounded-lg cursor-default ${
                i === 0
                  ? 'text-ktp-primary font-medium bg-ktp-surface border-l-2 border-ktp-accent !pl-[14px]'
                  : 'text-ktp-muted'
              }`}
            >
              <Icon size={13} />{label}
            </span>
          ))}
        </div>
        <div className="flex-1 bg-ktp-surface flex items-center px-8">
          <span className="text-xs text-ktp-muted italic">page content</span>
        </div>
      </div>
    </div>
  )
}

export function NavbarPage() {
  return (
    <>
      {/* Header */}
      <section className="p-6 pt-12 md:p-12 border-b border-gray-200">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Navbar</h1>
        <p className="text-ktp-muted">
          KTP uses two distinct navigation patterns depending on context. The
          public-facing <Code>Navbar</Code> is tall and branded; internal tooling
          (Design System, Portal, Admin) uses compact, density-first chrome.
        </p>
      </section>

      {/* Two patterns */}
      <Section>
        <Label>Two navigation patterns</Label>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-ktp-muted">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-ktp-primary">Public Navbar — <Code>Navbar.tsx</Code></p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Used on <Code>/</Code>, <Code>/about</Code>, <Code>/members</Code>, <Code>/join</Code> via <Code>PageWrapper</Code></li>
              <li>Tall bar (<Code>py-5</Code>), large logo (<Code>h-14</Code>), <Code>text-base</Code> links</li>
              <li>Prioritizes brand presence and legibility for external visitors</li>
              <li>Responsive with hamburger menu below <Code>lg</Code></li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-ktp-primary">Internal tooling nav</p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li><strong>Design System</strong> — <Code>DesignSystemLayout.tsx</Code></li>
              <li><strong>Member Portal</strong> — <Code>PortalLayout.tsx</Code> — for non-admin members</li>
              <li><strong>Admin Portal</strong> — <Code>AdminLayout.tsx</Code> — admins land here on login; sidebar has more options</li>
              <li>All three share the same <Code>h-16</Code> top bar + <Code>w-56</Code> light sidebar pattern</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Public navbar heading */}
      <section className="px-6 pt-10 md:px-12 pb-2">
        <h2 className="text-ktp-primary tracking-normal normal-case text-xl">Public navbar</h2>
        <p className="text-ktp-muted text-sm mt-1">
          Used on all public-facing pages via <Code>PageWrapper</Code>. Tall, branded, and fully responsive.
        </p>
      </section>

      {/* Desktop */}
      <Section>
        <Label>Desktop (≥ lg / 1024px) — guest</Label>
        <DesktopNavPreview authState="guest" />
        <p className="text-sm text-ktp-muted leading-relaxed">
          On desktop the full link list is always visible. The brand mark sits on
          the left; navigation links flow right. Unauthenticated visitors see a
          plain-text <strong>Member Login</strong> link and a pill-shaped{' '}
          <strong>Apply</strong> CTA in <Code>bg-ktp-accent</Code>.
        </p>
      </Section>

      <Section>
        <Label>Desktop — member logged in</Label>
        <DesktopNavPreview authState="member" />
        <p className="text-sm text-ktp-muted leading-relaxed">
          When a user is authenticated, the Member Login and Apply links are replaced with a{' '}
          <strong>Portal</strong> link and a <strong>Sign Out</strong> button. For regular members
          Portal links to <Code>/portal</Code>; for admins it links directly to{' '}
          <Code>/admin</Code> (the Admin Portal). There is only one portal — admins simply have
          more options there.
        </p>
      </Section>

      {/* Mobile */}
      <Section>
        <Label>Mobile ({'<'} lg) — menu closed</Label>
        <MobileNavPreview menuOpen={false} />
        <p className="text-sm text-ktp-muted leading-relaxed">
          Below the <Code>lg</Code> breakpoint (1024 px) the link list is hidden
          and a hamburger icon (<Code>Menu</Code> from <Code>lucide-react</Code>)
          appears on the right side of the bar.
        </p>
      </Section>

      <Section>
        <Label>Mobile — menu open</Label>
        <MobileNavPreview menuOpen={true} />
        <p className="text-sm text-ktp-muted leading-relaxed">
          Tapping the hamburger toggles the menu open. The icon swaps to an{' '}
          <Code>X</Code> and the link list drops below the bar as a full-width
          vertical stack. Clicking any link or clicking outside the menu closes it.
        </p>
      </Section>

      {/* Internal tooling heading */}
      <section className="px-6 pt-10 md:px-12 pb-2">
        <h2 className="text-ktp-primary tracking-normal normal-case text-xl">Internal tooling nav</h2>
        <p className="text-ktp-muted text-sm mt-1">
          Compact chrome used across <Code>/design-system</Code>, <Code>/portal</Code>, and <Code>/admin</Code>.
          Density over branding — <Code>text-sm</Code>, tighter padding, no hamburger menu.
        </p>
      </section>

      <Section>
        <Label>Design System — top bar + sidebar (<Code>DesignSystemLayout.tsx</Code>)</Label>
        <DesignSystemNavPreview />
        <p className="text-sm text-ktp-muted leading-relaxed">
          A fixed <Code>h-16</Code> top bar with the logo centered in a <Code>w-56</Code> column that
          aligns exactly with the sidebar border. "Design System" label and a plain "Public Site"
          link sit in the remaining space. The sidebar is <Code>hidden</Code> below <Code>lg</Code>;
          on mobile only the top bar is shown.
        </p>
      </Section>

      <Section>
        <Label>Member Portal (<Code>PortalLayout.tsx</Code>)</Label>
        <PortalNavPreview />
        <p className="text-sm text-ktp-muted leading-relaxed">
          Same top bar + sidebar pattern as the Design System. Sidebar has Announcements and Alumni
          links, each with a lucide icon. Right section shows "Public Site" and Sign Out.
          This layout is for regular members only — admins are redirected to <Code>/admin</Code> on login.
        </p>
      </Section>

      <Section>
        <Label>Admin Portal (<Code>AdminLayout.tsx</Code>)</Label>
        <AdminNavPreview />
        <p className="text-sm text-ktp-muted leading-relaxed">
          Admins land here directly on login. Sidebar has Overview, Announcements, Alumni, and
          Users — each with a lucide icon. Right section shows "Public Site" and Sign Out.
          Active sidebar link uses the same <Code>border-l-ktp-accent</Code> +{' '}
          <Code>bg-ktp-surface</Code> treatment as the other layouts.
        </p>
      </Section>

      {/* Behavior */}
      <Section>
        <Label>Behavior &amp; implementation notes</Label>
        <ul className="flex flex-col gap-2 text-sm text-ktp-muted list-disc pl-5">
          <li>
            <strong>Sticky positioning</strong> — <Code>sticky top-0 z-50</Code> keeps the
            bar pinned while the page scrolls.
          </li>
          <li>
            <strong>Active link highlighting</strong> — <Code>NavLink</Code> injects{' '}
            <Code>text-ktp-accent</Code> on the active route. The Home link uses{' '}
            <Code>end</Code> so it only activates on <Code>/</Code> exactly.
          </li>
          <li>
            <strong>Contact Us</strong> is an anchor (<Code>href="#contact-footer"</Code>),
            not a route link, so it scrolls to the footer on the current page.
          </li>
          <li>
            <strong>Click-outside dismissal</strong> — a <Code>mousedown</Code> listener
            on <Code>document</Code> closes the mobile menu when the user taps
            outside both the menu (<Code>menuRef</Code>) and the toggle button (
            <Code>toggleRef</Code>).
          </li>
          <li>
            <strong>Accessibility</strong> — the hamburger button carries{' '}
            <Code>aria-label="Toggle navigation"</Code>,{' '}
            <Code>aria-expanded</Code> (bound to <Code>menuOpen</Code>), and{' '}
            <Code>aria-controls="main-nav"</Code>.
          </li>
        </ul>
      </Section>

      {/* Usage */}
      <Section>
        <Label>Usage</Label>
        <p className="text-sm text-ktp-muted leading-relaxed">
          You do not need to import <Code>Navbar</Code> directly. All public pages
          are wrapped with <Code>PageWrapper</Code>, which renders the navbar and
          footer automatically. If you need to add a new public page, wrap it:
        </p>
        <pre className="text-sm font-mono bg-ktp-surface rounded-xl p-4 text-ktp-primary overflow-x-auto whitespace-pre">
{`import { PageWrapper } from '@/components/layout/PageWrapper'

export function MyPage() {
  return (
    <PageWrapper>
      {/* page content */}
    </PageWrapper>
  )
}`}
        </pre>
      </Section>
    </>
  )
}
