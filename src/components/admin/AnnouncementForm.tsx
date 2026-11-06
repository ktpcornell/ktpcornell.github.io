import { useState, type FormEvent } from 'react'
import { createAnnouncement, updateAnnouncement } from '@/services/announcementsService'
import { useAuth } from '@/hooks/useAuth'
import type { Announcement, AnnouncementFormData } from '@/types/announcement'
import { Button } from '@/design-system/components/Button'
import { FormField, TextareaField, CheckboxField } from '@/design-system/components/FormField'
import { AlertBanner } from '@/design-system/components/AlertBanner'
import { KtpModal, KtpModalHeader, KtpModalBody, KtpModalFooter } from '@/design-system/components/Modal'

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
    <KtpModal open onClose={onClose}>
      <KtpModalHeader title={existing ? 'Edit Announcement' : 'New Announcement'} />
      <form onSubmit={handleSubmit}>
        <KtpModalBody>
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

          <CheckboxField
            label="Pin this announcement (shows at top of feed)"
            checked={pinned}
            onCheckedChange={setPinned}
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
