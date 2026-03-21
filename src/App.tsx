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
