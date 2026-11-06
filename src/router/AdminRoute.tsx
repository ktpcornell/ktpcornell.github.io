import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from './ProtectedRoute'
import { Spinner } from '@/design-system/components/Spinner'
import type { ReactNode } from 'react'

export function AdminRoute({ children }: { children: ReactNode }) {
  const { appUser, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <ProtectedRoute>
      {appUser?.isAdmin ? children : <Navigate to="/portal" replace />}
    </ProtectedRoute>
  )
}
