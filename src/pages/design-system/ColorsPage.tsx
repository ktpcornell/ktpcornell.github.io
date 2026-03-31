import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Card, CardBody } from '@/design-system/components/Card'
import { Button } from '@/design-system/components/Button'

// ---------------------------------------------------------------------------
// ColorCard
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
    <Card variant="flat" className="overflow-clip">
      <div className="h-32 w-full" style={{ backgroundColor: hex }} />
      <CardBody className="flex flex-col gap-3 border-t border-ktp-ui-border !px-3 !py-3 !pt-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <h6 className="text-ktp-primary mb-0 leading-tight">{name}</h6>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              aria-label={`Copy ${name} color`}
              className="w-8 h-8 p-0 shrink-0"
            >
              {copied
                ? <Check className="w-4 h-4 text-ktp-accent" />
                : <Copy className="w-4 h-4" />
              }
            </Button>
          </div>
          <p className="text-xs font-mono text-ktp-muted leading-tight">{hex}</p>
          {/* DS-SKIP: text-ktp-muted/70 — intentional dimming for secondary metadata text; no separate token for this level */}
          <p className="text-xs font-mono text-ktp-muted/70 leading-tight">{tailwindClass}</p>
        </div>
        <p className="text-xs text-ktp-muted leading-snug">{description}</p>
      </CardBody>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// ColorGroup
// ---------------------------------------------------------------------------
function ColorGroup({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="p-6 md:p-12 flex flex-col gap-6 border-b border-ktp-ui-border">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-ktp-primary tracking-normal">{title}</h2>
        <p className="text-ktp-muted">{description}</p>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export function ColorsPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-ui-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Colors</h1>
        <p className="text-ktp-muted">
          Guidelines for using color tokens across the KTP website. All values are defined as CSS
          variables in{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            src/styles/globals.css
          </code>{' '}
          and exposed as Tailwind utilities.
        </p>
      </section>

      <ColorGroup
        title="Brand"
        description="Core KTP identity colors. Use these for primary UI elements, navigation, and calls to action."
      >
        <ColorCard
          name="Primary"
          hex="#273053"
          tailwindClass="bg-ktp-primary"
          description="Primary brand color. Used for headers, CTAs, nav background, and card headers."
        />
        <ColorCard
          name="Accent"
          hex="#0dcaf0"
          tailwindClass="bg-ktp-accent"
          description="Accent color. Used for highlights, secondary buttons, and focus rings."
        />
        <ColorCard
          name="Surface"
          hex="#f0f8ff"
          tailwindClass="bg-ktp-surface"
          description="Light blue background for alternating sections and portal pages."
        />
        <ColorCard
          name="Card Back"
          hex="#001433"
          tailwindClass="bg-ktp-card-back"
          description="Deep navy for the back face of the 3D member flip card. Applied via var(--ktp-card-back) in legacy.css."
        />
        <ColorCard
          name="Overlay"
          hex="rgba(0,0,0,0.50)"
          tailwindClass="bg-ktp-overlay"
          description="Modal backdrop overlay. Use bg-ktp-overlay instead of bg-black/50 — avoids opacity modifier syntax."
        />
      </ColorGroup>

      <ColorGroup
        title="Text"
        description="Colors used for body copy and text on dark backgrounds."
      >
        <ColorCard
          name="Muted"
          hex="#717275"
          tailwindClass="text-ktp-muted"
          description="Default body copy and secondary text across all pages."
        />
        <ColorCard
          name="Muted Light"
          hex="#a8adb8"
          tailwindClass="text-ktp-muted-light"
          description="Lighter muted text for use on dark (ktp-primary) backgrounds where ktp-muted lacks sufficient contrast. Also aliased as ktp-on-dark-tertiary."
        />
        <ColorCard
          name="White"
          hex="#ffffff"
          tailwindClass="text-white"
          description="Full-white text and icon color on dark or navy backgrounds."
        />
        <ColorCard
          name="On Dark Secondary"
          hex="#d4d8e4"
          tailwindClass="text-ktp-on-dark-secondary"
          description="~90% white equivalent on navy. Use instead of text-white/90 for portal/admin title bar text. Avoids opacity modifier syntax."
        />
      </ColorGroup>

      <ColorGroup
        title="UI Shell"
        description="Structural colors for sidebars, navigation surfaces, and dividers. Not for brand or content use."
      >
        <ColorCard
          name="UI Border"
          hex="#e5e7eb"
          tailwindClass="border-ktp-ui-border"
          description="Sidebar and card border. Use instead of border-gray-200."
        />
        <ColorCard
          name="UI Background"
          hex="#f9fafb"
          tailwindClass="bg-ktp-ui-bg"
          description="Sidebar panel background. Use instead of bg-gray-50."
        />
        <ColorCard
          name="UI Hover"
          hex="#f3f4f6"
          tailwindClass="bg-ktp-ui-hover"
          description="Nav item hover state background. Use instead of hover:bg-gray-100."
        />
        <ColorCard
          name="Divider on Dark"
          hex="rgba(255,255,255,0.20)"
          tailwindClass="border-ktp-divider-on-dark"
          description="Subtle divider line on navy top bars. A named rgba() value — avoids opacity modifier syntax."
        />
        <ColorCard
          name="Neutral"
          hex="#4b5563"
          tailwindClass="bg-ktp-neutral"
          description="Dark neutral for stat cards and secondary UI accents without brand blue."
        />
        <ColorCard
          name="Neutral Background"
          hex="#d1d5db"
          tailwindClass="bg-ktp-neutral-bg"
          description="Inactive/disabled toggle track background."
        />
      </ColorGroup>

      <ColorGroup
        title="Status"
        description="Semantic colors for error and warning feedback states."
      >
        <ColorCard
          name="Error"
          hex="#dc2626"
          tailwindClass="bg-destructive"
          description="Error and destructive action color. Used for delete buttons and error icons."
        />
        <ColorCard
          name="Error Text"
          hex="#991b1b"
          tailwindClass="text-ktp-error"
          description="Error text color inside alert banners."
        />
        <ColorCard
          name="Error BG"
          hex="#fee2e2"
          tailwindClass="bg-ktp-error-bg"
          description="Background fill for error alert banners."
        />
        <ColorCard
          name="Warning BG"
          hex="#fef3c7"
          tailwindClass="bg-ktp-warning-bg"
          description="Background fill for warning alert banners."
        />
        <ColorCard
          name="Warning Border"
          hex="#f59e0b"
          tailwindClass="border-ktp-warning-border"
          description="Border accent on warning banners and indicators."
        />
        <ColorCard
          name="Warning Text"
          hex="#92400e"
          tailwindClass="text-ktp-warning-text"
          description="Body text color inside warning alert banners."
        />
      </ColorGroup>
    </>
  )
}
