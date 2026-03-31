import { cn } from '@/lib/utils'
import { SmallTitle, Heading } from './Typography'

/**
 * KTP SectionTitle — consistent heading block for major page sections.
 *
 * Renders an optional small uppercase label, a main heading (h2 by default),
 * and an optional subtitle paragraph.
 */
interface SectionTitleProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  color?: 'primary' | 'white' | 'default'
  className?: string
}

export function SectionTitle({
  label,
  title,
  subtitle,
  align = 'center',
  color = 'primary',
  className,
}: SectionTitleProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align]

  const titleColorClass = {
    primary: 'text-ktp-primary',
    white: 'text-white',
    default: '',
  }[color]

  const subtitleColorClass = {
    primary: 'text-ktp-fg-body',
    white: 'text-ktp-fg-subtle',
    default: 'text-ktp-fg-body',
  }[color]

  return (
    <div className={cn('mb-8', alignClass, className)}>
      {label && <SmallTitle>{label}</SmallTitle>}
      <Heading level={2} className={cn('mb-3', titleColorClass)}>{title}</Heading>
      {subtitle && (
        <p className={cn('max-w-2xl', subtitleColorClass, align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
