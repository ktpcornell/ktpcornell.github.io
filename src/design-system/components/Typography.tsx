import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * KTP Typography components
 *
 * Heading — h1–h6 with consistent brand styling.
 * SmallTitle — uppercase label shown above section headings (like "About Us →").
 * Body — paragraph with ktp-text color.
 * Caption — small utility text.
 */

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel
  color?: 'navy' | 'white' | 'default'
}

const headingColorMap = {
  navy: 'text-ktp-navy',
  white: 'text-white',
  default: '',
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
      className={cn(headingColorMap[color], className)}
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
      className={cn('small-title text-xs font-semibold tracking-widest text-ktp-cyan mb-2', className)}
      {...props}
    />
  )
}

export function Body({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-ktp-text', className)} {...props} />
  )
}

export function Caption({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-xs text-ktp-text', className)} {...props} />
  )
}
