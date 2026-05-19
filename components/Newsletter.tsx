'use client'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubmitted(true)
        setEmail('')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="newsletter"
      className="relative py-24 px-4 md:px-16 text-center overflow-hidden"
      style={{ background: '#4B5E3A' }}
    >
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #C4922A 0, #C4922A 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10">
        <span className="font-sans text-[0.65rem] tracking-[0.24em] uppercase block mb-3" style={{ color: '#D4A84A' }}>
          {t.news_tag}
        </span>
        <h2
          className="font-serif font-light text-white mx-auto mb-4"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
        >
          {t.news_h2}
        </h2>
        <p
          className="font-sans text-[0.9rem] mx-auto mb-10 max-w-[480px] leading-[1.8] font-light"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          {t.news_desc}
        </p>

        {submitted ? (
          <p className="font-serif text-[1.2rem] italic" style={{ color: '#D4A84A' }}>
            {t.news_thanks}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex max-w-[480px] mx-auto gap-0 flex-col sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t.news_placeholder}
              required
              className="flex-1 px-6 py-4 font-sans text-[0.82rem] text-white bg-white/10 outline-none placeholder-white/40"
              style={{ border: '1px solid rgba(255,255,255,0.2)' }}
              onFocus={e => (e.currentTarget.style.borderColor = '#C4922A')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
            <button
              type="submit"
              disabled={loading}
              className="font-sans text-[0.72rem] tracking-[0.14em] uppercase text-white border-none px-8 py-4 cursor-pointer whitespace-nowrap transition-colors disabled:opacity-60 bg-gold hover:bg-gold-light"
            >
              {loading ? '…' : t.news_btn}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
