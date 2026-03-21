import { useState, type FormEvent } from 'react'
import { createAnnouncement, updateAnnouncement } from '@/services/announcementsService'
import { useAuth } from '@/hooks/useAuth'
import type { Announcement, AnnouncementFormData } from '@/types/announcement'

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
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ background: 'var(--navbar-bg-color)' }}>
          <h5 className="text-white mb-0">{existing ? 'Edit Announcement' : 'New Announcement'}</h5>
          <button onClick={onClose} className="text-white text-xl" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--navbar-bg-color)' }}>
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg outline-none"
              style={{ borderColor: '#e5e7eb' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--navbar-bg-color)' }}>
              Body
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={6}
              className="w-full px-4 py-2 border rounded-lg outline-none resize-none"
              style={{ borderColor: '#e5e7eb' }}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="pinned"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="pinned" className="text-sm font-medium" style={{ color: 'var(--navbar-bg-color)' }}>
              Pin this announcement (shows at top of feed)
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="custom-btn flex-1"
              style={{ opacity: saving ? 0.7 : 1 }}
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="custom-btn custom-border-btn flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
