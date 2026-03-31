import { cn } from '@/lib/utils'

/**
 * KTP SectionSeparator — visual divider between content sections.
 */
export function SectionSeparator({ className }: { className?: string }) {
  return (
    <hr className={cn('border-0 border-t border-ktp-border my-0', className)} />
  )
}
