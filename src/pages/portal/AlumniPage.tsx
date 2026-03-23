import { useMemo, useState } from 'react'
import { useAlumni } from '@/hooks/useAlumni'
import { AlumniSearch } from '@/components/members/AlumniSearch'
import { AlumniCard } from '@/components/members/AlumniCard'
export function AlumniPage() {
  const [search, setSearch] = useState('')
  const [filterClass, setFilterClass] = useState('')

  const { alumni, loading, error } = useAlumni(filterClass || undefined)

  const filtered = useMemo(() => {
    if (!search) return alumni
    const q = search.toLowerCase()
    return alumni.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.currentCompany.toLowerCase().includes(q) ||
        a.currentRole.toLowerCase().includes(q),
    )
  }, [alumni, search])

  return (
    <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 className="text-ktp-primary">Alumni Database</h2>
          <p>Browse and search KTP Cornell alumni.</p>
        </div>

        <AlumniSearch
          search={search}
          onSearchChange={setSearch}
          filterClass={filterClass}
          onFilterClassChange={setFilterClass}
        />

        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-ktp-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-red-500 text-center py-8">Failed to load alumni: {error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-12 text-ktp-muted">
            <p>No alumni found{search ? ' matching your search' : ''}.</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((a) => (
              <AlumniCard key={a.id} alumni={a} />
            ))}
          </div>
        )}
    </div>
  )
}
