import { Footer } from '@/components/layout/Footer'

export function FooterPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-gray-200">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Footer</h1>
        <p className="text-ktp-muted">
          Bottom section of every public page containing navigation links, contact info, and legal
          copy. Import from{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/components/layout/Footer
          </code>
          . No props — self-contained. Rendered automatically by{' '}
          <code className="text-sm font-mono">PageWrapper</code>.
        </p>
        <p className="text-ktp-muted mt-2">
          Contains two columns: a navigation column (site links + KTP logo) and a contact column
          (email, Instagram, LinkedIn). Active path is highlighted in{' '}
          <span className="text-ktp-accent font-medium">ktp-accent</span>.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-8">
        <div>
          <p className="text-sm text-ktp-muted mb-4">Live preview</p>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <Footer />
          </div>
        </div>
      </section>
    </>
  )
}
