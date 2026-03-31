import { AlertBanner } from '@/design-system/components/AlertBanner'

export function AlertsPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-ui-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Alerts</h1>
        <p className="text-ktp-muted">
          Import from{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/design-system/components/AlertBanner
          </code>
          . Three variants: <code className="text-sm font-mono">error</code>,{' '}
          <code className="text-sm font-mono">warning</code>, and{' '}
          <code className="text-sm font-mono">info</code>. Accepts any React children.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-6">
        <div className="flex flex-col gap-3 max-w-xl">
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
      </section>
    </>
  )
}
