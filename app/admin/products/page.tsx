'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Product {
  id: string; name: string; subtitle: string; price: number; category: string; inStock: boolean; stockQty: number; badge?: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => fetch('/api/admin/products').then(r => r.json()).then(d => { setProducts(d); setLoading(false) })
  useEffect(() => { load() }, [])

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[2rem]" style={{ color: '#3A4A2C' }}>Products</h1>
          <p className="font-sans text-[0.78rem]" style={{ color: '#5A5A5A' }}>{products.length} products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="font-sans text-[0.72rem] tracking-[0.12em] uppercase text-white px-6 py-3 no-underline transition-colors bg-green hover:bg-gold"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white" style={{ border: '1px solid rgba(75,94,58,0.1)' }}>
        {loading ? (
          <p className="p-8 text-center font-serif italic" style={{ color: '#5A5A5A' }}>Loading…</p>
        ) : products.length === 0 ? (
          <p className="p-8 text-center font-serif italic" style={{ color: '#5A5A5A' }}>No products yet. Add your first one.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(75,94,58,0.1)' }}>
                {['Product', 'Category', 'Price', 'Stock', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-6 py-4 font-sans text-[0.65rem] tracking-[0.12em] uppercase" style={{ color: '#5A5A5A' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(75,94,58,0.06)' }}>
                  <td className="px-6 py-4">
                    <div className="font-sans text-[0.85rem]" style={{ color: '#2A2A2A' }}>{p.name}</div>
                    <div className="font-sans text-[0.72rem]" style={{ color: '#5A5A5A' }}>{p.subtitle}</div>
                  </td>
                  <td className="px-6 py-4 font-sans text-[0.78rem] capitalize" style={{ color: '#5A5A5A' }}>{p.category}</td>
                  <td className="px-6 py-4 font-serif text-[0.9rem]" style={{ color: '#3A4A2C' }}>£{p.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className="font-sans text-[0.7rem] px-2 py-0.5"
                      style={{
                        background: p.stockQty <= 5 ? '#FEF2F2' : '#F0FDF4',
                        color: p.stockQty <= 5 ? '#DC2626' : '#16A34A',
                      }}
                    >
                      {p.stockQty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="font-sans text-[0.65rem] tracking-[0.08em] uppercase px-2 py-0.5"
                      style={{
                        background: p.inStock ? 'rgba(75,94,58,0.1)' : 'rgba(220,38,38,0.08)',
                        color: p.inStock ? '#4B5E3A' : '#DC2626',
                      }}
                    >
                      {p.inStock ? 'In Stock' : 'Out'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="font-sans text-[0.7rem] no-underline transition-colors hover:text-gold"
                        style={{ color: '#4B5E3A' }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(p.id, p.name)}
                        className="font-sans text-[0.7rem] bg-transparent border-none cursor-pointer transition-colors hover:text-red-600"
                        style={{ color: '#5A5A5A' }}
                      >
                        Delete
                      </button>
                    </div>
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
