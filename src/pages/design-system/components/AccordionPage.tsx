import { FaqAccordion } from '@/components/public/FaqAccordion'

const SAMPLE_ITEMS = [
  {
    question: 'What is Kappa Theta Pi?',
    answer:
      "Kappa Theta Pi is the nation's first co-ed professional technology fraternity. Our Cornell chapter (Alpha Epsilon) focuses on professional development, technical growth, and community.",
  },
  {
    question: 'Who can apply to KTP?',
    answer:
      'Any Cornell student with a passion for technology is welcome to apply — regardless of major. We value curiosity, drive, and a desire to grow professionally and personally.',
  },
  {
    question: 'When is recruitment?',
    answer:
      'Recruitment typically takes place at the beginning of each semester. Follow our Instagram @ktpcornell or visit the Recruitment page for the latest timeline.',
  },
]

export function AccordionPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-ui-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Accordion</h1>
        <p className="text-ktp-muted">
          Expandable panels to show and hide content. Import from{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/components/public/FaqAccordion
          </code>
          . Props:{' '}
          <code className="text-sm font-mono">items: {'{ question: string; answer: string }[]'}</code>.
          Only one panel can be open at a time.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-8">
        <div>
          <p className="text-sm text-ktp-muted mb-4">Default — one item open at a time</p>
          <div className="border border-ktp-ui-border rounded-xl p-8">
            <FaqAccordion items={SAMPLE_ITEMS} />
          </div>
        </div>
      </section>
    </>
  )
}
