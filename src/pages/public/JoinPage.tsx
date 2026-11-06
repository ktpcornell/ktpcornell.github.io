import { PageWrapper } from '@/components/layout/PageWrapper'
import { RecruitmentHero } from '@/components/public/RecruitmentHero'
import { RecruitmentTabs } from '@/components/public/RecruitmentTabs'
import { RecruitmentCountdown } from '@/components/public/RecruitmentCountdown'
import { FaqAccordion } from '@/components/public/FaqAccordion'
import { getFaq } from '@/data/faq'
import {
  APPLICATION_FORM,
  COUNTDOWN_CLOSED_MESSAGE,
  COUNTDOWN_EVENTS,
  INTEREST_FORM,
  RECRUITMENT_INTRO,
  RECRUITMENT_TITLE,
} from '@/content/recruitment'
import { Button } from '@/design-system/components/Button'
import { SectionTitle } from '@/design-system/components/SectionTitle'

export function JoinPage() {
  const faqItems = getFaq()

  return (
    <PageWrapper>
      <RecruitmentHero />

      {/* Intro (live join.html:98-118) */}
      <section className="section-padding">
        <div className="container mx-auto px-4 text-center">
          <SectionTitle title={RECRUITMENT_TITLE} />
          <p className="mb-6">{RECRUITMENT_INTRO}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <a href={INTEREST_FORM.href} target="_blank" rel="noopener noreferrer">
                {INTEREST_FORM.label}
              </a>
            </Button>
            <Button variant="primary" asChild>
              <a href={APPLICATION_FORM.href} target="_blank" rel="noopener noreferrer">
                {APPLICATION_FORM.label}
              </a>
            </Button>
          </div>
          <RecruitmentCountdown events={COUNTDOWN_EVENTS} closedMessage={COUNTDOWN_CLOSED_MESSAGE} />
        </div>
      </section>

      {/* Schedule tabs */}
      <section className="mb-12" id="section_4">
        <div className="container mx-auto px-4">
          <RecruitmentTabs />
        </div>
      </section>

      {/* FAQ (live join.html:381): white, full container width, plain rows. Always rendered,
          heading included, even with no items. */}
      <section className="pb-16" id="faq">
        <div className="container mx-auto px-4">
          <SectionTitle title="Frequently Asked Questions" />
          {faqItems.length > 0 && <FaqAccordion items={faqItems} />}
        </div>
      </section>
    </PageWrapper>
  )
}
