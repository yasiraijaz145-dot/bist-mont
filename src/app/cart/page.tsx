'use client'
import { useState } from 'react'
import Link from 'next/link'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import ToastContainer from '@/components/Toast'

export default function CartPage() {
  const { cart, changeQty, removeItem, subtotal } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoMsg, setPromoMsg] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoApplied, setPromoApplied] = useState(false)

  const delivery = (subtotal - discount) < 35 ? 3.99 : 0
  const taxable = Math.max(0, subtotal - discount)
  const taxes = Math.round(taxable * 0.14975 * 100) / 100
  const total = Math.round((taxable + taxes + delivery) * 100) / 100

  async function applyPromo() {
    const code = promoCode.trim().toUpperCase()
    if (!code) return
    try {
      const r = await fetch('/api/promo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code, subtotal }) })
      const d = await r.json()
      setPromoMsg(d.message || '')
      if (d.ok) {
        setDiscount(d.discount_amount || 0)
        setPromoApplied(true)
      }
    } catch { setPromoMsg('Error applying code.') }
  }

  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px', minHeight: '70vh' }}>
        <div style={{ background: '#f7f2ec', padding: '40px 0' }}>
          <div className="container">
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.5rem', color: '#1c1815' }}>Your Cart</h1>
          </div>
        </div>

        <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", color: '#1c1815', marginBottom: '12px' }}>Your cart is empty</h2>
              <p style={{ color: '#8a7d6e', marginBottom: '24px' }}>Add something delicious from our menu.</p>
              <Link href="/menu" style={{ background: '#6e2a32', color: '#fff', padding: '14px 32px', borderRadius: '8px', fontWeight: 700, display: 'inline-block' }}>Browse Menu</Link>
            </div>
          ) : (
            <div className="cart-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px', alignItems: 'start' }}>
              {/* Items */}
              <div>
                {cart.map((item, idx) => (
                  <div key={idx} className="cart-item-row" style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '16px', alignItems: 'center', padding: '20px', background: '#fff', border: '1px solid #ddd2c4', borderRadius: '12px', marginBottom: '12px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=160' }}
                      alt={item.name} />
                    <div>
                      <div style={{ fontWeight: 700, color: '#1c1815', marginBottom: '4px' }}>{item.name}</div>
                      <div style={{ color: '#6e2a32', fontWeight: 700 }}>${item.price.toFixed(2)}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f7f2ec', borderRadius: '20px', padding: '4px 8px' }}>
                        <button onClick={() => changeQty(idx, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #6e2a32', background: '#fff', color: '#6e2a32', fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                        <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                        <button onClick={() => changeQty(idx, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #6e2a32', background: '#fff', color: '#6e2a32', fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                      </div>
                      <div style={{ fontWeight: 700, color: '#1c1815' }}>${(item.price * item.qty).toFixed(2)}</div>
                      <button onClick={() => removeItem(idx)} style={{ fontSize: '12px', color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Remove</button>
                    </div>
                  </div>
                ))}
                <Link href="/menu" style={{ display: 'inline-block', marginTop: '8px', color: '#6e2a32', fontWeight: 600, textDecoration: 'underline' }}>+ Add more items</Link>
              </div>

              {/* Summary */}
              <div style={{ background: '#fff', border: '1px solid #ddd2c4', borderRadius: '12px', padding: '24px', position: 'sticky', top: '130px' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", color: '#1c1815', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #ddd2c4' }}>Order Summary</h3>

                {/* Promo */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <input
                    type="text" placeholder="Promo code" value={promoCode}
                    onChange={e => setPromoCode(e.target.value.toUpperCase())}
                    style={{ flex: 1, padding: '10px 12px', border: '2px solid #ddd2c4', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                  />
                  <button onClick={applyPromo} style={{ padding: '10px 16px', background: '#1c1815', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Apply</button>
                </div>
                {promoMsg && <p style={{ fontSize: '12px', marginBottom: '12px', color: promoApplied ? '#4caf70' : '#e53e3e' }}>{promoMsg}</p>}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: '#6f6358' }}>
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: '#4caf70' }}>
                    <span>Discount</span><span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: '#6f6358' }}>
                  <span>Delivery</span><span>{delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px', color: '#6f6358' }}>
                  <span>Taxes (14.975%)</span><span>${taxes.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '2px solid #ddd2c4', fontSize: '18px', fontWeight: 800, color: '#1c1815' }}>
                  <span>Total</span><span style={{ color: '#6e2a32' }}>${total.toFixed(2)}</span>
                </div>
                <Link href="/checkout" style={{ display: 'block', textAlign: 'center', marginTop: '20px', background: '#6e2a32', color: '#fff', padding: '16px', borderRadius: '10px', fontWeight: 700, fontSize: '16px' }}>
                  Proceed to Checkout →
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}