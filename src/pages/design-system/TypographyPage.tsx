import { SmallTitle, Body, Caption } from '@/design-system/components/Typography'

function TypeRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2 py-8 border-b border-gray-100 last:border-0">
      <Caption>{label}</Caption>
      {children}
    </div>
  )
}

export function TypographyPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-gray-200">
        <h1 className="text-ktp-primary mb-2">Typography</h1>
        <p className="text-ktp-muted">
          KTP uses <strong>DM Sans</strong> for all body copy and headings. Scale and weights are
          defined as CSS variables in{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            globals.css
          </code>
          .
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-0">
        <TypeRow label="h1 — 62px / bold / uppercase / tracking-tight">
          <h1>Kappa Theta Pi</h1>
        </TypeRow>
        <TypeRow label="h2 — 48px / bold">
          <h2>Alpha Epsilon Chapter</h2>
        </TypeRow>
        <TypeRow label="h3 — 36px / bold">
          <h3>Cornell University</h3>
        </TypeRow>
        <TypeRow label="h4 — 32px / bold">
          <h4>Spring 2026 Recruitment</h4>
        </TypeRow>
        <TypeRow label="h5 — 24px / bold">
          <h5>Member Portal</h5>
        </TypeRow>
        <TypeRow label="h6 — 22px / bold">
          <h6>Announcements</h6>
        </TypeRow>
        <TypeRow label="Body (p) — 18px / text-ktp-muted">
          <Body>
            KTP was founded on January 10, 2012 at the University of Michigan, with the mission
            to create a tech community that enthusiastic students could join.
          </Body>
        </TypeRow>
        <TypeRow label="SmallTitle — xs / tracking-widest / uppercase / cyan">
          <SmallTitle>About Us</SmallTitle>
        </TypeRow>
        <TypeRow label="Caption — xs / text-ktp-muted">
          <Caption>Posted by Gabriel · March 2026</Caption>
        </TypeRow>
      </section>
    </>
  )
}
