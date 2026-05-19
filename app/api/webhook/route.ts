import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { sendOrderEmails } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 })

    const customerEmail = session.customer_details?.email ?? 'unknown@email.com'
    const customerName = session.customer_details?.name ?? 'Valued Customer'
    const shippingAddress = session.shipping_details?.address ?? {}
    const total = (session.amount_total ?? 0) / 100

    // Upsert customer
    const customer = await prisma.customer.upsert({
      where: { email: customerEmail },
      update: { name: customerName },
      create: { email: customerEmail, name: customerName },
    })

    const orderItems = lineItems.data.map(item => ({
      name: item.description ?? 'Product',
      price: (item.amount_total / 100) / (item.quantity ?? 1),
      quantity: item.quantity ?? 1,
    }))

    // Create order
    await prisma.order.create({
      data: {
        stripeSessionId: session.id,
        customerEmail,
        customerName,
        total,
        status: 'paid',
        shippingAddress: session.shipping_details?.address
          ? JSON.stringify(session.shipping_details.address)
          : undefined,
        customerId: customer.id,
        items: {
          create: orderItems,
        },
      },
    })

    // Send emails (customer confirmation + owner alert)
    try {
      await sendOrderEmails({
        customerEmail,
        customerName,
        items: orderItems,
        total,
        shippingAddress,
      })
    } catch (emailErr) {
      console.error('Failed to send emails:', emailErr)
    }
  }

  return NextResponse.json({ received: true })
}
