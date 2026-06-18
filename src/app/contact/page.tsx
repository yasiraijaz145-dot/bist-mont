'use client'
import { useState } from 'react'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setLoading(true)
    const fd = new FormData(e.currentTarget)
    const data = { name: fd.get('name'), email: fd.get('email'), subject: fd.get('subject'), message: fd.get('message') }
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
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
          <div className="container" style={{ maxWidth: '900px' }}>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.8rem', color: '#1a1a1a', marginBottom: '8px' }}>Contact Us</h1>
            <p style={{ color: '#888' }}>We&apos;d love to hear from you. We respond within 24 hours.</p>
          </div>
        </div>

        <div className="container" style={{ maxWidth: '900px', paddingTop: '48px', paddingBottom: '80px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '48px', alignItems: 'start' }}>
          <div>
            {success && <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '8px', padding: '20px', color: '#155724', marginBottom: '24px' }}>✅ Message sent! We&apos;ll be in touch shortly.</div>}
            {error && <div style={{ background: '#f8d7da', borderRadius: '8px', padding: '20px', color: '#721c24', marginBottom: '24px' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div><label style={labelStyle}>Name *</label><input name="name" required style={inputStyle} /></div>
                <div><label style={labelStyle}>Email *</label><input name="email" type="email" required style={inputStyle} /></div>
              </div>
              <div>
                <label style={labelStyle}>Subject</label>
                <select name="subject" style={{ ...inputStyle, background: '#fff' }}>
                  <option>General Inquiry</option>
                  <option>Reservation</option>
                  <option>Catering</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Message *</label>
                <textarea name="message" required rows={6} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <button type="submit" disabled={loading} style={{ background: '#e85d04', color: '#fff', padding: '14px', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              ['📍','Address','1420 Rue Peel, Montréal, QC H3A 1S8'],
              ['📞','Phone','+1 (514) 555-0192'],
              ['✉️','Email','hello@bistromontreal.com'],
              ['🕐','Hours','Mon–Thu 5–10PM · Fri–Sat 5–11:30PM · Sun 5–9:30PM'],
            ].map(([icon, label, value]) => (
              <div key={label} style={{ background: '#f9f5f0', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px' }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '13px', color: '#666' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
