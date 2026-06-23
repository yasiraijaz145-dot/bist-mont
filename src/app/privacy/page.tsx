// src/app/privacy/page.tsx
import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Bistro Montréal.',
}

export default function PrivacyPage() {
  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px', background: '#fff' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 40px 120px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#6e2a32', marginBottom: '20px' }}>Legal</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#1c1815', marginBottom: '12px' }}>Privacy Policy</h1>
          <p style={{ fontSize: '14px', color: '#bbb', marginBottom: '48px' }}>Last updated: {new Date().getFullYear()}</p>

          {[
            {
              title: 'Information We Collect',
              body: 'We collect information you provide directly to us when making reservations, placing orders, or contacting us — including your name, email address, phone number, and payment information. We also collect usage data through standard web analytics.',
            },
            {
              title: 'How We Use Your Information',
              body: 'We use your information to process reservations and orders, send confirmation emails, respond to inquiries, and — with your consent — send you promotional offers and seasonal menu updates via newsletter.',
            },
            {
              title: 'Newsletter & Marketing',
              body: 'If you subscribe to our newsletter, your email is used solely for sending Bistro Montréal updates. You can unsubscribe at any time by clicking the unsubscribe link in any email. We do not sell your email address to third parties.',
            },
            {
              title: 'Data Sharing',
              body: 'We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers (payment processors, email platforms) who assist in operating our website, under strict confidentiality agreements.',
            },
            {
              title: 'Cookies',
              body: 'Our site uses essential cookies to maintain your session and cart. We use analytics cookies to understand how visitors use the site. You can disable cookies in your browser settings, though some features may not function correctly.',
            },
            {
              title: 'Your Rights',
              body: 'Under PIPEDA (Canada) and applicable provincial law, you have the right to access, correct, or delete your personal information. To exercise these rights, contact us at hello@bistromontreal.com.',
            },
            {
              title: 'Contact',
              body: 'For any privacy-related questions, contact us at hello@bistromontreal.com or write to us at 1420 Rue Peel, Montréal, QC H3A 1S8.',
            },
          ].map(({ title, body }) => (
            <div key={title} style={{ marginBottom: '40px' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#1c1815', marginBottom: '12px' }}>{title}</h2>
              <p style={{ fontSize: '15px', color: '#6f6358', lineHeight: 1.8 }}>{body}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}