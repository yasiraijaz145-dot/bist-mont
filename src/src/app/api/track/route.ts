import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  if (!q) return NextResponse.json({ order: null })
  try {
    const db = getDB()
    const [rows] = await db.execute(
      'SELECT * FROM orders WHERE order_number=? OR email=? LIMIT 1',
      [q, q.toLowerCase()]
    ) as [unknown[], unknown]
    return NextResponse.json({ order: (rows as unknown[])[0] || null })
  } catch (e) {
    return NextResponse.json({ order: null, error: String(e) })
  }
}
