import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

const welcomeHtml = `<!DOCTYPE html><html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF7F2;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:48px 20px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#FDFCFA;border:1px solid rgba(75,94,58,0.12);">
      <tr><td style="background:#3A4A2C;padding:44px 40px;text-align:center;">
        <p style="margin:0;font-size:30px;letter-spacing:10px;color:#fff;font-weight:300;font-family:Georgia,serif;">MIRAS</p>
        <p style="margin:10px 0 0;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.55);text-transform:uppercase;">Her Art, Her Power.</p>
      </td></tr>
      <tr><td style="background:#C4922A;height:3px;"></td></tr>
      <tr><td style="padding:48px 40px;text-align:center;">
        <p style="margin:0 0 8px;font-size:10px;letter-spacing:3px;color:#C4922A;text-transform:uppercase;font-family:sans-serif;">Welcome</p>
        <h1 style="margin:0 0 20px;font-size:32px;font-weight:300;color:#3A4A2C;font-family:Georgia,serif;line-height:1.2;">You're part of the<br>Miras Circle.</h1>
        <p style="margin:0 0 32px;font-size:15px;line-height:1.85;color:#5A5A5A;font-family:sans-serif;">
          Thank you for joining us. You'll be the first to hear about new collections,
          artisan stories, and exclusive offers — all rooted in the beauty of Hazargi heritage.
        </p>
        <div style="background:#F0EBE0;padding:28px;margin-bottom:32px;border-left:3px solid #C4922A;">
          <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;color:#C4922A;text-transform:uppercase;font-family:sans-serif;">Our Promise</p>
          <p style="margin:0;font-size:14px;line-height:1.8;color:#3A4A2C;font-family:Georgia,serif;font-style:italic;">
            "We will only send what matters — no spam, only stories worth telling."
          </p>
        </div>
        <a href="${process.env.NEXT_PUBLIC_URL}#shop" style="display:inline-block;background:#4B5E3A;color:#fff;font-family:sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:14px 36px;text-decoration:none;">Explore the Collection</a>
      </td></tr>
      <tr><td style="background:#3A4A2C;padding:28px 40px;text-align:center;">
        <p style="margin:0 0 6px;font-size:9px;letter-spacing:2px;color:rgba(255,255,255,0.45);text-transform:uppercase;font-family:sans-serif;">Miras Hazargi · Handmade in Quetta, Pakistan</p>
        <p style="margin:0;font-size:9px;color:rgba(255,255,255,0.3);font-family:sans-serif;">Celebrating Hazargi Heritage Through the Art of Khamak Embroidery</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const trimmed = email.trim().toLowerCase()

  // Check if already subscribed
  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email: trimmed } })

  await prisma.newsletterSubscriber.upsert({
    where: { email: trimmed },
    update: {},
    create: { email: trimmed },
  })

  // Only send welcome email to new subscribers
  if (!existing && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = getTransporter()
      await transporter.sendMail({
        from: `"Miras Hazargi" <${process.env.EMAIL_USER}>`,
        to: trimmed,
        subject: 'Welcome to the Miras Circle ✦',
        html: welcomeHtml,
      })
    } catch (err) {
      console.error('Welcome email failed:', err)
    }
  }

  return NextResponse.json({ success: true })
}
