import { galleryImages } from '@/lib/constants'
import { SectionTitle } from '@/design-system/components/SectionTitle'

export function Gallery() {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <SectionTitle title="Gallery" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((src, i) => (
            <div key={i} className="gallery-image-wrapper">
              <img
                src={`/${src}`}
                alt={`KTP gallery photo ${i + 1}`}
                className="gallery-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
