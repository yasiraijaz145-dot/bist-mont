import { getDB, MenuItem } from '@/lib/db'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import HeroSlider from '@/components/HeroSlider'
import MenuSection from '@/components/MenuSection'
import ToastContainer from '@/components/Toast'
import Link from 'next/link'

export const metadata = {
  title: 'Bistro Montréal — Fine French-Inspired Dining',
  description: 'French-inspired cuisine crafted from the finest local Québec ingredients. Fine dining in the heart of Montréal since 2009.',
}

const CATEGORIES = ['starters','mains','burgers','pizza','pasta','salads','desserts','drinks','specials']
const CAT_LABELS: Record<string,string> = {
  starters:'STARTERS', mains:'MAINS', burgers:'BURGERS',
  pizza:'PIZZA', pasta:'PASTA', salads:'SALADS',
  desserts:'DESSERTS', drinks:'DRINKS', specials:'SPECIALS'
}

const SLIDES = [
  { bg: '#6e2a32', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400&q=85', tag: 'NEW ARRIVAL', title: 'Bold, Rich\nUnforgettable', sub: 'A Wagyu experience crafted for those who demand the extraordinary', item: 'TRUFFLE ROYALE', link: '#cat-burgers' },
  { bg: '#8a3540', img: 'https://images.unsplash.com/photo-1604604994333-f1b0e9471186?w=1400&q=85', tag: "CHEF'S SPECIAL", title: 'Big Flavor\nLives Inside', sub: 'French duck breast perfected with cherry gastrique', item: 'MAGRET DE CANARD', link: '#cat-mains' },
  { bg: '#4f1d23', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1400&q=85', tag: 'FRESH TODAY', title: 'Where Fresh\nLayers Meet', sub: 'Pan-roasted Atlantic salmon with beurre blanc', item: 'SAUMON ATLANTIQUE', link: '#cat-mains' },
]

const PRESS = ['Le Devoir', 'Montréal Gazette', 'Food & Wine', 'Condé Nast Traveller', 'CBC Arts']

const TESTIMONIALS = [
  { quote: 'The most memorable meal I had in Montréal. Every course told a story.', author: 'Sarah K.', source: 'Google Reviews' },
  { quote: 'Duck breast by Chef Mercier is a masterclass in French technique with a Québec soul.', author: 'Marc D.', source: 'Yelp' },
  { quote: 'Impeccable service, stunning ambiance, and food that made us forget we were in a restaurant.', author: 'Priya T.', source: 'TripAdvisor' },
]

async function getMenuByCategory(): Promise<Record<string, MenuItem[]>> {
  try {
    const db = getDB()
    const result: Record<string, MenuItem[]> = {}
    for (const cat of CATEGORIES) {
      const [rows] = await db.execute(
        'SELECT * FROM menu_items WHERE category=? AND is_available=1 ORDER BY sort_order LIMIT 6',
        [cat]
      ) as [MenuItem[], unknown]
      if (rows.length) result[cat] = rows
    }
    return result
  } catch {
    return {}
  }
}

export default async function HomePage() {
  const menuByCategory = await getMenuByCategory()

  return (
    <>
      <TopBar />

      <HeroSlider slides={SLIDES} />

      <div style={{ background: '#f7f2ec', borderTop: '1px solid #ddd2c4', borderBottom: '1px solid #ddd2c4', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb', whiteSpace: 'nowrap' }}>As seen in</span>
          {PRESS.map(pub => (
            <span key={pub} style={{ fontSize: '14px', fontWeight: 700, color: '#ccc', letterSpacing: '0.5px', fontFamily: "'Playfair Display', serif" }}>{pub}</span>
          ))}
        </div>
      </div>

      {/* Category nav bar — only render when there's actually menu data, otherwise
          this sticky bar collapses to just its border line and "floats" over content
          while scrolling. */}
      {Object.keys(menuByCategory).length > 0 && (
        <nav className="category-nav-bar" id="menu-start">
          <div className="category-nav-inner">
            {Object.keys(menuByCategory).map(cat => (
              <a key={cat} className="cat-nav-btn" href={`#cat-${cat}`}>
                {CAT_LABELS[cat] ?? cat.toUpperCase()}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Menu sections */}
      <main className="menu-section">
        {Object.entries(menuByCategory).map(([cat, items]) => (
          <MenuSection key={cat} cat={cat} label={CAT_LABELS[cat] ?? cat.toUpperCase()} items={items} />
        ))}
      </main>

      {/* About teaser */}
      <section style={{ background: '#1c1815', padding: '100px 0' }}>
        <div className="about-teaser-grid">
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#6e2a32', marginBottom: '20px' }}>Our Story</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px' }}>
              Rooted in Québec,<br />
              <em style={{ color: '#6e2a32' }}>inspired by Paris.</em>
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '16px', maxWidth: '480px' }}>
              Chef Antoine Mercier founded Bistro Montréal in 2009 with a singular vision: to bring the precision of French technique to the remarkable produce of Québec&apos;s farms and waters.
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '480px' }}>
              Every plate reflects a partnership with over 15 local farms. Every detail — from the hand-lettered menus to the curated wine list — is considered.
            </p>
            <Link href="/about" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              color: '#6e2a32',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderBottom: '1px solid #6e2a32',
              paddingBottom: '2px',
            }}>
              Meet the team →
            </Link>
          </div>
          <div className="about-teaser-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85"
              alt="Chef at work"
            />
            <div className="about-teaser-badge">
              <div className="badge-num">15+</div>
              <div className="badge-label">Local Farm Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section style={{ background: '#f7f2ec', borderTop: '4px solid #6e2a32' }}>
        <div className="stats-grid" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {[
            { stat: '2009', label: 'Founded' },
            { stat: '4.8★', label: 'Guest Rating' },
            { stat: '15+', label: 'Farm Partners' },
            { stat: '7', label: 'Course Tasting Menu' },
          ].map(({ stat, label }) => (
            <div key={label} style={{ padding: '48px 32px', textAlign: 'center', borderRight: '1px solid #ddd2c4' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', fontWeight: 700, color: '#6e2a32', marginBottom: '8px' }}>{stat}</div>
              <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#8a7d6e' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: '#fff', padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#6e2a32', textAlign: 'center', marginBottom: '16px' }}>Guest Voices</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1c1815', textAlign: 'center', marginBottom: '60px' }}>
            What our guests say
          </h2>
          <div className="testimonials-grid" style={{ gap: '32px' }}>
            {TESTIMONIALS.map(({ quote, author, source }) => (
              <div key={author} style={{ padding: '40px 32px', background: '#f7f2ec', position: 'relative' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '5rem', color: '#6e2a32', lineHeight: 0.6, marginBottom: '24px', opacity: 0.4 }}>&ldquo;</div>
                <p style={{ fontSize: '16px', color: '#1c1815', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '24px' }}>{quote}</p>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1c1815' }}>{author}</div>
                <div style={{ fontSize: '11px', color: '#bbb', marginTop: '2px' }}>{source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA band */}
      <section style={{
        background: 'linear-gradient(135deg, #6e2a32 0%, #4f1d23 100%)',
        padding: '80px 40px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>Join Us Tonight</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>
          Your table is waiting.
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
          Reserve online in under a minute, or call us and we&apos;ll take care of everything.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/reservations" style={{
            background: '#fff',
            color: '#6e2a32',
            padding: '16px 40px',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '6px',
          }}>
            Reserve a Table
          </Link>
          <a href="tel:+15145550192" style={{
            background: 'transparent',
            color: '#fff',
            padding: '16px 40px',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '6px',
            border: '2px solid rgba(255,255,255,0.5)',
          }}>
            +1 (514) 555-0192
          </a>
        </div>
      </section>

      <Footer />
      <ToastContainer />
    </>
  )
}