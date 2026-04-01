import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * KTP Button variants — the authoritative button implementation.
 *
 * Variants:
 *   primary     — navy fill, white text. Default for primary CTAs.
 *   secondary   — cyan fill, navy text. For secondary CTAs.
 *   outline     — navy border + text, transparent fill.
 *   ghost       — no border, subtle hover. For nav items and low-emphasis actions.
 *   transparent — white border + text, for use over dark/image backgrounds.
 *   danger      — red fill, white text. For destructive actions.
 */
export const ktpButtonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full',
    'text-sm font-bold transition-colors no-underline cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ktp-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-ktp-primary text-white border-2 border-ktp-primary hover:bg-ktp-accent hover:text-ktp-primary hover:border-ktp-accent',
        secondary:
          'bg-ktp-accent text-ktp-primary border-2 border-ktp-accent hover:bg-white hover:border-white',
        outline:
          'bg-transparent text-ktp-primary border-2 border-ktp-primary hover:bg-ktp-primary hover:text-white',
        ghost:
          'bg-transparent text-ktp-primary border-2 border-transparent hover:bg-ktp-primary/10',
        transparent:
          'bg-transparent text-white border-2 border-white hover:bg-white hover:text-ktp-primary',
        danger:
          'bg-ktp-destructive text-white border-2 border-ktp-destructive hover:bg-ktp-destructive/90 hover:border-ktp-destructive/90',
      },
      size: {
        default: 'px-6 py-2.5',
        sm: 'px-4 py-1.5 text-xs',
        lg: 'px-8 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

// Alias kept for any existing code referencing buttonVariants
export const buttonVariants = ktpButtonVariants

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ktpButtonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(ktpButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
