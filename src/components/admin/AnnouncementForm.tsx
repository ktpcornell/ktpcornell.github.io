import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { createAnnouncement, updateAnnouncement } from '@/services/announcementsService'
import { useAuth } from '@/hooks/useAuth'
import type { Announcement, AnnouncementFormData } from '@/types/announcement'
import { Button } from '@/design-system/components/Button'
import { FormField, TextareaField } from '@/design-system/components/FormField'
import { AlertBanner } from '@/design-system/components/AlertBanner'

interface AnnouncementFormProps {
  existing?: Announcement
  onClose: () => void
  onSaved: () => void
}

export function AnnouncementForm({ existing, onClose, onSaved }: AnnouncementFormProps) {
  const { currentUser, appUser } = useAuth()
  const [title, setTitle] = useState(existing?.title ?? '')
  const [body, setBody] = useState(existing?.body ?? '')
  const [pinned, setPinned] = useState(existing?.pinned ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!currentUser) return
    setSaving(true)
    setError('')

    const data: AnnouncementFormData = { title, body, pinned }

    try {
      if (existing) {
        await updateAnnouncement(existing.id, data)
      } else {
        await createAnnouncement(
          data,
          currentUser.uid,
          appUser?.displayName ?? currentUser.email ?? 'Admin',
        )
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-ktp-primary flex items-center justify-between">
          <h5 className="text-white mb-0">{existing ? 'Edit Announcement' : 'New Announcement'}</h5>
          <button
            onClick={onClose}
            className="text-white bg-transparent border-none cursor-pointer p-1 hover:text-white/70 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {error && <AlertBanner variant="error">{error}</AlertBanner>}

          <FormField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextareaField
            label="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={6}
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="pinned"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="w-4 h-4 accent-ktp-primary"
            />
            <label htmlFor="pinned" className="text-sm font-medium text-ktp-primary">
              Pin this announcement (shows at top of feed)
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              disabled={saving}
              className="flex-1"
            >
              {saving ? 'Saving…' : 'Save'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
