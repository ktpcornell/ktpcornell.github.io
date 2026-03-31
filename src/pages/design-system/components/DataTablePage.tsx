import {
  DataTable,
  DataTableHead,
  DataTableHeadCell,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableEmptyState,
} from '@/design-system/components/DataTable'
import { Badge } from '@/design-system/components/Badge'
import { Button } from '@/design-system/components/Button'
import { SectionLabel } from '@/design-system/components/Typography'
import { Pencil, Trash2 } from 'lucide-react'

const DEMO_ROWS = [
  { id: 'u_abc123', name: 'Gabriel Castillo', role: 'Admin', status: 'Active' },
  { id: 'u_def456', name: 'Alice Zhang', role: 'Member', status: 'Active' },
  { id: 'u_ghi789', name: 'Ben Park', role: 'Member', status: 'Inactive' },
]

export function DataTablePage() {
  return (
    <>
      <section className="p-6 pt-12 md:p-12 border-b border-ktp-border">
        <h1 className="text-ktp-primary mb-2 tracking-normal normal-case">Data Table</h1>
        <p className="text-ktp-fg-body">
          Import from{' '}
          <code className="text-sm font-mono bg-ktp-bg-surface px-1.5 py-0.5 rounded text-ktp-primary">
            @/design-system/components/DataTable
          </code>
          . Replaces raw{' '}
          <code className="text-sm font-mono">{'<table>'}</code> elements in admin pages.
          Rows zebra-stripe automatically via the{' '}
          <code className="text-sm font-mono">index</code> prop.
        </p>
      </section>

      {/* Demo table */}
      <section className="p-6 md:p-12 flex flex-col gap-6 border-b border-ktp-border">
        <SectionLabel>Standard table with zebra rows</SectionLabel>
        <DataTable>
          <DataTableHead>
            <tr>
              <DataTableHeadCell>Name</DataTableHeadCell>
              <DataTableHeadCell>ID</DataTableHeadCell>
              <DataTableHeadCell>Role</DataTableHeadCell>
              <DataTableHeadCell>Status</DataTableHeadCell>
              <DataTableHeadCell align="right">Actions</DataTableHeadCell>
            </tr>
          </DataTableHead>
          <DataTableBody>
            {DEMO_ROWS.map((row, i) => (
              <DataTableRow key={row.id} index={i}>
                <DataTableCell>{row.name}</DataTableCell>
                <DataTableCell variant="mono">{row.id}</DataTableCell>
                <DataTableCell>
                  <Badge variant={row.role === 'Admin' ? 'navy' : 'gray'}>{row.role}</Badge>
                </DataTableCell>
                <DataTableCell>
                  <Badge variant={row.status === 'Active' ? 'cyan' : 'gray'}>{row.status}</Badge>
                </DataTableCell>
                <DataTableCell variant="actions">
                  <Button variant="ghost" size="sm" aria-label="Edit">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="danger" size="sm" aria-label="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTable>
      </section>

      {/* Empty state */}
      <section className="p-6 md:p-12 flex flex-col gap-6 border-b border-ktp-border">
        <SectionLabel>DataTableEmptyState — no results row</SectionLabel>
        <DataTable>
          <DataTableHead>
            <tr>
              <DataTableHeadCell>Name</DataTableHeadCell>
              <DataTableHeadCell>Role</DataTableHeadCell>
            </tr>
          </DataTableHead>
          <DataTableBody>
            <DataTableEmptyState colSpan={2} message="No members match your search." />
          </DataTableBody>
        </DataTable>
      </section>

      {/* API */}
      <section className="p-6 md:p-12 flex flex-col gap-4">
        <SectionLabel>Component API</SectionLabel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-ktp-border">
                <th className="text-left py-2 pr-4 font-semibold text-ktp-primary">Component</th>
                <th className="text-left py-2 pr-4 font-semibold text-ktp-primary">Key Props</th>
                <th className="text-left py-2 font-semibold text-ktp-primary">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ktp-border">
              {[
                ['DataTable', 'className?', 'Outer wrapper: overflow-x-auto + rounded-xl border'],
                ['DataTableHead', 'className?', 'Renders <thead> with bg-ktp-primary'],
                ['DataTableHeadCell', 'align? = "left"', 'Renders <th> with white text. align: left | center | right'],
                ['DataTableBody', 'className?', 'Renders <tbody> with dividers'],
                ['DataTableRow', 'index (required)', 'Auto zebra-stripe: even = white, odd = ktp-bg-surface'],
                ['DataTableCell', 'variant? = "default"', 'variant: default | mono | actions'],
                ['DataTableEmptyState', 'colSpan, message?', 'Full-width no-results row'],
              ].map(([comp, props, notes]) => (
                <tr key={comp}>
                  <td className="py-2 pr-4 font-mono text-xs text-ktp-primary">{comp}</td>
                  <td className="py-2 pr-4 font-mono text-xs text-ktp-fg-body">{props}</td>
                  <td className="py-2 text-xs text-ktp-fg-body">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-ktp-fg-body">
          <strong className="text-ktp-primary">Cell variants:</strong>{' '}
          <code className="font-mono text-xs">default</code> — plain text.{' '}
          <code className="font-mono text-xs">mono</code> — monospace, muted (IDs, timestamps).{' '}
          <code className="font-mono text-xs">actions</code> — wraps children in a flex row.
        </p>
      </section>
    </>
  )
}
