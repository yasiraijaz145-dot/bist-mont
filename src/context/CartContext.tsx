'use client'
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export type CartItem = {
  id: number
  name: string
  price: number
  img: string
  qty: number
}

type CartCtx = {
  cart: CartItem[]
  addToCart: (id: number, name: string, price: number, img: string) => void
  changeQty: (idx: number, delta: number) => void
  removeItem: (idx: number) => void
  cartCount: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('bm_cart')
      if (saved) setCart(JSON.parse(saved))
    } catch {}
  }, [])

  const save = (c: CartItem[]) => {
    setCart(c)
    try { sessionStorage.setItem('bm_cart', JSON.stringify(c)) } catch {}
  }

  const addToCart = useCallback((id: number, name: string, price: number, img: string) => {
    setCart(prev => {
      const next = [...prev]
      const existing = next.find(i => i.id === id)
      if (existing) existing.qty++
      else next.push({ id, name, price, img, qty: 1 })
      try { sessionStorage.setItem('bm_cart', JSON.stringify(next)) } catch {}
      return next
    })
    setIsOpen(true)
  }, [])

  const changeQty = useCallback((idx: number, delta: number) => {
    setCart(prev => {
      const next = [...prev]
      next[idx].qty += delta
      if (next[idx].qty <= 0) next.splice(idx, 1)
      try { sessionStorage.setItem('bm_cart', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const removeItem = useCallback((idx: number) => {
    setCart(prev => {
      const next = prev.filter((_, i) => i !== idx)
      try { sessionStorage.setItem('bm_cart', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      cart, addToCart, changeQty, removeItem,
      cartCount, subtotal,
      isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
