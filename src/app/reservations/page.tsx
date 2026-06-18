'use client'
import { useState } from 'react'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const TIME_SLOTS: string[] = []
for (let h = 17; h <= 22; h++) {
  for (const m of ['00','30']) {
    if (h === 22 && m === '30') break
    TIME_SLOTS.push(`${String(h).padStart(2,'0')}:${m}`)
  }
}

function formatTime(t: string) {
  const [h,m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${h > 12 ? h - 12 : h}:${String(m).padStart(2,'0')} ${ampm}`
}

const SEATING = [
  { key: 'indoor', label: 'Indoor', sub: 'Climate-controlled' },
  { key: 'outdoor', label: 'Outdoor', sub: 'Seasonal terrace' },
  { key: 'bar', label: 'Bar', sub: 'Counter seating' },
]

export default function ReservationsPage() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [selTime, setSelTime] = useState('')
  const [selSeating, setSelSeating] = useState('indoor')
  const [focused, setFocused] = useState<string | null>(null)

  const today = new Date().toISOString().split('T')[0]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(''); setLoading(true)
    const fd = new FormData(e.currentTarget)
    const data = {
      name: fd.get('name'), email: fd.get('email'), phone: fd.get('phone'),
      date: fd.get('date'), time: selTime, party_size: fd.get('party_size'),
      seating: selSeating, notes: fd.get('notes'),
    }
    try {
      const r = await fetch('/api/reservations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const d = await r.json()
      if (d.ok) setSuccess(true)
      else setError(d.error || 'Something went wrong.')
    } catch { setError('Network error. Please try again.') }
    setLoading(false)
  }

  const fieldStyle = (name: string) => ({
    width: '100%',
    padding: '0 0 14px',
    border: 'none',
    borderBottom: `1.5px solid ${focused === name ? '#1a1a1a' : '#e8e0d5'}`,
    fontSize: '16px',
    color: '#1a1a1a',
    background: 'transparent',
    outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s',
  })

  const labelStyle = (name: string) => ({
    display: 'block',
    fontSize: '10px',
    fontWeight: 700 as const,
    letterSpacing: '2.5px',
    textTransform: 'uppercase' as const,
    color: focused === name ? '#1a1a1a' : '#bbb',
    marginBottom: '10px',
    transition: 'color 0.2s',
  })

  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px', background: '#fff' }}>

        {/* HERO */}
        <section style={{ borderBottom: '1px solid #e8e0d5', padding: '72px 0 60px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', right: '-20px', top: '-30px',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(160px, 22vw, 300px)',
            fontWeight: 900, color: 'transparent',
            WebkitTextStroke: '1px #e8e0d5',
            lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}>06</div>
          <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 40px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#e85d04', marginBottom: '20px' }}>Reservations</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: '700px' }}>
              Your evening<br />
              <em style={{ color: '#e85d04', fontStyle: 'italic' }}>starts here.</em>
            </h1>
            <p style={{ marginTop: '28px', fontSize: '16px', color: '#888', maxWidth: '420px', lineHeight: 1.7 }}>
              For parties of 8 or more, call us directly at <span style={{ color: '#1a1a1a', fontWeight: 500 }}>+1 (514) 555-0192</span>
            </p>
          </div>
        </section>

        {/* FORM */}
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 40px 100px' }}>

          {success ? (
            <div style={{ borderLeft: '3px solid #1a1a1a', paddingLeft: '32px' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '20px' }}>Confirmed</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px', lineHeight: 1.2 }}>Your table is reserved.</p>
              <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.7, marginBottom: '32px' }}>A confirmation has been sent to your email. We look forward to hosting you.</p>
              <Link href="/menu" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#1a1a1a', color: '#fff', padding: '16px 36px', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                Browse the menu →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              {error && (
                <div style={{ borderLeft: '3px solid #e85d04', paddingLeft: '20px', marginBottom: '40px' }}>
                  <p style={{ fontSize: '14px', color: '#e85d04' }}>{error}</p>
                </div>
              )}

              {/* Date + Party Size */}
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '32px' }}>When & how many</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '56px' }}>
                <div>
                  <label style={labelStyle('date')}>Date</label>
                  <input name="date" type="date" required min={today}
                    onFocus={() => setFocused('date')} onBlur={() => setFocused(null)}
                    style={fieldStyle('date')}
                  />
                </div>
                <div>
                  <label style={labelStyle('party_size')}>Party size</label>
                  <select name="party_size" required
                    onFocus={() => setFocused('party_size')} onBlur={() => setFocused(null)}
                    style={{ ...fieldStyle('party_size'), appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23bbb' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center', paddingRight: '24px' }}
                  >
                    <option value="">— Select —</option>
                    {Array.from({ length: 7 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time */}
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '20px' }}>Select a time</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '56px' }}>
                {TIME_SLOTS.map(t => (
                  <button
                    key={t} type="button"
                    onClick={() => setSelTime(t)}
                    style={{
                      padding: '10px 18px',
                      border: `1.5px solid ${selTime === t ? '#1a1a1a' : '#e8e0d5'}`,
                      background: selTime === t ? '#1a1a1a' : 'transparent',
                      color: selTime === t ? '#fff' : '#888',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: '0.5px',
                      transition: 'all 0.15s',
                    }}
                  >{formatTime(t)}</button>
                ))}
              </div>

              {/* Seating */}
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '20px' }}>Seating preference</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '56px' }}>
                {SEATING.map(({ key, label, sub }) => (
                  <div
                    key={key}
                    onClick={() => setSelSeating(key)}
                    style={{
                      padding: '24px 16px',
                      border: `1.5px solid ${selSeating === key ? '#1a1a1a' : '#e8e0d5'}`,
                      background: selSeating === key ? '#1a1a1a' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', color: selSeating === key ? '#fff' : '#1a1a1a', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontSize: '11px', color: selSeating === key ? 'rgba(255,255,255,0.6)' : '#bbb' }}>{sub}</div>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '32px' }}>Your details</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
                <div>
                  <label style={labelStyle('name')}>Full name</label>
                  <input name="name" required onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} style={fieldStyle('name')} />
                </div>
                <div>
                  <label style={labelStyle('email')}>Email address</label>
                  <input name="email" type="email" required onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} style={fieldStyle('email')} />
                </div>
              </div>
              <div style={{ marginBottom: '40px' }}>
                <label style={labelStyle('phone')}>Phone</label>
                <input name="phone" onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} style={fieldStyle('phone')} />
              </div>
              <div style={{ marginBottom: '56px' }}>
                <label style={labelStyle('notes')}>Special requests</label>
                <textarea name="notes" rows={4} placeholder="Allergies, celebrations, accessibility needs…"
                  onFocus={() => setFocused('notes')} onBlur={() => setFocused(null)}
                  style={{ ...fieldStyle('notes'), resize: 'none', lineHeight: 1.7 }}
                />
              </div>

              <button type="submit" disabled={loading}
                style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#1a1a1a', color: '#fff', padding: '18px 48px', border: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", opacity: loading ? 0.6 : 1, transition: 'background 0.2s' }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#e85d04' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a' }}
              >
                {loading ? 'Reserving' : 'Confirm reservation'} <span style={{ fontSize: '18px' }}>→</span>
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}