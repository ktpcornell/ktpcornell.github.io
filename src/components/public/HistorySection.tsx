import { Link } from 'react-router-dom'
import { Img } from '@/components/media/Img'
import { Button } from '@/design-system/components/Button'
import { Heading } from '@/design-system/components/Typography'

// Live index.html:142-170. The hero arrow scrolls here (#our-history).
export function HistorySection() {
  return (
    <section className="about section-padding" id="our-history">
      <div className="container mx-auto px-4">
        <Heading level={2} className="mb-4">Our History</Heading>
        <div className="grid grid-cols-1 min-[992px]:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              Kappa Theta Pi takes pride in being Cornell's first co-ed professional technology
              fraternity focused on the professional, social, and technological advancement of our
              members. Our members learn a plethora of skills needed to stay knowledgeable about
              the tech industry, as well as a strong sense of professional development for future
              job positions.
            </p>
            <p>
              KTP was founded on January 10, 2012 at the University of Michigan, with the mission
              to create a tech community that enthusiastic students could join. In making KTP, the
              founders set up a strong community that has only grown in the 11 years since its
              inception all around the country. KTP was started in Spring 2025 at Cornell with the
              desire to create a group which not only supports members to develop technologically
              but also provides a close-knit community which helps members grow professionally and
              socially.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link to="/about">About Us</Link>
              </Button>
              <Button variant="primary" asChild>
                <Link to="/join">Join Us</Link>
              </Button>
            </div>
          </div>
          <div className="mt-6 min-[992px]:mt-0">
            <Img
              src="images/classpictures/alphaclass.png"
              className="history-image w-full h-auto"
              alt="KTP's Alpha class"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
