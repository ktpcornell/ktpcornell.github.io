import { Spinner } from '@/design-system/components/Spinner'
import { SectionLabel } from '@/design-system/components/Typography'

export function SpinnerPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-ui-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Spinner</h1>
        <p className="text-ktp-muted">
          Import from{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/design-system/components/Spinner
          </code>
          . Use for loading states. Three sizes:{' '}
          <code className="text-sm font-mono">sm</code>,{' '}
          <code className="text-sm font-mono">md</code> (default), and{' '}
          <code className="text-sm font-mono">lg</code>. Does not include a centering
          wrapper — the caller owns layout.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-10">
        {/* Sizes */}
        <div className="flex flex-col gap-4">
          <SectionLabel>Sizes</SectionLabel>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="sm" />
              <span className="text-xs text-ktp-muted font-mono">sm</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" />
              <span className="text-xs text-ktp-muted font-mono">md</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" />
              <span className="text-xs text-ktp-muted font-mono">lg</span>
            </div>
          </div>
        </div>

        {/* Common layout pattern */}
        <div className="flex flex-col gap-4">
          <SectionLabel>Common usage — full-page loading</SectionLabel>
          <div className="border border-ktp-ui-border rounded-lg bg-white flex items-center justify-center h-32">
            <Spinner />
          </div>
          <pre className="bg-ktp-surface rounded-lg p-4 text-sm font-mono text-ktp-primary overflow-x-auto">{`<div className="flex items-center justify-center min-h-screen">
  <Spinner />
</div>`}</pre>
        </div>

        {/* Inline loading */}
        <div className="flex flex-col gap-4">
          <SectionLabel>Inline / section loading</SectionLabel>
          <div className="border border-ktp-ui-border rounded-lg bg-white flex justify-center py-8">
            <Spinner size="sm" />
          </div>
          <pre className="bg-ktp-surface rounded-lg p-4 text-sm font-mono text-ktp-primary overflow-x-auto">{`<div className="flex justify-center py-8">
  <Spinner size="sm" />
</div>`}</pre>
        </div>

        {/* Do not use instead */}
        <div className="flex flex-col gap-3 max-w-xl">
          <SectionLabel>Never use instead</SectionLabel>
          <div className="border border-ktp-error-bg rounded-lg bg-ktp-error-bg p-4">
            <p className="text-ktp-error text-sm font-mono">
              {`<div className="w-8 h-8 border-4 border-ktp-accent border-t-transparent rounded-full animate-spin" />`}
            </p>
            <p className="text-ktp-error text-xs mt-1">
              Raw spinner HTML is a prohibited pattern — always use <code className="font-mono">&lt;Spinner /&gt;</code>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
