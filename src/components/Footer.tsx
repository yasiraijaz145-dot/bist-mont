'use client'
import Link from 'next/link'
import { useState } from 'react'
import type { ReactNode } from 'react'

type SocialLink = { href: string; label: string; svg: ReactNode }

const SOCIALS: SocialLink[] = [
  {
    href: 'https://instagram.com/bistromontreal', label: 'Instagram',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    href: 'https://facebook.com/bistromontreal', label: 'Facebook',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    href: 'https://x.com/bistromontreal', label: 'X',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    href: 'https://tiktok.com/@bistromontreal', label: 'TikTok',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.16 8.16 0 004.77 1.53V7.01a4.85 4.85 0 01-1-.32z"/>
      </svg>
    ),
  },
]

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
            {SOCIALS.map(({ href, label, svg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
              >
                {svg}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {([
              ['Home', '/'],
              ['Menu', '/menu'],
              ['About', '/about'],
              ['Reservations', '/reservations'],
              ['Contact', '/contact'],
              ['Track Order', '/track'],
              ['Private Dining', '/private-dining'],
              ['Gift Cards', '/gift-cards'],
            ] as [string, string][]).map(([label, href]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Hours</h4>
          <ul className="footer-hours">
            <li><span>Mon</span><span>Closed</span></li>
            <li><span>Tue–Thu</span><span>5–10 PM</span></li>
            <li><span>Fri–Sat</span><span>5–11:30 PM</span></li>
            <li><span>Sunday</span><span>5–9:30 PM</span></li>
          </ul>
          <div style={{ marginTop: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.8' }}>
            📍 <a href="https://maps.google.com/?q=1420+Rue+Peel+Montreal+QC" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>1420 Rue Peel, Montréal</a><br />
            📞 <a href="tel:+15145550192" style={{ color: 'inherit', textDecoration: 'none' }}>+1 (514) 555-0192</a><br />
            ✉️ <a href="mailto:hello@bistromontreal.com" style={{ color: 'inherit', textDecoration: 'none' }}>hello@bistromontreal.com</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Newsletter</h4>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '14px', lineHeight: '1.7' }}>
            Get exclusive offers and seasonal menus in your inbox.
          </p>
          <form className="newsletter-form" onSubmit={subscribeNewsletter}>
            <input
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" aria-label="Subscribe to newsletter">Subscribe</button>
          </form>
          {nlMsg && <p style={{ fontSize: '12px', color: '#e85d04', marginTop: '8px' }}>{nlMsg}</p>}
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '12px', lineHeight: 1.6 }}>
            By subscribing you agree to our{' '}
            <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>Privacy Policy</Link>.
            Unsubscribe anytime.
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Bistro Montréal. All rights reserved. · 1420 Rue Peel, Montréal, QC H3A 1S8</p>
        <div className="footer-legal">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/gift-cards">Gift Cards</Link>
          <Link href="/private-dining">Private Dining</Link>
        </div>
      </div>
    </footer>
  )
}