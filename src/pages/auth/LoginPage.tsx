import { useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { signIn } from '@/services/authService'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { Button } from '@/design-system/components/Button'
import { FormField } from '@/design-system/components/FormField'
import { AlertBanner } from '@/design-system/components/AlertBanner'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { currentUser, appUser } = useAuth()

  const redirect = searchParams.get('redirect') ?? '/portal'

  useEffect(() => {
    if (currentUser) {
      navigate(appUser?.isAdmin ? '/admin' : redirect, { replace: true })
    }
  }, [currentUser, appUser, navigate, redirect])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign in failed'
      setError(msg.includes('auth/') ? 'Invalid email or password.' : msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ktp-bg-surface">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 bg-ktp-primary">
            <Link to="/" className="flex flex-col items-center no-underline">
              <img src="/logo.svg" alt="KTP" className="h-12" />
            </Link>
            <h3 className="text-white text-center mt-4 mb-0">Member Login</h3>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            {error && (
              <AlertBanner variant="error" className="mb-4">
                {error}
              </AlertBanner>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <FormField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@cornell.edu"
              />
              <FormField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-ktp-primary hover:text-ktp-accent transition-colors no-underline">
                Public Site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
