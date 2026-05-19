import nodemailer from 'nodemailer'

export interface OrderItem {
  name: string
  price: number
  quantity: number
}

export interface Address {
  line1?: string | null
  line2?: string | null
  city?: string | null
  state?: string | null
  postal_code?: string | null
  country?: string | null
}

function formatAddress(addr: Address): string {
  return [addr.line1, addr.line2, addr.city, addr.state, addr.postal_code, addr.country]
    .filter(Boolean)
    .join(', ')
}

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// ─── Customer confirmation email ─────────────────────────────────────────────
function buildConfirmationHtml(firstName: string, items: OrderItem[], total: number, address: Address): string {
  const itemRows = items.map(item => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #e8e2d8;font-family:sans-serif;font-size:14px;color:#2A2A2A;">${item.name}</td>
      <td style="padding:14px 0;border-bottom:1px solid #e8e2d8;font-family:sans-serif;font-size:14px;color:#5A5A5A;text-align:center;">×${item.quantity}</td>
      <td style="padding:14px 0;border-bottom:1px solid #e8e2d8;font-family:sans-serif;font-size:14px;color:#3A4A2C;text-align:right;font-weight:500;">£${(item.price * item.quantity).toFixed(2)}</td>
    </tr>`).join('')

  return `<!DOCTYPE html><html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF7F2;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:48px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FDFCFA;border:1px solid rgba(75,94,58,0.12);">
      <tr><td style="background:#3A4A2C;padding:44px 40px;text-align:center;">
        <p style="margin:0;font-size:30px;letter-spacing:10px;color:#fff;font-weight:300;font-family:Georgia,serif;">MIRAS</p>
        <p style="margin:10px 0 0;font-size:10px;letter-spacing:3px;color:rgba(255,255,255,0.55);text-transform:uppercase;">Her Art, Her Power.</p>
      </td></tr>
      <tr><td style="background:#C4922A;height:3px;"></td></tr>
      <tr><td style="padding:48px 40px;">
        <p style="margin:0 0 8px;font-size:10px;letter-spacing:3px;color:#C4922A;text-transform:uppercase;">Order Confirmed</p>
        <h1 style="margin:0 0 20px;font-size:34px;font-weight:300;color:#3A4A2C;font-family:Georgia,serif;line-height:1.2;">Thank you, ${firstName}.</h1>
        <p style="margin:0 0 36px;font-size:15px;line-height:1.85;color:#5A5A5A;">Your handcrafted Miras piece is now being prepared by our artisans in Quetta with the utmost care. Each stitch is placed with love and precision.</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
          <tr>
            <td style="padding-bottom:10px;font-size:10px;letter-spacing:2px;color:#3A4A2C;text-transform:uppercase;border-bottom:2px solid #4B5E3A;">Item</td>
            <td style="padding-bottom:10px;font-size:10px;letter-spacing:2px;color:#3A4A2C;text-transform:uppercase;text-align:center;border-bottom:2px solid #4B5E3A;">Qty</td>
            <td style="padding-bottom:10px;font-size:10px;letter-spacing:2px;color:#3A4A2C;text-transform:uppercase;text-align:right;border-bottom:2px solid #4B5E3A;">Price</td>
          </tr>
          ${itemRows}
          <tr>
            <td colspan="2" style="padding-top:18px;font-family:Georgia,serif;font-size:20px;color:#3A4A2C;font-weight:300;">Total</td>
            <td style="padding-top:18px;font-family:Georgia,serif;font-size:20px;color:#C4922A;text-align:right;font-weight:600;">£${total.toFixed(2)}</td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
          <tr><td style="background:#F0EBE0;padding:24px 28px;border-left:3px solid #C4922A;">
            <p style="margin:0 0 8px;font-size:10px;letter-spacing:2px;color:#C4922A;text-transform:uppercase;">Shipping To</p>
            <p style="margin:0;font-size:14px;line-height:1.8;color:#3A4A2C;">${formatAddress(address)}</p>
          </td></tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:40px;border:1px solid rgba(75,94,58,0.15);">
          <tr><td style="padding:24px 28px;">
            <p style="margin:0 0 14px;font-size:10px;letter-spacing:2px;color:#3A4A2C;text-transform:uppercase;">What Happens Next</p>
            <p style="margin:0 0 10px;font-size:13px;line-height:1.75;color:#5A5A5A;">📦&nbsp; Your order is being hand-stitched and quality checked by our artisans.</p>
            <p style="margin:0 0 10px;font-size:13px;line-height:1.75;color:#5A5A5A;">✈️&nbsp; Dispatch within 5–7 business days from Quetta, Pakistan.</p>
            <p style="margin:0;font-size:13px;line-height:1.75;color:#5A5A5A;">📬&nbsp; You will receive a tracking number once your order ships.</p>
          </td></tr>
        </table>
        <p style="margin:0;font-size:13px;line-height:1.8;color:#5A5A5A;">Questions? Contact us at <a href="mailto:${process.env.EMAIL_USER}" style="color:#C4922A;text-decoration:none;">${process.env.EMAIL_USER}</a></p>
      </td></tr>
      <tr><td style="background:#3A4A2C;padding:30px 40px;text-align:center;">
        <p style="margin:0 0 6px;font-size:9px;letter-spacing:2px;color:rgba(255,255,255,0.45);text-transform:uppercase;">Miras Hazargi · Handmade in Quetta, Pakistan</p>
        <p style="margin:0;font-size:9px;color:rgba(255,255,255,0.3);">Celebrating Hazargi Heritage Through the Art of Khamak Embroidery</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

// ─── Owner new-order alert ────────────────────────────────────────────────────
function buildOwnerAlertHtml(customerName: string, customerEmail: string, items: OrderItem[], total: number, address: Address): string {
  const itemRows = items.map(i => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #eee;font-family:sans-serif;font-size:14px;color:#2A2A2A;">${i.name}</td>
      <td style="padding:8px 0;border-bottom:1px solid #eee;font-family:sans-serif;font-size:14px;color:#5A5A5A;text-align:center;">×${i.quantity}</td>
      <td style="padding:8px 0;border-bottom:1px solid #eee;font-family:sans-serif;font-size:14px;color:#3A4A2C;text-align:right;font-weight:600;">£${(i.price * i.quantity).toFixed(2)}</td>
    </tr>`).join('')

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 20px;background:#f5f5f5;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border:1px solid #ddd;">
      <tr><td style="background:#3A4A2C;padding:24px 32px;">
        <p style="margin:0;font-size:11px;letter-spacing:3px;color:rgba(255,255,255,0.7);text-transform:uppercase;font-family:sans-serif;">Miras Hazargi — New Order</p>
      </td></tr>
      <tr><td style="background:#C4922A;height:3px;"></td></tr>
      <tr><td style="padding:32px;">
        <h2 style="margin:0 0 4px;font-family:sans-serif;font-size:22px;color:#1a1a1a;">New order received 🎉</h2>
        <p style="margin:0 0 24px;font-family:sans-serif;font-size:14px;color:#666;">Total: <strong style="color:#C4922A;">£${total.toFixed(2)}</strong></p>
        <p style="margin:0 0 6px;font-family:sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#999;">Customer</p>
        <p style="margin:0 0 20px;font-family:sans-serif;font-size:14px;color:#333;">${customerName} — <a href="mailto:${customerEmail}" style="color:#C4922A;">${customerEmail}</a></p>
        <p style="margin:0 0 6px;font-family:sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#999;">Items</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">${itemRows}</table>
        <p style="margin:0 0 6px;font-family:sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#999;">Ship To</p>
        <p style="margin:0 0 24px;font-family:sans-serif;font-size:14px;color:#333;line-height:1.6;">${customerName}<br>${formatAddress(address)}</p>
        <a href="${process.env.NEXT_PUBLIC_URL}/admin/orders" style="display:inline-block;background:#3A4A2C;color:#fff;font-family:sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:12px 28px;text-decoration:none;">View in Admin</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function sendOrderEmails({
  customerEmail,
  customerName,
  items,
  total,
  shippingAddress,
}: {
  customerEmail: string
  customerName: string
  items: OrderItem[]
  total: number
  shippingAddress: Address
}) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('EMAIL_USER / EMAIL_PASS not set — skipping emails')
    return
  }

  const transporter = getTransporter()
  const firstName = customerName.split(' ')[0] || customerName
  const ownerEmail = process.env.OWNER_EMAIL || process.env.EMAIL_USER

  await Promise.allSettled([
    // Confirmation to customer
    transporter.sendMail({
      from: `"Miras Hazargi" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: 'Your Miras Order is Confirmed ✓',
      html: buildConfirmationHtml(firstName, items, total, shippingAddress),
    }),
    // Alert to shop owner
    transporter.sendMail({
      from: `"Miras Orders" <${process.env.EMAIL_USER}>`,
      to: ownerEmail,
      subject: `New Order — ${customerName} · £${total.toFixed(2)}`,
      html: buildOwnerAlertHtml(customerName, customerEmail, items, total, shippingAddress),
    }),
  ])
}
