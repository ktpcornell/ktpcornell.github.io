import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check } from 'lucide-react'

/**
 * KTP FormField — labeled input with optional error/helper text.
 * Wraps ShadCN Input + Label primitives for consistent accessibility.
 */

interface FormFieldProps extends React.ComponentProps<typeof Input> {
  label?: string
  error?: string
  helperText?: string
}

export function FormField({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: FormFieldProps) {
  const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label htmlFor={fieldId} className="text-primary">
          {label}
        </Label>
      )}
      <Input
        id={fieldId}
        className={cn(
          'rounded-lg',
          error && 'border-destructive focus-visible:ring-destructive',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-ktp-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-ktp-muted">{helperText}</p>
      )}
    </div>
  )
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  children: React.ReactNode
}

export function SelectField({
  label,
  error,
  className,
  id,
  children,
  ...props
}: SelectFieldProps) {
  const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label htmlFor={fieldId} className="text-primary">
          {label}
        </Label>
      )}
      <select
        id={fieldId}
        className={cn(
          'w-full px-3 py-2 h-10 rounded-lg border border-input bg-background text-sm outline-none transition-colors',
          'focus:border-primary focus:ring-2 focus:ring-ring focus:ring-offset-2',
          error && 'border-destructive',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-ktp-error">{error}</p>}
    </div>
  )
}

// ─── CheckboxField ────────────────────────────────────────────────────────────

interface CheckboxFieldProps {
  label: string
  description?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  id?: string
}

/**
 * KTP CheckboxField — accessible labeled checkbox.
 *
 * Replaces raw <input type="checkbox"> with proper label wiring and KTP styling.
 * Uses a visually custom checkbox so the checked state reflects ktp-primary.
 */
export function CheckboxField({
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
  id,
}: CheckboxFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('flex items-start gap-3', disabled && 'opacity-50 cursor-not-allowed')}>
      <div className="relative flex items-center mt-0.5 shrink-0">
        {/* DS-SKIP: native <input type="checkbox"> — @radix-ui/react-checkbox not installed;
            styled visually via hidden input + custom overlay to match ktp-primary */}
        <input
          type="checkbox"
          id={fieldId}
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={cn(
            'w-4 h-4 rounded border-2 border-input transition-colors flex items-center justify-center cursor-pointer',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
            checked ? 'bg-ktp-primary border-ktp-primary' : 'bg-white',
            disabled && 'cursor-not-allowed',
          )}
          onClick={() => !disabled && onCheckedChange(!checked)}
          aria-hidden="true"
        >
          {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <Label
          htmlFor={fieldId}
          className={cn('text-sm font-medium text-primary', !disabled && 'cursor-pointer')}
        >
          {label}
        </Label>
        {description && (
          <p className="text-xs text-ktp-muted">{description}</p>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function TextareaField({
  label,
  error,
  className,
  id,
  ...props
}: TextareaFieldProps) {
  const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label htmlFor={fieldId} className="text-primary">
          {label}
        </Label>
      )}
      <textarea
        id={fieldId}
        className={cn(
          'w-full px-3 py-2 rounded-lg border border-input bg-background text-sm outline-none transition-colors resize-none',
          'placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          error && 'border-destructive focus-visible:ring-destructive',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-ktp-error">{error}</p>}
    </div>
  )
}
