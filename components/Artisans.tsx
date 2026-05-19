'use client'
import { useLanguage } from '@/context/LanguageContext'

export default function Artisans() {
  const { t } = useLanguage()

  const artisans = [
    { initial: 'F', name: 'Fatima Mohammadi',  title: t.artisan1_title, bio: t.artisan1_bio },
    { initial: 'Z', name: 'Zahra Hussaini',     title: t.artisan2_title, bio: t.artisan2_bio },
    { initial: 'M', name: 'Maryam Alizada',     title: t.artisan3_title, bio: t.artisan3_bio },
  ]

  return (
    <section id="artisans" className="py-24 px-4 md:px-16" style={{ background: '#FAF7F2' }}>
      {/* Header */}
      <div className="text-center mb-16">
        <span className="font-sans text-[0.65rem] tracking-[0.24em] uppercase block mb-3" style={{ color: '#C4922A' }}>
          {t.artisans_tag}
        </span>
        <h2 className="font-serif font-light mb-5" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', color: '#3A4A2C' }}>
          {t.artisans_h2}
        </h2>
        <p
          className="font-sans text-[0.92rem] leading-[1.9] font-light max-w-[560px] mx-auto text-center"
          style={{ color: '#5A5A5A' }}
        >
          {t.artisans_desc}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
        {artisans.map(artisan => (
          <div key={artisan.name} className="text-center">
            {/* Avatar */}
            <div
              className="mx-auto mb-6 rounded-full overflow-hidden flex items-center justify-center"
              style={{
                width: 'min(220px, 100%)',
                aspectRatio: '1',
                background: '#4B5E3A',
                border: '3px solid #C4922A',
              }}
            >
              <span className="font-serif text-[4rem] italic" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {artisan.initial}
              </span>
            </div>
            <h3 className="font-serif text-[1.3rem] mb-1" style={{ color: '#3A4A2C' }}>
              {artisan.name}
            </h3>
            <p className="font-sans text-[0.65rem] tracking-[0.14em] uppercase mb-3" style={{ color: '#C4922A' }}>
              {artisan.title}
            </p>
            <p className="text-[0.85rem] leading-[1.8] font-light" style={{ color: '#5A5A5A' }}>
              {artisan.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
