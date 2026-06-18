import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json()
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Please fill in all required fields.' })
  }
  try {
    const db = getDB()
    await db.execute(
      'INSERT INTO contact_submissions (name,email,subject,message) VALUES (?,?,?,?)',
      [name, email, subject || 'General Inquiry', message]
    )
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
