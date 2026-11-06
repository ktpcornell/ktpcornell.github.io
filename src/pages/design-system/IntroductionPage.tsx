import { Link } from 'react-router-dom'
import { Card } from '@/design-system'
import { Badge } from '@/design-system'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SectionItem {
  label: string
  description: string
  path: string
  preview: React.ReactNode
}

interface SectionGroup {
  label: string
  items: SectionItem[]
}

// ---------------------------------------------------------------------------
// Preview components
//
// These are simplified skeleton previews — not real design system components.
// They use inline <span> buttons, abstract placeholder bars, and fixed widths
// to fit within the constrained 150px preview zone. Real components would
// break the layout here due to their natural sizing and padding.
//
// DS-SKIP: opacity modifiers (bg-ktp-primary/30, bg-white/50, etc.) and raw
// gray Tailwind classes (bg-gray-200, bg-red-300, etc.) throughout this block
// are intentional — these are abstract skeleton bars, not real UI elements.
// They must NOT be used as patterns in production code.
// ---------------------------------------------------------------------------

const PREVIEW_COLORS: [string, boolean][] = [
  ['#273053', false],
  ['#0dcaf0', false],
  ['#f0f8ff', true],
  ['#717275', false],
  ['#f78fb3', false],
  ['#dc2626', false],
]

const ColorsPreview = () => (
  <div className="grid grid-cols-3 gap-3">
    {PREVIEW_COLORS.map(([hex, border]) => (
      <div
        key={hex}
        className="w-9 h-9 rounded-full"
        style={{ backgroundColor: hex, border: border ? '1px solid #e5e7eb' : undefined }}
      />
    ))}
  </div>
)

const LayoutPreview = () => (
  <div className="w-full max-w-[190px] flex flex-col gap-2">
    <div className="w-full h-4 rounded bg-ktp-primary/30" />
    <div className="flex gap-2">
      <div className="flex-1 h-12 rounded bg-ktp-primary/15" />
      <div className="flex-1 h-12 rounded bg-ktp-primary/15" />
      <div className="flex-1 h-12 rounded bg-ktp-primary/15" />
    </div>
    <div className="w-full h-4 rounded bg-ktp-primary/20" />
  </div>
)

const TypographyPreview = () => (
  <div className="flex items-center gap-5">
    <span className="text-5xl font-bold text-ktp-primary leading-none">Aa</span>
    <div className="flex flex-col gap-2">
      <div className="w-24 h-2.5 rounded bg-ktp-primary/60" />
      <div className="w-20 h-2 rounded bg-ktp-primary/35" />
      <div className="w-28 h-2 rounded bg-ktp-primary/20" />
      <div className="w-16 h-1.5 rounded bg-gray-300" />
    </div>
  </div>
)

const ButtonsPreview = () => (
  <div className="flex gap-2 items-center">
    <span className="inline-block px-3 py-1 rounded-lg bg-ktp-primary text-white text-xs font-medium">
      Primary
    </span>
    <span className="inline-block px-3 py-1 rounded-lg bg-ktp-accent text-ktp-primary text-xs font-medium">
      Secondary
    </span>
    <span className="inline-block px-3 py-1 rounded-lg border border-ktp-primary text-ktp-primary text-xs font-medium">
      Outline
    </span>
  </div>
)

const BadgesPreview = () => (
  <div className="flex flex-wrap gap-2 justify-center">
    <Badge variant="navy">Navy</Badge>
    <Badge variant="cyan">Cyan</Badge>
    <Badge variant="pink">Pink</Badge>
    <Badge variant="gray">Gray</Badge>
  </div>
)

const CardsPreview = () => (
  <div className="w-44 rounded-xl border border-ktp-border overflow-hidden shadow-sm bg-white">
    <div className="bg-ktp-primary h-8 px-3 flex items-center">
      <div className="w-16 h-2 rounded bg-white/50" />
    </div>
    <div className="p-3 flex flex-col gap-2">
      <div className="w-full h-2 rounded bg-gray-200" />
      <div className="w-3/4 h-2 rounded bg-gray-200" />
      <div className="w-1/2 h-1.5 rounded bg-gray-100" />
    </div>
  </div>
)

const FormFieldsPreview = () => (
  <div className="w-48 flex flex-col gap-2">
    <div className="w-20 h-2 rounded bg-ktp-primary/50" />
    <div className="w-full h-9 rounded-lg border border-gray-300 bg-white px-3 flex items-center">
      <div className="w-24 h-2 rounded bg-gray-200" />
    </div>
  </div>
)

