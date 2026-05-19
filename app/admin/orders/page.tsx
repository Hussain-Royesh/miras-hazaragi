'use client'
import { useEffect, useState } from 'react'

interface OrderItem { id: string; name: string; price: number; quantity: number }
interface Order {
  id: string
  customerEmail: string
  customerName?: string | null
  total: number
  status: string
  createdAt: string
  shippingAddress?: string | null
  items: OrderItem[]
}

interface ShippingAddress {
  line1?: string
  line2?: string | null
  city?: string
  state?: string | null
  postal_code?: string
  country?: string
}

const statusColor: Record<string, string> = {
  paid: '#16A34A',
  shipped: '#2563EB',
  delivered: '#4B5E3A',
  cancelled: '#DC2626',
  pending: '#D97706',
}

const statuses = ['all', 'paid', 'shipped', 'delivered', 'cancelled', 'pending']

function parseAddress(raw: string | null | undefined): ShippingAddress | null {
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return null }
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    const q = filter !== 'all' ? `?status=${filter}` : ''
    fetch(`/api/admin/orders${q}`)
      .then(r => r.json())
      .then(d => { setOrders(d); setLoading(false) })
  }, [filter])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  const toggleExpand = (id: string) =>
    setExpandedId(prev => prev === id ? null : id)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-[2rem]" style={{ color: '#3A4A2C' }}>Orders</h1>
          <p className="font-sans text-[0.78rem]" style={{ color: '#5A5A5A' }}>{orders.length} orders</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="font-sans text-[0.65rem] tracking-[0.1em] uppercase px-4 py-2 border cursor-pointer transition-colors capitalize"
            style={{
              background: filter === s ? '#4B5E3A' : 'transparent',
              color: filter === s ? 'white' : '#5A5A5A',
              borderColor: filter === s ? '#4B5E3A' : 'rgba(75,94,58,0.2)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white" style={{ border: '1px solid rgba(75,94,58,0.1)' }}>
        {loading ? (
          <p className="p-8 text-center font-serif italic" style={{ color: '#5A5A5A' }}>Loading…</p>
        ) : orders.length === 0 ? (
          <p className="p-8 text-center font-serif italic" style={{ color: '#5A5A5A' }}>No orders found.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(75,94,58,0.1)' }}>
                {['Customer', 'Items', 'Total', 'Date', 'Status', 'Update', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3 font-sans text-[0.65rem] tracking-[0.1em] uppercase" style={{ color: '#5A5A5A' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => {
                const isExpanded = expandedId === o.id
                const address = parseAddress(o.shippingAddress)

                return (
                  <>
                    {/* Main row */}
                    <tr
                      key={o.id}
                      onClick={() => toggleExpand(o.id)}
                      className="cursor-pointer transition-colors"
                      style={{
                        borderBottom: isExpanded ? 'none' : '1px solid rgba(75,94,58,0.06)',
                        background: isExpanded ? '#FDFCFA' : 'white',
                      }}
                      onMouseEnter={e => { if (!isExpanded) (e.currentTarget as HTMLTableRowElement).style.background = '#FAFAF8' }}
                      onMouseLeave={e => { if (!isExpanded) (e.currentTarget as HTMLTableRowElement).style.background = 'white' }}
                    >
                      <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                        <div className="font-sans text-[0.82rem]" style={{ color: '#2A2A2A' }}>{o.customerName ?? o.customerEmail}</div>
                        <div className="font-sans text-[0.7rem]" style={{ color: '#5A5A5A' }}>{o.customerEmail}</div>
                      </td>
                      <td className="px-5 py-4 font-sans text-[0.75rem]" style={{ color: '#5A5A5A', maxWidth: '180px' }}>
                        <div className="truncate">{o.items.map(i => `${i.name} ×${i.quantity}`).join(', ')}</div>
                      </td>
                      <td className="px-5 py-4 font-serif text-[0.9rem]" style={{ color: '#3A4A2C' }}>£{o.total.toFixed(2)}</td>
                      <td className="px-5 py-4 font-sans text-[0.75rem]" style={{ color: '#5A5A5A' }}>
                        {new Date(o.createdAt).toLocaleDateString('en-GB')}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="font-sans text-[0.65rem] tracking-[0.08em] uppercase px-2 py-0.5"
                          style={{ background: `${statusColor[o.status]}18`, color: statusColor[o.status] }}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                        <select
                          value={o.status}
                          onChange={e => updateStatus(o.id, e.target.value)}
                          className="font-sans text-[0.72rem] px-2 py-1.5 cursor-pointer outline-none"
                          style={{ border: '1px solid rgba(75,94,58,0.2)', color: '#2A2A2A' }}
                        >
                          {['paid', 'shipped', 'delivered', 'cancelled'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-sans text-[0.7rem]" style={{ color: '#5A5A5A' }}>
                          {isExpanded ? '▲' : '▼'}
                        </span>
                      </td>
                    </tr>

                    {/* Expanded detail row */}
                    {isExpanded && (
                      <tr key={`${o.id}-detail`} style={{ borderBottom: '1px solid rgba(75,94,58,0.06)', background: '#FDFCFA' }}>
                        <td colSpan={7} className="px-5 pb-5 pt-0">
                          <div className="grid grid-cols-2 gap-8 pt-4 border-t" style={{ borderColor: 'rgba(75,94,58,0.08)' }}>

                            {/* Items breakdown */}
                            <div>
                              <h4 className="font-sans text-[0.65rem] tracking-[0.12em] uppercase mb-3" style={{ color: '#5A5A5A' }}>
                                Order Items
                              </h4>
                              <div className="space-y-2">
                                {o.items.map(item => (
                                  <div key={item.id} className="flex justify-between items-center">
                                    <span className="font-sans text-[0.8rem]" style={{ color: '#2A2A2A' }}>
                                      {item.name}
                                      {item.quantity > 1 && (
                                        <span className="ml-1" style={{ color: '#5A5A5A' }}>×{item.quantity}</span>
                                      )}
                                    </span>
                                    <span className="font-serif text-[0.85rem]" style={{ color: '#3A4A2C' }}>
                                      £{(item.price * item.quantity).toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                                <div className="flex justify-between items-center pt-2" style={{ borderTop: '1px solid rgba(75,94,58,0.1)' }}>
                                  <span className="font-sans text-[0.72rem] tracking-[0.08em] uppercase" style={{ color: '#5A5A5A' }}>Total</span>
                                  <span className="font-serif text-[1rem] font-semibold" style={{ color: '#3A4A2C' }}>£{o.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Shipping address */}
                            <div>
                              <h4 className="font-sans text-[0.65rem] tracking-[0.12em] uppercase mb-3" style={{ color: '#5A5A5A' }}>
                                Shipping Address
                              </h4>
                              {address ? (
                                <address className="not-italic font-sans text-[0.82rem] leading-[1.7]" style={{ color: '#2A2A2A' }}>
                                  {address.line1 && <div>{address.line1}</div>}
                                  {address.line2 && <div>{address.line2}</div>}
                                  {address.city && <div>{address.city}{address.state ? `, ${address.state}` : ''}</div>}
                                  {address.postal_code && <div>{address.postal_code}</div>}
                                  {address.country && <div className="font-sans text-[0.72rem] uppercase tracking-wider mt-0.5" style={{ color: '#5A5A5A' }}>{address.country}</div>}
                                </address>
                              ) : (
                                <p className="font-sans text-[0.78rem] italic" style={{ color: '#5A5A5A' }}>No shipping address recorded.</p>
                              )}
                              <p className="font-sans text-[0.68rem] mt-3" style={{ color: '#5A5A5A' }}>
                                Order ID: <span style={{ color: '#2A2A2A', fontFamily: 'monospace', fontSize: '0.65rem' }}>{o.id}</span>
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
