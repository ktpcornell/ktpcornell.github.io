import { Link } from 'react-router-dom'

const SECTIONS = [
  { label: 'Styles', items: ['Colors', 'Layout', 'Typography'], base: '/design-system' },
  {
    label: 'Components',
    items: ['Buttons', 'Badges', 'Cards', 'Form Fields', 'Alerts', 'Accordion', 'Tabs'],
    base: '/design-system/components',
  },
  {
    label: 'Navigation',
    items: ['Navbar'],
    base: '/design-system/components',
  },
  {
    label: 'Page Sections',
    items: ['Section Title', 'Section Separator', 'Footer', 'Hero', 'CTA'],
    base: '/design-system/page-sections',
  },
]

function slug(label: string) {
  return label.toLowerCase().replace(/\s+/g, '-')
}

export function IntroductionPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-gray-200">
        <p className="text-sm font-medium text-ktp-accent uppercase tracking-widest mb-2">KTP Cornell</p>
        <h1 className="text-ktp-primary mb-4 tracking-normal normal-case">Design System</h1>
        <p className="text-ktp-muted max-w-2xl">
          Centralized design language for the KTP Cornell website. All UI components,
          color tokens, and typography in one place. Import from{' '}
          <code className="text-sm bg-ktp-surface px-1.5 py-0.5 rounded font-mono text-ktp-primary">
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
              {section.items.map((item) => {
                const path =
                  section.label === 'Styles'
                    ? `/design-system/${slug(item)}`
                    : `${section.base}/${slug(item)}`
                return (
                  <Link
                    key={item}
                    to={path}
                    className="block p-4 rounded-xl border border-gray-200 hover:border-ktp-accent hover:bg-ktp-surface transition-colors no-underline group"
                  >
                    <p className="font-medium text-ktp-primary group-hover:text-ktp-primary">{item}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
