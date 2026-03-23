import { SectionTitle } from '@/design-system/components/SectionTitle'

export function SectionTitlePage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-gray-200">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Section Title</h1>
        <p className="text-ktp-muted">
          Import from{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/design-system/components/SectionTitle
          </code>
          . Props: <code className="text-sm font-mono">label?</code>,{' '}
          <code className="text-sm font-mono">title</code>,{' '}
          <code className="text-sm font-mono">subtitle?</code>,{' '}
          <code className="text-sm font-mono">align?: 'left' | 'center'</code>, and{' '}
          <code className="text-sm font-mono">color?: 'primary' | 'white'</code>.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-8">
        <div>
          <p className="text-sm text-ktp-muted mb-4">Center-aligned with label (default)</p>
          <div className="border border-gray-200 rounded-xl p-8">
            <SectionTitle
              label="About Us"
              title="Our History"
              subtitle="Kappa Theta Pi is Cornell's first co-ed professional technology fraternity."
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-ktp-muted mb-4">Left-aligned, no label</p>
          <div className="border border-gray-200 rounded-xl p-8">
            <SectionTitle
              title="Alumni Database"
              subtitle="Browse and search KTP Cornell alumni."
              align="left"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-ktp-muted mb-4">White text on dark background</p>
          <div className="bg-ktp-primary rounded-xl p-8">
            <SectionTitle
              label="Recruitment"
              title="Spring 2026"
              subtitle="Join the nation's first professional tech fraternity."
              color="white"
            />
          </div>
        </div>
      </section>
    </>
  )
}
