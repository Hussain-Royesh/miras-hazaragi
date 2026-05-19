'use client'
import { useLanguage } from '@/context/LanguageContext'

export default function Story() {
  const { t } = useLanguage()

  const stats = [
    { num: '200+', label: t.story_stat_artisans },
    { num: '1000+', label: t.story_stat_pieces },
    { num: '30+', label: t.story_stat_countries },
  ]

  return (
    <section
      id="story"
      className="py-24 px-4 md:px-16 grid md:grid-cols-2 gap-16 md:gap-24 items-center"
      style={{ background: '#F0EBE0' }}
    >
      {/* Visual */}
      <div className="relative">
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: '4/5', background: '#4B5E3A' }}
        >
          {/* Pattern */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              background:
                'repeating-conic-gradient(#C4922A 0deg 10deg, transparent 10deg 20deg) 0 0/30px 30px',
            }}
          />

          {/* Khamak motif SVG */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.18]"
            viewBox="0 0 400 500"
            preserveAspectRatio="xMidYMid meet"
          >
            <g stroke="#C4922A" fill="none">
              <path d="M200,40 L360,200 L200,360 L40,200 Z" strokeWidth="1" />
              <path d="M200,80 L320,200 L200,320 L80,200 Z" strokeWidth="0.6" />
              <path d="M200,120 L280,200 L200,280 L120,200 Z" strokeWidth="0.6" />
              <circle cx="200" cy="200" r="22" strokeWidth="1" />
              <circle cx="200" cy="40" r="5" fill="#C4922A" />
              <circle cx="360" cy="200" r="5" fill="#C4922A" />
              <circle cx="200" cy="360" r="5" fill="#C4922A" />
              <circle cx="40" cy="200" r="5" fill="#C4922A" />
            </g>
          </svg>

          {/* Caption */}
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
            <span
              className="font-serif italic tracking-[0.06em] text-[0.85rem]"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Quetta, Pakistan
            </span>
            <span
              className="font-serif italic tracking-[0.06em] text-[0.85rem]"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Since 2020
            </span>
          </div>
        </div>

        {/* Badge */}
        <div
          className="absolute -bottom-6 -right-6 w-[120px] h-[120px] hidden md:flex flex-col items-center justify-center gap-1"
          style={{ background: '#C4922A' }}
        >
          <strong className="font-serif text-[2.2rem] text-white leading-none">5+</strong>
          <span className="font-sans text-[0.6rem] tracking-[0.1em] uppercase text-white/85">
            {t.story_years}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        <span
          className="font-sans text-[0.65rem] tracking-[0.24em] uppercase block mb-3"
          style={{ color: '#C4922A' }}
        >
          {t.story_tag}
        </span>
        <h2
          className="font-serif font-light leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', color: '#3A4A2C' }}
        >
          {t.story_h2_line1}<br />
          <em className="italic">{t.story_h2_em}</em>
        </h2>
        <p className="text-[0.92rem] leading-[1.9] font-light mb-4" style={{ color: '#5A5A5A' }}>
          {t.story_p1}
        </p>
        <p className="text-[0.92rem] leading-[1.9] font-light mb-10" style={{ color: '#5A5A5A' }}>
          {t.story_p2}
        </p>

        <a
          href="#artisans"
          className="font-sans text-[0.72rem] tracking-[0.14em] uppercase text-white px-10 py-4 no-underline inline-block transition-colors bg-green hover:bg-gold"
        >
          {t.story_cta}
        </a>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-4 mt-12 pt-10"
          style={{ borderTop: '1px solid rgba(75,94,58,0.15)' }}
        >
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <div
                className="font-serif text-[2.4rem] font-light leading-none"
                style={{ color: '#4B5E3A' }}
              >
                {stat.num}
              </div>
              <div
                className="font-sans text-[0.65rem] tracking-[0.12em] uppercase mt-1"
                style={{ color: '#5A5A5A' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
