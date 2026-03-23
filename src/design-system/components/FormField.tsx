import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * KTP FormField — labeled input/select/textarea with optional error state.
 * Replaces all inline-styled form inputs across admin and portal pages.
 */

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
        <label
          htmlFor={fieldId}
          className="text-sm font-medium text-ktp-navy"
        >
          {label}
        </label>
      )}
      <input
        id={fieldId}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors',
          'border-gray-200 focus:border-ktp-navy placeholder:text-ktp-text/60',
          error && 'border-ktp-error focus:border-ktp-error',
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
        <label htmlFor={fieldId} className="text-sm font-medium text-ktp-navy">
          {label}
        </label>
      )}
      <select
        id={fieldId}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors bg-white',
          'border-gray-200 focus:border-ktp-navy',
          error && 'border-ktp-error focus:border-ktp-error',
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
        <label htmlFor={fieldId} className="text-sm font-medium text-ktp-navy">
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors resize-none',
          'border-gray-200 focus:border-ktp-navy placeholder:text-ktp-text/60',
          error && 'border-ktp-error focus:border-ktp-error',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-ktp-error">{error}</p>}
    </div>
  )
}
