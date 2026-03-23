import { useEffect, useState } from 'react'
import { AlumniForm } from '@/components/admin/AlumniForm'
import { listAlumni, deleteAlumni } from '@/services/alumniService'
import type { AlumniEntry } from '@/types/alumni'
import { Button } from '@/design-system/components/Button'
import { FormField } from '@/design-system/components/FormField'

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
            <div className="w-8 h-8 border-4 border-ktp-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ktp-primary">
                  {['Name', 'Class', 'Grad Year', 'Company', 'Role', 'Actions'].map((h) => (
                    <th key={h} className="text-white text-left px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <tr
                    key={a.id}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-ktp-surface'}
                  >
                    <td className="px-4 py-3 font-medium">{a.name}</td>
                    <td className="px-4 py-3">{a.ktpClass}</td>
                    <td className="px-4 py-3">{a.graduationYear}</td>
                    <td className="px-4 py-3">{a.currentCompany}</td>
                    <td className="px-4 py-3">{a.currentRole}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="text-center py-8 text-ktp-muted">No alumni entries found.</p>
            )}
          </div>
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
