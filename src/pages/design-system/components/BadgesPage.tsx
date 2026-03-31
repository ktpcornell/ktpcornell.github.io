import { Badge } from '@/design-system/components/Badge'

export function BadgesPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-ui-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Badges</h1>
        <p className="text-ktp-muted">
          Import from{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/design-system/components/Badge
          </code>
          . Use for class labels (Beta Class), roles (E-Board), status (Pinned), and team
          affiliations.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-8">
        <div>
          <p className="text-sm text-ktp-muted mb-4">All variants</p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="navy">Navy</Badge>
            <Badge variant="cyan">Cyan</Badge>
            <Badge variant="pink">Pink</Badge>
            <Badge variant="gray">Gray</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        </div>

        <div>
          <p className="text-sm text-ktp-muted mb-4">Usage examples</p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="navy">Beta Class</Badge>
            <Badge variant="cyan">Pinned</Badge>
            <Badge variant="pink">E-Board</Badge>
            <Badge variant="gray">Alumni</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="danger">Removed</Badge>
          </div>
        </div>
      </section>
    </>
  )
}
