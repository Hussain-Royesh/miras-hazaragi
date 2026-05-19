'use client'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const { items, removeItem, isOpen, closeCart, total, checkout, checkoutLoading } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[150] bg-black/40 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[200] flex flex-col shadow-2xl transition-transform duration-300"
        style={{
          width: 'min(400px, 100vw)',
          background: '#FDFCFA',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center px-8 py-6"
          style={{ borderBottom: '1px solid rgba(75,94,58,0.15)' }}
        >
          <h3 className="font-serif text-[1.4rem] font-normal" style={{ color: '#3A4A2C' }}>
            Your Cart
          </h3>
          <button
            onClick={closeCart}
            className="bg-transparent border-none text-[1.3rem] cursor-pointer transition-colors"
            style={{ color: '#5A5A5A' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#4B5E3A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#5A5A5A')}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-serif text-[1.1rem] italic mb-6" style={{ color: '#5A5A5A' }}>
                Your cart is empty
              </p>
              <button
                onClick={closeCart}
                className="font-sans text-[0.72rem] tracking-[0.14em] uppercase text-white border-none px-8 py-3 cursor-pointer transition-colors"
                style={{ background: '#4B5E3A' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#C4922A')}
                onMouseLeave={e => (e.currentTarget.style.background = '#4B5E3A')}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6"
                  style={{ borderBottom: '1px solid rgba(75,94,58,0.15)' }}
                >
                  {/* Product photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-[100px] flex-shrink-0 object-cover"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <h4 className="font-serif text-[1rem] mb-1" style={{ color: '#3A4A2C' }}>
                      {item.name}
                    </h4>
                    <p className="text-[0.85rem]" style={{ color: '#5A5A5A' }}>
                      £{item.price} × {item.quantity}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-2 font-sans text-[0.7rem] tracking-[0.1em] uppercase bg-transparent border-none cursor-pointer transition-colors"
                      style={{ color: '#C4922A' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#3A4A2C')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#C4922A')}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-6" style={{ borderTop: '1px solid rgba(75,94,58,0.15)' }}>
            <div className="flex justify-between mb-5">
              <span className="font-serif text-[1.1rem]" style={{ color: '#3A4A2C' }}>Total</span>
              <span className="font-serif text-[1.1rem]" style={{ color: '#3A4A2C' }}>£{total.toFixed(2)}</span>
            </div>
            <button
              onClick={checkout}
              disabled={checkoutLoading}
              className="w-full py-4 text-white font-sans text-[0.75rem] tracking-[0.14em] uppercase border-none cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: '#4B5E3A' }}
              onMouseEnter={e => { if (!checkoutLoading) e.currentTarget.style.background = '#C4922A' }}
              onMouseLeave={e => (e.currentTarget.style.background = '#4B5E3A')}
            >
              {checkoutLoading ? 'Redirecting…' : 'Checkout with Stripe'}
            </button>
            <p className="text-center font-sans text-[0.62rem] tracking-[0.08em] mt-3" style={{ color: '#5A5A5A' }}>
              Secure payment powered by Stripe
            </p>
          </div>
        )}
      </div>
    </>
  )
}
