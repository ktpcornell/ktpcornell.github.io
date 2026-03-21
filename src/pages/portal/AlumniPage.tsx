import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/services/authService'
import { useAlumni } from '@/hooks/useAlumni'
import { AlumniSearch } from '@/components/members/AlumniSearch'
import { AlumniCard } from '@/components/members/AlumniCard'

export function AlumniPage() {
  const { appUser } = useAuth()
  const navigate = useNavigate()
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

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--section-bg-color)' }}>
      {/* Portal navbar */}
      <nav style={{ background: 'var(--navbar-bg-color)' }} className="sticky top-0 z-50 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex flex-col items-center no-underline">
            <img src="/navbarlogo.png" alt="KTP" style={{ height: 36 }} />
            <span className="text-white" style={{ fontSize: 11 }}>Member Portal</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/portal" className="text-white font-medium hover:text-ktp-cyan transition-colors" style={{ fontSize: 15 }}>
              Announcements
            </Link>
            <Link to="/portal/alumni" className="font-medium hover:text-ktp-cyan transition-colors" style={{ fontSize: 15, color: 'var(--primary-color)' }}>
              Alumni
            </Link>
            <Link to="/" className="text-white font-medium hover:text-ktp-cyan transition-colors" style={{ fontSize: 15 }}>
              Public Site
            </Link>
            {appUser?.isAdmin && (
              <Link to="/admin" className="font-medium hover:text-ktp-cyan transition-colors" style={{ fontSize: 15, color: 'var(--primary-color)' }}>
                Admin
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-full text-sm font-bold"
              style={{ background: 'var(--primary-color)', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h2 style={{ color: 'var(--navbar-bg-color)' }}>Alumni Database</h2>
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
            <div className="w-8 h-8 border-4 border-ktp-cyan border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-red-500 text-center py-8">Failed to load alumni: {error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-12" style={{ color: 'var(--p-color)' }}>
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
    </div>
  )
}
