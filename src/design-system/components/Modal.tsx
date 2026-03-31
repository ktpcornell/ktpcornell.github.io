import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IconButton } from './IconButton'

/**
 * KTP Modal — accessible modal dialog with KTP-branded chrome.
 *
 * Built on Radix Dialog for focus-trap, scroll-lock, and aria-modal behavior.
 * All visual styling uses KTP design tokens — no raw colors or opacity hacks.
 *
 * Usage:
 *   <KtpModal open={open} onClose={() => setOpen(false)}>
 *     <KtpModalHeader title="Edit Announcement" />
 *     <KtpModalBody>
 *       <FormField label="Title" ... />
 *     </KtpModalBody>
 *     <KtpModalFooter>
 *       <Button variant="outline" onClick={onClose}>Cancel</Button>
 *       <Button onClick={handleSave}>Save</Button>
 *     </KtpModalFooter>
 *   </KtpModal>
 */

// ─── Context ──────────────────────────────────────────────────────────────────

const KtpModalContext = React.createContext<{ onClose: () => void }>({
  onClose: () => {},
})

// ─── Root ─────────────────────────────────────────────────────────────────────

const maxWidthMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

interface KtpModalProps {
  open: boolean
  onClose: () => void
  maxWidth?: keyof typeof maxWidthMap
  children: React.ReactNode
}

export function KtpModal({ open, onClose, maxWidth = 'lg', children }: KtpModalProps) {
  return (
    <KtpModalContext.Provider value={{ onClose }}>
      <DialogPrimitive.Root open={open} onOpenChange={(val) => !val && onClose()}>
        <DialogPrimitive.Portal>
          {/* Overlay */}
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ktp-overlay" />
          {/* Panel */}
          <DialogPrimitive.Content
            className={cn(
              'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
              'w-full mx-4 rounded-2xl shadow-xl overflow-hidden bg-white',
              maxWidthMap[maxWidth],
            )}
            aria-describedby={undefined}
          >
            {children}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </KtpModalContext.Provider>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

interface KtpModalHeaderProps {
  title: string
  className?: string
}

export function KtpModalHeader({ title, className }: KtpModalHeaderProps) {
  const { onClose } = React.useContext(KtpModalContext)
  return (
    <div
      className={cn(
        'flex items-center justify-between px-6 py-4 bg-ktp-primary',
        className,
      )}
    >
      <DialogPrimitive.Title asChild>
        <p className="text-white font-semibold text-base">{title}</p>
      </DialogPrimitive.Title>
      <IconButton
        variant="on-dark"
        size="sm"
        aria-label="Close modal"
        onClick={onClose}
      >
        <X />
      </IconButton>
    </div>
  )
}

// ─── Body ─────────────────────────────────────────────────────────────────────

interface KtpModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function KtpModalBody({ className, children, ...props }: KtpModalBodyProps) {
  return (
    <div
      className={cn('px-6 py-6 space-y-4 max-h-[70vh] overflow-y-auto', className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

interface KtpModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function KtpModalFooter({ className, children, ...props }: KtpModalFooterProps) {
  return (
    <div
      className={cn('flex items-center justify-end gap-3 px-6 py-4 border-t border-ktp-ui-border', className)}
      {...props}
    >
      {children}
    </div>
  )
}
