import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Switch as SwitchPrimitive } from '@/components/ui/switch'

/**
 * KTP Switch — re-export of the ShadCN Switch primitive (already styled to ktp-primary).
 *
 * Use Switch directly when no label is needed (e.g. inside a table cell).
 * Use SwitchField when you need a labeled, accessible toggle.
 */
export { SwitchPrimitive as Switch }
export type { React }

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
      <SwitchPrimitive
        id={fieldId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      <div className="flex flex-col gap-0.5">
        <Label htmlFor={fieldId} className="text-sm font-medium text-primary cursor-pointer">
          {label}
        </Label>
        {description && (
          <p className="text-xs text-ktp-fg-body">{description}</p>
        )}
      </div>
    </div>
  )
}
