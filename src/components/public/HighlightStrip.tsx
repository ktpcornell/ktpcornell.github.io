import { Img } from '@/components/media/Img'

// Live index.html:107-139: col-lg-4 col-md-6 col-12 (3 across at 992px+, 2 at 768px+).

const highlights = [
  { src: 'images/classpictures/Fall2025BoysHappy.JPEG', alt: 'KTP members, Fall 2025' },
  { src: 'images/classpictures/2025eboard.JPG', alt: "KTP's 2025 executive board" },
  { src: 'images/classpictures/Fall2025GirlsHappy.jpeg', alt: 'More KTP members, Fall 2025' },
]

export function HighlightStrip() {
  return (
    <section className="highlight">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 min-[992px]:grid-cols-3 gap-0">
          {highlights.map((h) => (
            <div key={h.src}>
              <Img src={h.src} className="highlight-image" alt={h.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
