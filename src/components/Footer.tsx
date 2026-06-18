'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [nlMsg, setNlMsg] = useState('')

  async function subscribeNewsletter(e: React.FormEvent) {
    e.preventDefault()
    try {
      const r = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const d = await r.json()
      setNlMsg(d.message || 'Subscribed!')
      if (d.ok) setEmail('')
    } catch {
      setNlMsg('Try again later.')
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo-text">Bistro Montréal</div>
          <p>French-inspired cuisine crafted from the finest local Québec ingredients. A culinary journey through Montreal&apos;s vibrant food culture.</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {['📸','👥','🐦','🎵'].map((icon, i) => (
              <a key={i} href="#" style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', transition: 'background 0.2s' }}>
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {[['Home','/'],['Menu','/menu'],['About','/about'],['Reservations','/reservations'],['Contact','/contact'],['Track Order','/track']].map(([label, href]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Hours</h4>
          <ul className="footer-hours">
            <li><span>Mon–Thu</span><span>5–10 PM</span></li>
            <li><span>Fri–Sat</span><span>5–11:30 PM</span></li>
            <li><span>Sunday</span><span>5–9:30 PM</span></li>
          </ul>
          <div style={{ marginTop: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.8' }}>
            📍 1420 Rue Peel, Montréal<br />
            📞 +1 (514) 555-0192
          </div>
        </div>
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '14px', lineHeight: '1.7' }}>
            Get exclusive offers and seasonal menus in your inbox.
          </p>
          <form className="newsletter-form" onSubmit={subscribeNewsletter}>
            <input type="email" placeholder="your@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
            <button type="submit">Go</button>
          </form>
          {nlMsg && <p style={{ fontSize: '12px', color: '#e85d04', marginTop: '8px' }}>{nlMsg}</p>}
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Bistro Montréal. All rights reserved. · 1420 Rue Peel, Montréal, QC H3A 1S8</p>
      </div>
    </footer>
  )
}
