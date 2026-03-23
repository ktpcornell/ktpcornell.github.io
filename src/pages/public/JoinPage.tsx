import { useEffect, useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { RecruitmentHero } from '@/components/public/RecruitmentHero'
import { RecruitmentTabs } from '@/components/public/RecruitmentTabs'
import { FaqAccordion } from '@/components/public/FaqAccordion'
import { fetchFaq } from '@/services/faqService'
import type { FaqItem } from '@/services/faqService'
import { Button } from '@/design-system/components/Button'
import { SectionTitle } from '@/design-system/components/SectionTitle'

export function JoinPage() {
  const [faqItems, setFaqItems] = useState<FaqItem[]>([])

  useEffect(() => {
    fetchFaq().then(setFaqItems).catch(() => {})
  }, [])

  return (
    <PageWrapper>
      <RecruitmentHero />

      {/* Intro */}
      <section className="section-padding">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle title="Spring 2026 Recruitment" />
          <p className="mb-6 max-w-2xl mx-auto">
            Thank you for your interest in becoming a member of Kappa Theta Pi. Applications
            for Spring 2026 will open Sunday, January 25th and close on Tuesday, February 3rd
            @ 11:59pm. You will be notified if you are invited for first-round interviews. For
            more updates, follow our instagram @ktpcornell!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <a
                href="https://forms.gle/AbQNh6rqBK94MRH18"
                target="_blank"
                rel="noopener noreferrer"
              >
                Interest Form
              </a>
            </Button>
            <Button variant="primary" asChild>
              <a
                href="https://forms.gle/cNQJKc8drtGXK74j9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Spring 26 Application
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Schedule tabs */}
      <section className="mb-12" id="section_4">
        <div className="container mx-auto px-4">
          <RecruitmentTabs />
        </div>
      </section>

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section className="section-padding bg-ktp-section-bg">
          <div className="container mx-auto px-4">
            <SectionTitle title="Frequently Asked Questions" />
            <FaqAccordion items={faqItems} />
          </div>
        </section>
      )}
    </PageWrapper>
  )
}
