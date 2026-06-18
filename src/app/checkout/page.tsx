'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'

export default function CheckoutPage() {
  const { cart, subtotal } = useCart()
  const router = useRouter()
  const [orderType, setOrderType] = useState<'delivery'|'pickup'>('delivery')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [discount] = useState(0)

  const delivery = (subtotal - discount) < 35 ? 3.99 : 0
  const taxable = Math.max(0, subtotal - discount)
  const taxes = Math.round(taxable * 0.14975 * 100) / 100
  const total = Math.round((taxable + taxes + delivery) * 100) / 100

  if (cart.length === 0) {
    return (
      <>
        <TopBar />
        <main style={{ paddingTop: '110px', textAlign: 'center', padding: '120px 24px' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif" }}>Your cart is empty</h2>
          <Link href="/menu" style={{ display: 'inline-block', marginTop: '16px', background: '#e85d04', color: '#fff', padding: '12px 28px', borderRadius: '8px', fontWeight: 700 }}>Browse Menu</Link>
        </main>
        <Footer />
      </>
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!paymentMethod) { setError('Please select a payment method.'); return }
    setError(''); setLoading(true)
    const fd = new FormData(e.currentTarget)
    const data = {
      customer_name: fd.get('customer_name'), email: fd.get('email'), phone: fd.get('phone'),
      order_type: orderType, payment_method: paymentMethod,
      address_street: fd.get('address_street'), address_apt: fd.get('address_apt'),
      address_city: fd.get('address_city'), address_postal: fd.get('address_postal'),
      special_instructions: fd.get('special_instructions'),
      items: cart, subtotal, discount_amount: discount, taxes, delivery_fee: delivery, total,
    }
    try {
      const r = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const d = await r.json()
      if (d.ok) router.push(`/confirmation?order=${d.order_number}`)
      else setError(d.error || 'Something went wrong.')
    } catch { setError('Network error. Please try again.') }
    setLoading(false)
  }

  const inputStyle = { width: '100%', padding: '12px 16px', border: '2px solid #e8e0d5', borderRadius: '8px', fontSize: '15px', outline: 'none', fontFamily: 'inherit' }
  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '1px', marginBottom: '6px', color: '#555' }

  const PAYMENT_METHODS = [
    { id: 'card', icon: '💳', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex' },
    { id: 'interac', icon: '🏦', name: 'Interac e-Transfer', desc: 'Send to our email — instant in Canada' },
    { id: 'paypal', icon: '🅿️', name: 'PayPal', desc: 'Fast, secure PayPal checkout' },
    { id: 'cash', icon: '💵', name: 'Cash on Delivery', desc: 'Pay when your order arrives' },
  ]

  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px' }}>
        <div style={{ background: '#f9f5f0', padding: '40px 0' }}>
          <div className="container"><h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.5rem', color: '#1a1a1a' }}>Checkout</h1></div>
        </div>

        <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '40px', alignItems: 'start' }}>
              {/* Left */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 1. Contact */}
                <div style={{ background: '#fff', border: '1px solid #e8e0d5', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", marginBottom: '16px' }}>1. Contact Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div><label style={labelStyle}>Full Name *</label><input name="customer_name" required style={inputStyle} placeholder="Marie Tremblay" /></div>
                    <div><label style={labelStyle}>Email *</label><input name="email" type="email" required style={inputStyle} placeholder="marie@email.com" /></div>
                    <div><label style={labelStyle}>Phone</label><input name="phone" style={inputStyle} placeholder="+1 (514) 555-0000" /></div>
                  </div>
                </div>

                {/* 2. Order Type */}
                <div style={{ background: '#fff', border: '1px solid #e8e0d5', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", marginBottom: '16px' }}>2. Order Type</h3>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    {(['delivery','pickup'] as const).map(t => (
                      <button key={t} type="button" onClick={() => setOrderType(t)}
                        style={{ flex: 1, padding: '12px', border: `2px solid ${orderType===t?'#e85d04':'#e8e0d5'}`, borderRadius: '8px', background: orderType===t?'rgba(232,93,4,0.05)':'#fff', fontWeight: 700, cursor: 'pointer' }}>
                        {t === 'delivery' ? '🛵 Delivery' : '🏪 Pickup'}
                      </button>
                    ))}
                  </div>
                  {orderType === 'delivery' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div style={{ gridColumn: '1/-1' }}><label style={labelStyle}>Street Address</label><input name="address_street" style={inputStyle} placeholder="123 Rue Saint-Denis" /></div>
                      <div><label style={labelStyle}>Apt/Suite</label><input name="address_apt" style={inputStyle} placeholder="Apt 4B" /></div>
                      <div><label style={labelStyle}>City</label><input name="address_city" style={inputStyle} defaultValue="Montréal" /></div>
                      <div><label style={labelStyle}>Postal Code</label><input name="address_postal" style={inputStyle} placeholder="H2X 1Y4" /></div>
                      <p style={{ gridColumn: '1/-1', color: '#e85d04', fontSize: '13px' }}>⏱ Estimated delivery: <strong>35–45 minutes</strong></p>
                    </div>
                  ) : (
                    <div style={{ background: '#f9f5f0', padding: '16px', borderRadius: '8px' }}>
                      <p style={{ fontWeight: 600, marginBottom: '4px' }}>📍 1420 Rue Peel, Montréal, QC H3A 1S8</p>
                      <p style={{ color: '#e85d04', fontSize: '13px' }}>⏱ Ready in: <strong>20–25 minutes</strong></p>
                    </div>
                  )}
                </div>

                {/* 3. Payment */}
                <div style={{ background: '#fff', border: '1px solid #e8e0d5', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", marginBottom: '16px' }}>3. Payment Method</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {PAYMENT_METHODS.map(pm => (
                      <div key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', border: `2px solid ${paymentMethod===pm.id?'#e85d04':'#e8e0d5'}`, borderRadius: '10px', cursor: 'pointer', background: paymentMethod===pm.id?'rgba(232,93,4,0.03)':'#fff' }}>
                        <span style={{ fontSize: '1.5rem' }}>{pm.icon}</span>
                        <div>
                          <div style={{ fontWeight: 700 }}>{pm.name}</div>
                          <div style={{ fontSize: '12px', color: '#888' }}>{pm.desc}</div>
                        </div>
                        {paymentMethod===pm.id && <span style={{ marginLeft: 'auto', color: '#e85d04', fontWeight: 700 }}>✓</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Special instructions */}
                <div style={{ background: '#fff', border: '1px solid #e8e0d5', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", marginBottom: '16px' }}>4. Special Instructions</h3>
                  <textarea name="special_instructions" rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="e.g. No onions, extra spicy, lactose-free..." />
                </div>

                {error && <div style={{ background: '#f8d7da', borderRadius: '8px', padding: '16px', color: '#721c24' }}>{error}</div>}

                <button type="submit" disabled={loading || !paymentMethod}
                  style={{ background: paymentMethod ? '#e85d04' : '#ccc', color: '#fff', padding: '16px', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: paymentMethod ? 'pointer' : 'not-allowed' }}>
                  {loading ? 'Placing Order...' : `Place Order — $${total.toFixed(2)} CAD`}
                </button>
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>🔒 Secured · 256-bit SSL encryption</p>
              </div>

              {/* Right: Order summary */}
              <div style={{ background: '#fff', border: '1px solid #e8e0d5', borderRadius: '12px', padding: '24px', position: 'sticky', top: '130px' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", marginBottom: '20px' }}>Order Summary</h3>
                {cart.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt={item.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }} />
                      <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#e85d04', color: '#fff', fontSize: '10px', fontWeight: 700, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.qty}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>${item.price.toFixed(2)} each</div>
                    </div>
                    <div style={{ fontWeight: 700, color: '#e85d04' }}>${(item.price*item.qty).toFixed(2)}</div>
                  </div>
                ))}
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[['Subtotal', `$${subtotal.toFixed(2)}`], ['Delivery', delivery===0?'FREE':`$${delivery.toFixed(2)}`], ['Taxes (14.975%)', `$${taxes.toFixed(2)}`]].map(([k,v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#555' }}><span>{k}</span><span>{v}</span></div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '2px solid #e8e0d5', fontSize: '18px', fontWeight: 800 }}>
                    <span>Total</span><span style={{ color: '#e85d04' }}>${total.toFixed(2)} CAD</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
