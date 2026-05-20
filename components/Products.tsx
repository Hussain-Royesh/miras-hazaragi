'use client'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import ProductMagnifier from '@/components/ProductMagnifier'

interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  originalPrice: number | null
  badge: string | null
  color: string
  imageUrl: string | null
  category: string
}

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const { addItem, openCart } = useCart()
  const { t } = useLanguage()

  const categories = [
    { value: 'All',         label: t.prod_all },
    { value: 'Khamak',      label: t.prod_khamak },
    { value: 'Dress',       label: t.prod_dress },
    { value: 'Accessories', label: t.prod_accessories },
    { value: 'Embroidered', label: t.prod_embroidered },
  ]

  useEffect(() => {
    const handler = (e: Event) => setActiveFilter((e as CustomEvent<string>).detail)
    window.addEventListener('miras-shop-filter', handler)
    return () => window.removeEventListener('miras-shop-filter', handler)
  }, [])

  useEffect(() => {
    setLoading(true)
    const cat = activeFilter === 'All' ? '' : activeFilter.toLowerCase()
    fetch(`/api/products${cat ? `?category=${cat}` : ''}`)
      .then(r => r.json())
      .then((data: Product[]) => {
        setProducts(data)
        setLoading(false)
      })
  }, [activeFilter])

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.color,
      image: product.imageUrl ?? '',
      quantity: 1,
    })
    openCart()
  }

  return (
    <section id="shop" className="py-24 px-4 md:px-16" style={{ background: '#FDFCFA' }}>
      {/* Header + filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <span className="font-sans text-[0.65rem] tracking-[0.24em] uppercase block mb-3" style={{ color: '#C4922A' }}>
            {t.prod_tag}
          </span>
          <h2 className="font-serif font-light" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', color: '#3A4A2C' }}>
            {t.prod_h2}
          </h2>
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className="font-sans text-[0.65rem] tracking-[0.12em] uppercase px-5 py-2 border cursor-pointer transition-colors"
              style={{
                background: activeFilter === cat.value ? '#4B5E3A' : 'transparent',
                color: activeFilter === cat.value ? 'white' : '#5A5A5A',
                borderColor: activeFilter === cat.value ? '#4B5E3A' : 'rgba(75,94,58,0.15)',
              }}
              onMouseEnter={e => {
                if (activeFilter !== cat.value) {
                  e.currentTarget.style.background = '#4B5E3A'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.borderColor = '#4B5E3A'
                }
              }}
              onMouseLeave={e => {
                if (activeFilter !== cat.value) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#5A5A5A'
                  e.currentTarget.style.borderColor = 'rgba(75,94,58,0.15)'
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-[1400px] mx-auto">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="mb-5" style={{ aspectRatio: '2/3', background: '#E8E2D8' }} />
                <div className="h-4 mb-2 rounded-sm" style={{ background: '#E8E2D8', width: '70%' }} />
                <div className="h-3 mb-2 rounded-sm" style={{ background: '#E8E2D8', width: '50%' }} />
                <div className="h-4 rounded-sm" style={{ background: '#E8E2D8', width: '30%' }} />
              </div>
            ))
          : products.map(product => (
              <div key={product.id} className="cursor-pointer group">
                {/* Image area */}
                <div
                  className="relative overflow-hidden mb-5"
                  style={{ aspectRatio: '2/3', backgroundColor: product.color }}
                >
                  {product.imageUrl && (
                    <ProductMagnifier src={product.imageUrl} alt={product.name} />
                  )}

                  {/* Badge */}
                  {product.badge === 'new' && (
                    <span
                      className="absolute top-4 left-4 z-20 font-sans text-[0.58rem] tracking-[0.1em] uppercase px-3 py-1 text-white"
                      style={{ background: '#C4922A' }}
                    >
                      {t.prod_badge_new}
                    </span>
                  )}
                  {product.badge === 'handstitched' && (
                    <span
                      className="absolute top-4 left-4 z-20 font-sans text-[0.58rem] tracking-[0.1em] uppercase px-3 py-1 text-white"
                      style={{ background: '#4B5E3A' }}
                    >
                      {t.prod_badge_handstitched}
                    </span>
                  )}

                  {/* Hover actions */}
                  <div className="absolute bottom-0 left-0 right-0 z-30 p-4 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 font-sans text-[0.65rem] tracking-[0.12em] uppercase text-white border-none py-3 cursor-pointer transition-colors"
                      style={{ background: '#4B5E3A' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#C4922A')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#4B5E3A')}
                    >
                      {t.prod_add_cart}
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="border-none py-3 px-4 cursor-pointer text-base transition-all duration-200"
                      style={{
                        background: wishlist.has(product.id) ? '#C4922A' : 'white',
                        color: wishlist.has(product.id) ? 'white' : '#C4922A',
                        transform: 'scale(1)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                      aria-label={wishlist.has(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      {wishlist.has(product.id) ? '♥' : '♡'}
                    </button>
                  </div>
                </div>

                {/* Info */}
                <h3 className="font-serif text-[1.05rem] mb-1" style={{ color: '#3A4A2C' }}>
                  {product.name}
                </h3>
                <p className="font-sans text-[0.65rem] tracking-[0.1em] uppercase mb-2" style={{ color: '#5A5A5A' }}>
                  {product.subtitle}
                </p>
                <p className="font-serif text-[1.1rem] font-semibold" style={{ color: '#4B5E3A' }}>
                  {product.originalPrice && (
                    <del className="font-light mr-2 text-[0.85rem]" style={{ color: '#5A5A5A' }}>
                      £{product.originalPrice}
                    </del>
                  )}
                  £{product.price}
                </p>
              </div>
            ))}
      </div>
    </section>
  )
}
