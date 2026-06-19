'use client'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartPanel() {
  const { cart, changeQty, removeItem, subtotal, isOpen, closeCart } = useCart()

  return (
    <>
      <div className={`cart-overlay${isOpen ? ' open' : ''}`} onClick={closeCart} />
      <aside className={`cart-panel${isOpen ? ' open' : ''}`}>
        <div className="cart-panel-header">
          <h3>Your Order</h3>
          <button className="cart-close" onClick={closeCart} aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="cart-panel-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-icon">🛒</div>
              <p>Your cart is empty</p>
              <button
                onClick={closeCart}
                style={{ background: 'var(--orange)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div className="cart-item-row" key={idx}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="cart-item-img"
                  src={item.img}
                  alt={item.name}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=120&q=60' }}
                />
                <div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
                </div>
                <div className="cart-item-controls">
                  <div className="qty-row">
                    <button className="qty-btn" onClick={() => changeQty(idx, -1)} aria-label="Decrease quantity">−</button>
                    <span className="qty-val">{item.qty}</span>
                    <button className="qty-btn" onClick={() => changeQty(idx, 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(idx)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-panel-footer">
            <div className="cart-subtotal-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link href="/cart" className="btn-checkout" onClick={closeCart}>
              View Full Cart &amp; Checkout →
            </Link>
            <span className="btn-view-cart" onClick={closeCart} style={{ cursor: 'pointer' }}>
              Continue Shopping
            </span>
          </div>
        )}
      </aside>
    </>
  )
}