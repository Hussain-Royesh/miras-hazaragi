'use client'
import { useState, useEffect } from 'react'

const SECTIONS = [
  {
    title: 'Announcement Bar',
    fields: [
      { key: 'announcement', label: 'Announcement Text', multiline: false, placeholder: 'Free shipping on orders over £120 to UK & Australia · Handmade in Quetta, Pakistan' },
    ],
  },
  {
    title: 'Hero Section',
    fields: [
      { key: 'hero_tag', label: 'Gold Tag (above headline)', multiline: false, placeholder: 'Hazargi Heritage · Est. 2020' },
      { key: 'hero_h1_line1', label: 'Headline — Line 1', multiline: false, placeholder: 'Her Art,' },
      { key: 'hero_h1_line2', label: 'Headline — Line 2', multiline: false, placeholder: 'Her' },
      { key: 'hero_h1_em', label: 'Headline — Italic Word', multiline: false, placeholder: 'Power.' },
      { key: 'hero_desc', label: 'Description Paragraph', multiline: true, placeholder: 'Miras celebrates the ancient art of Khamak embroidery…' },
    ],
  },
  {
    title: 'Our Story Section',
    fields: [
      { key: 'story_p1', label: 'Paragraph 1', multiline: true, placeholder: 'Miras — meaning "heritage" in Dari…' },
      { key: 'story_p2', label: 'Paragraph 2', multiline: true, placeholder: 'Our cooperative of skilled Hazargi women…' },
    ],
  },
]

const inputCls = 'w-full px-4 py-2.5 font-sans text-[0.85rem] outline-none transition-colors'
const inputStyle = { border: '1px solid rgba(75,94,58,0.2)', color: '#2A2A2A', background: 'white' }

export default function AdminContent() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(d => { setValues(d); setLoading(false) })
  }, [])

  const set = (key: string, value: string) => {
    setValues(v => ({ ...v, [key]: value }))
    setSaved(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/admin/content', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    setSaving(false)
    setSaved(true)
  }

  const label = (text: string) => (
    <label className="block font-sans text-[0.68rem] tracking-[0.12em] uppercase mb-2" style={{ color: '#5A5A5A' }}>
      {text}
    </label>
  )

  if (loading) return <p className="font-serif italic p-4" style={{ color: '#5A5A5A' }}>Loading…</p>

  return (
    <div>
      <h1 className="font-serif text-[2rem] mb-1" style={{ color: '#3A4A2C' }}>Site Content</h1>
      <p className="font-sans text-[0.78rem] mb-8" style={{ color: '#5A5A5A' }}>
        Edit homepage text. Leave a field blank to use the default text.
      </p>

      {saved && (
        <div className="mb-6 p-3 font-sans text-[0.78rem]" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' }}>
          Changes saved. They will be live after the next page load.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
        {SECTIONS.map(section => (
          <div key={section.title} className="bg-white p-8" style={{ border: '1px solid rgba(75,94,58,0.1)' }}>
            <h2 className="font-sans text-[0.75rem] tracking-[0.14em] uppercase mb-6" style={{ color: '#3A4A2C' }}>
              {section.title}
            </h2>
            <div className="space-y-5">
              {section.fields.map(f => (
                <div key={f.key}>
                  {label(f.label)}
                  {f.multiline ? (
                    <textarea
                      rows={3}
                      value={values[f.key] ?? ''}
                      onChange={e => set(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className={inputCls}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => (e.currentTarget.style.borderColor = '#C4922A')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(75,94,58,0.2)')}
                    />
                  ) : (
                    <input
                      type="text"
                      value={values[f.key] ?? ''}
                      onChange={e => set(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className={inputCls}
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = '#C4922A')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(75,94,58,0.2)')}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={saving}
          className="font-sans text-[0.72rem] tracking-[0.12em] uppercase text-white px-10 py-3 border-none cursor-pointer disabled:opacity-60 transition-colors"
          style={{ background: '#4B5E3A' }}
          onMouseEnter={e => { if (!saving) e.currentTarget.style.background = '#C4922A' }}
          onMouseLeave={e => (e.currentTarget.style.background = '#4B5E3A')}
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
