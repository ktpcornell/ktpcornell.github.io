import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

/**
 * KTP Switch — thin wrapper around @radix-ui/react-switch.
 *
 * Use Switch directly when no label is needed (e.g. inside a table cell).
 * Use SwitchField when you need a labeled, accessible toggle.
 */
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
      'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ktp-ring',
      'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-ktp-primary data-[state=unchecked]:bg-ktp-border',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

interface SwitchFieldProps {
  label: string
  description?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  id?: string
}

export function SwitchField({
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
  id,
}: SwitchFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex items-center gap-3">
      <Switch
        id={fieldId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      <div className="flex flex-col gap-0.5">
        <label htmlFor={fieldId} className="text-sm font-medium text-ktp-primary cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-ktp-fg-body">{description}</p>
        )}
      </div>
    </div>
  )
}
