import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * KTP Button variants — the authoritative button implementation.
 * Lives here (the ShadCN primitive layer) so the design-system wrapper stays thin.
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
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground border-2 border-primary hover:bg-secondary hover:text-secondary-foreground hover:border-secondary',
        secondary:
          'bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-white hover:border-white',
        outline:
          'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground',
        ghost:
          'bg-transparent text-primary border-2 border-transparent hover:bg-primary/10',
        transparent:
          'bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary',
        danger:
          'bg-destructive text-destructive-foreground border-2 border-destructive hover:bg-destructive/90 hover:border-destructive/90',
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

// Alias for ShadCN convention compatibility
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
