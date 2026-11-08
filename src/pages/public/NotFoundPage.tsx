import { Link, useLocation } from 'react-router-dom'

import { PageWrapper } from '@/components/layout/PageWrapper'
import { Button } from '@/design-system/components/Button'

/**
 * Shown for any address that isn't a page (GitHub Pages serves 404.html, a copy of the
 * app, for unknown paths, and the router lands here). Replaces the old silent redirect to
 * Home, which made a mistyped or outdated link look like it went to the wrong place.
 */
export function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <PageWrapper>
      <section className="section-padding">
        <div className="container mx-auto flex min-h-[55vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
          <p className="mb-2 text-7xl font-bold text-ktp-primary md:text-8xl">404</p>
          <h1 className="mb-4 text-2xl font-bold text-ktp-dark md:text-3xl">This page doesn&apos;t exist</h1>
          <p className="mb-2 text-base text-ktp-text">
            The link may be old or mistyped. Nothing lives at{' '}
            <span className="break-all font-semibold">{pathname}</span>.
          </p>
          <p className="mb-8 text-base text-ktp-text">Here&apos;s where you can go instead:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="primary" asChild>
              <Link to="/">Back to home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/members">Members</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/join">Join KTP</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
