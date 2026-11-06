import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * KTP AlertBanner — styled alert/callout block.
 *
 * Variants: error, warning, info
 */
interface AlertBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'error' | 'warning' | 'info'
}

const variantStyles = {
  error: 'bg-ktp-error-bg border-l-ktp-error text-ktp-error',
  warning: 'bg-ktp-warning-bg border-l-ktp-warning-border text-ktp-warning-text',
  info: 'bg-ktp-bg-surface border-l-ktp-accent text-ktp-primary',
}

export function AlertBanner({
  variant = 'info',
  className,
  children,
  ...props
}: AlertBannerProps) {
  return (
    <div
      className={cn(
        'px-4 py-3 rounded-lg text-sm border-l-4',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
