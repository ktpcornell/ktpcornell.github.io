import { Link } from 'react-router-dom'
import { Button } from '@/design-system/components/Button'
import { IconButton } from '@/design-system/components/IconButton'
import { SectionLabel } from '@/design-system/components/Typography'
import { X, Menu, Copy, Trash2 } from 'lucide-react'

function ButtonGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="p-6 md:p-12 flex flex-col gap-4 border-b border-ktp-ui-border last:border-0">
      <div>
        <SectionLabel>{label}</SectionLabel>
      </div>
      <div className="flex flex-wrap gap-3">{children}</div>
    </section>
  )
}

export function ButtonsPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-ui-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Buttons</h1>
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

      <section className="p-6 md:p-12 flex flex-col gap-4 border-b border-ktp-ui-border">
        <SectionLabel>variant="transparent" — for use over dark or image backgrounds</SectionLabel>
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

      {/* IconButton */}
      <section className="p-6 md:p-12 flex flex-col gap-4 border-t border-ktp-ui-border">
        <div>
          <SectionLabel>IconButton — icon-only trigger, no text padding</SectionLabel>
          <p className="text-sm text-ktp-muted mt-1">
            Import from{' '}
            <code className="font-mono text-xs bg-ktp-surface px-1 py-0.5 rounded">
              @/design-system/components/IconButton
            </code>
            . Use instead of <code className="font-mono text-xs">Button</code> when the clickable
            surface contains only an icon (modal close, hamburger, copy). Requires{' '}
            <code className="font-mono text-xs">aria-label</code>.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs text-ktp-muted mb-3">variant="ghost" (default) — sizes sm / default / lg</p>
            <div className="flex items-center gap-3">
              <IconButton variant="ghost" size="sm" aria-label="Copy small"><Copy /></IconButton>
              <IconButton variant="ghost" aria-label="Copy default"><Copy /></IconButton>
              <IconButton variant="ghost" size="lg" aria-label="Copy large"><Copy /></IconButton>
              <IconButton variant="ghost" aria-label="Delete" className="text-destructive hover:bg-destructive/10">
                <Trash2 />
              </IconButton>
            </div>
          </div>
          <div>
            <p className="text-xs text-ktp-muted mb-3">variant="on-dark" — for use on navy backgrounds</p>
            <div className="bg-ktp-primary rounded-xl px-6 py-4 flex items-center gap-3">
              <IconButton variant="on-dark" aria-label="Close modal"><X /></IconButton>
              <IconButton variant="on-dark" aria-label="Open menu"><Menu /></IconButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
