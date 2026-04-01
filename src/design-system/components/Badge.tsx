import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * KTP Badge — status chips and tags.
 *
 * Variants: default, navy, cyan, pink, gray, warning, danger
 */
export const ktpBadgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-ktp-primary/10 text-ktp-primary',
        navy:    'bg-ktp-primary text-white',
        cyan:    'bg-ktp-accent text-ktp-primary',
        pink:    'bg-ktp-accent-pink text-ktp-primary',
        gray:    'bg-ktp-bg-hover text-ktp-fg-body',
        warning: 'bg-ktp-warning-bg text-ktp-warning-text',
        danger:  'bg-ktp-error-bg text-ktp-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

// Alias kept for any existing code referencing badgeVariants
export const badgeVariants = ktpBadgeVariants

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof ktpBadgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(ktpBadgeVariants({ variant }), className)} {...props} />
  )
}
