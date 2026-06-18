import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const TEAM = [
  { name: 'Antoine Mercier', role: 'Executive Chef', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&q=80' },
  { name: 'Sophie Lavigne', role: 'Pastry Chef', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80' },
  { name: 'Marcus Chen', role: 'Sous Chef', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Isabelle Fontaine', role: 'Head Sommelier', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80' },
]

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <main style={{ paddingTop: '110px' }}>
        <section style={{ background: '#f9f5f0', padding: '80px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#e85d04', fontWeight: 700 }}>Our Story</span>
                <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(2rem,4vw,3.5rem)', margin: '16px 0', color: '#1a1a1a' }}>Passion on Every Plate</h1>
                <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '16px' }}>Founded in 2009 by Executive Chef Antoine Mercier, Bistro Montréal began as a 28-seat neighbourhood dining room on Rue Peel. Today it&apos;s one of Montréal&apos;s most beloved culinary destinations.</p>
                <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '16px' }}>We source from over 15 local Québec farms. Every menu changes seasonally to honour what the land gives us.</p>
                <blockquote style={{ borderLeft: '4px solid #e85d04', paddingLeft: '20px', fontStyle: 'italic', color: '#1a1a1a', fontSize: '1.1rem', margin: '24px 0' }}>
                  &ldquo;Cooking is the most intimate form of art. Every dish is a letter to the people sitting at my table.&rdquo; — Chef Antoine
                </blockquote>
                <Link href="/reservations" style={{ display: 'inline-block', background: '#e85d04', color: '#fff', padding: '14px 32px', borderRadius: '8px', fontWeight: 700, marginTop: '8px' }}>
                  Reserve a Table
                </Link>
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=700&q=80" alt="Chef Antoine" style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', aspectRatio: '4/5' }} />
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 0' }}>
          <div className="container">
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '2.5rem', textAlign: 'center', marginBottom: '48px', color: '#1a1a1a' }}>Our Team</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '32px' }}>
              {TEAM.map(m => (
                <div key={m.name} style={{ textAlign: 'center' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.img} alt={m.name} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 12px', border: '3px solid #e85d04' }} />
                  <div style={{ fontWeight: 700, color: '#1a1a1a' }}>{m.name}</div>
                  <div style={{ fontSize: '12px', color: '#e85d04', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
