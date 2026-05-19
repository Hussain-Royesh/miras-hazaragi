export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

interface Props {
  searchParams: { session_id?: string }
}

async function getSessionData(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    })
    return session
  } catch {
    return null
  }
}

function formatAddress(addr: Stripe.Address | null | undefined): string {
  if (!addr) return ''
  return [addr.line1, addr.line2, addr.city, addr.state, addr.postal_code, addr.country]
    .filter(Boolean)
    .join(', ')
}

export default async function SuccessPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id
  const session = sessionId ? await getSessionData(sessionId) : null

  const customerName = session?.customer_details?.name ?? ''
  const customerEmail = session?.customer_details?.email ?? ''
  const shippingAddress = session?.shipping_details?.address
  const total = session?.amount_total ? (session.amount_total / 100).toFixed(2) : null
  const items = (session?.line_items?.data ?? [])

  return (
    <div className="min-h-screen" style={{ background: '#FAF7F2' }}>
      {/* Hero confirmation strip */}
      <div style={{ background: '#3A4A2C', padding: '3rem 2rem', textAlign: 'center' }}>
        <div
          style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: '#C4922A', display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '1.6rem', color: 'white', marginBottom: '1.5rem',
          }}
        >
          ✓
        </div>
        <p style={{ margin: '0 0 6px', fontSize: '10px', letterSpacing: '3px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
          Payment Successful
        </p>
        <h1 style={{ margin: '0', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, color: '#ffffff', fontFamily: 'Georgia, serif' }}>
          {customerName ? `Thank you, ${customerName.split(' ')[0]}.` : 'Thank You for Your Order'}
        </h1>
        {customerEmail && (
          <p style={{ margin: '12px 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.55)', fontFamily: 'sans-serif' }}>
            A confirmation has been sent to&nbsp;<strong style={{ color: 'rgba(255,255,255,0.85)' }}>{customerEmail}</strong>
          </p>
        )}
      </div>

      {/* Gold bar */}
      <div style={{ background: '#C4922A', height: '3px' }} />

      {/* Content */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Order summary */}
        {items.length > 0 && (
          <div style={{ background: '#FDFCFA', border: '1px solid rgba(75,94,58,0.12)', marginBottom: '1.5rem' }}>
            <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(75,94,58,0.1)' }}>
              <p style={{ margin: 0, fontSize: '10px', letterSpacing: '2px', color: '#3A4A2C', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                Order Summary
              </p>
            </div>
            <div style={{ padding: '8px 28px 24px' }}>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < items.length - 1 ? '1px solid rgba(75,94,58,0.08)' : 'none' }}>
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: '15px', color: '#2A2A2A', fontFamily: 'Georgia, serif' }}>
                      {item.description}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#5A5A5A', fontFamily: 'sans-serif' }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p style={{ margin: 0, fontSize: '15px', color: '#3A4A2C', fontFamily: 'Georgia, serif', fontWeight: 600 }}>
                    £{((item.amount_total / 100)).toFixed(2)}
                  </p>
                </div>
              ))}
              {total && (
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', marginTop: '4px', borderTop: '2px solid #4B5E3A' }}>
                  <p style={{ margin: 0, fontSize: '18px', color: '#3A4A2C', fontFamily: 'Georgia, serif' }}>Total</p>
                  <p style={{ margin: 0, fontSize: '18px', color: '#C4922A', fontFamily: 'Georgia, serif', fontWeight: 600 }}>£{total}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Shipping address */}
        {shippingAddress && (
          <div style={{ background: '#FDFCFA', border: '1px solid rgba(75,94,58,0.12)', borderLeft: '3px solid #C4922A', padding: '24px 28px', marginBottom: '1.5rem' }}>
            <p style={{ margin: '0 0 8px', fontSize: '10px', letterSpacing: '2px', color: '#C4922A', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
              Shipping To
            </p>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7, color: '#3A4A2C', fontFamily: 'sans-serif' }}>
              {customerName && <><strong>{customerName}</strong><br /></>}
              {formatAddress(shippingAddress)}
            </p>
          </div>
        )}

        {/* What happens next */}
        <div style={{ background: '#FDFCFA', border: '1px solid rgba(75,94,58,0.12)', padding: '24px 28px', marginBottom: '2.5rem' }}>
          <p style={{ margin: '0 0 14px', fontSize: '10px', letterSpacing: '2px', color: '#3A4A2C', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
            What Happens Next
          </p>
          {[
            { icon: '📦', text: 'Your order is being hand-stitched and quality checked by our artisans.' },
            { icon: '✈️', text: 'Dispatch within 5–7 business days from Quetta, Pakistan.' },
            { icon: '📬', text: 'You will receive a tracking number once your order ships.' },
          ].map((step, i) => (
            <p key={i} style={{ margin: i < 2 ? '0 0 10px' : '0', fontSize: '14px', lineHeight: 1.75, color: '#5A5A5A', fontFamily: 'sans-serif' }}>
              {step.icon}&nbsp;&nbsp;{step.text}
            </p>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              fontFamily: 'sans-serif',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'white',
              background: '#4B5E3A',
              padding: '16px 40px',
              textDecoration: 'none',
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
