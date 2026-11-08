import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { HomePage } from '@/pages/public/HomePage'
import { AboutPage } from '@/pages/public/AboutPage'
import { MembersPage } from '@/pages/public/MembersPage'
import { JoinPage } from '@/pages/public/JoinPage'
import { NotFoundPage } from '@/pages/public/NotFoundPage'
import { PrivacyPage } from '@/pages/public/PrivacyPage'

/**
 * The old static site's URLs. Instagram bios, posts and bookmarks still point at these,
 * so each one redirects to its clean route. (Whether the host also needs a fallback for
 * deep links depends on where the site ends up hosted: spec fork O2.)
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  '/index.html': '/',
  '/about.html': '/about',
  '/members.html': '/members',
  '/join.html': '/join',
}

/** Redirect that keeps ?query and #hash, so /join.html#faq lands on /join#faq. */
function LegacyRedirect({ to }: { to: string }) {
  const { search, hash } = useLocation()
  return <Navigate to={{ pathname: to, search, hash }} replace />
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/join" element={<JoinPage />} />
        {/* Not linked anywhere: it's the privacy notice for KTP Manager's Google sign-in. */}
        <Route path="/privacy" element={<PrivacyPage />} />

        {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from} element={<LegacyRedirect to={to} />} />
        ))}

        {/* Anything else: a real "page not found", not a silent jump to Home */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
