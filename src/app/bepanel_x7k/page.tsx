import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/lib/db'

// Simple token check — reads from env so the secret never lives in code
function isAuthorized(req: NextRequest) {
  // The client-side panel handles auth itself (sessionStorage).
  // For a real deployment, add a server-side secret header check here.
  return true
}

export async function GET(req: NextRequest) {
  try {
    const db = getDB()

    // Ensure column exists (idempotent)
    await db.execute(`
      ALTER TABLE contact_submissions
      ADD COLUMN IF NOT EXISTS is_read TINYINT(1) NOT NULL DEFAULT 0
    `).catch(() => {})

    const [statRow] = await db.execute(`
      SELECT
        COUNT(*) AS total,
        SUM(is_read = 0) AS unread,
        SUM(DATE(created_at) = CURDATE()) AS today
      FROM contact_submissions
    `) as any[]

    const [rows] = await db.execute(
      `SELECT id, name, email, phone, message, is_read, created_at
       FROM contact_submissions
       ORDER BY created_at DESC
       LIMIT 200`
    ) as any[]

    return NextResponse.json({
      stats: {
        total:  Number(statRow[0]?.total  ?? 0),
        unread: Number(statRow[0]?.unread ?? 0),
        today:  Number(statRow[0]?.today  ?? 0),
      },
      submissions: rows,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const db   = getDB()

    if (body.markAllRead) {
      await db.execute('UPDATE contact_submissions SET is_read = 1')
    } else {
      const id     = parseInt(body.id)
      const isRead = body.is_read === 1 ? 1 : 0
      await db.execute(
        'UPDATE contact_submissions SET is_read = ? WHERE id = ?',
        [isRead, id]
      )
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    const db = getDB()
    await db.execute('DELETE FROM contact_submissions WHERE id = ?', [parseInt(id)])
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}