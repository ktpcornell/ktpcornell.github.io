import { useState, type FormEvent } from 'react'
import { createAlumni, updateAlumni } from '@/services/alumniService'
import type { AlumniEntry, AlumniFormData } from '@/types/alumni'
import { KTP_CLASSES } from '@/lib/constants'

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

  const set = (key: keyof AlumniFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: key === 'graduationYear' ? Number(e.target.value) : e.target.value }))

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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-8" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between" style={{ background: 'var(--navbar-bg-color)' }}>
          <h5 className="text-white mb-0">{existing ? 'Edit Alumni Entry' : 'Add Alumni'}</h5>
          <button onClick={onClose} className="text-white text-xl" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4 max-h-96 overflow-y-auto">
          {error && <p className="text-red-500 text-sm">{error}</p>}

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
            <div key={key}>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--navbar-bg-color)' }}>
                {label}
              </label>
              <input
                value={String(form[key] ?? '')}
                onChange={set(key)}
                required={required}
                className="w-full px-4 py-2 border rounded-lg outline-none"
                style={{ borderColor: '#e5e7eb' }}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--navbar-bg-color)' }}>KTP Class</label>
            <select value={form.ktpClass} onChange={set('ktpClass')} required className="w-full px-4 py-2 border rounded-lg outline-none" style={{ borderColor: '#e5e7eb' }}>
              <option value="">Select class…</option>
              {KTP_CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--navbar-bg-color)' }}>Graduation Year</label>
            <input type="number" value={form.graduationYear} onChange={set('graduationYear')} required min={2020} max={2035} className="w-full px-4 py-2 border rounded-lg outline-none" style={{ borderColor: '#e5e7eb' }} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--navbar-bg-color)' }}>Internal Notes (admin only)</label>
            <textarea value={form.notes ?? ''} onChange={set('notes')} rows={3} className="w-full px-4 py-2 border rounded-lg outline-none resize-none" style={{ borderColor: '#e5e7eb' }} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="custom-btn flex-1" style={{ opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={onClose} className="custom-btn custom-border-btn flex-1">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