const AlertsPreview = () => (
  <div className="w-52 flex flex-col gap-2">
    <div className="w-full h-8 rounded border-l-4 border-ktp-error bg-ktp-error-bg flex items-center px-3">
      <div className="w-28 h-2 rounded bg-red-300" />
    </div>
    <div className="w-full h-8 rounded border-l-4 border-ktp-warning-border bg-ktp-warning-bg flex items-center px-3">
      <div className="w-24 h-2 rounded bg-amber-300" />
    </div>
  </div>
)

const AccordionPreview = () => (
  <div className="w-52 flex flex-col divide-y divide-gray-200 border border-ktp-border rounded-lg overflow-hidden">
    {(['+', '−', '+'] as const).map((icon, i) => (
      <div key={i} className="flex items-center justify-between px-3 py-2 bg-white">
        <div className="w-28 h-2 rounded bg-ktp-primary/30" />
        <span className="text-ktp-fg-body text-sm leading-none">{icon}</span>
      </div>
    ))}
  </div>
)

const TabsPreview = () => (
  <div className="w-52 flex flex-col">
    <div className="flex border-b border-ktp-border">
      <div className="px-4 py-2 border-b-2 border-ktp-accent">
        <div className="w-10 h-2 rounded bg-ktp-primary/70" />
      </div>
      <div className="px-4 py-2">
        <div className="w-10 h-2 rounded bg-gray-300" />
      </div>
      <div className="px-4 py-2">
        <div className="w-10 h-2 rounded bg-gray-300" />
      </div>
    </div>
    <div className="p-3 flex flex-col gap-1.5">
      <div className="w-full h-2 rounded bg-gray-200" />
      <div className="w-3/4 h-1.5 rounded bg-gray-100" />
    </div>
  </div>
)

const NavbarPreview = () => (
  <div className="w-full max-w-[240px] rounded-lg bg-ktp-primary px-4 py-3 flex items-center justify-between">
    <div className="w-10 h-5 rounded bg-white/40" />
    <div className="flex gap-2">
      <div className="w-8 h-2 rounded bg-white/40" />
      <div className="w-8 h-2 rounded bg-white/40" />
      <div className="w-8 h-2 rounded bg-ktp-accent/70" />
    </div>
  </div>
)

const SectionTitlePreview = () => (
  <div className="flex flex-col items-center gap-2 w-52">
    <div className="w-20 h-2 rounded bg-ktp-accent/60" />
    <div className="w-40 h-3.5 rounded bg-ktp-primary/70" />
    <div className="w-36 h-2 rounded bg-gray-300" />
    <div className="w-28 h-2 rounded bg-gray-200" />
  </div>
)

const SectionSeparatorPreview = () => (
  <div className="w-52 flex items-center gap-2">
    <div className="flex-1 h-px bg-gray-300" />
    <div className="w-2 h-2 rounded-full bg-ktp-accent" />
    <div className="flex-1 h-px bg-gray-300" />
  </div>
)

const FooterPreview = () => (
  <div className="w-full max-w-[240px] rounded-lg bg-ktp-primary p-3">
    <div className="flex gap-6 mb-2.5">
      <div className="flex flex-col gap-1.5">
        <div className="w-12 h-2 rounded bg-white/50" />
        <div className="w-14 h-1.5 rounded bg-white/25" />
        <div className="w-12 h-1.5 rounded bg-white/25" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="w-12 h-2 rounded bg-white/50" />
        <div className="w-14 h-1.5 rounded bg-white/25" />
        <div className="w-10 h-1.5 rounded bg-white/25" />
      </div>
    </div>
    <div className="w-full h-px bg-white/20 mt-1" />
    <div className="w-24 h-1.5 rounded bg-white/20 mt-1.5 mx-auto" />
  </div>
)

// HeroPreview intentionally uses self-stretch to override the parent flex container's items-center,
// filling the full 150px height edge-to-edge. All other previews stay centered via items-center.
const HeroPreview = () => (
  <div className="w-full self-stretch bg-ktp-primary flex flex-col items-center justify-center gap-2.5">
    <div className="w-32 h-3 rounded bg-white/70" />
    <div className="w-44 h-2 rounded bg-white/40" />
    <span className="mt-3 inline-block px-3 py-1 rounded-lg bg-ktp-accent text-ktp-primary text-xs font-medium">
      Get Started
    </span>
  </div>
)

