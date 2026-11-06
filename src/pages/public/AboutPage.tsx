import { Link } from 'react-router-dom'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Img } from '@/components/media/Img'
import { ValuesSection } from '@/components/public/ValuesSection'
import { Gallery } from '@/components/public/Gallery'
import { TypedText } from '@/components/public/TypedText'
import { Button } from '@/design-system/components/Button'
import { Heading } from '@/design-system/components/Typography'

const ABOUT_PHRASES = ['innovators', 'engineers', 'leaders', 'developers', 'designers', 'problem solvers']

// Live about.html:80-112. The typing lives in <TypedText>, so this page renders once.
export function AboutPage() {
  return (
    <PageWrapper>
      <section className="about section-padding">
        <div className="container mx-auto px-4">
          <Heading level={2} className="mb-4 text-ktp-primary">
            We are <TypedText phrases={ABOUT_PHRASES} className="about-text" />
          </Heading>
          <div className="grid grid-cols-1 min-[992px]:grid-cols-2 gap-8">
            <div>
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
              <p className="mb-4">
                Our members come from all around campus. We are designers, analysts, computer
                scientists, engineers, artists, entrepreneurs, economists, philosophers,
                psychologists, and more. What makes the KTP community strong is our shared
                passion for technology and our unique backgrounds meshing together as one.
              </p>
              <p>
                KTP alumni are part of an extensive and tight-knit network that stretches across
                the country. They can be found from Seattle to New York, from Silicon Valley to
                Ithaca, in both startup companies and larger businesses. Our alumni provide
                valuable insight for our members’ professional development.
              </p>
              <Button variant="primary" asChild className="mt-4">
                <Link to="/join">Join Us</Link>
              </Button>
            </div>
            <div className="mt-6 min-[992px]:mt-0">
              <Img
                src="images/classpictures/Fall2025Happy.JPEG"
                className="history-image w-full h-auto"
                alt="KTP Cornell chapter, Fall 2025"
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
