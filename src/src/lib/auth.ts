import { createHash, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

const SESSION_SECRET = process.env.SESSION_SECRET ?? 'bistro-change-me-in-env'
const COOKIE_NAME    = 'bm_admin_session'
const MAX_AGE        = 60 * 60 * 8

export function signSession(payload: Record<string, unknown>): string {
  const data = Buffer.from(JSON.stringify({ ...payload, iat: Date.now() })).toString('base64url')
  const sig  = createHash('sha256').update(`${data}.${SESSION_SECRET}`).digest('base64url')
  return `${data}.${sig}`
}

export function verifySession(token: string): Record<string, unknown> | null {
  try {
    const dot = token.lastIndexOf('.')
    if (dot < 1) return null
    const data = token.slice(0, dot)
    const sig  = token.slice(dot + 1)
    const expected = createHash('sha256').update(`${data}.${SESSION_SECRET}`).digest('base64url')
    const a = Buffer.from(sig), b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
    return JSON.parse(Buffer.from(data, 'base64url').toString())
  } catch { return null }
}

export function setSessionCookie(payload: Record<string, unknown>) {
  const token = signSession(payload)
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   MAX_AGE,
    path:     '/',
  })
}

export function clearSessionCookie() {
  cookies().set(COOKIE_NAME, '', { maxAge: 0, path: '/' })
}

export function getAdminSession(): Record<string, unknown> | null {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySession(token)
}

export function checkAdminCredentials(username: string, password: string): boolean {
  const validUser = process.env.ADMIN_USERNAME ?? 'admin'
  const validPass = process.env.ADMIN_PASSWORD ?? 'changeme123'
  const userMatch = timingSafeEqual(Buffer.from(username.padEnd(64)), Buffer.from(validUser.padEnd(64)))
  const passMatch = timingSafeEqual(Buffer.from(password.padEnd(128)), Buffer.from(validPass.padEnd(128)))
  return userMatch && passMatch
}