const CTAPreview = () => (
  <div className="w-52 flex flex-col items-center gap-2">
    <div className="w-40 h-3 rounded bg-ktp-primary/70" />
    <div className="w-32 h-2 rounded bg-gray-300" />
    <div className="flex gap-2 mt-3">
      <span className="inline-block px-3 py-1 rounded-lg bg-ktp-primary text-white text-xs font-medium">
        Apply
      </span>
      <span className="inline-block px-3 py-1 rounded-lg border border-ktp-primary text-ktp-primary text-xs font-medium">
        Learn More
      </span>
    </div>
  </div>
)

const DataTablePreview = () => (
  <div className="w-52 rounded-lg border border-ktp-border overflow-hidden">
    <div className="bg-ktp-primary flex">
      <div className="flex-1 px-2 py-1.5"><div className="w-10 h-1.5 rounded bg-white/60" /></div>
      <div className="flex-1 px-2 py-1.5"><div className="w-8 h-1.5 rounded bg-white/60" /></div>
      <div className="w-8 px-2 py-1.5"><div className="w-5 h-1.5 rounded bg-white/60" /></div>
    </div>
    {[true, false, true].map((even, i) => (
      <div key={i} className={`flex ${even ? 'bg-white' : 'bg-ktp-bg-surface'}`}>
        <div className="flex-1 px-2 py-2"><div className="w-16 h-1.5 rounded bg-gray-200" /></div>
        <div className="flex-1 px-2 py-2"><div className="w-10 h-1.5 rounded bg-gray-200" /></div>
        <div className="w-8 px-2 py-2"><div className="w-5 h-1.5 rounded bg-ktp-primary/30" /></div>
      </div>
    ))}
  </div>
)

const ModalPreview = () => (
  <div className="relative w-44 h-28">
    <div className="absolute inset-0 rounded-lg bg-black/30" />
    <div className="absolute inset-4 rounded-xl bg-white shadow-lg overflow-hidden">
      <div className="bg-ktp-primary px-3 py-1.5 flex items-center justify-between">
        <div className="w-16 h-1.5 rounded bg-white/70" />
        <div className="w-3 h-3 rounded-full bg-white/40" />
      </div>
      <div className="p-2.5 flex flex-col gap-1.5">
        <div className="w-full h-1.5 rounded bg-gray-200" />
        <div className="w-3/4 h-1.5 rounded bg-gray-100" />
        <div className="flex gap-1.5 mt-1">
          <div className="flex-1 h-4 rounded bg-gray-100 border border-gray-200" />
          <div className="flex-1 h-4 rounded bg-ktp-primary" />
        </div>
      </div>
    </div>
  </div>
)

const IconButtonPreview = () => (
  <div className="flex flex-col gap-3 items-center">
    <div className="flex gap-2 items-center">
      <div className="w-7 h-7 rounded-full border border-ktp-border flex items-center justify-center">
        <div className="w-3 h-3 rounded bg-ktp-primary/40" />
      </div>
      <div className="w-9 h-9 rounded-full border border-ktp-border flex items-center justify-center">
        <div className="w-4 h-4 rounded bg-ktp-primary/40" />
      </div>
      <div className="w-10 h-10 rounded-full border border-ktp-border flex items-center justify-center">
        <div className="w-5 h-5 rounded bg-ktp-primary/40" />
      </div>
    </div>
    <div className="bg-ktp-primary rounded-lg px-4 py-2 flex gap-2">
      <div className="w-7 h-7 rounded-full flex items-center justify-center">
        <div className="w-3.5 h-3.5 rounded bg-white/60" />
      </div>
      <div className="w-7 h-7 rounded-full flex items-center justify-center">
        <div className="w-3.5 h-3.5 rounded bg-white/60" />
      </div>
    </div>
  </div>
)

// ---------------------------------------------------------------------------
// Sections data
// ---------------------------------------------------------------------------

