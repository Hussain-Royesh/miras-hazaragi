'use client'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '▣' },
  { href: '/admin/products', label: 'Products', icon: '◈' },
  { href: '/admin/collections', label: 'Collections', icon: '◉' },
  { href: '/admin/orders', label: 'Orders', icon: '◎' },
  { href: '/admin/customers', label: 'Customers', icon: '◌' },
  { href: '/admin/newsletter', label: 'Newsletter', icon: '◇' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <aside
      className="fixed top-0 left-0 bottom-0 w-64 flex flex-col z-50"
      style={{ background: '#3A4A2C' }}
    >
      {/* Logo */}
      <div
        className="px-8 py-6 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="font-serif text-xl tracking-widest" style={{ color: 'rgba(255,255,255,0.9)' }}>
          MIRAS
        </div>
        <div className="font-sans text-[0.6rem] tracking-[0.2em] uppercase mt-0.5" style={{ color: '#D4A84A' }}>
          Admin Panel
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 overflow-y-auto">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-8 py-3 font-sans text-[0.78rem] tracking-[0.08em] no-underline transition-all"
            style={{
              color: isActive(item.href) ? '#C4922A' : 'rgba(255,255,255,0.65)',
              background: isActive(item.href) ? 'rgba(196,146,42,0.12)' : 'transparent',
              borderRight: isActive(item.href) ? '3px solid #C4922A' : '3px solid transparent',
            }}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom — user info + logout */}
      <div
        className="px-8 py-5 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="font-sans text-[0.72rem] mb-0.5" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {session?.user?.name ?? 'Admin'}
        </div>
        <div className="font-sans text-[0.65rem] mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {session?.user?.email}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full font-sans text-[0.68rem] tracking-[0.1em] uppercase py-2 border cursor-pointer transition-colors text-left px-3"
          style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', background: 'transparent' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#C4922A'; e.currentTarget.style.color = '#C4922A' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
