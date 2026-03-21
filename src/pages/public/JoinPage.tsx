import { useEffect, useState } from 'react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { RecruitmentHero } from '@/components/public/RecruitmentHero'
import { RecruitmentTabs } from '@/components/public/RecruitmentTabs'
import { FaqAccordion } from '@/components/public/FaqAccordion'
import { fetchFaq } from '@/services/faqService'
import type { FaqItem } from '@/services/faqService'

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
          <h2 className="mb-4" style={{ color: 'var(--navbar-bg-color)' }}>
            Spring 2026 Recruitment
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Thank you for your interest in becoming a member of Kappa Theta Pi. Applications
            for Spring 2026 will open Sunday, January 25th and close on Tuesday, February 3rd
            @ 11:59pm. You will be notified if you are invited for first-round interviews. For
            more updates, follow our instagram @ktpcornell!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://forms.gle/AbQNh6rqBK94MRH18"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-btn custom-border-btn"
            >
              Interest Form
            </a>
            <a
              href="https://forms.gle/cNQJKc8drtGXK74j9"
              target="_blank"
              rel="noopener noreferrer"
              className="custom-btn"
            >
              Spring 26 Application
            </a>
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
        <section className="section-padding" style={{ background: 'var(--section-bg-color)' }}>
          <div className="container mx-auto px-4">
            <h2
              className="text-center mb-8"
              style={{ color: 'var(--navbar-bg-color)' }}
            >
              Frequently Asked Questions
            </h2>
            <FaqAccordion items={faqItems} />
          </div>
        </section>
      )}
    </PageWrapper>
  )
}
