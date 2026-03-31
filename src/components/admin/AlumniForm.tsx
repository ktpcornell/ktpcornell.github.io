import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { createAlumni, updateAlumni } from '@/services/alumniService'
import type { AlumniEntry, AlumniFormData } from '@/types/alumni'
import { KTP_CLASSES } from '@/lib/constants'
import { Button } from '@/design-system/components/Button'
import { FormField, SelectField, TextareaField } from '@/design-system/components/FormField'
import { AlertBanner } from '@/design-system/components/AlertBanner'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-8 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="px-6 py-4 bg-ktp-primary flex items-center justify-between">
          <h5 className="text-white mb-0">{existing ? 'Edit Alumni Entry' : 'Add Alumni'}</h5>
          {/* DS-SKIP: <button> — modal close icon-button; Button component adds px-4 py-2 that would resize the X icon region */}
          {/* DS-SKIP: hover:text-white/70 — opacity modifier for hover dim on dark bg; no ktp-* equivalent token */}
          <button
            onClick={onClose}
            className="text-white bg-transparent border-none cursor-pointer p-1 hover:text-white/70 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4 max-h-[70vh] overflow-y-auto">
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

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" disabled={saving} className="flex-1">
              {saving ? 'Saving…' : 'Save'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
