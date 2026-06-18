import { createHash, randomBytes } from 'crypto'
import { getDB } from './db'
 
// ─── bcrypt-compatible hashing via native crypto ───────────────────────────
// We use bcryptjs (pure JS, no native bindings needed in Next.js edge/serverless)
// Install: npm install bcryptjs @types/bcryptjs
import bcrypt from 'bcryptjs'
 
export const hashPassword = (plain: string) => bcrypt.hash(plain, 12)
export const verifyPassword = (plain: string, hash: string) => bcrypt.compare(plain, hash)
 
// ─── Simple JWT-like signed session token (no extra deps) ──────────────────
const SESSION_SECRET = process.env.SESSION_SECRET || 'bistro-super-secret-change-me'
 
export function signSession(payload: Record<string, unknown>): string {
  const data = Buffer.from(JSON.stringify({ ...payload, iat: Date.now() })).toString('base64url')
  const sig  = createHash('sha256').update(`${data}.${SESSION_SECRET}`).digest('base64url')
  return `${data}.${sig}`
}
 
export function verifySession(token: string): Record<string, unknown> | null {
  try {
    const [data, sig] = token.split('.')
    const expected = createHash('sha256').update(`${data}.${SESSION_SECRET}`).digest('base64url')
    if (sig !== expected) return null
    return JSON.parse(Buffer.from(data, 'base64url').toString())
  } catch { return null }
}
 
// ─── Password reset token ──────────────────────────────────────────────────
export function generateResetToken(): string {
  return randomBytes(32).toString('hex')
}
 
// ─── Send email via SMTP (nodemailer) ─────────────────────────────────────
// Install: npm install nodemailer @types/nodemailer
import nodemailer from 'nodemailer'
 
function getMailer() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  })
}
 
export async function sendPasswordResetEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const link    = `${baseUrl}/auth/reset-password?token=${token}`
 
  const mailer = getMailer()
  await mailer.sendMail({
    from:    `"Bistro Montréal" <${process.env.SMTP_USER}>`,
    to:      email,
    subject: 'Reset your Bistro Montréal password',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
        <h2 style="color:#e85d04">Bistro Montréal</h2>
        <p>You requested a password reset. Click the button below — this link expires in <strong>1 hour</strong>.</p>
        <a href="${link}" style="display:inline-block;margin:20px 0;padding:14px 28px;background:#e85d04;color:#fff;border-radius:8px;text-decoration:none;font-weight:700">Reset Password</a>
        <p style="color:#888;font-size:12px">If you didn't request this, ignore this email. Link: ${link}</p>
      </div>
    `,
  })
}
 
export async function sendOrderConfirmationEmail(
  email: string,
  customerName: string,
  orderNumber: string,
  items: { name: string; qty: number; price: number }[],
  total: number
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const mailer  = getMailer()
 
  const rows = items.map(i =>
    `<tr><td style="padding:6px 0">${i.name} × ${i.qty}</td><td style="text-align:right">$${(i.price * i.qty).toFixed(2)}</td></tr>`
  ).join('')
 
  await mailer.sendMail({
    from:    `"Bistro Montréal" <${process.env.SMTP_USER}>`,
    to:      email,
    subject: `Order Confirmed — ${orderNumber}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
        <h2 style="color:#e85d04">🍽️ Order Confirmed!</h2>
        <p>Hi <strong>${customerName}</strong>, we've received your order.</p>
        <p><strong>Order #:</strong> <span style="color:#e85d04">${orderNumber}</span></p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">${rows}</table>
        <p style="font-size:1.1rem"><strong>Total: $${total.toFixed(2)}</strong></p>
        <a href="${baseUrl}/track?order=${orderNumber}" style="display:inline-block;margin-top:12px;padding:12px 24px;background:#e85d04;color:#fff;border-radius:8px;text-decoration:none;font-weight:700">Track Your Order →</a>
      </div>
    `,
  })
}
 