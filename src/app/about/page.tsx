import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Founded in 2009 by Chef Antoine Mercier. Discover the team, philosophy, and passion behind Bistro Montréal\'s fine French-inspired cuisine.',
  openGraph: {
    title: 'Our Story — Bistro Montréal',
    description: 'Founded in 2009 by Chef Antoine Mercier. Discover the team and philosophy behind Bistro Montréal.',
    images: [{ url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85' }],
  },
}

const GALLERY = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
]

const TEAM = [
  {
    name: 'Antoine Mercier',
    title: 'Executive Chef & Founder',
    img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80',
    bio: 'Trained at Le Cordon Bleu Paris and honed his craft under Alain Ducasse before returning to Québec to open Bistro Montréal in 2009. His philosophy: honour the ingredient.',
  },
  {
    name: 'Sophie Tremblay',
    title: 'Pastry Chef',
    img: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=400&q=80',
    bio: 'Sophie brings a decade of pâtisserie mastery from Lyon to every dessert. Her signature mille-feuille has been called "architectural poetry" by Le Devoir.',
  },
  {
    name: 'Jean-Philippe Roy',
    title: 'Sommelier',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'With certifications from the Court of Master Sommeliers, Jean-Philippe curates a cellar of 400+ labels with an emphasis on natural and biodynamic producers.',
  },
]

const PRESS = ['Le Devoir', 'Montréal Gazette', 'Food & Wine', 'Condé Nast Traveller', 'CBC Arts']

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px', background: '#fff' }}>

        {/* Hero */}
        <section style={{ position: 'relative', height: '70vh', minHeight: '480px', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=85"
            alt="Bistro Montréal dining room"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '60px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#6e2a32', marginBottom: '16px' }}>Est. 2009</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: '20px', letterSpacing: '-1px' }}>
              Our Story
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', maxWidth: '520px', lineHeight: 1.6 }}>
              A love letter to Québec, written in the language of French cuisine.
            </p>
          </div>
        </section>

        {/* Story section */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 40px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#6e2a32', marginBottom: '32px' }}>The Beginning</p>
          <p style={{ fontSize: '20px', color: '#1c1815', lineHeight: 1.8, marginBottom: '28px', fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
            In 2009, Chef Antoine Mercier left a celebrated career in Paris to come home to Montréal with a single ambition: to cook the food he grew up dreaming about.
          </p>
          <p style={{ fontSize: '17px', color: '#6f6358', lineHeight: 1.8, marginBottom: '28px' }}>
            He found a narrow building on Rue Peel, painted the walls white, sourced three local farmers willing to work with an unknown chef, and opened with fourteen tables. The reservation list filled within a week.
          </p>
          <p style={{ fontSize: '17px', color: '#6f6358', lineHeight: 1.8 }}>
            Fifteen years later, Bistro Montréal works with over fifteen Québec farms and producers, and the philosophy remains unchanged: let the season decide the menu.
          </p>

          {/* Pull quote */}
          <div style={{ margin: '64px 0', borderLeft: '4px solid #6e2a32', paddingLeft: '40px' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '4rem', color: '#6e2a32', lineHeight: 0.5, marginBottom: '20px', opacity: 0.5 }}>&ldquo;</div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontStyle: 'italic', color: '#1c1815', lineHeight: 1.4, marginBottom: '20px' }}>
              The best dish I can make is the one where the ingredient does the talking and I get out of the way.
            </p>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#6e2a32', letterSpacing: '1px' }}>— Antoine Mercier, Executive Chef</div>
          </div>
        </section>

        {/* Photo gallery */}
        <section style={{ background: '#f7f2ec', padding: '0' }}>
          <div className="about-gallery-grid">
            {GALLERY.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt={`Bistro Montréal ${i + 1}`}
                className={`about-gallery-img${i === 0 ? ' about-gallery-img-large' : ''}`}
              />
            ))}
          </div>
        </section>

        {/* Team */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 40px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#6e2a32', textAlign: 'center', marginBottom: '16px' }}>The People</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1c1815', textAlign: 'center', marginBottom: '60px' }}>
            Behind every plate
          </h2>
          <div className="about-team-grid">
            {TEAM.map(({ name, title, img, bio }) => (
              <div key={name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={name}
                  style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block', marginBottom: '24px', filter: 'grayscale(20%)' }}
                />
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#6e2a32', marginBottom: '6px' }}>{title}</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#1c1815', marginBottom: '12px' }}>{name}</h3>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7 }}>{bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Awards / Press */}
        <section style={{ background: '#1c1815', padding: '80px 0' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#6e2a32', textAlign: 'center', marginBottom: '16px' }}>Recognition</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '48px' }}>
              As seen in
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '48px', alignItems: 'center', marginBottom: '64px' }}>
              {PRESS.map(pub => (
                <div key={pub} style={{ fontSize: '18px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1px', fontFamily: "'Playfair Display', serif" }}>
                  {pub}
                </div>
              ))}
            </div>
            <div className="about-stats-grid">
              {[
                { stat: '2009', label: 'Founded' },
                { stat: '15+', label: 'Local farm partners' },
                { stat: '4.8★', label: 'Average guest rating' },
              ].map(({ stat, label }) => (
                <div key={label} style={{ padding: '40px 32px', textAlign: 'center', background: '#1c1815' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', fontWeight: 700, color: '#6e2a32', marginBottom: '8px' }}>{stat}</div>
                  <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reservation CTA */}
        <section style={{ background: '#f7f2ec', padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#6e2a32', marginBottom: '16px' }}>Join Us</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1c1815', marginBottom: '16px' }}>
            Come experience it for yourself.
          </h2>
          <p style={{ fontSize: '16px', color: '#8a7d6e', marginBottom: '40px' }}>
            Reservations open seven days a week from 5 PM.
          </p>
          <Link href="/reservations" style={{
            display: 'inline-block',
            background: '#1c1815',
            color: '#fff',
            padding: '16px 40px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            Reserve a Table →
          </Link>
        </section>

      </main>
      <Footer />
    </>
  )
}