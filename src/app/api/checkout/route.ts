import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/lib/db'

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `BM-${ts}-${rand}`
}

export async function GET() {
  try {
    const db = getDB()
    const [rows] = await db.execute('SELECT * FROM orders ORDER BY created_at DESC')
    return NextResponse.json({ ok: true, orders: rows })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    customer_name, email, phone, order_type, payment_method,
    address_street, address_apt, address_city, address_postal,
    special_instructions, items, subtotal, discount_amount, taxes, delivery_fee, total,
  } = body

  if (!customer_name || !email || !payment_method || !items?.length) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' })
  }

  const orderNumber = generateOrderNumber()
  const deliveryAddress = order_type === 'delivery'
    ? [address_street, address_apt, address_city, address_postal].filter(Boolean).join(', ')
    : null

  try {
    const db = getDB()
    await db.execute(
      `INSERT INTO orders (order_number,customer_name,email,phone,order_type,delivery_address,items_json,subtotal,discount_amount,taxes,delivery_fee,total,payment_method,special_instructions,status)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,'pending')`,
      [
        orderNumber, customer_name, email, phone || '', order_type || 'delivery',
        deliveryAddress, JSON.stringify(items),
        subtotal, discount_amount || 0, taxes, delivery_fee || 0, total,
        payment_method, special_instructions || '',
      ]
    )
    return NextResponse.json({ ok: true, order_number: orderNumber })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}