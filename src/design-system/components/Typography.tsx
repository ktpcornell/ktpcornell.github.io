import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * KTP Typography components
 *
 * Heading — h1–h6 with consistent brand styling.
 * SmallTitle — uppercase label shown above section headings (like "About Us →").
 * SectionLabel — uppercase label used above demo blocks in design system docs.
 * Body — paragraph with ktp-muted color.
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

const headingSizeMap: Record<HeadingLevel, string> = {
  1: 'text-heading-1',
  2: 'text-heading-2',
  3: 'text-heading-3',
  4: 'text-heading-4',
  5: 'text-heading-5',
  6: 'text-heading-6',
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
    <p className={cn('text-xs font-semibold uppercase tracking-widest text-ktp-muted [&_code]:normal-case [&_code]:tracking-normal [&_code]:font-normal', className)} {...props} />
  )
}

export function Body({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-ktp-muted', className)} {...props} />
  )
}

export function Caption({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-xs text-ktp-muted', className)} {...props} />
  )
}
