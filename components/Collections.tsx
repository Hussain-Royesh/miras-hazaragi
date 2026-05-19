'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

interface Collection {
  id: string
  name: string
  tag: string
  color: string
  imageUrl: string | null
  sortOrder: number
  active: boolean
}

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    fetch('/api/collections')
      .then(r => r.json())
      .then((data: Collection[]) => { if (Array.isArray(data)) setCollections(data) })
  }, [])

  return (
    <section id="collections" className="py-24 px-4 md:px-16" style={{ background: '#FDFCFA' }}>
      {/* Header */}
      <div className="text-center mb-16">
        <span
          className="font-sans text-[0.65rem] tracking-[0.24em] uppercase block mb-3"
          style={{ color: '#C4922A' }}
        >
          {t.col_tag}
        </span>
        <h2
          className="font-serif font-light mb-5"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', color: '#3A4A2C' }}
        >
          {t.col_h2}
        </h2>
        <p
          className="font-sans text-[0.92rem] leading-[1.9] font-light max-w-[560px] mx-auto"
          style={{ color: '#5A5A5A' }}
        >
          {t.col_desc}
        </p>
      </div>

      {/* Grid — 3 cols desktop, first card spans 2 rows */}
      <div
        className="max-w-[1300px] mx-auto"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px' }}
      >
        {collections.map((col, i) => (
          <div
            key={col.id}
            className="relative overflow-hidden cursor-pointer group"
            style={{
              aspectRatio: i === 0 ? 'auto' : '3/4',
              gridRow: i === 0 ? 'span 2' : 'auto',
              backgroundColor: col.color,
              minHeight: i === 0 ? '500px' : 'auto',
            }}
          >
            {/* Photo */}
            {col.imageUrl && (
              <Image
                src={col.imageUrl}
                alt={col.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            )}

            {/* Pattern overlay (only when no image) */}
            {!col.imageUrl && (
              <div
                className="absolute inset-0 opacity-[0.12] transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, rgba(196,146,42,0.5) 0, rgba(196,146,42,0.5) 1px, transparent 0, transparent 50%)',
                  backgroundSize: '20px 20px',
                }}
              />
            )}

            {/* Overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-end p-8"
              style={{
                background:
                  'linear-gradient(to top, rgba(42,42,30,0.85) 0%, rgba(42,42,30,0.1) 60%)',
              }}
            >
              <span
                className="font-sans text-[0.6rem] tracking-[0.22em] uppercase mb-2"
                style={{ color: '#D4A84A' }}
              >
                {col.tag}
              </span>
              <h3
                className="font-serif font-light leading-[1.1] mb-3 text-white"
                style={{ fontSize: '1.9rem' }}
              >
                {col.name}
              </h3>
              <a
                href="#shop"
                className="font-sans text-[0.65rem] tracking-[0.16em] uppercase no-underline inline-block pb-0.5 w-fit transition-colors text-gold-light border-b border-gold/40 hover:text-white hover:border-white"
              >
                {t.col_explore}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
