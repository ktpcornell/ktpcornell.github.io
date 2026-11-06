import { useState } from 'react'
import { FormField, SelectField, CheckboxField } from '@/design-system/components/FormField'
import { Switch, SwitchField } from '@/design-system/components/Switch'
import { SectionLabel } from '@/design-system/components/Typography'

export function FormFieldsPage() {
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(true)
  const [toggled, setToggled] = useState(false)

  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Form Fields</h1>
        <p className="text-ktp-fg-body">
          Import from{' '}
          <code className="text-sm font-mono bg-ktp-bg-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/design-system/components/FormField
          </code>
          . Exports <code className="text-sm font-mono">FormField</code>,{' '}
          <code className="text-sm font-mono">SelectField</code>,{' '}
          <code className="text-sm font-mono">TextareaField</code>, and{' '}
          <code className="text-sm font-mono">CheckboxField</code>. All accept a{' '}
          <code className="text-sm font-mono">label</code>, <code className="text-sm font-mono">error</code>, and{' '}
          <code className="text-sm font-mono">helperText</code> prop.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-8">
        <div>
          <p className="text-sm text-ktp-fg-body mb-4">Text inputs</p>
          <div className="max-w-md space-y-4">
            <FormField label="Full Name" placeholder="Gabriel Castillo" />
            <FormField label="Email" type="email" placeholder="you@cornell.edu" />
          </div>
        </div>

        <div>
          <p className="text-sm text-ktp-fg-body mb-4">With error state</p>
          <div className="max-w-md">
            <FormField
              label="LinkedIn URL"
              placeholder="https://linkedin.com/in/..."
              error="Please enter a valid URL"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-ktp-fg-body mb-4">Select field</p>
          <div className="max-w-md">
            <SelectField label="KTP Class">
              <option value="">Select class…</option>
              <option value="alpha">Alpha</option>
              <option value="beta">Beta</option>
            </SelectField>
          </div>
        </div>
      </section>

      {/* CheckboxField */}
      <section className="p-6 md:p-12 flex flex-col gap-6 border-t border-ktp-border">
        <div>
          <SectionLabel>CheckboxField — labeled checkbox</SectionLabel>
          <p className="text-sm text-ktp-fg-body mt-1">
            Import from{' '}
            <code className="font-mono text-xs bg-ktp-bg-surface px-1 py-0.5 rounded">
              @/design-system/components/FormField
            </code>
            . Replaces raw{' '}
            <code className="font-mono text-xs">{'<input type="checkbox">'}</code> with proper label
            wiring and ktp-primary styling.
          </p>
        </div>
        <div className="max-w-md space-y-4">
          <CheckboxField
            label="Pin this announcement"
            description="Pinned announcements appear at the top of the feed."
            checked={checked1}
            onCheckedChange={setChecked1}
          />
          <CheckboxField
            label="Notify all members"
            checked={checked2}
            onCheckedChange={setChecked2}
          />
          <CheckboxField
            label="Disabled option"
            checked={false}
            onCheckedChange={() => {}}
            disabled
          />
        </div>
      </section>

      {/* SwitchField */}
      <section className="p-6 md:p-12 flex flex-col gap-6 border-t border-ktp-border">
        <div>
          <SectionLabel>Switch / SwitchField — toggle control</SectionLabel>
          <p className="text-sm text-ktp-fg-body mt-1">
            Import from{' '}
            <code className="font-mono text-xs bg-ktp-bg-surface px-1 py-0.5 rounded">
              @/design-system/components/Switch
            </code>
            . Use bare <code className="font-mono text-xs">Switch</code> inside table cells.
            Use <code className="font-mono text-xs">SwitchField</code> when a label is needed.
          </p>
        </div>
        <div className="max-w-md space-y-6">
          <div className="flex items-center gap-3">
            <Switch checked={toggled} onCheckedChange={setToggled} />
            <span className="text-sm text-ktp-fg-body">Bare Switch (no label)</span>
          </div>
          <SwitchField
            label="Enable public profile"
            description="Your profile will be visible to other KTP members."
            checked={toggled}
            onCheckedChange={setToggled}
          />
          <SwitchField
            label="Admin access"
            checked={false}
            onCheckedChange={() => {}}
            disabled
          />
        </div>
      </section>
    </>
  )
}
