import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * KTP Badge variants — authoritative badge implementation.
 * Lives here (the ShadCN primitive layer) so the design-system wrapper stays thin.
 *
 * Variants: default, navy, cyan, pink, gray, warning, danger
 */
export const ktpBadgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary',
        navy:    'bg-primary text-primary-foreground',
        cyan:    'bg-secondary text-secondary-foreground',
        pink:    'bg-ktp-accent-pink text-primary',
        gray:    'bg-gray-100 text-gray-700',
        warning: 'bg-ktp-warning-bg text-ktp-warning-text',
        danger:  'bg-ktp-error-bg text-ktp-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

// Alias for ShadCN convention compatibility
export const badgeVariants = ktpBadgeVariants

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof ktpBadgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(ktpBadgeVariants({ variant }), className)} {...props} />
  )
}
