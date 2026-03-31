import { useEffect, useState } from 'react'
import { AlumniForm } from '@/components/admin/AlumniForm'
import { listAlumni, deleteAlumni } from '@/services/alumniService'
import type { AlumniEntry } from '@/types/alumni'
import { Button } from '@/design-system/components/Button'
import { FormField } from '@/design-system/components/FormField'
import { Spinner } from '@/design-system/components/Spinner'
import {
  DataTable,
  DataTableHead,
  DataTableHeadCell,
  DataTableBody,
  DataTableRow,
  DataTableCell,
  DataTableEmptyState,
} from '@/design-system/components/DataTable'

export function AdminAlumniPage() {
  const [alumni, setAlumni] = useState<AlumniEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<AlumniEntry | undefined>()
  const [search, setSearch] = useState('')

  const load = () => {
    listAlumni()
      .then(setAlumni)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this alumni entry?')) return
    await deleteAlumni(id)
    load()
  }

  const filtered = search
    ? alumni.filter(
        (a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.currentCompany.toLowerCase().includes(search.toLowerCase()),
      )
    : alumni

  return (
    <div className="p-8 bg-ktp-surface min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-ktp-primary">Alumni Database</h2>
        <Button
          variant="primary"
          onClick={() => {
            setEditing(undefined)
            setShowForm(true)
          }}
        >
          + Add Alumni
        </Button>
      </div>

      <div className="max-w-sm mb-6">
        <FormField
          placeholder="Search name or company…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : (
        <DataTable>
          <DataTableHead>
            <tr>
              {['Name', 'Class', 'Grad Year', 'Company', 'Role', 'Actions'].map((h) => (
                <DataTableHeadCell key={h}>{h}</DataTableHeadCell>
              ))}
            </tr>
          </DataTableHead>
          <DataTableBody>
            {filtered.length === 0 && (
              <DataTableEmptyState colSpan={6} message="No alumni entries found." />
            )}
            {filtered.map((a, i) => (
              <DataTableRow key={a.id} index={i}>
                <DataTableCell className="font-medium">{a.name}</DataTableCell>
                <DataTableCell>{a.ktpClass}</DataTableCell>
                <DataTableCell>{a.graduationYear}</DataTableCell>
                <DataTableCell>{a.currentCompany}</DataTableCell>
                <DataTableCell>{a.currentRole}</DataTableCell>
                <DataTableCell variant="actions">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditing(a)
                      setShowForm(true)
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(a.id)}
                  >
                    Delete
                  </Button>
                </DataTableCell>
              </DataTableRow>
            ))}
          </DataTableBody>
        </DataTable>
      )}

      {showForm && (
        <AlumniForm
          existing={editing}
          onClose={() => setShowForm(false)}
          onSaved={load}
        />
      )}
    </div>
  )
}
