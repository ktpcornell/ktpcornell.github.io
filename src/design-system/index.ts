/**
 * KTP Cornell Design System
 *
 * Import all design system components from here.
 * Do NOT import directly from src/components/ui/ in application code
 * unless you need a low-level ShadCN primitive not covered here.
 */

// Components
export { Button, ktpButtonVariants } from './components/Button'
export type { ButtonProps } from './components/Button'

export { IconButton, iconButtonVariants } from './components/IconButton'
export type { IconButtonProps } from './components/IconButton'

export { Badge, ktpBadgeVariants } from './components/Badge'
export type { BadgeProps } from './components/Badge'

export { Card, CardHeader, CardBody, ktpCardVariants } from './components/Card'
export type { CardProps } from './components/Card'

export { FormField, SelectField, TextareaField, CheckboxField } from './components/FormField'

export { Heading, SmallTitle, SectionLabel, Body, Caption } from './components/Typography'

export { SectionTitle } from './components/SectionTitle'

export { SectionSeparator } from './components/SectionSeparator'

export { AlertBanner } from './components/AlertBanner'

export { Spinner } from './components/Spinner'
export type { SpinnerProps } from './components/Spinner'

export {
  DataTable,
  DataTableHead,
  DataTableHeadCell,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableEmptyState,
} from './components/DataTable'

export {
  KtpModal,
  KtpModalHeader,
  KtpModalBody,
  KtpModalFooter,
} from './components/Modal'

export { Switch, SwitchField } from './components/Switch'
