import { Link } from 'react-router-dom'
import { Button } from '@/design-system/components/Button'
import { Heading } from '@/design-system/components/Typography'

export function HistorySection() {
  return (
    <section className="section-padding" id="our-history">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <Heading level={2} className="mb-4">Our History</Heading>
            <p className="mb-4">
              Kappa Theta Pi takes pride in being Cornell's first co-ed professional technology
              fraternity focused on the professional, social, and technological advancement of our
              members. Our members learn a plethora of skills needed to stay knowledgeable about
              the tech industry, as well as a strong sense of professional development for future
              job positions.
            </p>
            <p>
              KTP was founded on January 10, 2012 at the University of Michigan, with the mission
              to create a tech community that enthusiastic students could join. KTP was started in
              Spring 2025 at Cornell with the desire to create a group which not only supports
              members to develop technologically but also provides a close-knit community which
              helps members grow professionally and socially.
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
          <div className="mt-6 lg:mt-0">
            <img
              src="/images/classpictures/alphaclass.png"
              className="history-image w-full h-auto"
              alt="KTP Alpha Class"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
