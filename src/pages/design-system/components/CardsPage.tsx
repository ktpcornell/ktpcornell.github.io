import { Card, CardHeader, CardBody } from '@/design-system/components/Card'
import { Badge } from '@/design-system/components/Badge'
import { Body, Caption } from '@/design-system/components/Typography'

function CardGroup({
  label,
  description,
  children,
}: {
  label: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="p-6 md:p-12 flex flex-col gap-4 border-b border-ktp-border last:border-0">
      <div>
        <h2 className="text-xl font-semibold text-ktp-primary mb-1 tracking-normal">{label}</h2>
        <p className="text-sm text-ktp-fg-body">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
    </section>
  )
}

export function CardsPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Cards</h1>
        <p className="text-ktp-fg-body">
          Import from{' '}
          <code className="text-sm font-mono bg-ktp-bg-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/design-system/components/Card
          </code>
          . Three variants available, plus a{' '}
          <code className="text-sm font-mono">CardHeader</code> (navy bar) and{' '}
          <code className="text-sm font-mono">CardBody</code> for content.
        </p>
      </section>

      <CardGroup
        label="Default"
        description="Subtle shadow and border. General-purpose card."
      >
        <Card variant="default">
          <CardHeader>
            <h6 className="text-white mb-0">Announcement</h6>
            <Badge variant="cyan">Pinned</Badge>
          </CardHeader>
          <CardBody>
            <p className="mb-2">Default card with navy header bar. Used for announcements and alumni entries.</p>
            <Caption>Posted by Gabriel · March 2026</Caption>
          </CardBody>
        </Card>
      </CardGroup>

      <CardGroup
        label="Flat"
        description="Border only, no shadow. Good for dense grid layouts."
      >
        <Card variant="flat">
          <CardBody>
            <h5 className="text-ktp-primary mb-2">Flat Card</h5>
            <Body>No shadow, just a border. Good for grid layouts with many cards.</Body>
          </CardBody>
        </Card>
      </CardGroup>

      <CardGroup
        label="Elevated"
        description="Stronger shadow for featured or highlighted content."
      >
        <Card variant="elevated">
          <CardBody>
            <h5 className="text-ktp-primary mb-2">Elevated Card</h5>
            <Body>Stronger shadow. Use for featured or highlighted content.</Body>
          </CardBody>
        </Card>
      </CardGroup>
    </>
  )
}
