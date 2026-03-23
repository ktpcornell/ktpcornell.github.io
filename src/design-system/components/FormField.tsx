import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
        <p className="text-xs text-ktp-text">{helperText}</p>
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
