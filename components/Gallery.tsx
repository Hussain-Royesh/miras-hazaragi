'use client'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80', color: '#4B5E3A' },
  { src: 'https://images.unsplash.com/photo-1529139574466-a303027bc851?auto=format&fit=crop&w=600&q=80', color: '#6B7E5A' },
  { src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80', color: '#3A4A2C' },
  { src: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=600&q=80', color: '#C4922A' },
  { src: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80', color: '#5A3A2C' },
  { src: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?auto=format&fit=crop&w=600&q=80', color: '#3A5A4A' },
]

export default function Gallery() {
  const { t } = useLanguage()

  return (
    <section id="gallery" className="py-16 px-4 md:px-16" style={{ background: '#FDFCFA' }}>
      <div className="text-center mb-8">
        <span className="font-sans text-[0.65rem] tracking-[0.24em] uppercase block mb-2" style={{ color: '#C4922A' }}>
          {t.gal_tag}
        </span>
        <h2 className="font-serif font-light mb-1" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#3A4A2C' }}>
          @miras.hazargi
        </h2>
        <p className="font-sans text-[0.8rem] tracking-[0.1em]" style={{ color: '#C4922A' }}>
          {t.gal_platform}
        </p>
      </div>

      <div className="grid gap-[3px]" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        {galleryImages.map((item, i) => (
          <div
            key={i}
            className="relative overflow-hidden cursor-pointer group"
            style={{ aspectRatio: '1', backgroundColor: item.color }}
          >
            {/* Gallery photo with zoom on hover */}
            <Image
              src={item.src}
              alt={`Miras gallery ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.12]"
              sizes="(max-width: 768px) 33vw, 17vw"
            />

            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              style={{ background: 'rgba(75,94,58,0.5)' }}
            >
              <span className="text-white text-2xl">♡</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
