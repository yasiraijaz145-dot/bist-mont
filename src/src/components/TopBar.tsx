'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import CartPanel from './CartPanel'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/contact', label: 'Contact' },
  { href: '/track', label: 'Track Order' },
]

export default function TopBar() {
  const pathname = usePathname()
  const { cartCount, openCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="top-bar">
        <div className="top-bar-inner">
          {/* Left: location (desktop) + hamburger (mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className={`hamburger${mobileOpen ? ' open' : ''}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
            <div className="top-bar-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              PICKUP <strong>Bistro Montréal</strong>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>

          {/* Center: logo */}
          <Link href="/" className="site-logo-center" onClick={() => setMobileOpen(false)}>
            <div style={{ textAlign: 'center' }}>
              <div className="logo-text">Bistro</div>
              <div className="logo-text">Montréal</div>
              <div className="logo-sub">Est. 2009</div>
            </div>
          </Link>

          {/* Right: phone + cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href="tel:+15145550192" className="top-bar-phone" style={{ textDecoration: 'none', color: 'inherit' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.1 2.26 2 2 0 012.11.08h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1-1a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.03z"/>
              </svg>
              +1 (514) 555-0192
            </a>
            <button className="top-bar-cart" onClick={openCart} aria-label="Open cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Desktop nav bar */}
        <nav className="main-nav" aria-label="Main navigation">
          <div className="main-nav-inner">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link${pathname === l.href ? ' active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/reservations" style={{
              marginLeft: 'auto',
              background: '#e85d04',
              color: '#fff',
              padding: '8px 20px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}>
              Reserve a Table
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div
          className="mobile-nav open"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            className="mobile-nav-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '24px' }}>
              Navigation
            </div>
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link${pathname === l.href ? ' active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '32px' }}>
            <Link
              href="/reservations"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                background: '#e85d04',
                color: '#fff',
                padding: '16px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Reserve a Table →
            </Link>
          </div>

          <div className="mobile-nav-phone">
            Call us: <a href="tel:+15145550192">+1 (514) 555-0192</a>
          </div>
        </div>
      )}

      <CartPanel />
    </>
  )
}