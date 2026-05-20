'use client'
import { useEffect, useState } from 'react'
import ImageUpload from '@/components/admin/ImageUpload'

interface Collection { id: string; name: string; tag: string; color: string; imageUrl: string | null; category: string | null; active: boolean; sortOrder: number }
interface EditState { id: string; name: string; tag: string; color: string; imageUrl: string; category: string }

const CATEGORIES = [
  { value: '', label: 'All Products (no filter)' },
  { value: 'khamak', label: 'Khamak' },
  { value: 'dress', label: 'Dress' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'embroidered', label: 'Embroidered' },
]

export default function AdminCollections() {
  const [cols, setCols] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [addForm, setAddForm] = useState({ name: '', tag: '', color: '#3A4A2C', imageUrl: '', category: '' })
  const [editState, setEditState] = useState<EditState | null>(null)
  const [saving, setSaving] = useState(false)

  const load = () =>
    fetch('/api/admin/collections').then(r => r.json()).then(d => { setCols(d); setLoading(false) })
  useEffect(() => { load() }, [])

  const create = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    await fetch('/api/admin/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...addForm, imageUrl: addForm.imageUrl || null, category: addForm.category || null }),
    })
    setSaving(false); setAdding(false); setAddForm({ name: '', tag: '', color: '#3A4A2C', imageUrl: '', category: '' }); load()
  }

  const saveEdit = async (id: string) => {
    if (!editState) return
    setSaving(true)
    await fetch(`/api/admin/collections/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editState.name, tag: editState.tag, color: editState.color, imageUrl: editState.imageUrl || null, category: editState.category || null }),
    })
    setSaving(false); setEditState(null); load()
  }

  const toggle = async (id: string, active: boolean) => {
    await fetch(`/api/admin/collections/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active }),
    })
    load()
  }

  const del = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return
    await fetch(`/api/admin/collections/${id}`, { method: 'DELETE' })
    load()
  }

  const inputCls = 'w-full px-3 py-2 font-sans text-[0.82rem] outline-none'
  const inputStyle = { border: '1px solid rgba(75,94,58,0.25)', color: '#2A2A2A', background: 'white' }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-[2rem]" style={{ color: '#3A4A2C' }}>Collections</h1>
          <p className="font-sans text-[0.78rem]" style={{ color: '#5A5A5A' }}>{cols.length} collections</p>
        </div>
        <button
          onClick={() => { setAdding(true); setEditState(null) }}
          className="font-sans text-[0.72rem] tracking-[0.12em] uppercase text-white px-6 py-3 border-none cursor-pointer transition-colors"
          style={{ background: '#4B5E3A' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#C4922A')}
          onMouseLeave={e => (e.currentTarget.style.background = '#4B5E3A')}
        >
          + Add Collection
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <form
          onSubmit={create}
          className="bg-white p-6 mb-6 space-y-4"
          style={{ border: '1px solid rgba(75,94,58,0.1)' }}
        >
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block font-sans text-[0.65rem] tracking-[0.1em] uppercase mb-1" style={{ color: '#5A5A5A' }}>Name</label>
              <input required value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} className={inputCls} style={inputStyle} />
            </div>
            <div>
              <label className="block font-sans text-[0.65rem] tracking-[0.1em] uppercase mb-1" style={{ color: '#5A5A5A' }}>Tag / Label</label>
              <input required value={addForm.tag} onChange={e => setAddForm(f => ({ ...f, tag: e.target.value }))} className={inputCls} style={inputStyle} placeholder="e.g. New Arrival" />
            </div>
            <div>
              <label className="block font-sans text-[0.65rem] tracking-[0.1em] uppercase mb-1" style={{ color: '#5A5A5A' }}>Explore → Filter</label>
              <select value={addForm.category} onChange={e => setAddForm(f => ({ ...f, category: e.target.value }))} className={inputCls} style={inputStyle}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-sans text-[0.65rem] tracking-[0.1em] uppercase mb-1" style={{ color: '#5A5A5A' }}>Colour</label>
              <input type="color" value={addForm.color} onChange={e => setAddForm(f => ({ ...f, color: e.target.value }))} className="w-full h-10 cursor-pointer p-0.5" style={inputStyle} />
            </div>
          </div>
          <div>
            <label className="block font-sans text-[0.65rem] tracking-[0.1em] uppercase mb-2" style={{ color: '#5A5A5A' }}>Image</label>
            <ImageUpload value={addForm.imageUrl} onChange={v => setAddForm(f => ({ ...f, imageUrl: v }))} />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="font-sans text-[0.72rem] tracking-[0.1em] uppercase text-white px-6 py-2 border-none cursor-pointer disabled:opacity-60 transition-colors"
              style={{ background: '#4B5E3A' }}
              onMouseEnter={e => { if (!saving) e.currentTarget.style.background = '#C4922A' }}
              onMouseLeave={e => (e.currentTarget.style.background = '#4B5E3A')}
            >
              {saving ? 'Saving…' : 'Save Collection'}
            </button>
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="font-sans text-[0.72rem] tracking-[0.1em] uppercase px-6 py-2 border cursor-pointer bg-transparent transition-colors"
              style={{ borderColor: 'rgba(75,94,58,0.2)', color: '#5A5A5A' }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white" style={{ border: '1px solid rgba(75,94,58,0.1)' }}>
        {loading ? (
          <p className="p-8 text-center font-serif italic" style={{ color: '#5A5A5A' }}>Loading…</p>
        ) : cols.length === 0 ? (
          <p className="p-8 text-center font-serif italic" style={{ color: '#5A5A5A' }}>No collections yet.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(75,94,58,0.1)' }}>
                {['Image', 'Collection', 'Tag', 'Explore Filter', 'Colour', 'Active', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-sans text-[0.65rem] tracking-[0.1em] uppercase" style={{ color: '#5A5A5A' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cols.map(c =>
                editState?.id === c.id ? (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(75,94,58,0.06)', background: '#FDFCFA' }}>
                    <td className="px-4 py-3">
                      <ImageUpload
                        value={editState.imageUrl}
                        onChange={v => setEditState(s => s ? { ...s, imageUrl: v } : s)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={editState.name}
                        onChange={e => setEditState(s => s ? { ...s, name: e.target.value } : s)}
                        className="w-full px-3 py-1.5 font-sans text-[0.82rem] outline-none"
                        style={{ border: '1px solid rgba(75,94,58,0.3)', color: '#2A2A2A' }}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={editState.tag}
                        onChange={e => setEditState(s => s ? { ...s, tag: e.target.value } : s)}
                        className="w-full px-3 py-1.5 font-sans text-[0.82rem] outline-none"
                        style={{ border: '1px solid rgba(75,94,58,0.3)', color: '#2A2A2A' }}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={editState.category}
                        onChange={e => setEditState(s => s ? { ...s, category: e.target.value } : s)}
                        className="w-full px-3 py-1.5 font-sans text-[0.82rem] outline-none"
                        style={{ border: '1px solid rgba(75,94,58,0.3)', color: '#2A2A2A' }}
                      >
                        {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={editState.color}
                          onChange={e => setEditState(s => s ? { ...s, color: e.target.value } : s)}
                          className="w-10 h-8 cursor-pointer p-0.5"
                          style={{ border: '1px solid rgba(75,94,58,0.2)' }}
                        />
                        <span className="font-sans text-[0.72rem]" style={{ color: '#5A5A5A' }}>{editState.color}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={c.active} onChange={e => toggle(c.id, e.target.checked)} className="w-4 h-4 cursor-pointer" style={{ accentColor: '#4B5E3A' }} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button onClick={() => saveEdit(c.id)} disabled={saving} className="font-sans text-[0.7rem] border-none bg-transparent cursor-pointer disabled:opacity-60" style={{ color: '#4B5E3A' }}>
                          {saving ? 'Saving…' : 'Save'}
                        </button>
                        <button onClick={() => setEditState(null)} className="font-sans text-[0.7rem] border-none bg-transparent cursor-pointer" style={{ color: '#5A5A5A' }}>
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(75,94,58,0.06)' }}>
                    <td className="px-4 py-3">
                      {c.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.imageUrl} alt={c.name} className="object-cover rounded-sm" style={{ width: '40px', height: '56px' }} />
                      ) : (
                        <div className="rounded-sm" style={{ width: '40px', height: '56px', background: c.color, opacity: 0.5 }} />
                      )}
                    </td>
                    <td className="px-4 py-4 font-sans text-[0.85rem]" style={{ color: '#2A2A2A' }}>{c.name}</td>
                    <td className="px-4 py-4 font-sans text-[0.78rem]" style={{ color: '#5A5A5A' }}>{c.tag}</td>
                    <td className="px-4 py-4 font-sans text-[0.72rem]" style={{ color: '#5A5A5A' }}>
                      {c.category ? <span className="px-2 py-0.5 rounded" style={{ background: 'rgba(75,94,58,0.1)', color: '#4B5E3A' }}>{c.category}</span> : <span style={{ color: '#BBBBB8' }}>All</span>}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded" style={{ background: c.color }} />
                        <span className="font-sans text-[0.68rem]" style={{ color: '#5A5A5A' }}>{c.color}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <input type="checkbox" checked={c.active} onChange={e => toggle(c.id, e.target.checked)} className="w-4 h-4 cursor-pointer" style={{ accentColor: '#4B5E3A' }} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => { setEditState({ id: c.id, name: c.name, tag: c.tag, color: c.color, imageUrl: c.imageUrl ?? '', category: c.category ?? '' }); setAdding(false) }}
                          className="font-sans text-[0.7rem] border-none bg-transparent cursor-pointer transition-colors"
                          style={{ color: '#4B5E3A' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#C4922A')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#4B5E3A')}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => del(c.id, c.name)}
                          className="font-sans text-[0.7rem] border-none bg-transparent cursor-pointer transition-colors"
                          style={{ color: '#5A5A5A' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#DC2626')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#5A5A5A')}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
