import type { AlumniEntry } from '@/types/alumni'

interface AlumniCardProps {
  alumni: AlumniEntry
}

export function AlumniCard({ alumni }: AlumniCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      {/* Header bar */}
      <div className="px-5 py-3" style={{ background: 'var(--navbar-bg-color)' }}>
        <h6 className="text-white font-bold mb-0">{alumni.name}</h6>
        <span className="text-xs" style={{ color: 'var(--primary-color)' }}>
          {alumni.ktpClass} Class · {alumni.graduationYear}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="font-semibold mb-1" style={{ color: 'var(--navbar-bg-color)', fontSize: 15 }}>
          {alumni.currentRole}
        </p>
        <p className="text-sm mb-2" style={{ color: 'var(--p-color)' }}>
          {alumni.currentCompany}
        </p>
        <p className="text-xs mb-3" style={{ color: 'var(--p-color)' }}>
          {alumni.major}
        </p>
        {alumni.linkedin && (
          <a
            href={alumni.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium"
            style={{ color: 'var(--primary-color)' }}
          >
            LinkedIn ↗
          </a>
        )}
      </div>
    </div>
  )
}
