import { useState, type FormEvent } from 'react'
import { createAlumni, updateAlumni } from '@/services/alumniService'
import type { AlumniEntry, AlumniFormData } from '@/types/alumni'
import { KTP_CLASSES } from '@/lib/constants'
import { Button } from '@/design-system/components/Button'
import { FormField, SelectField, TextareaField } from '@/design-system/components/FormField'
import { AlertBanner } from '@/design-system/components/AlertBanner'
import { KtpModal, KtpModalHeader, KtpModalBody, KtpModalFooter } from '@/design-system/components/Modal'

interface AlumniFormProps {
  existing?: AlumniEntry
  onClose: () => void
  onSaved: () => void
}

export function AlumniForm({ existing, onClose, onSaved }: AlumniFormProps) {
  const [form, setForm] = useState<AlumniFormData>({
    name: existing?.name ?? '',
    ktpClass: existing?.ktpClass ?? '',
    graduationYear: existing?.graduationYear ?? new Date().getFullYear(),
    major: existing?.major ?? '',
    currentCompany: existing?.currentCompany ?? '',
    currentRole: existing?.currentRole ?? '',
    linkedin: existing?.linkedin ?? '',
    email: existing?.email ?? '',
    notes: existing?.notes ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set =
    (key: keyof AlumniFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({
        ...f,
        [key]: key === 'graduationYear' ? Number(e.target.value) : e.target.value,
      }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (existing) {
        await updateAlumni(existing.id, form)
      } else {
        await createAlumni(form)
      }
      onSaved()
      onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <KtpModal open onClose={onClose}>
      <KtpModalHeader title={existing ? 'Edit Alumni Entry' : 'Add Alumni'} />
      <form onSubmit={handleSubmit}>
        <KtpModalBody>
          {error && <AlertBanner variant="error">{error}</AlertBanner>}

          {(
            [
              { key: 'name', label: 'Full Name', required: true },
              { key: 'major', label: 'Major', required: true },
              { key: 'currentCompany', label: 'Current Company', required: true },
              { key: 'currentRole', label: 'Current Role', required: true },
              { key: 'linkedin', label: 'LinkedIn URL', required: false },
              { key: 'email', label: 'Email', required: false },
            ] as { key: keyof AlumniFormData; label: string; required: boolean }[]
          ).map(({ key, label, required }) => (
            <FormField
              key={key}
              label={label}
              value={String(form[key] ?? '')}
              onChange={set(key)}
              required={required}
            />
          ))}

          <SelectField
            label="KTP Class"
            value={form.ktpClass}
            onChange={set('ktpClass')}
            required
          >
            <option value="">Select class…</option>
            {KTP_CLASSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectField>

          <FormField
            label="Graduation Year"
            type="number"
            value={form.graduationYear}
            onChange={set('graduationYear')}
            required
            min={2020}
            max={2035}
          />

          <TextareaField
            label="Internal Notes (admin only)"
            value={form.notes ?? ''}
            onChange={set('notes')}
            rows={3}
          />
        </KtpModalBody>
        <KtpModalFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </KtpModalFooter>
      </form>
    </KtpModal>
  )
}
