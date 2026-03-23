import { PageWrapper } from '@/components/layout/PageWrapper'
import { HeroSection } from '@/components/public/HeroSection'
import { HighlightStrip } from '@/components/public/HighlightStrip'
import { HistorySection } from '@/components/public/HistorySection'
import { CallToAction } from '@/components/public/CallToAction'
import { PlacementsCloud } from '@/components/public/PlacementsCloud'
import { CampusCloud } from '@/components/public/CampusCloud'

export function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <HighlightStrip />
      <HistorySection />
      <CallToAction />
      <section className="section-padding bg-white" id="section_5">
        <div className="container mx-auto px-4">
          <PlacementsCloud />
          <CampusCloud />
        </div>
      </section>
    </PageWrapper>
  )
}
