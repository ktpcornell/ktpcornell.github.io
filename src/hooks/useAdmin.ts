import { useAuth } from './useAuth'

export function useAdmin() {
  const { appUser, loading } = useAuth()
  return {
    isAdmin: appUser?.isAdmin ?? false,
    loading,
  }
}
