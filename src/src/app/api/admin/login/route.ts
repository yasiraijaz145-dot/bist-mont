import { NextRequest, NextResponse } from 'next/server'
import { checkAdminCredentials, setSessionCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    if (!username || !password)
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
    if (!checkAdminCredentials(String(username), String(password))) {
      await new Promise(r => setTimeout(r, 500))
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    setSessionCookie({ role: 'admin', user: username })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}