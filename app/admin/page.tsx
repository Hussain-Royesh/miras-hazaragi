'use client'
import { useEffect, useState } from 'react'

interface DashboardData {
  totalOrders: number
  ordersToday: number
  totalRevenue: number
  productCount: number
  customerCount: number
  subscriberCount: number
  lowStock: { id: string; name: string; stockQty: number }[]
  recentOrders: { id: string; customerEmail: string; total: number; status: string; createdAt: string; items: { name: string; quantity: number }[] }[]
}

const statusColor: Record<string, string> = {
  paid: '#16A34A',
  shipped: '#2563EB',
  delivered: '#4B5E3A',
  cancelled: '#DC2626',
  pending: '#D97706',
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(r => r.json())
      .then(d => { if (d && typeof d.totalRevenue === 'number') setData(d) })
  }, [])

  if (!data) return <div className="flex items-center justify-center h-64 font-serif text-xl" style={{ color: '#5A5A5A' }}>Loading…</div>

  const stats = [
    { label: 'Total Revenue', value: `£${(data.totalRevenue ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`, icon: '£', color: '#C4922A' },
    { label: 'Total Orders', value: data.totalOrders, icon: '◎', color: '#4B5E3A' },
    { label: 'Orders Today', value: data.ordersToday, icon: '◈', color: '#2563EB' },
    { label: 'Products', value: data.productCount, icon: '◉', color: '#7C3AED' },
    { label: 'Customers', value: data.customerCount, icon: '◌', color: '#DB2777' },
    { label: 'Subscribers', value: data.subscriberCount, icon: '◇', color: '#0891B2' },
  ]

  return (
    <div>
      <h1 className="font-serif text-[2rem] mb-1" style={{ color: '#3A4A2C' }}>Dashboard</h1>
      <p className="font-sans text-[0.8rem] mb-8" style={{ color: '#5A5A5A' }}>Welcome back to Miras admin.</p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white p-6" style={{ border: '1px solid rgba(75,94,58,0.1)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-[0.68rem] tracking-[0.12em] uppercase" style={{ color: '#5A5A5A' }}>
                {stat.label}
              </span>
              <span className="text-lg" style={{ color: stat.color }}>{stat.icon}</span>
            </div>
            <div className="font-serif text-[2rem] leading-none" style={{ color: '#2A2A2A' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white" style={{ border: '1px solid rgba(75,94,58,0.1)' }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(75,94,58,0.1)' }}>
            <h2 className="font-sans text-[0.78rem] tracking-[0.12em] uppercase" style={{ color: '#3A4A2C' }}>Recent Orders</h2>
          </div>
          <div className="divide-y" style={{ borderColor: 'rgba(75,94,58,0.08)' }}>
            {data.recentOrders.length === 0 ? (
              <p className="px-6 py-8 font-serif italic text-center" style={{ color: '#5A5A5A' }}>No orders yet</p>
            ) : (
              data.recentOrders.map(order => (
                <div key={order.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-sans text-[0.82rem] truncate" style={{ color: '#2A2A2A' }}>{order.customerEmail}</div>
                    <div className="font-sans text-[0.7rem] mt-0.5" style={{ color: '#5A5A5A' }}>
                      {order.items.map(i => `${i.name} ×${i.quantity}`).join(', ')}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-serif text-[0.95rem]" style={{ color: '#3A4A2C' }}>£{order.total.toFixed(2)}</div>
                    <span
                      className="font-sans text-[0.6rem] tracking-[0.08em] uppercase px-2 py-0.5"
                      style={{ background: `${statusColor[order.status]}18`, color: statusColor[order.status] }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low stock */}
        <div className="bg-white" style={{ border: '1px solid rgba(75,94,58,0.1)' }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(75,94,58,0.1)' }}>
            <h2 className="font-sans text-[0.78rem] tracking-[0.12em] uppercase" style={{ color: '#3A4A2C' }}>Low Stock Alert</h2>
          </div>
          <div className="divide-y" style={{ borderColor: 'rgba(75,94,58,0.08)' }}>
            {data.lowStock.length === 0 ? (
              <p className="px-6 py-8 font-sans text-[0.8rem] text-center" style={{ color: '#5A5A5A' }}>All products well stocked</p>
            ) : (
              data.lowStock.map(p => (
                <div key={p.id} className="px-6 py-4 flex justify-between items-center">
                  <span className="font-sans text-[0.8rem]" style={{ color: '#2A2A2A' }}>{p.name}</span>
                  <span
                    className="font-sans text-[0.72rem] px-2 py-0.5 font-medium"
                    style={{ background: '#FEF2F2', color: '#DC2626' }}
                  >
                    {p.stockQty} left
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
