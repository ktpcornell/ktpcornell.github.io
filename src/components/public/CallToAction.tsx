import { Link } from 'react-router-dom'
import { Button } from '@/design-system/components/Button'
import { Heading } from '@/design-system/components/Typography'

export function CallToAction() {
  return (
    <section className="call-to-action section-padding">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <Heading level={2} className="text-white mb-4">Become a member?</Heading>
            <p className="text-white">
              Join the Brotherhood or learn more about the Recruitment and application process
              today!
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Button variant="transparent" asChild>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSftDj0bPM-wx-5rmwA937VZ9_Xs_tOjQRU82PmoF3tRaHULCg/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
              >
                Coffee Chat
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/join">Join Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
