import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

/**
 * KTP FormField — labeled input with optional error/helper text.
 */

interface FormFieldProps extends React.ComponentProps<'input'> {
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
        <label htmlFor={fieldId} className="text-sm font-medium leading-none text-ktp-primary">
          {label}
        </label>
      )}
      <input
        id={fieldId}
        className={cn(
          'flex h-10 w-full rounded-lg border border-ktp-border bg-white px-3 py-2 text-base',
          'placeholder:text-ktp-muted-fg focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-ktp-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          error && 'border-ktp-destructive focus-visible:ring-ktp-destructive',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-ktp-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-ktp-fg-body">{helperText}</p>
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
        <label htmlFor={fieldId} className="text-sm font-medium leading-none text-ktp-primary">
          {label}
        </label>
      )}
      <select
        id={fieldId}
        className={cn(
          'w-full px-3 py-2 h-10 rounded-lg border border-ktp-border bg-white text-sm outline-none transition-colors',
          'focus:border-ktp-primary focus:ring-2 focus:ring-ktp-ring focus:ring-offset-2',
          error && 'border-ktp-destructive',
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
            'w-4 h-4 rounded border-2 border-ktp-border transition-colors flex items-center justify-center cursor-pointer',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-ktp-ring peer-focus-visible:ring-offset-2',
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
        <label
          htmlFor={fieldId}
          className={cn('text-sm font-medium text-ktp-primary', !disabled && 'cursor-pointer')}
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-ktp-fg-body">{description}</p>
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
        <label htmlFor={fieldId} className="text-sm font-medium leading-none text-ktp-primary">
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        className={cn(
          'w-full px-3 py-2 rounded-lg border border-ktp-border bg-white text-sm outline-none transition-colors resize-none',
          'placeholder:text-ktp-muted-fg focus-visible:ring-2 focus-visible:ring-ktp-ring focus-visible:ring-offset-2',
          error && 'border-ktp-destructive focus-visible:ring-ktp-destructive',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-ktp-error">{error}</p>}
    </div>
  )
}
