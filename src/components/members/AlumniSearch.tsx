import { KTP_CLASSES } from '@/lib/constants'
import { FormField, SelectField } from '@/design-system/components/FormField'

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
      <div className="flex-1 min-w-48">
        <FormField
          placeholder="Search by name or company…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="min-w-40">
        <SelectField
          value={filterClass}
          onChange={(e) => onFilterClassChange(e.target.value)}
        >
          <option value="">All Classes</option>
          {KTP_CLASSES.map((c) => (
            <option key={c} value={c}>
              {c} Class
            </option>
          ))}
        </SelectField>
      </div>
    </div>
  )
}
