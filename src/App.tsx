import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { HomePage } from '@/pages/public/HomePage'
import { AboutPage } from '@/pages/public/AboutPage'
import { MembersPage } from '@/pages/public/MembersPage'
import { JoinPage } from '@/pages/public/JoinPage'

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

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/join" element={<JoinPage />} />

        {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}

        {/* Anything else */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
