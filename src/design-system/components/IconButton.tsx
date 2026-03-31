import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * KTP IconButton — icon-only trigger with no text padding.
 *
 * Use this instead of Button when the clickable surface contains only an icon
 * (hamburger toggles, modal close buttons, copy icons, etc.). Button's px-6
 * padding is designed for text content and does not fit icon-only use cases.
 *
 * Variants:
 *   ghost    — navy icon, subtle hover bg. Default for light backgrounds.
 *   on-dark  — white icon, dims to ktp-fg-subtle on hover. For navy bars.
 */
export const iconButtonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-full transition-colors cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        ghost:
          'text-ktp-primary hover:bg-ktp-primary/10',
        'on-dark':
          'text-white hover:text-ktp-fg-subtle bg-transparent',
      },
      size: {
        sm:      'w-7 h-7 [&_svg]:size-4',
        default: 'w-9 h-9 [&_svg]:size-5',
        lg:      'w-10 h-10 [&_svg]:size-6',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'default',
    },
  },
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
  /** Accessible label — required for screen readers since there is no visible text */
  'aria-label': string
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
IconButton.displayName = 'IconButton'
