'use client'
import { useLanguage } from '@/context/LanguageContext'

export default function Testimonials() {
  const { t } = useLanguage()

  const testimonials = [
    { text: t.test1, name: t.test1_name, location: t.test1_loc },
    { text: t.test2, name: t.test2_name, location: t.test2_loc },
    { text: t.test3, name: t.test3_name, location: t.test3_loc },
  ]

  return (
    <section id="testimonials" className="py-24 px-4 md:px-16 overflow-hidden" style={{ background: '#F0EBE0' }}>
      <div className="text-center">
        <span className="font-sans text-[0.65rem] tracking-[0.24em] uppercase block mb-3" style={{ color: '#C4922A' }}>
          {t.test_tag}
        </span>
        <h2 className="font-serif font-light" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', color: '#3A4A2C' }}>
          {t.test_h2}
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto mt-12">
        {testimonials.map(item => (
          <div key={item.name} className="p-10" style={{ background: '#FDFCFA' }}>
            <div className="text-[0.85rem] tracking-[0.1em] mb-5" style={{ color: '#C4922A' }}>
              ★★★★★
            </div>
            <p className="font-serif text-[1.05rem] leading-[1.7] italic mb-6" style={{ color: '#3A4A2C' }}>
              &ldquo;{item.text}&rdquo;
            </p>
            <div className="font-sans text-[0.65rem] tracking-[0.14em] uppercase" style={{ color: '#5A5A5A' }}>
              <strong className="block mb-0.5 font-medium" style={{ color: '#4B5E3A' }}>
                {item.name}
              </strong>
              {item.location}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
