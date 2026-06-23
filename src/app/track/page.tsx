'use client'
import { useState } from 'react'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'

type Order = {
  order_number: string
  created_at: string
  status: string
  total: number
  items_json: string
}

const STATUS_MAP: Record<string,number> = { pending:0, preparing:1, ready:2, delivered:3 }
const STEPS = [['📋','Received'],['🍳','Preparing'],['✅','Ready'],['🛵','Delivered']]

export default function TrackPage() {
  const [search, setSearch] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!search.trim()) return
    setLoading(true); setSearched(false); setOrder(null)
    try {
      const r = await fetch(`/api/track?q=${encodeURIComponent(search.trim())}`)
      const d = await r.json()
      setOrder(d.order || null)
      setSearched(true)
    } catch {}
    setLoading(false)
  }

  const stepIdx = order ? (STATUS_MAP[order.status] ?? 0) : 0
  const items = order ? (JSON.parse(order.items_json || '[]') as { name: string; price: number; qty: number }[]) : []

  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px', minHeight: '70vh' }}>
        <div style={{ background: 'linear-gradient(135deg, #fdf9f6 0%, #fdf9f6 100%)', padding: '64px 0 56px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #ddd2c4' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '100%', background: 'linear-gradient(135deg, transparent 40%, #fdf0e6 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '28px', right: '48px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', pointerEvents: 'none', opacity: 0.6 }}>
            <div style={{ width: '48px', height: '1.5px', background: '#6e2a32' }} />
            <div style={{ width: '32px', height: '1.5px', background: '#6e2a32' }} />
            <div style={{ width: '20px', height: '1.5px', background: '#6e2a32' }} />
          </div>
          <div className="container" style={{ position: 'relative' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#6e2a32', marginBottom: '16px' }}>Order status</p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#1c1815', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Track Your<br /><em style={{ color: '#6e2a32', fontStyle: 'italic' }}>Order.</em>
            </h1>
            <p style={{ color: '#8a7d6e', marginTop: '16px', fontSize: '16px', lineHeight: 1.7, maxWidth: '380px' }}>Enter your order number or email address to see real-time status.</p>
          </div>
        </div>

        <div className="container" style={{ paddingTop: '48px', paddingBottom: '80px', maxWidth: '600px' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '40px' }}>
            <input
              type="text" placeholder="Order number or email" value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, padding: '14px 16px', border: '2px solid #ddd2c4', borderRadius: '8px', fontSize: '15px', outline: 'none' }}
            />
            <button type="submit" disabled={loading} style={{ padding: '14px 24px', background: '#6e2a32', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
              {loading ? '...' : 'Track →'}
            </button>
          </form>

          {searched && !order && (
            <div style={{ textAlign: 'center', padding: '40px', background: '#fdf9f6', borderRadius: '12px', border: '1px solid #fde0cc' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
              <h3 style={{ color: '#1c1815', marginBottom: '8px' }}>No order found</h3>
              <p style={{ color: '#8a7d6e' }}>Check your order number or email and try again.</p>
            </div>
          )}

          {order && (
            <div style={{ background: '#fff', border: '1px solid #ddd2c4', borderRadius: '12px', padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#8a7d6e', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Number</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#6e2a32' }}>{order.order_number}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#8a7d6e' }}>Placed</div>
                  <div style={{ fontSize: '13px', color: '#6f6358' }}>{new Date(order.created_at).toLocaleString('en-CA', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
                {STEPS.map(([icon, label], i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                    {i > 0 && <div style={{ position: 'absolute', top: '20px', right: '50%', width: '100%', height: '3px', background: i <= stepIdx ? '#6e2a32' : '#ddd2c4', zIndex: 0 }} />}
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: i < stepIdx ? '#6e2a32' : i === stepIdx ? '#fdf9f6' : '#f5f5f5', border: `3px solid ${i <= stepIdx ? '#6e2a32' : '#ddd2c4'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', position: 'relative', zIndex: 1, fontSize: '16px' }}>{icon}</div>
                    <div style={{ fontSize: '11px', marginTop: '6px', fontWeight: i === stepIdx ? 700 : 400, color: i === stepIdx ? '#6e2a32' : '#8a7d6e' }}>{label}</div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #ddd2c4', paddingTop: '20px' }}>
                {items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f5f5', fontSize: '14px' }}>
                    <span style={{ color: '#6f6358' }}>{item.qty}× {item.name}</span>
                    <span style={{ fontWeight: 700, color: '#6e2a32' }}>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', fontSize: '16px', fontWeight: 800, color: '#1c1815' }}>
                  <span>Total</span><span style={{ color: '#6e2a32' }}>${Number(order.total).toFixed(2)} CAD</span>
                </div>
              </div>
              <p style={{ textAlign: 'center', fontSize: '12px', color: '#aaa', marginTop: '16px' }}>🔄 Refresh this page to see status updates</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}