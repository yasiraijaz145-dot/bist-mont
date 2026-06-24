'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'

function ConfirmationContent() {
  const params = useSearchParams()
  const orderNum = params.get('order') || ''

  return (
    <div style={{ textAlign: 'center', padding: '80px 24px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '16px' }}>Order Confirmed!</h1>
      {orderNum && (
        <div style={{ background: '#fff8f5', border: '2px solid #e85d04', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Order Number</p>
          <p style={{ fontSize: '2rem', fontWeight: 900, color: '#e85d04' }}>{orderNum}</p>
        </div>
      )}
      <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '32px' }}>
        Thank you for your order! We&apos;ve received it and are preparing it with care. A confirmation email has been sent to you.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href={`/track?order=${orderNum}`} style={{ background: '#e85d04', color: '#fff', padding: '14px 28px', borderRadius: '8px', fontWeight: 700, display: 'inline-block' }}>
          Track Order →
        </Link>
        <Link href="/menu" style={{ background: '#f9f5f0', color: '#1a1a1a', padding: '14px 28px', borderRadius: '8px', fontWeight: 700, display: 'inline-block' }}>
          Order Again
        </Link>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '80px' }}>Loading...</div>}>
          <ConfirmationContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
