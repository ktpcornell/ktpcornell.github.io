import { CallToAction } from '@/components/public/CallToAction'

export function CTAPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-ui-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">CTA</h1>
        <p className="text-ktp-muted">
          Call-to-action block that drives recruitment engagement. Import from{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/components/public/CallToAction
          </code>
          . No props — self-contained.
        </p>
        <p className="text-ktp-muted mt-2">
          Two-column layout on desktop (text left, buttons right) with a{' '}
          <span className="font-medium text-ktp-primary">Coffee Chat</span> link and a{' '}
          <span className="font-medium text-ktp-primary">Join Us</span> button. Uses the{' '}
          <code className="text-sm font-mono">.call-to-action</code> legacy CSS class for the navy
          background.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-8">
        <div>
          <p className="text-sm text-ktp-muted mb-4">Live preview</p>
          <div className="border border-ktp-ui-border rounded-xl overflow-hidden">
            <CallToAction />
          </div>
        </div>
      </section>
    </>
  )
}
