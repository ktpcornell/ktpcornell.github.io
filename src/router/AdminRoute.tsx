import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from './ProtectedRoute'
import type { ReactNode } from 'react'

export function AdminRoute({ children }: { children: ReactNode }) {
  const { appUser, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-ktp-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <ProtectedRoute>
      {appUser?.isAdmin ? children : <Navigate to="/portal" replace />}
    </ProtectedRoute>
  )
}
