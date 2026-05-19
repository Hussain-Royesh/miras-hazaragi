'use client'
import { useEffect, useState } from 'react'

interface Customer {
  id: string; email: string; name?: string; createdAt: string
  _count: { orders: number }
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/customers').then(r => r.json()).then(d => { setCustomers(d); setLoading(false) })
  }, [])

  const filtered = customers.filter(c =>
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.name ?? '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[2rem]" style={{ color: '#3A4A2C' }}>Customers</h1>
          <p className="font-sans text-[0.78rem]" style={{ color: '#5A5A5A' }}>{customers.length} registered customers</p>
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="font-sans text-[0.82rem] px-4 py-2.5 outline-none w-64"
          style={{ border: '1px solid rgba(75,94,58,0.2)', color: '#2A2A2A' }}
        />
      </div>

      <div className="bg-white" style={{ border: '1px solid rgba(75,94,58,0.1)' }}>
        {loading ? <p className="p-8 text-center font-serif italic" style={{ color: '#5A5A5A' }}>Loading…</p> : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(75,94,58,0.1)' }}>
                {['Name', 'Email', 'Orders', 'Joined'].map(h => (
                  <th key={h} className="text-left px-6 py-3 font-sans text-[0.65rem] tracking-[0.1em] uppercase" style={{ color: '#5A5A5A' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center font-serif italic" style={{ color: '#5A5A5A' }}>No customers found.</td></tr>
              ) : filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(75,94,58,0.06)' }}>
                  <td className="px-6 py-4 font-sans text-[0.85rem]" style={{ color: '#2A2A2A' }}>{c.name ?? '—'}</td>
                  <td className="px-6 py-4 font-sans text-[0.82rem]" style={{ color: '#5A5A5A' }}>{c.email}</td>
                  <td className="px-6 py-4">
                    <span className="font-sans text-[0.75rem] px-2 py-0.5" style={{ background: 'rgba(75,94,58,0.1)', color: '#4B5E3A' }}>
                      {c._count.orders}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-sans text-[0.78rem]" style={{ color: '#5A5A5A' }}>
                    {new Date(c.createdAt).toLocaleDateString('en-GB')}
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
