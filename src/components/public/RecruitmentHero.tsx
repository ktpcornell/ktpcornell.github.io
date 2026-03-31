import { Heading } from '@/design-system/components/Typography'

export function RecruitmentHero() {
  return (
    <section className="recruitment-hero">
      <div className="container mx-auto px-4 text-center">
        <Heading level={1} className="text-white mb-3">RECRUITMENT</Heading>
        <p className="text-white text-xl">
          Join the nation's first professional tech fraternity
        </p>
      </div>
    </section>
  )
}
