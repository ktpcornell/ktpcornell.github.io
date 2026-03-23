import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * KTP Badge — compact pill for labels, roles, status, team affiliations.
 *
 * Variants: default, navy, cyan, pink, gray, warning, danger
 */
export const ktpBadgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-ktp-navy/10 text-ktp-navy',
        navy: 'bg-ktp-navy text-white',
        cyan: 'bg-ktp-cyan text-ktp-navy',
        pink: 'bg-ktp-pink text-ktp-navy',
        gray: 'bg-gray-100 text-gray-700',
        warning: 'bg-ktp-warning-bg text-ktp-warning-text',
        danger: 'bg-ktp-error-bg text-ktp-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof ktpBadgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(ktpBadgeVariants({ variant }), className)} {...props} />
  )
}
