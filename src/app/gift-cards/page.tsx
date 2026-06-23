import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Gift Cards',
  description: 'Give the gift of fine dining. Bistro Montréal gift cards are available in any amount and never expire.',
}

const AMOUNTS = [50, 100, 150, 200, 250, 500]

export default function GiftCardsPage() {
  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px', background: '#fff' }}>

        {/* Hero */}
        <section style={{ background: '#1c1815', padding: '100px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(200px, 40vw, 500px)', fontWeight: 900, color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none' }}>Gift</div>
          </div>
          <div style={{ position: 'relative' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#6e2a32', marginBottom: '20px' }}>Give the Gift of Fine Dining</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.05, marginBottom: '20px' }}>
              A meal worth<br />
              <em style={{ color: '#6e2a32' }}>remembering.</em>
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Bistro Montréal gift cards are perfect for birthdays, anniversaries, and every occasion in between. They never expire.
            </p>
          </div>
        </section>

        {/* Gift card visual + amounts */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 40px' }}>

          {/* Card visual */}
          <div style={{
            background: 'linear-gradient(135deg, #1c1815 0%, #2d2d2d 100%)',
            borderRadius: '16px',
            padding: '48px 40px',
            marginBottom: '60px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(232,93,4,0.15)' }} />
            <div style={{ position: 'absolute', bottom: '-60px', left: '-20px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(232,93,4,0.08)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 900, color: '#6e2a32', marginBottom: '4px' }}>Bistro Montréal</div>
              <div style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '40px' }}>Gift Card · Est. 2009</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Value</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', fontWeight: 700, color: '#fff' }}>$100</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Valid</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Never expires</div>
                </div>
              </div>
            </div>
          </div>

          {/* Amount selector */}
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '20px' }}>Select an amount</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
            {AMOUNTS.map(amount => (
              <div
                key={amount}
                style={{
                  padding: '20px',
                  border: amount === 100 ? '2px solid #1c1815' : '1.5px solid #ddd2c4',
                  background: amount === 100 ? '#1c1815' : 'transparent',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: amount === 100 ? '#6e2a32' : '#1c1815' }}>${amount}</div>
                <div style={{ fontSize: '11px', color: amount === 100 ? 'rgba(255,255,255,0.5)' : '#bbb', marginTop: '4px' }}>CAD</div>
              </div>
            ))}
          </div>

          {/* Custom amount */}
          <div style={{ marginBottom: '40px' }}>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#bbb', marginBottom: '10px' }}>
              Or enter a custom amount
            </label>
            <div style={{ display: 'flex', gap: '0' }}>
              <span style={{ padding: '14px 16px', background: '#f7f2ec', border: '1.5px solid #ddd2c4', borderRight: 'none', fontSize: '16px', color: '#8a7d6e', fontWeight: 700 }}>$</span>
              <input
                type="number"
                min="25"
                placeholder="Enter amount (min $25)"
                style={{ flex: 1, padding: '14px 16px', border: '1.5px solid #ddd2c4', fontSize: '16px', color: '#1c1815', background: '#fff', outline: 'none', fontFamily: "'Jost', sans-serif" }}
              />
            </div>
          </div>

          {/* Recipient details */}
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '24px' }}>Recipient details</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {[['Recipient name', 'text'], ['Recipient email', 'email']].map(([label, type]) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#bbb', marginBottom: '8px' }}>{label}</label>
                <input type={type} style={{ width: '100%', padding: '0 0 12px', border: 'none', borderBottom: '1.5px solid #ddd2c4', fontSize: '15px', color: '#1c1815', background: 'transparent', outline: 'none', fontFamily: "'Jost', sans-serif" }} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '40px' }}>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#bbb', marginBottom: '8px' }}>Personal message (optional)</label>
            <textarea rows={3} style={{ width: '100%', padding: '0 0 12px', border: 'none', borderBottom: '1.5px solid #ddd2c4', fontSize: '15px', color: '#1c1815', background: 'transparent', outline: 'none', resize: 'none', fontFamily: "'Jost', sans-serif", lineHeight: 1.6 }} placeholder="Write a personal note to include with the gift card…" />
          </div>

          {/* Plain CSS hover instead of onMouseEnter/onMouseLeave — keeps this a Server Component */}
          <style>{`
            .gc-purchase-btn { background: #1c1815; transition: background 0.15s; }
            .gc-purchase-btn:hover { background: #6e2a32; }
          `}</style>
          <button
            className="gc-purchase-btn"
            style={{ width: '100%', color: '#fff', border: 'none', padding: '18px', fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
          >
            Purchase Gift Card <span style={{ fontSize: '18px' }}>→</span>
          </button>
          <p style={{ fontSize: '12px', color: '#bbb', textAlign: 'center', marginTop: '16px' }}>
            Gift cards are delivered by email instantly. They never expire and can be used for dine-in, pickup, or delivery.
          </p>
        </section>

      </main>
      <Footer />
    </>
  )
}