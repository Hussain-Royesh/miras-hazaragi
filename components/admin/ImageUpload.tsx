'use client'
import { useState, useRef } from 'react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  const upload = async (file: File) => {
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    const data = await res.json()
    setUploading(false)
    if (data.url) onChange(data.url)
  }

  return (
    <div className="flex items-start gap-3">
      <div
        onClick={() => !uploading && ref.current?.click()}
        className="relative flex-shrink-0 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden"
        style={{ width: '84px', height: '112px', border: '2px dashed rgba(75,94,58,0.25)', background: '#FAFAF8' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = '#C4922A')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(75,94,58,0.25)')}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        ) : uploading ? (
          <span className="font-sans text-[0.62rem] text-center px-2" style={{ color: '#5A5A5A' }}>Uploading…</span>
        ) : (
          <>
            <span className="text-2xl mb-1" style={{ color: 'rgba(75,94,58,0.3)' }}>↑</span>
            <span className="font-sans text-[0.62rem] text-center leading-tight" style={{ color: '#5A5A5A' }}>Upload<br />Image</span>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 justify-center mt-2">
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={uploading}
          className="font-sans text-[0.68rem] tracking-[0.1em] uppercase px-3 py-1.5 border cursor-pointer transition-colors disabled:opacity-60"
          style={{ borderColor: 'rgba(75,94,58,0.3)', color: '#4B5E3A', background: 'transparent' }}
          onMouseEnter={e => { if (!uploading) { e.currentTarget.style.background = '#4B5E3A'; e.currentTarget.style.color = 'white' } }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4B5E3A' }}
        >
          {uploading ? 'Uploading…' : value ? 'Change' : 'Upload'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="font-sans text-[0.68rem] tracking-[0.1em] uppercase px-3 py-1.5 border-none bg-transparent cursor-pointer"
            style={{ color: '#DC2626' }}
          >
            Remove
          </button>
        )}
      </div>

      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) upload(f) }}
      />
    </div>
  )
}
