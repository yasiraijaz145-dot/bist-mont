'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'

const MONTREAL_AREA_CITIES = [
  'Montréal', 'Laval', 'Longueuil', 'Brossard', 'Westmount', 'Outremont',
  'Verdun', 'Saint-Laurent', 'Lachine', 'LaSalle', 'Dollard-des-Ormeaux',
  'Pointe-Claire', 'Mont-Royal', 'Côte Saint-Luc', 'Kirkland', 'Beaconsfield',
  'Saint-Lambert', 'Boucherville', 'Repentigny', 'Terrebonne',
]

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex' },
  { id: 'interac', name: 'Interac e-Transfer', desc: 'Send to our email — instant in Canada' },
  { id: 'paypal', name: 'PayPal', desc: 'Fast, secure PayPal checkout' },
  { id: 'cash', name: 'Cash on Delivery', desc: 'Pay when your order arrives' },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_DIGITS_RE = /^\+?[0-9\s\-().]{7,20}$/

export default function CheckoutPage() {
  const { cart, subtotal } = useCart()
  const router = useRouter()
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [focused, setFocused] = useState<string | null>(null)

  const [city, setCity] = useState('Montréal')
  const [discount, setDiscount] = useState(0)
  const [promoCode, setPromoCode] = useState('')
  const [promoMsg, setPromoMsg] = useState('')
  const [promoOk, setPromoOk] = useState(false)
  const [promoLoading, setPromoLoading] = useState(false)

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

  async function handleApplyPromo() {
    if (!promoCode.trim()) { setPromoMsg('Enter a promo code.'); setPromoOk(false); return }
    setPromoLoading(true); setPromoMsg('')
    try {
      const r = await fetch('/api/promo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: promoCode.trim(), subtotal }) })
      const d = await r.json()
      if (d.ok) { setDiscount(d.discount_amount || 0); setPromoOk(true); setPromoMsg(d.message) }
      else { setDiscount(0); setPromoOk(false); setPromoMsg(d.message || 'Invalid promo code.') }
    } catch { setPromoOk(false); setPromoMsg('Network error. Please try again.') }
    setPromoLoading(false)
  }

  function validate(fd: FormData) {
    const errs: Record<string, string> = {}
    const name = String(fd.get('customer_name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const phone = String(fd.get('phone') || '').trim()
    const street = String(fd.get('address_street') || '').trim()
    const postal = String(fd.get('address_postal') || '').trim()

    if (!name) errs.customer_name = 'Please enter your full name.'
    else if (/\d/.test(name)) errs.customer_name = "Name shouldn't contain numbers."

    if (!email) errs.email = 'Please enter your email address.'
    else if (!EMAIL_RE.test(email)) errs.email = 'Enter a valid email address, e.g. name@example.com.'

    if (phone) {
      const digitCount = phone.replace(/\D/g, '').length
      if (!PHONE_DIGITS_RE.test(phone) || digitCount < 10 || digitCount > 11) {
        errs.phone = 'Enter a valid phone number, e.g. +1 (514) 555-0192.'
      }
    }

    if (orderType === 'delivery') {
      if (!street) errs.address_street = 'Street address is required for delivery.'
      if (!postal) errs.address_postal = 'Postal code is required for delivery.'
      else if (!/^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/.test(postal)) {
        errs.address_postal = 'Enter a valid Canadian postal code, e.g. H2X 1Y4.'
      }
    }

    if (!paymentMethod) errs.payment_method = 'Please select a payment method.'

    return errs
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    const errs = validate(fd)
    setFieldErrors(errs)
    if (Object.keys(errs).length > 0) {
      setError('Please fix the highlighted fields below before placing your order.')
      return
    }
    setLoading(true)
    const data = {
      customer_name: fd.get('customer_name'), email: fd.get('email'), phone: fd.get('phone'),
      order_type: orderType, payment_method: paymentMethod,
      address_street: fd.get('address_street'), address_apt: fd.get('address_apt'),
      address_city: orderType === 'delivery' ? city : undefined, address_postal: fd.get('address_postal'),
      special_instructions: fd.get('special_instructions'),
      items: cart, subtotal, discount_amount: discount, taxes, delivery_fee: delivery, total,
    }
    try {
      const r = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      const d = await r.json()
      if (d.ok) router.push(`/confirmation?order=${d.order_number}`)
      else setError(d.error || "Something went wrong while placing your order. Please try again, or contact us if the problem continues.")
    } catch {
      setError("Network error — we couldn't reach the server. Please check your connection and try again.")
    }
    setLoading(false)
  }

  const fieldStyle = (name: string, hasError?: boolean) => ({
    width: '100%',
    padding: '0 0 14px',
    border: 'none',
    borderBottom: `1.5px solid ${hasError ? '#e85d04' : focused === name ? '#1a1a1a' : '#e8e0d5'}`,
    fontSize: '16px',
    color: '#1a1a1a',
    background: 'transparent',
    outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s',
  })

  const labelStyle = (name: string) => ({
    display: 'block',
    fontSize: '10px',
    fontWeight: 700 as const,
    letterSpacing: '2.5px',
    textTransform: 'uppercase' as const,
    color: fieldErrors[name] ? '#e85d04' : focused === name ? '#1a1a1a' : '#bbb',
    marginBottom: '10px',
    transition: 'color 0.2s',
  })

  const errorText = (name: string) =>
    fieldErrors[name] ? (
      <p style={{ fontSize: '12px', color: '#e85d04', marginTop: '8px' }}>{fieldErrors[name]}</p>
    ) : null

  const sectionLabel = (text: string) => (
    <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '32px' }}>{text}</p>
  )

  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px', background: '#fff' }}>

        <section style={{ borderBottom: '1px solid #e8e0d5', padding: '72px 0 60px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', right: '-20px', top: '-30px',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(160px, 22vw, 300px)',
            fontWeight: 900, color: 'transparent',
            WebkitTextStroke: '1px #e8e0d5',
            lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}>07</div>
          <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 40px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#e85d04', marginBottom: '20px' }}>Checkout</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: '700px' }}>
              Almost<br />
              <em style={{ color: '#e85d04', fontStyle: 'italic' }}>at the table.</em>
            </h1>
            <p style={{ marginTop: '28px', fontSize: '16px', color: '#888', maxWidth: '420px', lineHeight: 1.7 }}>
              Questions about your order? Call us at <span style={{ color: '#1a1a1a', fontWeight: 500 }}>+1 (514) 555-0192</span>
            </p>
          </div>
        </section>

        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '80px 40px 100px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '80px', alignItems: 'start' }}>

              <div>
                {error && (
                  <div style={{ borderLeft: '3px solid #e85d04', paddingLeft: '20px', marginBottom: '48px' }}>
                    <p style={{ fontSize: '14px', color: '#e85d04' }}>{error}</p>
                  </div>
                )}

                {sectionLabel('Your details')}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
                  <div>
                    <label style={labelStyle('customer_name')}>Full name</label>
                    <input name="customer_name" placeholder="Marie Tremblay"
                      onFocus={() => setFocused('customer_name')} onBlur={() => setFocused(null)}
                      style={fieldStyle('customer_name', !!fieldErrors.customer_name)} />
                    {errorText('customer_name')}
                  </div>
                  <div>
                    <label style={labelStyle('email')}>Email address</label>
                    <input name="email" type="email" placeholder="marie@email.com"
                      onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                      style={fieldStyle('email', !!fieldErrors.email)} />
                    {errorText('email')}
                  </div>
                </div>
                <div style={{ marginBottom: '56px' }}>
                  <label style={labelStyle('phone')}>Phone</label>
                  <input name="phone" placeholder="+1 (514) 555-0000"
                    onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                    style={fieldStyle('phone', !!fieldErrors.phone)} />
                  {errorText('phone')}
                </div>

                {sectionLabel('Order type')}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '40px' }}>
                  {(['delivery', 'pickup'] as const).map(t => (
                    <div key={t} onClick={() => setOrderType(t)}
                      style={{
                        padding: '24px 16px',
                        border: `1.5px solid ${orderType === t ? '#1a1a1a' : '#e8e0d5'}`,
                        background: orderType === t ? '#1a1a1a' : 'transparent',
                        cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
                      }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', color: orderType === t ? '#fff' : '#1a1a1a' }}>
                        {t === 'delivery' ? 'Delivery' : 'Pickup'}
                      </div>
                      <div style={{ fontSize: '11px', color: orderType === t ? 'rgba(255,255,255,0.6)' : '#bbb', marginTop: '4px' }}>
                        {t === 'delivery' ? 'Brought to your door' : 'Ready at the bistro'}
                      </div>
                    </div>
                  ))}
                </div>

                {orderType === 'delivery' ? (
                  <div style={{ marginBottom: '56px' }}>
                    <div style={{ marginBottom: '40px' }}>
                      <label style={labelStyle('address_street')}>Street address</label>
                      <input name="address_street" placeholder="123 Rue Saint-Denis"
                        onFocus={() => setFocused('address_street')} onBlur={() => setFocused(null)}
                        style={fieldStyle('address_street', !!fieldErrors.address_street)} />
                      {errorText('address_street')}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
                      <div>
                        <label style={labelStyle('address_apt')}>Apt / Suite</label>
                        <input name="address_apt" placeholder="4B"
                          onFocus={() => setFocused('address_apt')} onBlur={() => setFocused(null)}
                          style={fieldStyle('address_apt')} />
                      </div>
                      <div>
                        <label style={labelStyle('city')}>City</label>
                        <select name="address_city" value={city} onChange={e => setCity(e.target.value)}
                          onFocus={() => setFocused('city')} onBlur={() => setFocused(null)}
                          style={{ ...fieldStyle('city'), appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23bbb' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center', paddingRight: '24px' }}>
                          {MONTREAL_AREA_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle('address_postal')}>Postal code</label>
                        <input name="address_postal" placeholder="H2X 1Y4"
                          onFocus={() => setFocused('address_postal')} onBlur={() => setFocused(null)}
                          style={fieldStyle('address_postal', !!fieldErrors.address_postal)} />
                        {errorText('address_postal')}
                      </div>
                    </div>
                    <p style={{ marginTop: '20px', fontSize: '13px', color: '#e85d04' }}>Estimated delivery: <strong>35–45 minutes</strong></p>
                  </div>
                ) : (
                  <div style={{ marginBottom: '56px', borderLeft: '3px solid #1a1a1a', paddingLeft: '24px' }}>
                    <p style={{ fontWeight: 600, fontSize: '15px', color: '#1a1a1a', marginBottom: '6px' }}>1420 Rue Peel, Montréal, QC H3A 1S8</p>
                    <p style={{ color: '#e85d04', fontSize: '13px' }}>Ready in: <strong>20–25 minutes</strong></p>
                  </div>
                )}

                {sectionLabel('Payment method')}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: fieldErrors.payment_method ? '8px' : '56px' }}>
                  {PAYMENT_METHODS.map(pm => (
                    <div key={pm.id} onClick={() => setPaymentMethod(pm.id)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '20px 24px',
                        border: `1.5px solid ${paymentMethod === pm.id ? '#1a1a1a' : '#e8e0d5'}`,
                        background: paymentMethod === pm.id ? '#1a1a1a' : 'transparent',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', color: paymentMethod === pm.id ? '#fff' : '#1a1a1a' }}>{pm.name}</div>
                        <div style={{ fontSize: '12px', color: paymentMethod === pm.id ? 'rgba(255,255,255,0.6)' : '#bbb', marginTop: '4px' }}>{pm.desc}</div>
                      </div>
                      {paymentMethod === pm.id && <span style={{ color: '#fff', fontWeight: 700 }}>✓</span>}
                    </div>
                  ))}
                </div>
                {fieldErrors.payment_method && <p style={{ fontSize: '12px', color: '#e85d04', marginBottom: '48px' }}>{fieldErrors.payment_method}</p>}

                {sectionLabel('Special instructions')}
                <div style={{ marginBottom: '56px' }}>
                  <textarea name="special_instructions" rows={4} placeholder="No onions, extra spicy, lactose-free…"
                    onFocus={() => setFocused('special_instructions')} onBlur={() => setFocused(null)}
                    style={{ ...fieldStyle('special_instructions'), resize: 'none', lineHeight: 1.7 }} />
                </div>

                <button type="submit" disabled={loading}
                  style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '12px', background: '#1a1a1a', color: '#fff', padding: '18px 48px', border: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", opacity: loading ? 0.6 : 1, transition: 'background 0.2s' }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#e85d04' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a' }}>
                  {loading ? 'Placing order' : `Place order — $${total.toFixed(2)} CAD`} <span style={{ fontSize: '18px' }}>→</span>
                </button>
                <p style={{ fontSize: '12px', color: '#bbb', marginTop: '16px' }}>Secured · 256-bit SSL encryption</p>
              </div>

              <div style={{ position: 'sticky', top: '130px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', marginBottom: '28px' }}>Order summary</p>

                {cart.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f0ece4' }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt={item.name} style={{ width: '52px', height: '52px', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#1a1a1a', color: '#fff', fontSize: '10px', fontWeight: 700, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.qty}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: '#bbb' }}>${item.price.toFixed(2)} each</div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#1a1a1a' }}>${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                ))}

                <div style={{ marginTop: '28px' }}>
                  <label style={labelStyle('promo')}>Promo code</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      value={promoCode}
                      onChange={e => { setPromoCode(e.target.value); setPromoMsg('') }}
                      onFocus={() => setFocused('promo')} onBlur={() => setFocused(null)}
                      placeholder="e.g. BISTRO10"
                      style={{ ...fieldStyle('promo'), flex: 1 }}
                    />
                    <button type="button" onClick={handleApplyPromo} disabled={promoLoading}
                      style={{ background: 'transparent', border: '1.5px solid #1a1a1a', color: '#1a1a1a', padding: '0 18px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', height: '42px' }}>
                      {promoLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                  {promoMsg && (
                    <p style={{ fontSize: '12px', marginTop: '8px', color: promoOk ? '#2e7d32' : '#e85d04' }}>{promoMsg}</p>
                  )}
                </div>

                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#888' }}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#2e7d32' }}><span>Discount</span><span>−${discount.toFixed(2)}</span></div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#888' }}><span>Delivery</span><span>{delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#888' }}><span>Taxes (14.975%)</span><span>${taxes.toFixed(2)}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1.5px solid #1a1a1a', fontSize: '20px', fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
                    <span>Total</span><span style={{ color: '#e85d04' }}>${total.toFixed(2)}</span>
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