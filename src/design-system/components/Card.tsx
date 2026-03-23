import * as React from 'react'
import { cn } from '@/lib/utils'
import { CardContent } from '@/components/ui/card'

/**
 * KTP Card — re-exports ShadCN Card primitives with KTP-specific additions.
 * The canonical Card/ktpCardVariants implementation lives in src/components/ui/card.tsx.
 *
 * CardHeader here is KTP-specific: a navy background title bar used in portal/admin cards.
 * It is intentionally different from ShadCN's CardHeader (a layout column — no background).
 * CardBody is an alias for CardContent with KTP's standard padding.
 */
export { Card, ktpCardVariants } from '@/components/ui/card'
export type { CardProps } from '@/components/ui/card'

/** Navy header bar used in portal/admin cards */
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-6 py-4 bg-primary flex items-center justify-between', className)}
      {...props}
    />
  )
}

/** Alias for ShadCN CardContent with KTP's standard padding */
export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <CardContent className={cn('px-6 py-5 pt-5', className)} {...props} />
  )
}
