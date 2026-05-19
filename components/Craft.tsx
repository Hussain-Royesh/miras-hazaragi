'use client'
import { useLanguage } from '@/context/LanguageContext'

export default function Craft() {
  const { t } = useLanguage()

  const steps = [
    { num: '01', icon: '🪡', name: t.craft_s1_name, desc: t.craft_s1_desc },
    { num: '02', icon: '✏️', name: t.craft_s2_name, desc: t.craft_s2_desc },
    { num: '03', icon: '🧵', name: t.craft_s3_name, desc: t.craft_s3_desc },
    { num: '04', icon: '✨', name: t.craft_s4_name, desc: t.craft_s4_desc },
  ]

  return (
    <section
      id="craft"
      className="relative py-28 px-4 md:px-16 text-center overflow-hidden"
      style={{ background: '#3A4A2C' }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #C4922A 0, #C4922A 1px, transparent 0, transparent 50%)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10">
        <span
          className="font-sans text-[0.65rem] tracking-[0.24em] uppercase block mb-3"
          style={{ color: '#D4A84A' }}
        >
          {t.craft_tag}
        </span>
        <h2
          className="font-serif font-light text-white mx-auto mb-6"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
        >
          {t.craft_h2}
        </h2>
        <p
          className="font-sans text-[0.92rem] leading-[1.9] font-light max-w-[560px] mx-auto mb-16"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          {t.craft_desc}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 max-w-[1100px] mx-auto">
          {steps.map(step => (
            <div key={step.num} className="text-center">
              <div
                className="font-serif text-[3rem] leading-none mb-4"
                style={{ color: 'rgba(196,146,42,0.25)' }}
              >
                {step.num}
              </div>
              <div
                className="w-14 h-14 flex items-center justify-center mx-auto mb-5 text-[1.4rem]"
                style={{ border: '1px solid rgba(196,146,42,0.4)' }}
              >
                {step.icon}
              </div>
              <h3 className="font-serif text-[1.15rem] text-white mb-2">{step.name}</h3>
              <p
                className="font-sans text-[0.82rem] leading-[1.7] font-light"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
