import { FormField, SelectField } from '@/design-system/components/FormField'

export function FormFieldsPage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-gray-200">
        <h1 className="text-ktp-primary mb-2">Form Fields</h1>
        <p className="text-ktp-muted">
          Import from{' '}
          <code className="text-sm font-mono bg-ktp-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/design-system/components/FormField
          </code>
          . Exports <code className="text-sm font-mono">FormField</code>,{' '}
          <code className="text-sm font-mono">SelectField</code>, and{' '}
          <code className="text-sm font-mono">TextareaField</code>. All accept a{' '}
          <code className="text-sm font-mono">label</code>, <code className="text-sm font-mono">error</code>, and{' '}
          <code className="text-sm font-mono">helperText</code> prop.
        </p>
      </section>

      <section className="p-6 md:p-12 flex flex-col gap-8">
        <div>
          <p className="text-sm text-ktp-muted mb-4">Text inputs</p>
          <div className="max-w-md space-y-4">
            <FormField label="Full Name" placeholder="Gabriel Castillo" />
            <FormField label="Email" type="email" placeholder="you@cornell.edu" />
          </div>
        </div>

        <div>
          <p className="text-sm text-ktp-muted mb-4">With error state</p>
          <div className="max-w-md">
            <FormField
              label="LinkedIn URL"
              placeholder="https://linkedin.com/in/..."
              error="Please enter a valid URL"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-ktp-muted mb-4">Select field</p>
          <div className="max-w-md">
            <SelectField label="KTP Class">
              <option value="">Select class…</option>
              <option value="alpha">Alpha</option>
              <option value="beta">Beta</option>
            </SelectField>
          </div>
        </div>
      </section>
    </>
  )
}
