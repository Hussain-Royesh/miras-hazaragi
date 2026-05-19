'use client'
import { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useNav } from '@/context/NavContext'
import { useLanguage } from '@/context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { count, openCart } = useCart()
  const { toggleMenu, isMenuOpen } = useNav()
  const { lang, setLang, t } = useLanguage()

  const links = [
    { href: '#collections', label: t.nav_collections },
    { href: '#shop',        label: t.nav_shop },
    { href: '#story',       label: t.nav_story },
    { href: '#craft',       label: t.nav_craft },
    { href: '#artisans',    label: t.nav_artisans },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between border-b transition-all duration-300"
      style={{
        padding: '0 4rem',
        height: scrolled ? '60px' : '72px',
        background: 'rgba(250,247,242,0.95)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(75,94,58,0.15)',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      {/* Logo */}
      <a href="/" className="font-serif text-2xl tracking-widest font-light no-underline" style={{ color: '#3A4A2C' }}>
        MIRAS
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-10 list-none">
        {links.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className="relative font-sans text-[0.72rem] font-normal tracking-[0.14em] uppercase no-underline transition-colors duration-300 group"
              style={{ color: '#4B5E3A' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C4922A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#4B5E3A')}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: '#C4922A' }}
              />
            </a>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div className="flex items-center gap-4">

        {/* Language toggle */}
        <button
          onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
          className="hidden md:flex items-center font-sans text-[0.68rem] tracking-[0.08em] uppercase border cursor-pointer transition-colors px-3 py-1.5"
          style={{ borderColor: 'rgba(75,94,58,0.25)', color: '#4B5E3A', background: 'transparent' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#4B5E3A'; e.currentTarget.style.color = 'white' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4B5E3A' }}
          aria-label="Switch language"
        >
          {lang === 'en' ? 'دری' : 'EN'}
        </button>

        {/* Cart icon */}
        <button
          onClick={openCart}
          aria-label="Open cart"
          className="relative bg-transparent border-none cursor-pointer text-lg transition-colors"
          style={{ color: '#4B5E3A' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C4922A')}
          onMouseLeave={e => (e.currentTarget.style.color = '#4B5E3A')}
        >
          🛍
          {count > 0 && (
            <span
              className="absolute -top-2 -right-2 text-white w-4 h-4 rounded-full text-[0.6rem] flex items-center justify-center"
              style={{ background: '#C4922A' }}
            >
              {count}
            </span>
          )}
        </button>

        {/* Cart button (desktop) */}
        <button
          onClick={openCart}
          className="hidden md:block font-sans text-[0.7rem] tracking-[0.14em] uppercase text-white border-none px-5 py-2.5 cursor-pointer transition-colors"
          style={{ background: '#4B5E3A' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#C4922A')}
          onMouseLeave={e => (e.currentTarget.style.background = '#4B5E3A')}
        >
          {t.nav_cart}{count > 0 ? ` (${count})` : ''}
        </button>

        {/* Hamburger (mobile) */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none p-1"
        >
          <span className="block w-[22px] h-[1.5px] transition-transform duration-300" style={{ background: '#4B5E3A', transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span className="block w-[22px] h-[1.5px] transition-opacity duration-300" style={{ background: '#4B5E3A', opacity: isMenuOpen ? 0 : 1 }} />
          <span className="block w-[22px] h-[1.5px] transition-transform duration-300" style={{ background: '#4B5E3A', transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>
    </nav>
  )
}
