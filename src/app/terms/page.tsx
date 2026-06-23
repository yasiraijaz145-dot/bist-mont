import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Bistro Montréal.',
}

export default function TermsPage() {
  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px', background: '#fff' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 40px 120px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#6e2a32', marginBottom: '20px' }}>Legal</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#1c1815', marginBottom: '12px' }}>Terms of Service</h1>
          <p style={{ fontSize: '14px', color: '#bbb', marginBottom: '48px' }}>Last updated: {new Date().getFullYear()}</p>

          {[
            {
              title: 'Reservations',
              body: 'Reservations are confirmed upon receipt of a confirmation email. We hold tables for 15 minutes past the reserved time. For parties of 6 or more, a credit card may be required to secure the booking. Cancellations must be made at least 24 hours in advance.',
            },
            {
              title: 'Online Orders',
              body: 'All online orders are subject to availability. Prices displayed are in Canadian dollars and include applicable taxes. We reserve the right to refuse or cancel orders at our discretion.',
            },
            {
              title: 'Gift Cards',
              body: 'Gift cards are non-refundable and cannot be exchanged for cash. Lost or stolen gift cards cannot be replaced. Gift cards have no expiry date and can be used for dine-in, pickup, or delivery orders.',
            },
            {
              title: 'Dietary Information',
              body: 'While we take allergen information seriously and clearly label dietary items, our kitchen handles nuts, gluten, dairy, and other common allergens. Guests with severe allergies should inform their server before ordering. We cannot guarantee a completely allergen-free environment.',
            },
            {
              title: 'Intellectual Property',
              body: 'All content on this website — including text, images, logos, and design — is the property of Bistro Montréal and may not be reproduced without written permission.',
            },
            {
              title: 'Limitation of Liability',
              body: 'Bistro Montréal is not liable for any indirect, incidental, or consequential damages arising from the use of this website or our services. Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.',
            },
            {
              title: 'Governing Law',
              body: 'These terms are governed by the laws of the Province of Québec and the federal laws of Canada applicable therein.',
            },
            {
              title: 'Contact',
              body: 'For questions about these terms, contact us at hello@bistromontreal.com.',
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