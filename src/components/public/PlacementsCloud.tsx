import { placements } from '@/lib/constants'

export function PlacementsCloud() {
  return (
    <div className="text-center mb-8">
      <h2 className="mb-6">Chapter Placements</h2>
      <div className="max-w-[1100px] mx-auto flex flex-wrap justify-center gap-6">
        {placements.map((item, i) => (
          <div
            key={item.name}
            className="inline-block transition-transform duration-200 hover:scale-105"
            style={{ animationDelay: `${i * 50}ms`, animation: 'simple-fade-in 0.5s ease-out' }}
          >
            <img
              src={`/images/network/${item.file}`}
              alt={`${item.name} logo`}
              className="max-h-12 max-w-[120px] min-w-[40px] w-auto object-contain"
              style={{ filter: 'grayscale(10%)' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
