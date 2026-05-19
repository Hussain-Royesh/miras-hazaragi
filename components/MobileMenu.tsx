'use client'
import { useNav } from '@/context/NavContext'
import { useLanguage } from '@/context/LanguageContext'

export default function MobileMenu() {
  const { isMenuOpen, closeMenu } = useNav()
  const { t, setLang, lang } = useLanguage()

  const links = [
    { href: '#collections', label: t.nav_collections },
    { href: '#shop',        label: t.nav_shop },
    { href: '#story',       label: t.nav_story },
    { href: '#craft',       label: t.nav_craft },
    { href: '#artisans',    label: t.nav_artisans },
    { href: '#gallery',     label: t.nav_gallery },
  ]

  return (
    <div
      className="fixed left-0 right-0 bottom-0 z-[90] overflow-y-auto transition-transform duration-300 md:hidden"
      style={{
        top: '72px',
        background: '#FAF7F2',
        padding: '3rem 2rem',
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      <ul className="list-none">
        {links.map(link => (
          <li key={link.href} style={{ borderBottom: '1px solid rgba(75,94,58,0.15)' }}>
            <a
              href={link.href}
              onClick={closeMenu}
              className="block py-5 font-serif text-[1.5rem] no-underline transition-all duration-300"
              style={{ color: '#3A4A2C' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#C4922A'; e.currentTarget.style.paddingLeft = '0.5rem' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#3A4A2C'; e.currentTarget.style.paddingLeft = '0' }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Language toggle for mobile */}
      <button
        onClick={() => { setLang(lang === 'en' ? 'fa' : 'en'); closeMenu() }}
        className="mt-8 font-sans text-[0.72rem] tracking-[0.1em] uppercase border px-4 py-2 cursor-pointer transition-colors"
        style={{ borderColor: 'rgba(75,94,58,0.25)', color: '#4B5E3A', background: 'transparent' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#4B5E3A'; e.currentTarget.style.color = 'white' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4B5E3A' }}
      >
        {lang === 'en' ? 'دری' : 'EN'}
      </button>
    </div>
  )
}
