import { placements } from '@/lib/constants'

export function PlacementsCloud() {
  return (
    <div className="text-center mb-8">
      <h2 className="mb-6">Chapter Placements</h2>
      <div className="placements-cloud flex flex-wrap justify-center gap-6">
        {placements.map((item, i) => (
          <div
            key={item.name}
            className="placement-logo"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <img src={`/images/network/${item.file}`} alt={`${item.name} logo`} />
          </div>
        ))}
      </div>
    </div>
  )
}
