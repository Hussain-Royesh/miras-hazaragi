'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function AdminSettings() {
  const { data: session } = useSession()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }))
    setSuccess(false)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match.')
      return
    }
    if (form.newPassword.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }
    setSaving(true)
    setError('')
    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
    })
    setSaving(false)
    if (res.ok) {
      setSuccess(true)
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } else {
      const data = await res.json()
      setError(data.error ?? 'Failed to update password.')
    }
  }

  const inputCls = 'w-full px-4 py-2.5 font-sans text-[0.85rem] outline-none transition-colors'
  const inputStyle = { border: '1px solid rgba(75,94,58,0.2)', color: '#2A2A2A', background: 'white' }
  const label = (text: string) => (
    <label className="block font-sans text-[0.68rem] tracking-[0.12em] uppercase mb-2" style={{ color: '#5A5A5A' }}>
      {text}
    </label>
  )

  return (
    <div>
      <h1 className="font-serif text-[2rem] mb-1" style={{ color: '#3A4A2C' }}>Settings</h1>
      <p className="font-sans text-[0.78rem] mb-8" style={{ color: '#5A5A5A' }}>Manage your admin account.</p>

      {/* Account info card */}
      <div className="bg-white p-8 mb-6 max-w-lg" style={{ border: '1px solid rgba(75,94,58,0.1)' }}>
        <h2 className="font-sans text-[0.75rem] tracking-[0.14em] uppercase mb-5" style={{ color: '#3A4A2C' }}>
          Account Info
        </h2>
        <div className="space-y-4">
          <div>
            {label('Name')}
            <p className="font-sans text-[0.88rem]" style={{ color: '#2A2A2A' }}>{session?.user?.name ?? '—'}</p>
          </div>
          <div>
            {label('Email')}
            <p className="font-sans text-[0.88rem]" style={{ color: '#2A2A2A' }}>{session?.user?.email ?? '—'}</p>
          </div>
        </div>
      </div>

      {/* Change password card */}
      <div className="bg-white p-8 max-w-lg" style={{ border: '1px solid rgba(75,94,58,0.1)' }}>
        <h2 className="font-sans text-[0.75rem] tracking-[0.14em] uppercase mb-5" style={{ color: '#3A4A2C' }}>
          Change Password
        </h2>

        {success && (
          <div className="mb-5 p-3 font-sans text-[0.78rem]" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' }}>
            Password updated successfully.
          </div>
        )}
        {error && (
          <div className="mb-5 p-3 font-sans text-[0.78rem]" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            {label('Current Password')}
            <input
              type="password"
              required
              value={form.currentPassword}
              onChange={e => set('currentPassword', e.target.value)}
              className={inputCls}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#C4922A')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(75,94,58,0.2)')}
            />
          </div>
          <div>
            {label('New Password')}
            <input
              type="password"
              required
              minLength={8}
              value={form.newPassword}
              onChange={e => set('newPassword', e.target.value)}
              className={inputCls}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#C4922A')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(75,94,58,0.2)')}
              placeholder="Minimum 8 characters"
            />
          </div>
          <div>
            {label('Confirm New Password')}
            <input
              type="password"
              required
              value={form.confirmPassword}
              onChange={e => set('confirmPassword', e.target.value)}
              className={inputCls}
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = '#C4922A')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(75,94,58,0.2)')}
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="font-sans text-[0.72rem] tracking-[0.12em] uppercase text-white px-8 py-3 border-none cursor-pointer disabled:opacity-60 transition-colors"
            style={{ background: '#4B5E3A' }}
            onMouseEnter={e => { if (!saving) e.currentTarget.style.background = '#C4922A' }}
            onMouseLeave={e => (e.currentTarget.style.background = '#4B5E3A')}
          >
            {saving ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
