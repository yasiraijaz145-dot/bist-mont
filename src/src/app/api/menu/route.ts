import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const cat = searchParams.get('category')
  try {
    const db = getDB()
    const query = cat
      ? 'SELECT * FROM menu_items WHERE category=? AND is_available=1 ORDER BY sort_order ASC'
      : 'SELECT * FROM menu_items WHERE is_available=1 ORDER BY category, sort_order ASC'
    const params = cat ? [cat] : []
    const [rows] = await db.execute(query, params)
    return NextResponse.json({ ok: true, items: rows })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
