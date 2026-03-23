import { Link } from 'react-router-dom'
import { Button } from '@/design-system/components/Button'
import { Caption } from '@/design-system/components/Typography'

function ButtonGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="p-6 md:p-12 flex flex-col gap-4 border-b border-gray-100 last:border-0">
      <div>
        <Caption>{label}</Caption>
      </div>
      <div className="flex flex-wrap gap-3">{children}</div>
    </section>
  )
}

export function ButtonsPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-gray-200">
        <h1 className="text-ktp-primary mb-2">Buttons</h1>
        <p className="text-ktp-muted">
          Import from{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/design-system/components/Button
          </code>
          . All variants support <code className="text-sm font-mono">size</code> (
          <code className="text-sm font-mono">sm</code> /{' '}
          <code className="text-sm font-mono">default</code> /{' '}
          <code className="text-sm font-mono">lg</code>) and{' '}
          <code className="text-sm font-mono">asChild</code> for rendering as a link.
        </p>
      </section>

      <ButtonGroup label='variant="primary" — default CTA, navy fill'>
        <Button variant="primary" size="lg">Large</Button>
        <Button variant="primary">Default</Button>
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </ButtonGroup>

      <ButtonGroup label='variant="secondary" — accent CTA (cyan)'>
        <Button variant="secondary" size="lg">Large</Button>
        <Button variant="secondary">Default</Button>
        <Button variant="secondary" size="sm">Small</Button>
      </ButtonGroup>

      <ButtonGroup label='variant="outline" — navy border, transparent fill'>
        <Button variant="outline" size="lg">Large</Button>
        <Button variant="outline">Default</Button>
        <Button variant="outline" size="sm">Small</Button>
      </ButtonGroup>

      <ButtonGroup label='variant="ghost" — nav items and low-emphasis actions'>
        <Button variant="ghost">Default</Button>
        <Button variant="ghost" size="sm">Small</Button>
      </ButtonGroup>

      <section className="p-6 md:p-12 flex flex-col gap-4 border-b border-gray-100">
        <Caption>variant="transparent" — for use over dark or image backgrounds</Caption>
        <div className="bg-ktp-primary rounded-xl p-6 flex flex-wrap gap-3">
          <Button variant="transparent" size="lg">Large</Button>
          <Button variant="transparent">Default</Button>
          <Button variant="transparent" size="sm">Small</Button>
        </div>
      </section>

      <ButtonGroup label='variant="danger" — destructive actions'>
        <Button variant="danger">Delete</Button>
        <Button variant="danger" size="sm">Remove</Button>
      </ButtonGroup>

      <ButtonGroup label='asChild — renders as an anchor tag (use with Link or a)'>
        <Button variant="primary" asChild>
          <Link to="/join">Apply Now</Link>
        </Button>
        <Button variant="outline" asChild>
          <a href="https://kappathetapi.org" target="_blank" rel="noopener noreferrer">
            Nationals Site ↗
          </a>
        </Button>
      </ButtonGroup>
    </>
  )
}
