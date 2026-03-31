import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * KTP Typography components
 *
 * Heading — h1–h6 with consistent brand styling.
 * SmallTitle — uppercase label shown above section headings (like "About Us →").
 * SectionLabel — uppercase label used above demo blocks in design system docs.
 * Body — paragraph with ktp-fg-body color.
 * Caption — small utility text (metadata, timestamps, footnotes).
 */

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  color?: 'primary' | 'white' | 'default'
}

const headingColorMap = {
  primary: 'text-primary',
  white: 'text-white',
  default: '',
}

// All KTP heading styles live here — not in global CSS element selectors.
// Callers can override any property via className (tailwind-merge resolves conflicts).
// e.g. <Heading level={1} className="tracking-normal normal-case"> for a non-uppercase h1.
const headingSizeMap: Record<HeadingLevel, string> = {
  1: 'text-heading-1 font-bold tracking-[-2px] uppercase',
  2: 'text-heading-2 font-bold tracking-[-2px]',
  3: 'text-heading-3 font-bold tracking-[-1px]',
  4: 'text-heading-4 font-bold tracking-[-1px]',
  5: 'text-heading-5 font-bold leading-normal tracking-[-1px]',
  6: 'text-heading-6 font-bold tracking-[-1px]',
}

export function Heading({
  level = 2,
  color = 'default',
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as React.ElementType
  return (
    <Tag
      className={cn(headingSizeMap[level], headingColorMap[color], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

/** Uppercase label shown above major section headings */
export function SmallTitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('small-title text-xs font-semibold tracking-widest text-secondary mb-2', className)}
      {...props}
    />
  )
}

/** Uppercase label used above demo blocks in design system docs */
export function SectionLabel({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm font-semibold uppercase tracking-widest text-ktp-primary [&_code]:normal-case [&_code]:tracking-normal [&_code]:font-normal', className)} {...props} />
  )
}

export function Body({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-ktp-fg-body', className)} {...props} />
  )
}

export function Caption({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-xs text-ktp-fg-body', className)} {...props} />
  )
}
