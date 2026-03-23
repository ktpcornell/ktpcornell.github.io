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

// Admin
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
            <Route path="page-sections/section-title" element={<SectionTitlePage />} />
          </Route>

          {/* Members-only portal */}
          <Route
            path="/portal"
            element={
              <ProtectedRoute>
                <PortalHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/alumni"
            element={
              <ProtectedRoute>
                <AlumniPage />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/announcements"
            element={
              <AdminRoute>
                <AdminAnnouncementsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/alumni"
            element={
              <AdminRoute>
                <AdminAlumniPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsersPage />
              </AdminRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
