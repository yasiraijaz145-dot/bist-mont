import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/lib/db'
import { getAdminSession } from '@/lib/auth'

function isAuthorized() {
  return getAdminSession() !== null
}

type StatsRow = {
  total: number
  unread: number
  today: number
}

type SubmissionRow = {
  id: number
  name: string
  email: string
  phone: string | null
  message: string
  is_read: number
  created_at: string
}

export async function GET() {
  try {
    if (!isAuthorized()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = getDB()

    try {
      await db.execute(`
        ALTER TABLE contact_submissions
        ADD COLUMN is_read TINYINT(1) NOT NULL DEFAULT 0
      `)
    } catch {}

    const [statResult] = (await db.execute(`
      SELECT
        COUNT(*) AS total,
        SUM(is_read = 0) AS unread,
        SUM(DATE(created_at) = CURDATE()) AS today
      FROM contact_submissions
    `)) as any

    const stats: StatsRow = statResult?.[0] ?? { total: 0, unread: 0, today: 0 }

    const [rowsResult] = (await db.execute(`
      SELECT id, name, email, phone, message, is_read, created_at
      FROM contact_submissions
      ORDER BY created_at DESC
      LIMIT 200
    `)) as any

    const submissions: SubmissionRow[] = rowsResult ?? []

    return NextResponse.json({ stats, submissions })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!isAuthorized()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const db = getDB()

    if (body.markAllRead) {
      await db.execute('UPDATE contact_submissions SET is_read = 1')
    } else {
      const id = Number(body.id)
      const isRead = body.is_read ? 1 : 0
      if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
      await db.execute('UPDATE contact_submissions SET is_read = ? WHERE id = ?', [isRead, id])
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!isAuthorized()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const id = Number(body.id)
    if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

    const db = getDB()
    await db.execute('DELETE FROM contact_submissions WHERE id = ?', [id])

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 })
  }
}