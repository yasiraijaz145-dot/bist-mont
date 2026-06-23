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

        <section style={{ borderBottom: '1px solid #ddd2c4', padding: '72px 0 60px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #fdf9f6 0%, #fff 60%)' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '340px', height: '100%', background: 'linear-gradient(135deg, transparent 40%, #fdf4ed 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '32px', right: '48px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', pointerEvents: 'none', opacity: 0.6 }}>
            <div style={{ width: '48px', height: '1.5px', background: '#6e2a32' }} />
            <div style={{ width: '32px', height: '1.5px', background: '#6e2a32' }} />
            <div style={{ width: '20px', height: '1.5px', background: '#6e2a32' }} />
          </div>
          <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '80px' }} className="contact-hero-grid">
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#6e2a32', marginBottom: '20px' }}>Get in touch</p>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 700, color: '#1c1815', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: '700px' }}>
                  A table<br />
                  <em style={{ color: '#6e2a32', fontStyle: 'italic' }}>awaits you.</em>
                </h1>
                <p style={{ marginTop: '28px', fontSize: '16px', color: '#8a7d6e', maxWidth: '420px', lineHeight: 1.7 }}>
                  Questions, reservations, or a late-night craving — write to us and we&apos;ll respond within the day.
                </p>
              </div>
              <div className="contact-hero-aside" style={{ display: 'flex', flexDirection: 'column', gap: '0', minWidth: '220px', borderLeft: '1px solid #ddd2c4', paddingLeft: '48px' }}>
                {([
                  { label: 'Address', value: '1420 Rue Peel, Montréal' },
                  { label: 'Hours', value: 'Tue–Sun · 5 – 10:30 PM' },
                  { label: 'Email', value: 'hello@bistromontreal.com' },
                ] as { label: string; value: string }[]).map(({ label, value }) => (
                  <div key={label} style={{ padding: '16px 0', borderBottom: '1px solid #f0ebe3' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#bbb', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontSize: '14px', color: '#1c1815', fontWeight: 500 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: '1120px', margin: '0 auto', padding: '80px 40px 0' }}>
          <div className="contact-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '100px', alignItems: 'start', paddingBottom: '60px' }}>

            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '40px' }}>Send a message</p>

              {success && (
                <div style={{ borderLeft: '3px solid #1c1815', paddingLeft: '20px', marginBottom: '40px' }}>
                  <p style={{ fontSize: '18px', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#1c1815', marginBottom: '4px' }}>Message received.</p>
                  <p style={{ fontSize: '14px', color: '#8a7d6e' }}>We&apos;ll be in touch within 24 hours.</p>
                </div>
              )}
              {error && (
                <div style={{ borderLeft: '3px solid #6e2a32', paddingLeft: '20px', marginBottom: '40px' }}>
                  <p style={{ fontSize: '14px', color: '#6e2a32' }}>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="contact-fields-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}>
                  {(['name', 'email'] as const).map((field) => (
                    <div key={field}>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: focused === field ? '#1c1815' : '#bbb', marginBottom: '10px', transition: 'color 0.2s' }}>
                        {field === 'name' ? 'Full name' : 'Email address'}
                      </label>
                      <input
                        name={field}
                        type={field === 'email' ? 'email' : 'text'}
                        required
                        onFocus={() => setFocused(field)}
                        onBlur={() => setFocused(null)}
                        style={{ width: '100%', padding: '0 0 14px', border: 'none', borderBottom: `1.5px solid ${focused === field ? '#1c1815' : '#ddd2c4'}`, fontSize: '16px', color: '#1c1815', background: 'transparent', outline: 'none', fontFamily: "'Jost', sans-serif", transition: 'border-color 0.2s' }}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: focused === 'subject' ? '#1c1815' : '#bbb', marginBottom: '10px', transition: 'color 0.2s' }}>Subject</label>
                  <select
                    name="subject"
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    style={{ width: '100%', padding: '0 24px 14px 0', border: 'none', borderBottom: `1.5px solid ${focused === 'subject' ? '#1c1815' : '#ddd2c4'}`, fontSize: '16px', color: '#1c1815', background: 'transparent', outline: 'none', fontFamily: "'Jost', sans-serif", cursor: 'pointer', transition: 'border-color 0.2s', appearance: 'none', WebkitAppearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23bbb' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center' }}
                  >
                    <option>General Inquiry</option>
                    <option>Reservation</option>
                    <option>Catering</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div style={{ marginBottom: '48px' }}>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: focused === 'message' ? '#1c1815' : '#bbb', marginBottom: '10px', transition: 'color 0.2s' }}>Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    style={{ width: '100%', padding: '0 0 14px', border: 'none', borderBottom: `1.5px solid ${focused === 'message' ? '#1c1815' : '#ddd2c4'}`, fontSize: '16px', color: '#1c1815', background: 'transparent', outline: 'none', resize: 'none', fontFamily: "'Jost', sans-serif", transition: 'border-color 0.2s', lineHeight: 1.7 }}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#1c1815', color: '#fff', padding: '18px 40px', border: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Jost', sans-serif", opacity: loading ? 0.6 : 1, transition: 'background 0.2s' }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#6e2a32' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#1c1815' }}
                  >
                    {loading ? 'Sending' : 'Send message'}
                    <span style={{ fontSize: '18px', lineHeight: 1 }}>→</span>
                  </button>
                </div>
              </form>
            </div>

            <aside>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '40px' }}>Find us</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {([
                  { label: 'Address', value: '1420 Rue Peel\nMontréal, QC H3A 1S8', href: 'https://maps.google.com/?q=1420+Rue+Peel+Montreal+QC' },
                  { label: 'Reservations', value: '+1 (514) 555-0192', href: 'tel:+15145550192' },
                  { label: 'Email', value: 'hello@bistromontreal.com', href: 'mailto:hello@bistromontreal.com' },
                  { label: 'Hours', value: 'Mon–Thu · 5 — 10 PM\nFri–Sat · 5 — 11:30 PM\nSun · 5 — 9:30 PM', href: null },
                ] as { label: string; value: string; href: string | null }[]).map(({ label, value, href }, i) => (
                  <div key={label} style={{ padding: '28px 0', borderTop: i === 0 ? '1px solid #ddd2c4' : undefined, borderBottom: '1px solid #ddd2c4', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', alignItems: 'start' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#bbb', paddingTop: '2px' }}>{label}</span>
                    {href !== null ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{ fontSize: '15px', color: '#1c1815', lineHeight: 1.7, whiteSpace: 'pre-line', fontWeight: 400, textDecoration: 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#6e2a32')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#1c1815')}
                      >{value}</a>
                    ) : (
                      <span style={{ fontSize: '15px', color: '#1c1815', lineHeight: 1.7, whiteSpace: 'pre-line', fontWeight: 400 }}>{value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '48px', background: '#6e2a32', padding: '32px', color: '#fff' }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, lineHeight: 1.3, marginBottom: '16px' }}>
                  Private dining<br />&amp; catering available.
                </p>
                <p style={{ fontSize: '13px', opacity: 0.85, lineHeight: 1.6, marginBottom: '20px' }}>
                  Planning a corporate dinner, wedding, or celebration? Our team handles everything.
                </p>
                <a href="/reservations" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: '2px' }}>
                  Book a table →
                </a>
              </div>
            </aside>

          </div>

          <div style={{ borderTop: '1px solid #ddd2c4', paddingBottom: '80px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.247858483965!2d-73.57439068435975!3d45.50219197910127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a4a46a6ffd3%3A0x6b8f0e81a3c4e7!2s1420+Rue+Peel%2C+Montr%C3%A9al%2C+QC+H3A+1S8!5e0!3m2!1sen!2sca!4v1700000000000"
              width="100%"
              height="360"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bistro Montréal on Google Maps"
            />
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media (max-width: 600px) {
          .contact-hero-grid { flex-direction: column !important; gap: 40px !important; }
          .contact-hero-aside { border-left: none !important; border-top: 1px solid #ddd2c4 !important; padding-left: 0 !important; padding-top: 32px !important; min-width: unset !important; }
        }
      `}</style>
    </>
  )
}