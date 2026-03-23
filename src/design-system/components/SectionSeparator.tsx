import { cn } from '@/lib/utils'

/**
 * KTP SectionSeparator — visual divider between content sections.
 */
export function SectionSeparator({ className }: { className?: string }) {
  return (
    <hr className={cn('border-0 border-t border-gray-200 my-0', className)} />
  )
}
