import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual size of the spinner. Defaults to 'md'. */
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}

/**
 * Spinner — loading indicator using the KTP accent color.
 *
 * Does not include a centering wrapper — the caller owns layout.
 * Use `size` to choose between sm (w-5), md (w-8, default), or lg (w-12).
 */
export function Spinner({ size = 'md', className, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        'rounded-full animate-spin border-4 border-ktp-accent border-t-transparent',
        sizeMap[size],
        className
      )}
      role="status"
      aria-label="Loading"
      {...props}
    />
  )
}
