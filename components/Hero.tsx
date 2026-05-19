'use client'
import { useLanguage } from '@/context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="min-h-screen grid md:grid-cols-2 overflow-hidden" style={{ paddingTop: '72px' }}>
      {/* Left — text */}
      <div
        className="relative flex flex-col justify-center"
        style={{ padding: '6rem 5rem 6rem 4rem', background: '#FAF7F2' }}
      >
        {/* Gold divider line */}
        <div
          className="hidden md:block absolute top-0 right-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, #C4922A, transparent)' }}
        />

        <span
          className="font-sans text-[0.68rem] tracking-[0.22em] uppercase mb-5"
          style={{ color: '#C4922A' }}
        >
          {t.hero_tag}
        </span>

        <h1
          className="font-serif font-light leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(3.2rem, 5vw, 5.5rem)', color: '#3A4A2C' }}
        >
          {t.hero_h1_line1}<br />
          {t.hero_h1_line2} <em className="italic" style={{ color: '#C4922A' }}>{t.hero_h1_em}</em>
        </h1>

        <p
          className="text-[0.95rem] leading-[1.85] font-light max-w-[440px] mb-12"
          style={{ color: '#5A5A5A' }}
        >
          {t.hero_desc}
        </p>

        <div className="flex gap-5 flex-wrap">
          <a
            href="#shop"
            className="font-sans text-[0.72rem] tracking-[0.14em] uppercase text-white px-10 py-4 no-underline transition-colors bg-green hover:bg-gold"
          >
            {t.hero_cta_shop}
          </a>
          <a
            href="#story"
            className="font-sans text-[0.72rem] tracking-[0.14em] uppercase px-10 py-4 no-underline transition-colors border border-green text-green hover:bg-green hover:text-white"
          >
            {t.hero_cta_story}
          </a>
        </div>
      </div>

      {/* Right — decorative */}
      <div
        className="hidden md:flex relative overflow-hidden items-center justify-center"
        style={{ background: '#3A4A2C' }}
      >
        {/* Diagonal pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #C4922A 0, #C4922A 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 text-center p-12">
          <p
            className="font-serif text-[1.15rem] italic tracking-[0.08em] mb-8"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            {t.hero_handcrafted}
          </p>

          {/* Decorative frame */}
          <div
            className="relative mx-auto flex items-center justify-center overflow-hidden"
            style={{
              width: 'min(380px, 80%)',
              aspectRatio: '3/4',
              border: '1px solid rgba(196,146,42,0.3)',
              background:
                'linear-gradient(160deg, rgba(196,146,42,0.15) 0%, rgba(255,255,255,0.05) 100%)',
            }}
          >
            {/* Inner border */}
            <div
              className="absolute inset-3"
              style={{ border: '1px solid rgba(196,146,42,0.2)' }}
            />

            {/* Khamak SVG pattern */}
            <svg
              className="absolute inset-0 w-full h-full opacity-25"
              viewBox="0 0 400 530"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern
                  id="khamak-hero"
                  x="0"
                  y="0"
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M25,2 L48,25 L25,48 L2,25 Z" fill="none" stroke="#C4922A" strokeWidth="0.7" />
                  <circle cx="25" cy="25" r="4" fill="#C4922A" opacity="0.5" />
                  <path d="M25,2 L25,48 M2,25 L48,25" stroke="#C4922A" strokeWidth="0.3" opacity="0.4" />
                  <circle cx="25" cy="2" r="1.5" fill="#C4922A" opacity="0.6" />
                  <circle cx="48" cy="25" r="1.5" fill="#C4922A" opacity="0.6" />
                  <circle cx="25" cy="48" r="1.5" fill="#C4922A" opacity="0.6" />
                  <circle cx="2" cy="25" r="1.5" fill="#C4922A" opacity="0.6" />
                </pattern>
              </defs>
              <rect width="400" height="530" fill="url(#khamak-hero)" />
            </svg>

            {/* Center text */}
            <div className="relative z-10 text-center">
              <p
                className="font-serif text-[1.4rem] italic mb-2"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                {t.hero_khamak}
              </p>
              <span
                className="font-sans text-[0.65rem] tracking-[0.2em] uppercase"
                style={{ color: '#D4A84A' }}
              >
                {t.hero_living_heritage}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
