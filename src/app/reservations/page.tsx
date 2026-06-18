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

export default function ReservationsPage() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [selTime, setSelTime] = useState('')
  const [selSeating, setSelSeating] = useState('indoor')

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

  const inputStyle = { width: '100%', padding: '12px 16px', border: '2px solid #e8e0d5', borderRadius: '8px', fontSize: '15px', outline: 'none', fontFamily: 'inherit' }
  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '1px', marginBottom: '6px', color: '#555' }

  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px' }}>
        <div style={{ background: '#f9f5f0', padding: '60px 0' }}>
          <div className="container">
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.8rem', color: '#1a1a1a' }}>Reserve a Table</h1>
            <p style={{ color: '#888', marginTop: '8px' }}>For parties of 8+, please call +1 (514) 555-0192</p>
          </div>
        </div>

        <div className="container" style={{ paddingTop: '48px', paddingBottom: '80px', maxWidth: '700px' }}>
          {success ? (
            <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", color: '#1a1a1a', marginBottom: '8px' }}>Table Reserved!</h2>
              <p style={{ color: '#555' }}>A confirmation has been sent to your email.</p>
              <Link href="/menu" style={{ display: 'inline-block', marginTop: '20px', background: '#e85d04', color: '#fff', padding: '12px 28px', borderRadius: '8px', fontWeight: 700 }}>Browse Our Menu</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {error && <div style={{ background: '#f8d7da', borderRadius: '8px', padding: '16px', color: '#721c24' }}>{error}</div>}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Date *</label>
                  <input name="date" type="date" required min={today} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Party Size *</label>
                  <select name="party_size" required style={{ ...inputStyle, background: '#fff' }}>
                    <option value="">— Select —</option>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Time *</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {TIME_SLOTS.map(t => (
                    <button
                      key={t} type="button"
                      onClick={() => setSelTime(t)}
                      style={{ padding: '8px 16px', borderRadius: '6px', border: `2px solid ${selTime===t?'#e85d04':'#e8e0d5'}`, background: selTime===t?'#e85d04':'#fff', color: selTime===t?'#fff':'#333', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
                    >
                      {formatTime(t)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Seating</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[['indoor','🏠','Indoor'],['outdoor','🌿','Outdoor'],['bar','🍸','Bar']].map(([k,icon,lbl]) => (
                    <div
                      key={k}
                      onClick={() => setSelSeating(k)}
                      style={{ flex: 1, padding: '16px', border: `2px solid ${selSeating===k?'#e85d04':'#e8e0d5'}`, borderRadius: '10px', textAlign: 'center', cursor: 'pointer', background: selSeating===k?'rgba(232,93,4,0.05)':'#fff' }}
                    >
                      <div style={{ fontSize: '1.5rem' }}>{icon}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '4px' }}>{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div><label style={labelStyle}>Name *</label><input name="name" required style={inputStyle} /></div>
                <div><label style={labelStyle}>Email *</label><input name="email" type="email" required style={inputStyle} /></div>
              </div>
              <div><label style={labelStyle}>Phone</label><input name="phone" style={inputStyle} /></div>
              <div>
                <label style={labelStyle}>Special Requests</label>
                <textarea name="notes" rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Allergies, celebrations, accessibility needs..." />
              </div>
              <button type="submit" disabled={loading} style={{ background: '#e85d04', color: '#fff', padding: '16px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>
                {loading ? 'Reserving...' : 'Confirm Reservation →'}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
