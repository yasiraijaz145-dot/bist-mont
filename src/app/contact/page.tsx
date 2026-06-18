
//Contact page · TSX
'use client'
import { useState } from 'react'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
 
export default function ContactPage() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
 
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
 
  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px', background: '#fff' }}>
 
        {/* ── HERO BAND ── */}
        <section style={{
          borderBottom: '1px solid #e8e0d5',
          padding: '72px 0 60px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Large decorative number */}
          <div style={{
            position: 'absolute', right: '-20px', top: '-30px',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(160px, 22vw, 300px)',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '1px #e8e0d5',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}>07</div>
 
          <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 40px' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#e85d04',
              marginBottom: '20px',
            }}>Get in touch</p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: '700px',
            }}>
              A table<br />
              <em style={{ color: '#e85d04', fontStyle: 'italic' }}>awaits you.</em>
            </h1>
            <p style={{
              marginTop: '28px',
              fontSize: '16px',
              color: '#888',
              fontWeight: 400,
              maxWidth: '420px',
              lineHeight: 1.7,
            }}>
              Questions, reservations, or a late-night craving — write to us and we&apos;ll respond within the day.
            </p>
          </div>
        </section>
 
        {/* ── MAIN CONTENT ── */}
        <section style={{ maxWidth: '1120px', margin: '0 auto', padding: '80px 40px 100px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '100px', alignItems: 'start' }}>
 
          {/* FORM COLUMN */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '40px' }}>Send a message</p>
 
            {success && (
              <div style={{
                borderLeft: '3px solid #1a1a1a',
                paddingLeft: '20px',
                marginBottom: '40px',
              }}>
                <p style={{ fontSize: '18px', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>Message received.</p>
                <p style={{ fontSize: '14px', color: '#888' }}>We&apos;ll be in touch within 24 hours.</p>
              </div>
            )}
            {error && (
              <div style={{
                borderLeft: '3px solid #e85d04',
                paddingLeft: '20px',
                marginBottom: '40px',
              }}>
                <p style={{ fontSize: '14px', color: '#e85d04' }}>{error}</p>
              </div>
            )}
 
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}>
                {(['name', 'email'] as const).map((field) => (
                  <div key={field} style={{ position: 'relative' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '2.5px',
                      textTransform: 'uppercase',
                      color: focused === field ? '#1a1a1a' : '#bbb',
                      marginBottom: '10px',
                      transition: 'color 0.2s',
                    }}>
                      {field === 'name' ? 'Full name' : 'Email address'}
                    </label>
                    <input
                      name={field}
                      type={field === 'email' ? 'email' : 'text'}
                      required
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      style={{
                        width: '100%',
                        padding: '0 0 14px',
                        border: 'none',
                        borderBottom: `1.5px solid ${focused === field ? '#1a1a1a' : '#e8e0d5'}`,
                        fontSize: '16px',
                        color: '#1a1a1a',
                        background: 'transparent',
                        outline: 'none',
                        fontFamily: "'DM Sans', sans-serif",
                        transition: 'border-color 0.2s',
                      }}
                    />
                  </div>
                ))}
              </div>
 
              {/* Subject */}
              <div style={{ marginBottom: '40px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: focused === 'subject' ? '#1a1a1a' : '#bbb',
                  marginBottom: '10px',
                  transition: 'color 0.2s',
                }}>Subject</label>
                <select
                  name="subject"
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                  style={{
                    width: '100%',
                    padding: '0 0 14px',
                    border: 'none',
                    borderBottom: `1.5px solid ${focused === 'subject' ? '#1a1a1a' : '#e8e0d5'}`,
                    fontSize: '16px',
                    color: '#1a1a1a',
                    background: 'transparent',
                    outline: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23bbb' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 4px center',
                    paddingRight: '24px',
                  }}
                >
                  <option>General Inquiry</option>
                  <option>Reservation</option>
                  <option>Catering</option>
                  <option>Feedback</option>
                </select>
              </div>
 
              {/* Message */}
              <div style={{ marginBottom: '48px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: focused === 'message' ? '#1a1a1a' : '#bbb',
                  marginBottom: '10px',
                  transition: 'color 0.2s',
                }}>Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  style={{
                    width: '100%',
                    padding: '0 0 14px',
                    border: 'none',
                    borderBottom: `1.5px solid ${focused === 'message' ? '#1a1a1a' : '#e8e0d5'}`,
                    fontSize: '16px',
                    color: '#1a1a1a',
                    background: 'transparent',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    transition: 'border-color 0.2s',
                    lineHeight: 1.7,
                  }}
                />
              </div>
 
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: '#1a1a1a',
                    color: '#fff',
                    padding: '18px 40px',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                    opacity: loading ? 0.6 : 1,
                    transition: 'background 0.2s, transform 0.15s',
                  }}
                  onMouseEnter={e => { if (!loading) (e.currentTarget.style.background = '#e85d04') }}
                  onMouseLeave={e => { (e.currentTarget.style.background = '#1a1a1a') }}
                >
                  {loading ? 'Sending' : 'Send message'}
                  <span style={{ fontSize: '18px', lineHeight: 1 }}>→</span>
                </button>
              </div>
            </form>
          </div>
 
          {/* INFO COLUMN */}
          <aside>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '40px' }}>Find us</p>
 
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                {
                  label: 'Address',
                  value: '1420 Rue Peel\nMontréal, QC H3A 1S8',
                },
                {
                  label: 'Reservations',
                  value: '+1 (514) 555-0192',
                },
                {
                  label: 'Email',
                  value: 'hello@bistromontreal.com',
                },
                {
                  label: 'Hours',
                  value: 'Mon–Thu · 5 — 10 PM\nFri–Sat · 5 — 11:30 PM\nSun · 5 — 9:30 PM',
                },
              ].map(({ label, value }, i) => (
                <div
                  key={label}
                  style={{
                    padding: '28px 0',
                    borderTop: i === 0 ? '1px solid #e8e0d5' : undefined,
                    borderBottom: '1px solid #e8e0d5',
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    gap: '16px',
                    alignItems: 'start',
                  }}
                >
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#bbb',
                    paddingTop: '2px',
                  }}>{label}</span>
                  <span style={{
                    fontSize: '15px',
                    color: '#1a1a1a',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-line',
                    fontWeight: 400,
                  }}>{value}</span>
                </div>
              ))}
            </div>
 
            {/* Orange accent block */}
            <div style={{
              marginTop: '48px',
              background: '#e85d04',
              padding: '32px',
              color: '#fff',
            }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: '16px',
              }}>
                Private dining<br />& catering available.
              </p>
              <p style={{ fontSize: '13px', opacity: 0.85, lineHeight: 1.6, marginBottom: '20px' }}>
                Planning a corporate dinner, wedding, or celebration? Our team handles everything.
              </p>
              <a
                href="/reservations"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: '#fff',
                  borderBottom: '1px solid rgba(255,255,255,0.5)',
                  paddingBottom: '2px',
                }}
              >
                Book a table →
              </a>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
 
      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </>
  )
}
 