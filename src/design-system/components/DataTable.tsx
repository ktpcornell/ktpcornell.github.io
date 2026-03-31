import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * KTP DataTable — structured data table with KTP-styled chrome.
 *
 * Replaces raw <table> elements in admin pages. Always zebra-stripes rows
 * automatically via the `index` prop on DataTableRow.
 *
 * Usage:
 *   <DataTable>
 *     <DataTableHead>
 *       <tr><DataTableHeadCell>Name</DataTableHeadCell>...</tr>
 *     </DataTableHead>
 *     <DataTableBody>
 *       {items.map((item, i) => (
 *         <DataTableRow key={item.id} index={i}>
 *           <DataTableCell>{item.name}</DataTableCell>
 *           <DataTableCell variant="mono">{item.id}</DataTableCell>
 *           <DataTableCell variant="actions"><Button>Edit</Button></DataTableCell>
 *         </DataTableRow>
 *       ))}
 *     </DataTableBody>
 *   </DataTable>
 */

// ─── Wrapper ─────────────────────────────────────────────────────────────────

interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DataTable({ className, children, ...props }: DataTableProps) {
  return (
    <div
      className={cn('overflow-x-auto rounded-xl border border-ktp-border', className)}
      {...props}
    >
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  )
}

// ─── Head ─────────────────────────────────────────────────────────────────────

interface DataTableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function DataTableHead({ className, children, ...props }: DataTableHeadProps) {
  return (
    <thead className={cn('bg-ktp-primary', className)} {...props}>
      {children}
    </thead>
  )
}

// ─── Head Cell ────────────────────────────────────────────────────────────────

interface DataTableHeadCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right'
}

export function DataTableHeadCell({
  className,
  align = 'left',
  children,
  ...props
}: DataTableHeadCellProps) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-white font-semibold text-xs tracking-wide uppercase',
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}

// ─── Body ─────────────────────────────────────────────────────────────────────

interface DataTableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function DataTableBody({ className, children, ...props }: DataTableBodyProps) {
  return (
    <tbody className={cn('divide-y divide-ktp-border', className)} {...props}>
      {children}
    </tbody>
  )
}

// ─── Row ──────────────────────────────────────────────────────────────────────

interface DataTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Row index (0-based). Used to compute zebra-stripe background automatically. */
  index: number
}

export function DataTableRow({ className, index, children, ...props }: DataTableRowProps) {
  return (
    <tr
      className={cn(
        index % 2 === 0 ? 'bg-white' : 'bg-ktp-bg-surface',
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  )
}

// ─── Cell ─────────────────────────────────────────────────────────────────────

interface DataTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * default  — standard cell
   * mono     — monospace font, muted color (for IDs, timestamps)
   * actions  — wraps children in a flex row for action buttons
   */
  variant?: 'default' | 'mono' | 'actions'
}

export function DataTableCell({
  className,
  variant = 'default',
  children,
  ...props
}: DataTableCellProps) {
  return (
    <td
      className={cn(
        'px-4 py-3 align-middle',
        variant === 'mono' && 'font-mono text-xs text-ktp-fg-body',
        className,
      )}
      {...props}
    >
      {variant === 'actions' ? (
        <div className="flex items-center gap-2">{children}</div>
      ) : (
        children
      )}
    </td>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

interface DataTableEmptyStateProps {
  colSpan: number
  message?: string
}

export function DataTableEmptyState({
  colSpan,
  message = 'No results found.',
}: DataTableEmptyStateProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-10 text-center text-sm text-ktp-fg-body">
        {message}
      </td>
    </tr>
  )
}
