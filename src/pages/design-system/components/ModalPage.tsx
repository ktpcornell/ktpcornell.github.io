import { useState } from 'react'
import { KtpModal, KtpModalHeader, KtpModalBody, KtpModalFooter } from '@/design-system/components/Modal'
import { Button } from '@/design-system/components/Button'
import { FormField } from '@/design-system/components/FormField'
import { CheckboxField } from '@/design-system/components/FormField'
import { SectionLabel } from '@/design-system/components/Typography'

export function ModalPage() {
  const [basicOpen, setBasicOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [pinned, setPinned] = useState(false)

  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Modal</h1>
        <p className="text-ktp-fg-body">
          Import from{' '}
          <code className="text-sm font-mono bg-ktp-bg-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/design-system/components/Modal
          </code>
          . Built on Radix Dialog for focus-trap, scroll-lock, and{' '}
          <code className="text-sm font-mono">aria-modal</code>. All visual styling uses KTP tokens —
          no raw overlay colors or inline styles.
        </p>
      </section>

      {/* Basic modal */}
      <section className="p-6 md:p-12 flex flex-col gap-6 border-b border-ktp-border">
        <SectionLabel>Basic modal with header + body</SectionLabel>
        <div>
          <Button onClick={() => setBasicOpen(true)}>Open Modal</Button>
        </div>
        <KtpModal open={basicOpen} onClose={() => setBasicOpen(false)}>
          <KtpModalHeader title="Example Modal" />
          <KtpModalBody>
            <p className="text-ktp-fg-body text-sm">
              This modal uses <code className="font-mono text-xs">KtpModalHeader</code> (navy bar
              with built-in close button), <code className="font-mono text-xs">KtpModalBody</code>{' '}
              (scrollable padded area), and the optional{' '}
              <code className="font-mono text-xs">KtpModalFooter</code>.
            </p>
            <p className="text-ktp-fg-body text-sm">
              The overlay uses <code className="font-mono text-xs">bg-ktp-overlay</code> instead of{' '}
              <code className="font-mono text-xs">bg-black/50</code>. The close button uses{' '}
              <code className="font-mono text-xs">IconButton variant="on-dark"</code>.
            </p>
          </KtpModalBody>
          <KtpModalFooter>
            <Button variant="outline" onClick={() => setBasicOpen(false)}>Cancel</Button>
            <Button onClick={() => setBasicOpen(false)}>Confirm</Button>
          </KtpModalFooter>
        </KtpModal>
      </section>

      {/* Form modal */}
      <section className="p-6 md:p-12 flex flex-col gap-6 border-b border-ktp-border">
        <SectionLabel>Form modal — with CheckboxField</SectionLabel>
        <div>
          <Button onClick={() => setFormOpen(true)}>New Announcement</Button>
        </div>
        <KtpModal open={formOpen} onClose={() => setFormOpen(false)}>
          <KtpModalHeader title="New Announcement" />
          <KtpModalBody>
            <FormField label="Title" placeholder="Spring Recruitment 2026" />
            <FormField label="Body" placeholder="Announcements body..." />
            <CheckboxField
              label="Pin this announcement"
              description="Pinned announcements appear at the top of the feed."
              checked={pinned}
              onCheckedChange={setPinned}
            />
          </KtpModalBody>
          <KtpModalFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button onClick={() => setFormOpen(false)}>Post</Button>
          </KtpModalFooter>
        </KtpModal>
      </section>

      {/* maxWidth variants */}
      <section className="p-6 md:p-12 flex flex-col gap-4">
        <SectionLabel>Props</SectionLabel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ktp-border">
                <th className="text-left py-2 pr-4 font-semibold text-ktp-primary">Component</th>
                <th className="text-left py-2 pr-4 font-semibold text-ktp-primary">Props</th>
                <th className="text-left py-2 font-semibold text-ktp-primary">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ktp-border">
              {[
                ['KtpModal', 'open, onClose, maxWidth? = "lg"', 'maxWidth: sm | md | lg | xl'],
                ['KtpModalHeader', 'title', 'Navy bar + built-in IconButton close'],
                ['KtpModalBody', 'className?', 'max-h-[70vh] overflow-y-auto'],
                ['KtpModalFooter', 'className?', 'flex row, right-aligned, border-top'],
              ].map(([comp, props, notes]) => (
                <tr key={comp}>
                  <td className="py-2 pr-4 font-mono text-xs text-ktp-primary">{comp}</td>
                  <td className="py-2 pr-4 font-mono text-xs text-ktp-fg-body">{props}</td>
                  <td className="py-2 text-xs text-ktp-fg-body">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
