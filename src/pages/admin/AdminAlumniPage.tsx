import { useEffect, useState } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AlumniForm } from '@/components/admin/AlumniForm'
import { listAlumni, deleteAlumni } from '@/services/alumniService'
import type { AlumniEntry } from '@/types/alumni'

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

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this alumni entry?')) return
    await deleteAlumni(id)
    load()
  }

  const filtered = search
    ? alumni.filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.currentCompany.toLowerCase().includes(search.toLowerCase()),
      )
    : alumni

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-8" style={{ background: 'var(--section-bg-color)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ color: 'var(--navbar-bg-color)' }}>Alumni Database</h2>
          <button className="custom-btn" onClick={() => { setEditing(undefined); setShowForm(true) }}>
            + Add Alumni
          </button>
        </div>

        <input
          placeholder="Search name or company…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 py-2 border rounded-lg outline-none mb-6"
          style={{ borderColor: '#e5e7eb' }}
        />

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-ktp-cyan border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--navbar-bg-color)' }}>
                  {['Name', 'Class', 'Grad Year', 'Company', 'Role', 'Actions'].map((h) => (
                    <th key={h} className="text-white text-left px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <tr key={a.id} style={{ background: i % 2 === 0 ? '#fff' : 'var(--section-bg-color)' }}>
                    <td className="px-4 py-3 font-medium">{a.name}</td>
                    <td className="px-4 py-3">{a.ktpClass}</td>
                    <td className="px-4 py-3">{a.graduationYear}</td>
                    <td className="px-4 py-3">{a.currentCompany}</td>
                    <td className="px-4 py-3">{a.currentRole}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditing(a); setShowForm(true) }}
                          className="text-xs px-2 py-1 rounded border"
                          style={{ color: 'var(--navbar-bg-color)', borderColor: 'var(--navbar-bg-color)', background: 'none', cursor: 'pointer' }}
                        >Edit</button>
                        <button
                          onClick={() => handleDelete(a.id)}
                          className="text-xs px-2 py-1 rounded border"
                          style={{ color: '#dc2626', borderColor: '#dc2626', background: 'none', cursor: 'pointer' }}
                        >Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="text-center py-8" style={{ color: 'var(--p-color)' }}>No alumni entries found.</p>
            )}
          </div>
        )}
      </div>

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
