'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    setLoading(false)
    if (result?.error) {
      setError('Invalid email or password')
    } else {
      router.push('/admin')
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: '#3A4A2C' }}
    >
      {/* Background pattern */}
      <div
        className="fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #C4922A 0, #C4922A 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 w-full max-w-sm mx-4">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="font-serif text-3xl tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.9)' }}>
            MIRAS
          </div>
          <div className="font-sans text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: '#D4A84A' }}>
            Admin Panel
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white p-10" style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
          <h1 className="font-serif text-[1.5rem] mb-8" style={{ color: '#3A4A2C' }}>
            Sign In
          </h1>

          {error && (
            <div className="mb-6 p-3 text-[0.78rem] font-sans" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-sans text-[0.68rem] tracking-[0.12em] uppercase mb-2" style={{ color: '#5A5A5A' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 font-sans text-[0.88rem] outline-none transition-colors"
                style={{ border: '1px solid rgba(75,94,58,0.2)', color: '#2A2A2A' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#C4922A')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(75,94,58,0.2)')}
                placeholder="admin@miras.com"
              />
            </div>
            <div>
              <label className="block font-sans text-[0.68rem] tracking-[0.12em] uppercase mb-2" style={{ color: '#5A5A5A' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 font-sans text-[0.88rem] outline-none transition-colors"
                style={{ border: '1px solid rgba(75,94,58,0.2)', color: '#2A2A2A' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#C4922A')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(75,94,58,0.2)')}
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 font-sans text-[0.72rem] tracking-[0.14em] uppercase text-white border-none cursor-pointer transition-colors disabled:opacity-60"
              style={{ background: '#4B5E3A' }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#C4922A' }}
              onMouseLeave={e => (e.currentTarget.style.background = '#4B5E3A')}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
