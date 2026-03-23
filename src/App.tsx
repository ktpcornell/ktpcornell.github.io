import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ProtectedRoute } from '@/router/ProtectedRoute'
import { AdminRoute } from '@/router/AdminRoute'

// Public pages
import { HomePage } from '@/pages/public/HomePage'
import { AboutPage } from '@/pages/public/AboutPage'
import { MembersPage } from '@/pages/public/MembersPage'
import { JoinPage } from '@/pages/public/JoinPage'

// Auth
import { LoginPage } from '@/pages/auth/LoginPage'

// Portal
import { PortalLayout } from '@/components/layout/PortalLayout'
import { PortalHomePage } from '@/pages/portal/PortalHomePage'
import { AlumniPage } from '@/pages/portal/AlumniPage'

// Design System
import { DesignSystemLayout } from '@/pages/design-system/DesignSystemLayout'
import { IntroductionPage } from '@/pages/design-system/IntroductionPage'
import { ColorsPage } from '@/pages/design-system/ColorsPage'
import { TypographyPage } from '@/pages/design-system/TypographyPage'
import { ButtonsPage } from '@/pages/design-system/components/ButtonsPage'
import { BadgesPage } from '@/pages/design-system/components/BadgesPage'
import { CardsPage } from '@/pages/design-system/components/CardsPage'
import { FormFieldsPage } from '@/pages/design-system/components/FormFieldsPage'
import { AlertsPage } from '@/pages/design-system/components/AlertsPage'
import { SectionTitlePage } from '@/pages/design-system/page-sections/SectionTitlePage'
import { SectionSeparatorPage } from '@/pages/design-system/page-sections/SectionSeparatorPage'
import { FooterPage } from '@/pages/design-system/page-sections/FooterPage'
import { HeroPage } from '@/pages/design-system/page-sections/HeroPage'
import { CTAPage } from '@/pages/design-system/page-sections/CTAPage'
import { NavbarPage } from '@/pages/design-system/components/NavbarPage'
import { AccordionPage } from '@/pages/design-system/components/AccordionPage'
import { TabsPage } from '@/pages/design-system/components/TabsPage'
import { LayoutPage } from '@/pages/design-system/LayoutPage'

// Admin
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { AdminAnnouncementsPage } from '@/pages/admin/AdminAnnouncementsPage'
import { AdminAlumniPage } from '@/pages/admin/AdminAlumniPage'
import { AdminUsersPage } from '@/pages/admin/AdminUsersPage'

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  )
}
