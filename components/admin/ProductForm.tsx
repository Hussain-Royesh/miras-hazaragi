'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProductFormProps {
  initial?: {
    id?: string; name?: string; subtitle?: string; description?: string
    price?: number; originalPrice?: number; badge?: string; color?: string
    imageUrl?: string; category?: string; inStock?: boolean; stockQty?: number
  }
}

const categories = ['khamak', 'dress', 'accessories', 'embroidered']
const badges = ['', 'new', 'handstitched']

const field = (label: string, children: React.ReactNode) => (
  <div>
    <label className="block font-sans text-[0.68rem] tracking-[0.12em] uppercase mb-2" style={{ color: '#5A5A5A' }}>
      {label}
    </label>
    {children}
  </div>
)

const inputCls = 'w-full px-4 py-2.5 font-sans text-[0.85rem] outline-none transition-colors'
const inputStyle = { border: '1px solid rgba(75,94,58,0.2)', color: '#2A2A2A', background: 'white' }

export default function ProductForm({ initial = {} }: ProductFormProps) {
  const router = useRouter()
  const isEdit = !!initial.id

  const [form, setForm] = useState({
    name: initial.name ?? '',
    subtitle: initial.subtitle ?? '',
    description: initial.description ?? '',
    price: initial.price ?? '',
    originalPrice: initial.originalPrice ?? '',
    badge: initial.badge ?? '',
    color: initial.color ?? '#4B5E3A',
    imageUrl: initial.imageUrl ?? '',
    category: initial.category ?? 'khamak',
    inStock: initial.inStock ?? true,
    stockQty: initial.stockQty ?? 10,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      stockQty: Number(form.stockQty),
      badge: form.badge || null,
      imageUrl: form.imageUrl || null,
    }
    const res = await fetch(
      isEdit ? `/api/admin/products/${initial.id}` : '/api/admin/products',
      { method: isEdit ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    )
    setSaving(false)
    if (!res.ok) { setError('Failed to save. Check all fields.'); return }
    router.push('/admin/products')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <div className="p-3 font-sans text-[0.78rem]" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-5">
        {field('Product Name', <input required value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} style={inputStyle} />)}
        {field('Subtitle', <input required value={form.subtitle} onChange={e => set('subtitle', e.target.value)} className={inputCls} style={inputStyle} />)}
      </div>

      {field('Description', (
        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3}
          className={inputCls} style={{ ...inputStyle, resize: 'vertical' }} />
      ))}

      <div className="grid grid-cols-2 gap-5">
        {field('Price (£)', <input required type="number" step="0.01" value={form.price} onChange={e => set('price', e.target.value)} className={inputCls} style={inputStyle} />)}
        {field('Original Price (£) — optional', <input type="number" step="0.01" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} className={inputCls} style={inputStyle} />)}
      </div>

      <div className="grid grid-cols-3 gap-5">
        {field('Category', (
          <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls} style={inputStyle}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        ))}
        {field('Badge', (
          <select value={form.badge} onChange={e => set('badge', e.target.value)} className={inputCls} style={inputStyle}>
            {badges.map(b => <option key={b} value={b}>{b || 'None'}</option>)}
          </select>
        ))}
        {field('Stock Qty', <input type="number" value={form.stockQty} onChange={e => set('stockQty', e.target.value)} className={inputCls} style={inputStyle} />)}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {field('Placeholder Color', (
          <div className="flex gap-3 items-center">
            <input type="color" value={form.color} onChange={e => set('color', e.target.value)}
              className="w-12 h-10 cursor-pointer border-0 p-0.5" style={{ ...inputStyle }} />
            <input value={form.color} onChange={e => set('color', e.target.value)}
              className={inputCls} style={inputStyle} />
          </div>
        ))}
        {field('Image URL — optional', (
          <div>
            <input type="url" value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} className={inputCls} style={inputStyle} placeholder="https://..." />
            {form.imageUrl && (
              <div className="mt-2 flex gap-3 items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.imageUrl} alt="Preview" className="object-cover rounded-sm" style={{ width: '56px', height: '84px' }} onError={e => (e.currentTarget.style.display = 'none')} onLoad={e => (e.currentTarget.style.display = 'block')} />
                <p className="font-sans text-[0.68rem] mt-1" style={{ color: '#5A5A5A' }}>Preview</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="inStock" checked={form.inStock} onChange={e => set('inStock', e.target.checked)} className="w-4 h-4 cursor-pointer accent-green" />
        <label htmlFor="inStock" className="font-sans text-[0.78rem]" style={{ color: '#2A2A2A' }}>In Stock</label>
      </div>

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="font-sans text-[0.72rem] tracking-[0.12em] uppercase text-white px-8 py-3 border-none cursor-pointer transition-colors disabled:opacity-60 bg-green hover:bg-gold"
        >
          {saving ? 'Saving…' : isEdit ? 'Update Product' : 'Create Product'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="font-sans text-[0.72rem] tracking-[0.12em] uppercase px-8 py-3 border cursor-pointer transition-colors bg-transparent hover:bg-green hover:text-white"
          style={{ borderColor: 'rgba(75,94,58,0.2)', color: '#5A5A5A' }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
