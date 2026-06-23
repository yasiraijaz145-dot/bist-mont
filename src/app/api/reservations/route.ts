import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/lib/db'

export async function GET() {
  try {
    const db = getDB()
    const [rows] = await db.execute('SELECT * FROM reservations ORDER BY created_at DESC')
    return NextResponse.json({ ok: true, reservations: rows })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, date, time, party_size, seating, notes } = body

  if (!name || !email || !date || !time || !party_size) {
    return NextResponse.json({ ok: false, error: 'Please fill in all required fields.' })
  }
  if (date < new Date().toISOString().split('T')[0]) {
    return NextResponse.json({ ok: false, error: 'Please select a future date.' })
  }
  const validSeating = ['indoor','outdoor','bar'].includes(seating) ? seating : 'indoor'

  try {
    const db = getDB()
    await db.execute(
      'INSERT INTO reservations (name,email,phone,date,time,party_size,seating,special_requests) VALUES (?,?,?,?,?,?,?,?)',
      [name, email, phone || '', date, time, parseInt(party_size), validSeating, notes || '']
    )
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}