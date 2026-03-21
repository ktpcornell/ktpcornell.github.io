import { useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { signIn } from '@/services/authService'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { currentUser, appUser } = useAuth()

  const redirect = searchParams.get('redirect') ?? '/portal'

  // Already logged in — redirect
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
      // AuthContext will update; useEffect above handles navigation
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign in failed'
      setError(msg.includes('auth/') ? 'Invalid email or password.' : msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--section-bg-color)' }}>
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6" style={{ background: 'var(--navbar-bg-color)' }}>
            <Link to="/" className="flex flex-col items-center no-underline">
              <img src="/navbarlogo.png" alt="KTP" style={{ height: 50 }} />
              <span className="text-white mt-2" style={{ fontSize: 13 }}>
                Alpha Epsilon Chapter
              </span>
            </Link>
            <h2 className="text-white text-center mt-4 mb-0" style={{ fontSize: 24 }}>
              Member Login
            </h2>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            {error && (
              <div
                className="mb-4 px-4 py-3 rounded-lg text-sm"
                style={{
                  background: '#fee2e2',
                  color: '#991b1b',
                  border: '1px solid #fca5a5',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--navbar-bg-color)' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@cornell.edu"
                  className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
                  style={{
                    borderColor: 'var(--border, #e5e7eb)',
                    fontSize: 16,
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary-color)' }}
                  onBlur={(e) => { e.target.style.borderColor = '#e5e7eb' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--navbar-bg-color)' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
                  style={{
                    borderColor: 'var(--border, #e5e7eb)',
                    fontSize: 16,
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--primary-color)' }}
                  onBlur={(e) => { e.target.style.borderColor = '#e5e7eb' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full font-bold text-white transition-all"
                style={{
                  background: loading ? '#94a3b8' : 'var(--navbar-bg-color)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: 16,
                  border: 'none',
                }}
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm"
                style={{ color: 'var(--primary-color)' }}
              >
                ← Back to main site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
