import { campusClubs } from '@/lib/constants'

export function CampusCloud() {
  return (
    <div className="text-center mb-8">
      <h2 className="mb-6">Campus Involvements</h2>
      <div className="max-w-[1100px] mx-auto flex flex-wrap justify-center gap-6">
        {campusClubs.map((item, i) => (
          <div
            key={item.name}
            className="inline-block transition-transform duration-200 hover:scale-105"
            style={{ animationDelay: `${i * 50}ms`, animation: 'simple-fade-in 0.5s ease-out' }}
          >
            <img
              src={`/images/clubs/${item.file}`}
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
