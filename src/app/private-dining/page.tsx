import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Private Dining',
  description: 'Host your next corporate dinner, wedding reception, or celebration at Bistro Montréal. Exclusive private dining for groups of 10–80 guests.',
}

const SPACES = [
  {
    name: 'The Cellar Room',
    capacity: '10–24 guests',
    img: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80',
    desc: 'An intimate stone-walled space with a curated wine display. Perfect for small corporate dinners, anniversary celebrations, or tasting menus.',
    features: ['Private bar', 'Custom menu', 'A/V system', 'Natural lighting'],
  },
  {
    name: 'The Terrace',
    capacity: '20–50 guests',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    desc: 'Our seasonal outdoor terrace draped with Edison lighting and greenery. Available May–October for cocktail receptions and seated dinners.',
    features: ['Outdoor setting', 'Cocktail & seated formats', 'Heating available', 'Seasonal florals'],
  },
  {
    name: 'The Grand Salon',
    capacity: '40–80 guests',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    desc: 'Our full dining room available for exclusive buyout events. Floor-to-ceiling windows, custom lighting, and the full Bistro Montréal experience.',
    features: ['Full buyout', 'Bespoke menu', 'Live music option', 'Dedicated event staff'],
  },
]

const OCCASIONS = [
  'Corporate Dinners',
  'Wedding Receptions',
  'Birthday Celebrations',
  'Anniversary Dinners',
  'Graduation Parties',
  'Wine & Tasting Events',
]

export default function PrivateDiningPage() {
  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px', background: '#fff' }}>

        {/* Hero */}
        <section style={{ position: 'relative', height: '60vh', minHeight: '400px', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=85"
            alt="Private dining at Bistro Montréal"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '60px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#e85d04', marginBottom: '16px' }}>Private Dining</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: '16px' }}>
              Your event.<br />Our stage.
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '480px' }}>
              From intimate dinners to full buyouts — we handle every detail so you don&apos;t have to.
            </p>
          </div>
        </section>

        {/* Occasions */}
        <section style={{ background: '#f9f5f0', padding: '60px 0', borderBottom: '1px solid #e8e0d5' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#e85d04', textAlign: 'center', marginBottom: '28px' }}>Perfect for</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              {OCCASIONS.map((label) => (
                <div key={label} style={{ padding: '10px 22px', background: 'transparent', border: '1px solid #c8bfb5', fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px', color: '#555', fontFamily: "'DM Sans', sans-serif" }}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spaces */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 40px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#e85d04', textAlign: 'center', marginBottom: '16px' }}>Our Spaces</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1a1a1a', textAlign: 'center', marginBottom: '60px' }}>
            Choose your setting
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {SPACES.map(({ name, capacity, img, desc, features }, i) => (
              <div key={name} className={i % 2 === 1 ? 'space-row space-row-reverse' : 'space-row'}>
                <div className="space-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={name} style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }} />
                </div>
                <div className="space-text">
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#e85d04', marginBottom: '12px' }}>{capacity}</p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 4vw, 2rem)', fontWeight: 700, color: '#1a1a1a', marginBottom: '16px' }}>{name}</h3>
                  <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.7, marginBottom: '24px' }}>{desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {features.map(f => (
                      <span key={f} style={{ padding: '6px 14px', background: '#f9f5f0', border: '1px solid #e8e0d5', fontSize: '12px', fontWeight: 600, color: '#555' }}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA / Inquiry */}
        <section style={{ background: '#1a1a1a', padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#e85d04', marginBottom: '16px' }}>Get in Touch</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Ready to plan your event?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
            Our events team responds within 24 hours. Tell us your date, guest count, and vision — we&apos;ll handle the rest.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#e85d04', color: '#fff', padding: '16px 40px', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '4px' }}>
              Send an Inquiry
            </Link>
            <a href="tel:+15145550192" style={{ background: 'transparent', color: '#fff', padding: '16px 40px', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '4px', border: '2px solid rgba(255,255,255,0.3)' }}>
              +1 (514) 555-0192
            </a>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        .space-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .space-row-reverse {
          direction: rtl;
        }
        .space-row-reverse .space-img,
        .space-row-reverse .space-text {
          direction: ltr;
        }
        @media (max-width: 768px) {
          .space-row, .space-row-reverse {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
            gap: 28px !important;
          }
          .space-img img {
            height: 240px !important;
          }
        }
      `}</style>
    </>
  )
}