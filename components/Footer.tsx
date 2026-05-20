'use client'
import { useLanguage } from '@/context/LanguageContext'

const socialIcons = [
  { label: 'f', name: 'Facebook' },
  { label: 'in', name: 'Instagram' },
  { label: '𝕏', name: 'X / Twitter' },
  { label: '▶', name: 'YouTube' },
]

const shopFilters = ['All', 'khamak', 'dress', 'accessories', 'embroidered']
const aboutHrefs  = ['#story', '#artisans', '#craft', '#story', '#story']
const helpHrefs   = ['#', '#', '#', '#', 'mailto:miras.hazaragi@gmail.com']

const filterToShop = (filter: string) => {
  if (filter !== 'All') {
    const label = filter.charAt(0).toUpperCase() + filter.slice(1)
    window.dispatchEvent(new CustomEvent('miras-shop-filter', { detail: label }))
  }
  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer
      className="pt-20 pb-10 px-4 md:px-16"
      style={{ background: '#3A4A2C', color: 'rgba(255,255,255,0.75)' }}
    >
      {/* Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-16 mb-16 pb-16"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        {/* Brand */}
        <div>
          <div
            className="font-serif text-[2rem] mb-6 tracking-widest"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            MIRAS
          </div>
          <p className="text-[0.82rem] leading-[1.9] font-light max-w-[280px]">
            {t.footer_desc}
          </p>
          {/* Social */}
          <div className="flex gap-3 mt-6">
            {socialIcons.map(s => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                className="w-[34px] h-[34px] flex items-center justify-center text-[0.75rem] no-underline transition-colors text-white/70 border border-white/20 hover:border-gold hover:text-gold"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4
            className="font-sans text-[0.65rem] tracking-[0.2em] uppercase mb-6"
            style={{ color: '#D4A84A' }}
          >
            {t.footer_shop}
          </h4>
          <ul className="list-none space-y-3">
            {t.footer_shop_links.map((item, i) => (
              <li key={item}>
                <button
                  onClick={() => filterToShop(shopFilters[i] ?? 'All')}
                  className="text-[0.82rem] font-light no-underline transition-colors bg-transparent border-none cursor-pointer p-0 text-left"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* About */}
        <div>
          <h4
            className="font-sans text-[0.65rem] tracking-[0.2em] uppercase mb-6"
            style={{ color: '#D4A84A' }}
          >
            {t.footer_about}
          </h4>
          <ul className="list-none space-y-3">
            {t.footer_about_links.map((item, i) => (
              <li key={item}>
                <a
                  href={aboutHrefs[i] ?? '#story'}
                  className="text-[0.82rem] font-light no-underline transition-colors text-white/60 hover:text-white"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4
            className="font-sans text-[0.65rem] tracking-[0.2em] uppercase mb-6"
            style={{ color: '#D4A84A' }}
          >
            {t.footer_help}
          </h4>
          <ul className="list-none space-y-3">
            {t.footer_help_links.map((item, i) => (
              <li key={item}>
                <a
                  href={helpHrefs[i] ?? '#'}
                  className="text-[0.82rem] font-light no-underline transition-colors text-white/60 hover:text-white"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[0.72rem]" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {t.footer_rights}&nbsp;
          <a href="#" className="no-underline text-gold-light">{t.footer_privacy}</a>
          &nbsp;·&nbsp;
          <a href="#" className="no-underline text-gold-light">{t.footer_terms}</a>
        </p>
        <div className="flex gap-3">
          {t.footer_badges.map(badge => (
            <span
              key={badge}
              className="font-sans text-[0.6rem] tracking-[0.08em] px-3 py-1.5"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
