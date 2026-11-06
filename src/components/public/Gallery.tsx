import { Img } from '@/components/media/Img'
import { galleryImages } from '@/lib/constants'
import { SectionTitle } from '@/design-system/components/SectionTitle'

// Live about.html:177-179 and 325-348: section#section_5, col-6 col-md-4 col-lg-3, g-4.

export function Gallery() {
  return (
    <section className="section-padding" id="section_5">
      <div className="container mx-auto px-4">
        <SectionTitle title="Gallery" className="mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-3 min-[992px]:grid-cols-4 gap-6">
          {galleryImages.map((img) => (
            <div key={img.src} className="gallery-image-wrapper">
              <Img src={img.src} alt={img.alt} className="gallery-image" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
