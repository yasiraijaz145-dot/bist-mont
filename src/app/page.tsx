import { getDB, MenuItem } from '@/lib/db'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import HeroSlider from '@/components/HeroSlider'
import MenuSection from '@/components/MenuSection'
import ToastContainer from '@/components/Toast'

const CATEGORIES = ['starters','mains','burgers','pizza','pasta','salads','desserts','drinks','specials']
const CAT_LABELS: Record<string,string> = {
  starters:'STARTERS', mains:'MAINS', burgers:'BURGERS',
  pizza:'PIZZA', pasta:'PASTA', salads:'SALADS',
  desserts:'DESSERTS', drinks:'DRINKS', specials:'SPECIALS'
}

const SLIDES = [
  { bg: '#e85d04', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400&q=85', tag: 'NEW ARRIVAL', title: 'HUNGRY?\nATTACK IT\nWITH', sub: 'A bold bite, a vintage taste and a moment made to be savored', item: 'TRUFFLE ROYALE', link: '#cat-burgers' },
  { bg: '#ff6b35', img: 'https://images.unsplash.com/photo-1604604994333-f1b0e9471186?w=1400&q=85', tag: "CHEF'S SPECIAL", title: 'Big Flavor\nLives Inside', sub: 'French duck breast perfected with cherry gastrique', item: 'MAGRET DE CANARD', link: '#cat-mains' },
  { bg: '#c0392b', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1400&q=85', tag: 'FRESH TODAY', title: 'WHERE FRESH\nLAYERS MEET', sub: 'Pan-roasted Atlantic salmon with beurre blanc', item: 'SAUMON ATLANTIQUE', link: '#cat-mains' },
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

      {/* Category nav bar */}
      <nav className="category-nav-bar">
        <div className="category-nav-inner">
          {Object.keys(menuByCategory).map(cat => (
            <a key={cat} className="cat-nav-btn" href={`#cat-${cat}`}>
              {CAT_LABELS[cat] ?? cat.toUpperCase()}
            </a>
          ))}
        </div>
      </nav>

      {/* Menu sections */}
      <main className="menu-section">
        {Object.entries(menuByCategory).map(([cat, items]) => (
          <MenuSection key={cat} cat={cat} label={CAT_LABELS[cat] ?? cat.toUpperCase()} items={items} />
        ))}
      </main>

      <Footer />
      <ToastContainer />
    </>
  )
}
