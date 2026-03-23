import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/design-system/components/Button'
import { Badge } from '@/design-system/components/Badge'
import { Card, CardHeader, CardBody } from '@/design-system/components/Card'
import { FormField, SelectField } from '@/design-system/components/FormField'
import { SectionTitle } from '@/design-system/components/SectionTitle'
import { SectionSeparator } from '@/design-system/components/SectionSeparator'
import { AlertBanner } from '@/design-system/components/AlertBanner'
import { SmallTitle, Body, Caption } from '@/design-system/components/Typography'

// ---------------------------------------------------------------------------
// Color card component
// ---------------------------------------------------------------------------
function ColorCard({
  name,
  hex,
  tailwindClass,
  description,
}: {
  name: string
  hex: string
  tailwindClass: string
  description: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <article className="flex flex-col rounded-lg border border-gray-200 overflow-clip">
      <div className="h-32 w-full" style={{ backgroundColor: hex }} />
      <div className="flex flex-col gap-3 p-3 border-t border-gray-200">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <h6 className="text-ktp-primary mb-0 leading-tight">{name}</h6>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={`Copy ${name} color`}
              className="w-8 h-8 flex items-center justify-center rounded-md text-ktp-muted hover:text-ktp-primary hover:bg-gray-100 transition-colors shrink-0"
            >
              {copied
                ? <Check className="w-4 h-4 text-green-600" />
                : <Copy className="w-4 h-4" />
              }
            </button>
          </div>
          <p className="text-xs font-mono text-ktp-muted leading-tight">{hex}</p>
          <p className="text-xs font-mono text-ktp-muted/70 leading-tight">{tailwindClass}</p>
        </div>
        <p className="text-xs text-ktp-muted leading-snug">{description}</p>
      </div>
    </article>
  )
}

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------
function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="py-12">
      <h2 className="text-ktp-primary mb-2">{title}</h2>
      <SectionSeparator className="mb-8" />
      {children}
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <nav className="bg-ktp-primary sticky top-0 z-50 py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img src="/navbarlogo.png" alt="KTP" className="h-9" />
            <span className="text-white text-sm font-semibold">Design System</span>
          </Link>
          <Link to="/" className="text-white/70 hover:text-white text-sm no-underline">
            ← Back to site
          </Link>
        </div>
      </nav>

      {/* Sidebar + content */}
      <div className="container mx-auto px-4 py-12 flex gap-12">
        {/* Sidebar navigation */}
        <aside className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-20 space-y-1">
            <SmallTitle>Styles</SmallTitle>
            {['Colors', 'Typography'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-sm text-ktp-muted hover:text-ktp-primary no-underline py-1"
              >
                {item}
              </a>
            ))}
            <SmallTitle className="mt-4">Components</SmallTitle>
            {['Buttons', 'Badges', 'Cards', 'Form Fields', 'Alerts'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block text-sm text-ktp-muted hover:text-ktp-primary no-underline py-1"
              >
                {item}
              </a>
            ))}
            <SmallTitle className="mt-4">Page Sections</SmallTitle>
            {['Section Title'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="block text-sm text-ktp-muted hover:text-ktp-primary no-underline py-1"
              >
                {item}
              </a>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Intro */}
          <div className="mb-12">
            <SmallTitle>KTP Cornell</SmallTitle>
            <h1 className="text-ktp-primary mb-4">Design System</h1>
            <Body className="max-w-2xl">
              Centralized design language for the KTP Cornell website. All UI components,
              color tokens, and typography in one place. Import from{' '}
              <code className="text-sm bg-ktp-surface px-1.5 py-0.5 rounded font-mono text-ktp-primary">
                @/design-system
              </code>
              .
            </Body>
          </div>

          <SectionSeparator />

          {/* ---------------------------------------------------------------- */}
          <Section id="colors" title="Colors">
            <p className="text-ktp-muted mb-6">
              All color values are defined as CSS variables in{' '}
              <code className="font-mono text-sm bg-ktp-surface px-1 py-0.5 rounded">
                src/styles/globals.css
              </code>{' '}
              and exposed as Tailwind utilities (
              <code className="font-mono text-sm">bg-ktp-primary</code>,{' '}
              <code className="font-mono text-sm">text-ktp-muted</code>, etc.).
            </p>

            <h4 className="text-ktp-primary mb-4">Brand</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              <ColorCard name="Primary" hex="#273053" tailwindClass="bg-ktp-primary" description="Primary brand color. Used for headers, CTAs, nav background, and card headers." />
              <ColorCard name="Accent" hex="#0dcaf0" tailwindClass="bg-ktp-accent" description="Accent color. Used for highlights, secondary buttons, and focus rings." />
              <ColorCard name="Surface" hex="#f0f8ff" tailwindClass="bg-ktp-surface" description="Light blue page background for alternating sections and portal pages." />
              <ColorCard name="Muted" hex="#717275" tailwindClass="bg-ktp-muted" description="Body copy and secondary text across all pages." />
              <ColorCard name="Accent Pink" hex="#f78fb3" tailwindClass="bg-ktp-accent-pink" description="Accent for icon backgrounds and team highlights." />
              <ColorCard name="White" hex="#ffffff" tailwindClass="bg-white" description="Surfaces, card backgrounds, and text on dark backgrounds." />
            </div>

            <h4 className="text-ktp-primary mb-4">Status</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <ColorCard name="Error BG" hex="#fee2e2" tailwindClass="bg-ktp-error-bg" description="Background fill for error alert banners." />
              <ColorCard name="Error" hex="#991b1b" tailwindClass="bg-ktp-error" description="Error text and icon color inside alert banners." />
<ColorCard name="Danger" hex="#dc2626" tailwindClass="bg-ktp-danger" description="Destructive action buttons such as delete and remove." />
              <ColorCard name="Warning BG" hex="#fef3c7" tailwindClass="bg-ktp-warning-bg" description="Background fill for warning alert banners." />
              <ColorCard name="Warning Border" hex="#f59e0b" tailwindClass="bg-ktp-warning-border" description="Border accent on warning banners and indicators." />
              <ColorCard name="Warning Text" hex="#92400e" tailwindClass="bg-ktp-warning-text" description="Body text color inside warning alert banners." />
            </div>
          </Section>

          <SectionSeparator />

          {/* ---------------------------------------------------------------- */}
          <Section id="typography" title="Typography">
            <div className="space-y-6">
              <div>
                <Caption className="mb-1">h1 — 62px / bold / uppercase</Caption>
                <h1>Kappa Theta Pi</h1>
              </div>
              <div>
                <Caption className="mb-1">h2 — 48px / bold</Caption>
                <h2>Alpha Epsilon Chapter</h2>
              </div>
              <div>
                <Caption className="mb-1">h3 — 36px / bold</Caption>
                <h3>Cornell University</h3>
              </div>
              <div>
                <Caption className="mb-1">h4 — 32px / bold</Caption>
                <h4>Spring 2026 Recruitment</h4>
              </div>
              <div>
                <Caption className="mb-1">h5 — 24px / bold</Caption>
                <h5>Member Portal</h5>
              </div>
              <div>
                <Caption className="mb-1">h6 — 22px / bold</Caption>
                <h6>Announcements</h6>
              </div>
              <div>
                <Caption className="mb-1">Body (p) — 18px / text-ktp-muted</Caption>
                <Body>
                  KTP was founded on January 10, 2012 at the University of Michigan, with
                  the mission to create a tech community that enthusiastic students could join.
                </Body>
              </div>
              <div>
                <Caption className="mb-1">SmallTitle — xs / tracking-widest / uppercase / cyan</Caption>
                <SmallTitle>About Us</SmallTitle>
              </div>
              <div>
                <Caption className="mb-1">Caption — xs / text-ktp-muted</Caption>
                <Caption>Posted by Gabriel · March 2026</Caption>
              </div>
            </div>
          </Section>

          <SectionSeparator />

          {/* ---------------------------------------------------------------- */}
          <Section id="buttons" title="Buttons">
            <div className="space-y-8">
              <div>
                <Caption className="mb-3">Primary — default CTA, replaces .custom-btn</Caption>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="lg">Large</Button>
                  <Button variant="primary">Default</Button>
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </div>
              <div>
                <Caption className="mb-3">Secondary — accent CTA (cyan)</Caption>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" size="lg">Large</Button>
                  <Button variant="secondary">Default</Button>
                  <Button variant="secondary" size="sm">Small</Button>
                </div>
              </div>
              <div>
                <Caption className="mb-3">Outline — replaces .custom-border-btn</Caption>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="lg">Large</Button>
                  <Button variant="outline">Default</Button>
                  <Button variant="outline" size="sm">Small</Button>
                </div>
              </div>
              <div>
                <Caption className="mb-3">Ghost — nav items and low-emphasis actions</Caption>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost">Default</Button>
                  <Button variant="ghost" size="sm">Small</Button>
                </div>
              </div>
              <div className="bg-ktp-primary rounded-xl p-6">
                <Caption className="mb-3 text-white/60">Transparent — for use over dark/image backgrounds</Caption>
                <div className="flex flex-wrap gap-3">
                  <Button variant="transparent" size="lg">Large</Button>
                  <Button variant="transparent">Default</Button>
                  <Button variant="transparent" size="sm">Small</Button>
                </div>
              </div>
              <div>
                <Caption className="mb-3">Danger — destructive actions</Caption>
                <div className="flex flex-wrap gap-3">
                  <Button variant="danger">Delete</Button>
                  <Button variant="danger" size="sm">Remove</Button>
                </div>
              </div>
              <div>
                <Caption className="mb-3">asChild — renders as a link anchor (use with Link or a)</Caption>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" asChild>
                    <Link to="/join">Apply Now</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://kappathetapi.org" target="_blank" rel="noopener noreferrer">
                      Nationals Site ↗
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Section>

          <SectionSeparator />

          {/* ---------------------------------------------------------------- */}
          <Section id="badges" title="Badges">
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="navy">Navy</Badge>
              <Badge variant="cyan">Cyan</Badge>
              <Badge variant="pink">Pink</Badge>
              <Badge variant="gray">Gray</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
            <Caption className="mt-4">
              Use badges for: class labels (Beta Class), roles (E-Board), status (Pinned), team affiliations.
            </Caption>
          </Section>

          <SectionSeparator />

          {/* ---------------------------------------------------------------- */}
          <Section id="cards" title="Cards">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="default">
                <CardHeader>
                  <h6 className="text-white mb-0">Card Header</h6>
                  <Badge variant="cyan">Pinned</Badge>
                </CardHeader>
                <CardBody>
                  <p className="mb-2">Default card with navy header bar. Used for announcements and alumni entries.</p>
                  <Caption>Posted by Gabriel · March 2026</Caption>
                </CardBody>
              </Card>
              <Card variant="flat">
                <CardBody>
                  <h5 className="text-ktp-primary mb-2">Flat Card</h5>
                  <Body>No shadow, just a border. Good for grid layouts with lots of cards.</Body>
                </CardBody>
              </Card>
              <Card variant="elevated">
                <CardBody>
                  <h5 className="text-ktp-primary mb-2">Elevated Card</h5>
                  <Body>Stronger shadow. Use for featured or highlighted content.</Body>
                </CardBody>
              </Card>
            </div>
          </Section>

          <SectionSeparator />

          {/* ---------------------------------------------------------------- */}
          <Section id="form-fields" title="Form Fields">
            <div className="max-w-md space-y-4">
              <FormField label="Full Name" placeholder="Gabriel Castillo" />
              <FormField label="Email" type="email" placeholder="you@cornell.edu" />
              <FormField
                label="LinkedIn URL"
                placeholder="https://linkedin.com/in/..."
                error="Please enter a valid URL"
              />
              <SelectField label="KTP Class">
                <option value="">Select class…</option>
                <option value="alpha">Alpha</option>
                <option value="beta">Beta</option>
              </SelectField>
            </div>
          </Section>

          <SectionSeparator />

          {/* ---------------------------------------------------------------- */}
          <Section id="alerts" title="Alerts">
            <div className="space-y-4 max-w-xl">
              <AlertBanner variant="error">
                <strong>Error:</strong> Invalid email or password.
              </AlertBanner>
              <AlertBanner variant="warning">
                <strong>Note:</strong> To grant initial admin access, set{' '}
                <code className="font-mono text-xs">isAdmin: true</code> in Firebase Console.
              </AlertBanner>
              <AlertBanner variant="info">
                <strong>Info:</strong> Applications for Spring 2026 open January 25th.
              </AlertBanner>
            </div>
          </Section>

          <SectionSeparator />

          {/* ---------------------------------------------------------------- */}
          <Section id="section-title" title="Section Title">
            <div className="space-y-12">
              <div className="border border-gray-200 rounded-xl p-8">
                <Caption className="mb-4">Center-aligned with label (default)</Caption>
                <SectionTitle
                  label="About Us"
                  title="Our History"
                  subtitle="Kappa Theta Pi is Cornell's first co-ed professional technology fraternity."
                />
              </div>
              <div className="border border-gray-200 rounded-xl p-8">
                <Caption className="mb-4">Left-aligned, no label</Caption>
                <SectionTitle
                  title="Alumni Database"
                  subtitle="Browse and search KTP Cornell alumni."
                  align="left"
                />
              </div>
              <div className="bg-ktp-primary rounded-xl p-8">
                <Caption className="mb-4 text-white/60">White text on dark background</Caption>
                <SectionTitle
                  label="Recruitment"
                  title="Spring 2026"
                  subtitle="Join the nation's first professional tech fraternity."
                  color="white"
                />
              </div>
            </div>
          </Section>

          {/* Footer */}
          <div className="py-8 text-center">
            <Caption>KTP Cornell Design System · Alpha Epsilon Chapter</Caption>
          </div>
        </main>
      </div>
    </div>
  )
}
