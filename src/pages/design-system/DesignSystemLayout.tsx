import { Outlet, NavLink, Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'

const NAV_SECTIONS = [
  {
    label: null,
    links: [{ to: '/design-system', label: 'Introduction', end: true }],
  },
  {
    label: 'Styles',
    links: [
      { to: '/design-system/colors', label: 'Colors' },
      { to: '/design-system/layout', label: 'Layout' },
      { to: '/design-system/typography', label: 'Typography' },
    ],
  },
  {
    label: 'Components',
    links: [
      { to: '/design-system/components/buttons', label: 'Buttons' },
      { to: '/design-system/components/badges', label: 'Badges' },
      { to: '/design-system/components/cards', label: 'Cards' },
      { to: '/design-system/components/form-fields', label: 'Form Fields' },
      { to: '/design-system/components/alerts', label: 'Alerts' },
      { to: '/design-system/components/accordion', label: 'Accordion' },
      { to: '/design-system/components/tabs', label: 'Tabs' },
    ],
  },
  {
    label: 'Navigation',
    links: [
      { to: '/design-system/components/navbar', label: 'Navbar' },
    ],
  },
  {
    label: 'Page Sections',
    links: [
      { to: '/design-system/page-sections/section-title', label: 'Section Title' },
      { to: '/design-system/page-sections/section-separator', label: 'Section Separator' },
      { to: '/design-system/page-sections/footer', label: 'Footer' },
      { to: '/design-system/page-sections/hero', label: 'Hero' },
      { to: '/design-system/page-sections/cta', label: 'CTA' },
    ],
  },
]

const NAV_LINK_BASE =
  'block pr-4 py-2 pl-4 rounded-lg text-sm transition-colors no-underline'
const NAV_LINK_ACTIVE =
  'border-l-2 border-ktp-accent bg-ktp-surface text-ktp-primary font-medium !pl-[14px] cursor-default hover:bg-ktp-surface hover:text-ktp-primary'
const NAV_LINK_INACTIVE = 'text-ktp-muted hover:text-ktp-primary hover:bg-gray-100'

export function DesignSystemLayout() {
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
        {/* Title + back button */}
        <div className="flex-1 flex items-center justify-between px-6">
          <span className="text-white/90 text-sm font-medium tracking-wide">
            Design System
          </span>
          <Link to="/" className="text-sm text-white hover:text-ktp-accent transition-colors no-underline">
            ← Back to site
          </Link>
        </div>
      </nav>

      {/* Sidebar + content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto border-r border-gray-200 bg-gray-50/50">
          <nav className="flex flex-col py-4">
            {NAV_SECTIONS.map((section, i) => (
              <div key={i}>
                {i > 0 && <Separator className="my-2 mx-2 w-auto" />}
                <div className="px-2 flex flex-col gap-0.5">
                  {section.label && (
                    <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ktp-accent">
                      {section.label}
                    </p>
                  )}
                  <ul className="flex flex-col gap-0.5">
                    {section.links.map((link) => (
                      <li key={link.to}>
                        <NavLink
                          to={link.to}
                          end={'end' in link ? link.end : false}
                          className={({ isActive }) =>
                            `${NAV_LINK_BASE} ${isActive ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE}`
                          }
                        >
                          {link.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
