import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * KTP Card — container with optional navy header bar.
 *
 * CardHeader — navy background title bar used in portal/admin cards.
 * CardBody — padded content area.
 */

export const ktpCardVariants = cva(
  'bg-white text-ktp-primary rounded-xl overflow-hidden',
  {
    variants: {
      variant: {
        default:  'shadow-sm border border-ktp-border',
        flat:     'border border-ktp-border',
        elevated: 'shadow-md border border-ktp-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ktpCardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(ktpCardVariants({ variant }), className)}
      {...props}
    />
  ),
)
Card.displayName = 'Card'

/** Navy header bar used in portal/admin cards */
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-6 py-4 bg-ktp-primary flex items-center justify-between', className)}
      {...props}
    />
  )
}

/** Padded content area */
export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 py-5', className)} {...props} />
  )
}
