import { Link } from 'react-router-dom'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { ValuesSection } from '@/components/public/ValuesSection'
import { Gallery } from '@/components/public/Gallery'
import { useTypingEffect } from '@/hooks/useTypingEffect'

const ABOUT_PHRASES = ['innovators', 'engineers', 'leaders', 'developers', 'designers', 'problem solvers']

export function AboutPage() {
  const typedText = useTypingEffect({ phrases: ABOUT_PHRASES })

  return (
    <PageWrapper>
      {/* About section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="mb-4" style={{ color: 'var(--navbar-bg-color)' }}>
                We are{' '}
                <span className="about-typing text-ktp-cyan">{typedText}</span>
              </h2>
              <p className="mb-4">
                Kappa Theta Pi takes pride in being the first professional technology fraternity
                in the country. Our members learn a plethora of skills needed to stay
                knowledgeable about the tech industry, as well as a strong sense of professional
                development for future job positions.
              </p>
              <p className="mb-4">
                KTP was founded on January 10, 2012 at University of Michigan, with the mission
                to create a tech community that enthusiastic students could join. In making KTP,
                the founders set up a strong community that has only grown since its inception.
              </p>
              <p>
                Our members come from all around campus. We are designers, analysts, computer
                scientists, engineers, artists, entrepreneurs, economists, philosophers,
                psychologists, and more. What makes the KTP community strong is our shared
                passion for technology and our unique backgrounds meshing together as one.
              </p>
              <Link to="/join" className="custom-btn mt-4 inline-block">
                Join Us
              </Link>
            </div>
            <div className="mt-6 lg:mt-0">
              <img
                src="/images/classpictures/Fall2025Happy.JPEG"
                className="img-fluid history-image w-full"
                alt="KTP members"
              />
            </div>
          </div>
        </div>
      </section>

      <ValuesSection />
      <Gallery />
    </PageWrapper>
  )
}
