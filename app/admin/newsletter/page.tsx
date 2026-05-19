'use client'
import { useEffect, useState } from 'react'

interface Subscriber { id: string; email: string; subscribedAt: string }

export default function AdminNewsletter() {
  const [subs, setSubs] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/newsletter').then(r => r.json()).then(d => { setSubs(d); setLoading(false) })
  }, [])

  const exportCsv = () => {
    const csv = 'Email,Subscribed At\n' +
      subs.map(s => `${s.email},${new Date(s.subscribedAt).toLocaleDateString('en-GB')}`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'miras-newsletter.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const deleteSub = async (id: string, email: string) => {
    if (!confirm(`Remove "${email}" from the newsletter list?`)) return
    await fetch(`/api/admin/newsletter/${id}`, { method: 'DELETE' })
    setSubs(prev => prev.filter(s => s.id !== id))
  }

  const filtered = subs.filter(s =>
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[2rem]" style={{ color: '#3A4A2C' }}>Newsletter</h1>
          <p className="font-sans text-[0.78rem]" style={{ color: '#5A5A5A' }}>{subs.length} subscribers</p>
        </div>
        <div className="flex gap-3 items-center">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search email…"
            className="font-sans text-[0.82rem] px-4 py-2.5 outline-none w-52"
            style={{ border: '1px solid rgba(75,94,58,0.2)', color: '#2A2A2A' }}
          />
          <button
            onClick={exportCsv}
            disabled={subs.length === 0}
            className="font-sans text-[0.72rem] tracking-[0.12em] uppercase px-6 py-3 border cursor-pointer transition-colors disabled:opacity-40"
            style={{ borderColor: 'rgba(75,94,58,0.3)', color: '#4B5E3A', background: 'transparent' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#4B5E3A'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.borderColor = '#4B5E3A'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#4B5E3A'
              e.currentTarget.style.borderColor = 'rgba(75,94,58,0.3)'
            }}
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white" style={{ border: '1px solid rgba(75,94,58,0.1)' }}>
        {loading ? (
          <p className="p-8 text-center font-serif italic" style={{ color: '#5A5A5A' }}>Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="p-8 text-center font-serif italic" style={{ color: '#5A5A5A' }}>
            {subs.length === 0 ? 'No subscribers yet.' : 'No results for that search.'}
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(75,94,58,0.1)' }}>
                {['#', 'Email', 'Subscribed', ''].map(h => (
                  <th key={h} className="text-left px-6 py-3 font-sans text-[0.65rem] tracking-[0.1em] uppercase" style={{ color: '#5A5A5A' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: '1px solid rgba(75,94,58,0.06)' }}>
                  <td className="px-6 py-4 font-sans text-[0.75rem]" style={{ color: '#5A5A5A' }}>{i + 1}</td>
                  <td className="px-6 py-4 font-sans text-[0.85rem]" style={{ color: '#2A2A2A' }}>{s.email}</td>
                  <td className="px-6 py-4 font-sans text-[0.78rem]" style={{ color: '#5A5A5A' }}>
                    {new Date(s.subscribedAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteSub(s.id, s.email)}
                      className="font-sans text-[0.7rem] border-none bg-transparent cursor-pointer transition-colors"
                      style={{ color: '#5A5A5A' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#DC2626')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#5A5A5A')}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