const SECTIONS: SectionGroup[] = [
  {
    label: 'Styles',
    items: [
      {
        label: 'Colors',
        description: 'Brand, text, and status color tokens.',
        path: '/design-system/colors',
        preview: <ColorsPreview />,
      },
      {
        label: 'Layout',
        description: 'Breakpoints, container widths, and grid patterns.',
        path: '/design-system/layout',
        preview: <LayoutPreview />,
      },
      {
        label: 'Typography',
        description: 'DM Sans type scale from heading to caption.',
        path: '/design-system/typography',
        preview: <TypographyPreview />,
      },
    ],
  },
  {
    label: 'Components',
    items: [
      {
        label: 'Buttons',
        description: 'Variants: primary, secondary, outline, ghost, danger.',
        path: '/design-system/components/buttons',
        preview: <ButtonsPreview />,
      },
      {
        label: 'Badges',
        description: 'Status and label chips in six color variants.',
        path: '/design-system/components/badges',
        preview: <BadgesPreview />,
      },
      {
        label: 'Cards',
        description: 'Default, flat, and elevated card surfaces.',
        path: '/design-system/components/cards',
        preview: <CardsPreview />,
      },
      {
        label: 'Form Fields',
        description: 'Text input, select, and textarea field wrappers.',
        path: '/design-system/components/form-fields',
        preview: <FormFieldsPreview />,
      },
      {
        label: 'Alerts',
        description: 'Inline error, warning, and info banners.',
        path: '/design-system/components/alerts',
        preview: <AlertsPreview />,
      },
      {
        label: 'Accordion',
        description: 'Collapsible FAQ-style content panels.',
        path: '/design-system/components/accordion',
        preview: <AccordionPreview />,
      },
      {
        label: 'Tabs',
        description: 'Tabbed content switcher with active indicator.',
        path: '/design-system/components/tabs',
        preview: <TabsPreview />,
      },
      {
        label: 'Data Table',
        description: 'Navy-header table with auto zebra-stripe rows.',
        path: '/design-system/components/data-table',
        preview: <DataTablePreview />,
      },
      {
        label: 'Modal',
        description: 'Accessible dialog with navy header and KTP tokens.',
        path: '/design-system/components/modal',
        preview: <ModalPreview />,
      },
      {
        label: 'Icon Button',
        description: 'Icon-only trigger: ghost and on-dark variants.',
        path: '/design-system/components/buttons',
        preview: <IconButtonPreview />,
      },
    ],
  },
  {
    label: 'Navigation',
    items: [
      {
        label: 'Navbar',
        description: 'Public and internal navigation bar patterns.',
        path: '/design-system/components/navbar',
        preview: <NavbarPreview />,
      },
    ],
  },
  {
    label: 'Page Sections',
    items: [
      {
        label: 'Section Title',
        description: 'Label, heading, and subtitle intro block.',
        path: '/design-system/page-sections/section-title',
        preview: <SectionTitlePreview />,
      },
      {
        label: 'Section Separator',
        description: 'Thin horizontal divider between sections.',
        path: '/design-system/page-sections/section-separator',
        preview: <SectionSeparatorPreview />,
      },
      {
        label: 'Footer',
        description: 'Site-wide footer with links and legal copy.',
        path: '/design-system/page-sections/footer',
        preview: <FooterPreview />,
      },
      {
        label: 'Hero',
        description: 'Full-height hero with overlay and animation.',
        path: '/design-system/page-sections/hero',
        preview: <HeroPreview />,
      },
      {
        label: 'CTA',
        description: 'Recruitment call-to-action with two CTAs.',
        path: '/design-system/page-sections/cta',
        preview: <CTAPreview />,
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export function IntroductionPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-border">
        <p className="text-sm font-medium text-ktp-accent uppercase tracking-widest mb-2">KTP Cornell</p>
        <h1 className="text-ktp-primary mb-4 tracking-normal normal-case">Design System</h1>
        <p className="text-ktp-fg-body max-w-2xl">
          Centralized design language for the KTP Cornell website. All UI components,
          color tokens, and typography in one place. Import from{' '}
          <code className="text-sm bg-ktp-bg-surface px-1.5 py-0.5 rounded font-mono text-ktp-primary">
            @/design-system
          </code>
          .
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-8">
        {SECTIONS.map((section) => (
          <div key={section.label}>
            <h2 className="text-xl font-semibold text-ktp-primary mb-4 tracking-normal">{section.label}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.items.map((item) => (
                <Link key={item.label} to={item.path} className="block group no-underline">
                  <Card
                    variant="flat"
                    className="h-full hover:border-ktp-accent transition-colors cursor-pointer overflow-hidden"
                  >
                    <div className="h-[150px] bg-ktp-bg-surface border-b border-ktp-border flex items-center justify-center overflow-hidden">
                      {item.preview}
                    </div>
                    <div className="px-4 py-3 flex flex-col gap-1">
                      <p className="font-medium text-sm text-ktp-primary">{item.label}</p>
                      <p className="text-xs text-ktp-fg-body">{item.description}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
