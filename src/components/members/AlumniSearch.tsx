import { KTP_CLASSES } from '@/lib/constants'

interface AlumniSearchProps {
  search: string
  onSearchChange: (v: string) => void
  filterClass: string
  onFilterClassChange: (v: string) => void
}

export function AlumniSearch({
  search,
  onSearchChange,
  filterClass,
  onFilterClassChange,
}: AlumniSearchProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <input
        type="text"
        placeholder="Search by name or company…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 min-w-48 px-4 py-3 rounded-lg border outline-none"
        style={{ borderColor: '#e5e7eb', fontSize: 15 }}
        onFocus={(e) => { e.target.style.borderColor = 'var(--primary-color)' }}
        onBlur={(e) => { e.target.style.borderColor = '#e5e7eb' }}
      />
      <select
        value={filterClass}
        onChange={(e) => onFilterClassChange(e.target.value)}
        className="px-4 py-3 rounded-lg border outline-none"
        style={{ borderColor: '#e5e7eb', fontSize: 15, minWidth: 160 }}
      >
        <option value="">All Classes</option>
        {KTP_CLASSES.map((c) => (
          <option key={c} value={c}>
            {c} Class
          </option>
        ))}
      </select>
    </div>
  )
}
