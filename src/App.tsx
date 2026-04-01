import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ProtectedRoute } from '@/router/ProtectedRoute'
import { AdminRoute } from '@/router/AdminRoute'
import { Spinner } from '@/design-system/components/Spinner'

// Public pages — eager (critical path for all visitors)
import { HomePage } from '@/pages/public/HomePage'
import { AboutPage } from '@/pages/public/AboutPage'
import { MembersPage } from '@/pages/public/MembersPage'
import { JoinPage } from '@/pages/public/JoinPage'
import { LoginPage } from '@/pages/auth/LoginPage'

// Portal — lazy (authenticated members only)
const PortalLayout   = lazy(() => import('@/components/layout/PortalLayout').then(m => ({ default: m.PortalLayout })))
const PortalHomePage = lazy(() => import('@/pages/portal/PortalHomePage').then(m => ({ default: m.PortalHomePage })))
const AlumniPage     = lazy(() => import('@/pages/portal/AlumniPage').then(m => ({ default: m.AlumniPage })))

// Admin — lazy (admins only)
const AdminLayout            = lazy(() => import('@/components/admin/AdminLayout').then(m => ({ default: m.AdminLayout })))
const AdminDashboardPage     = lazy(() => import('@/pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })))
const AdminAnnouncementsPage = lazy(() => import('@/pages/admin/AdminAnnouncementsPage').then(m => ({ default: m.AdminAnnouncementsPage })))
const AdminAlumniPage        = lazy(() => import('@/pages/admin/AdminAlumniPage').then(m => ({ default: m.AdminAlumniPage })))
const AdminUsersPage         = lazy(() => import('@/pages/admin/AdminUsersPage').then(m => ({ default: m.AdminUsersPage })))

// Design System — lazy (internal docs only)
const DesignSystemLayout    = lazy(() => import('@/pages/design-system/DesignSystemLayout').then(m => ({ default: m.DesignSystemLayout })))
const IntroductionPage      = lazy(() => import('@/pages/design-system/IntroductionPage').then(m => ({ default: m.IntroductionPage })))
const ColorsPage            = lazy(() => import('@/pages/design-system/ColorsPage').then(m => ({ default: m.ColorsPage })))
const TypographyPage        = lazy(() => import('@/pages/design-system/TypographyPage').then(m => ({ default: m.TypographyPage })))
const LayoutPage            = lazy(() => import('@/pages/design-system/LayoutPage').then(m => ({ default: m.LayoutPage })))
const ButtonsPage           = lazy(() => import('@/pages/design-system/components/ButtonsPage').then(m => ({ default: m.ButtonsPage })))
const BadgesPage            = lazy(() => import('@/pages/design-system/components/BadgesPage').then(m => ({ default: m.BadgesPage })))
const CardsPage             = lazy(() => import('@/pages/design-system/components/CardsPage').then(m => ({ default: m.CardsPage })))
const FormFieldsPage        = lazy(() => import('@/pages/design-system/components/FormFieldsPage').then(m => ({ default: m.FormFieldsPage })))
const AlertsPage            = lazy(() => import('@/pages/design-system/components/AlertsPage').then(m => ({ default: m.AlertsPage })))
const SpinnerPage           = lazy(() => import('@/pages/design-system/components/SpinnerPage').then(m => ({ default: m.SpinnerPage })))
const NavbarPage            = lazy(() => import('@/pages/design-system/components/NavbarPage').then(m => ({ default: m.NavbarPage })))
const AccordionPage         = lazy(() => import('@/pages/design-system/components/AccordionPage').then(m => ({ default: m.AccordionPage })))
const TabsPage              = lazy(() => import('@/pages/design-system/components/TabsPage').then(m => ({ default: m.TabsPage })))
const DataTablePage         = lazy(() => import('@/pages/design-system/components/DataTablePage').then(m => ({ default: m.DataTablePage })))
const ModalPage             = lazy(() => import('@/pages/design-system/components/ModalPage').then(m => ({ default: m.ModalPage })))
const SectionTitlePage      = lazy(() => import('@/pages/design-system/page-sections/SectionTitlePage').then(m => ({ default: m.SectionTitlePage })))
const SectionSeparatorPage  = lazy(() => import('@/pages/design-system/page-sections/SectionSeparatorPage').then(m => ({ default: m.SectionSeparatorPage })))
const FooterPage            = lazy(() => import('@/pages/design-system/page-sections/FooterPage').then(m => ({ default: m.FooterPage })))
const HeroPage              = lazy(() => import('@/pages/design-system/page-sections/HeroPage').then(m => ({ default: m.HeroPage })))
const CTAPage               = lazy(() => import('@/pages/design-system/page-sections/CTAPage').then(m => ({ default: m.CTAPage })))

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Spinner /></div>}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/design-system" element={<DesignSystemLayout />}>
              <Route index element={<IntroductionPage />} />
              <Route path="colors" element={<ColorsPage />} />
              <Route path="typography" element={<TypographyPage />} />
              <Route path="components/buttons" element={<ButtonsPage />} />
              <Route path="components/badges" element={<BadgesPage />} />
              <Route path="components/cards" element={<CardsPage />} />
              <Route path="components/form-fields" element={<FormFieldsPage />} />
              <Route path="components/alerts" element={<AlertsPage />} />
              <Route path="components/navbar" element={<NavbarPage />} />
              <Route path="components/accordion" element={<AccordionPage />} />
              <Route path="components/tabs" element={<TabsPage />} />
              <Route path="components/spinner" element={<SpinnerPage />} />
              <Route path="components/data-table" element={<DataTablePage />} />
              <Route path="components/modal" element={<ModalPage />} />
              <Route path="layout" element={<LayoutPage />} />
              <Route path="page-sections/section-title" element={<SectionTitlePage />} />
              <Route path="page-sections/section-separator" element={<SectionSeparatorPage />} />
              <Route path="page-sections/footer" element={<FooterPage />} />
              <Route path="page-sections/hero" element={<HeroPage />} />
              <Route path="page-sections/cta" element={<CTAPage />} />
            </Route>

            {/* Members-only portal */}
            <Route
              path="/portal"
              element={
                <ProtectedRoute>
                  <PortalLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<PortalHomePage />} />
              <Route path="alumni" element={<AlumniPage />} />
            </Route>

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="announcements" element={<AdminAnnouncementsPage />} />
              <Route path="alumni" element={<AdminAlumniPage />} />
              <Route path="users" element={<AdminUsersPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}
