import { SectionSeparator } from '@/design-system/components/SectionSeparator'

export function SectionSeparatorPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Section Separator</h1>
        <p className="text-ktp-fg-body">
          A thin horizontal rule used to visually divide content sections. Import from{' '}
          <code className="text-sm font-mono bg-ktp-bg-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/design-system/components/SectionSeparator
          </code>
          . Props:{' '}
          <code className="text-sm font-mono">className?</code>.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-8">
        <div>
          <p className="text-sm text-ktp-fg-body mb-4">Default</p>
          <div className="border border-ktp-border rounded-xl p-8 flex flex-col gap-4">
            <p className="text-ktp-fg-body text-sm mb-0">Content above the separator.</p>
            <SectionSeparator />
            <p className="text-ktp-fg-body text-sm mb-0">Content below the separator.</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-ktp-fg-body mb-4">Multiple separators between sections</p>
          <div className="border border-ktp-border rounded-xl p-8 flex flex-col gap-4">
            <p className="font-semibold text-ktp-primary text-sm mb-0">Section A</p>
            <SectionSeparator />
            <p className="font-semibold text-ktp-primary text-sm mb-0">Section B</p>
            <SectionSeparator />
            <p className="font-semibold text-ktp-primary text-sm mb-0">Section C</p>
          </div>
        </div>
      </section>
    </>
  )
}
