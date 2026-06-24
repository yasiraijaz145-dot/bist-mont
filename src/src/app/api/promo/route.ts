import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { code, subtotal } = await req.json()
  if (!code) return NextResponse.json({ ok: false, message: 'Enter a promo code.' })

  try {
    const db = getDB()
    const [rows] = await db.execute(
      `SELECT * FROM discount_codes WHERE code=? AND is_active=1 AND (expiry_date IS NULL OR expiry_date >= CURDATE()) AND (usage_limit=0 OR used_count < usage_limit) LIMIT 1`,
      [code.toUpperCase()]
    ) as [unknown[], unknown]

    if (!(rows as unknown[]).length) {
      return NextResponse.json({ ok: false, message: 'Invalid or expired promo code.' })
    }

    const promo = (rows as Record<string,unknown>[])[0]
    const sub = Number(subtotal) || 0

    if (sub < Number(promo.min_order)) {
      return NextResponse.json({ ok: false, message: `Minimum order $${promo.min_order} required.` })
    }

    const discount = promo.type === 'percent'
      ? sub * (Number(promo.value) / 100)
      : Number(promo.value)

    const discountAmount = Math.round(Math.min(discount, sub) * 100) / 100
    return NextResponse.json({ ok: true, message: `Code applied! You save $${discountAmount}.`, discount_amount: discountAmount })
  } catch (e) {
    return NextResponse.json({ ok: false, message: String(e) })
  }
}
