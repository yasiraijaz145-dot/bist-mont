import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/lib/db'

export async function GET() {
  try {
    const db = getDB()
    const [rows] = await db.execute('SELECT * FROM newsletter_subscribers ORDER BY created_at DESC')
    return NextResponse.json({ ok: true, subscribers: rows })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: 'Please enter a valid email address.' })
  }
  try {
    const db = getDB()
    await db.execute('INSERT INTO newsletter_subscribers (email) VALUES (?)', [email.toLowerCase().trim()])
    return NextResponse.json({ ok: true, message: 'Thank you for subscribing! \U0001f389' })
  } catch (e: unknown) {
    const err = e as { code?: string }
    if (err.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ ok: true, message: "You're already subscribed!" })
    }
    return NextResponse.json({ ok: false, message: 'Something went wrong. Please try again.' })
  }
}