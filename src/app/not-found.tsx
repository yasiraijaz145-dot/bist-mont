import Link from 'next/link'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div style={{ textAlign: 'center', padding: '80px 40px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#6e2a32', marginBottom: '20px' }}>404</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, color: '#1c1815', lineHeight: 1.1, marginBottom: '20px' }}>
            This page<br /><em style={{ color: '#6e2a32' }}>left the menu.</em>
          </h1>
          <p style={{ color: '#8a7d6e', fontSize: '16px', lineHeight: 1.7, marginBottom: '40px', maxWidth: '380px', margin: '0 auto 40px' }}>
            The page you&apos;re looking for doesn&apos;t exist. Let us guide you back.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ background: '#1c1815', color: '#fff', padding: '16px 36px', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none' }}>
              Back to Home
            </Link>
            <Link href="/menu" style={{ border: '1.5px solid #1c1815', color: '#1c1815', padding: '16px 36px', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none' }}>
              View Menu
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}