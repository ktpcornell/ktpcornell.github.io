import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * KTP Card — container for grouping related information.
 *
 * Variants: default, flat (no shadow), navy (dark header style)
 */
export const ktpCardVariants = cva(
  'bg-white rounded-xl overflow-hidden',
  {
    variants: {
      variant: {
        default: 'shadow-sm border border-gray-100',
        flat: 'border border-gray-200',
        elevated: 'shadow-md border border-gray-100',
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

export function Card({ className, variant, ...props }: CardProps) {
  return (
    <div className={cn(ktpCardVariants({ variant }), className)} {...props} />
  )
}

/** Navy header bar used in portal/admin cards */
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-6 py-4 bg-ktp-navy flex items-center justify-between', className)}
      {...props}
    />
  )
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 py-5', className)} {...props} />
  )
}
