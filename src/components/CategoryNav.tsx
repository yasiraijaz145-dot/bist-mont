'use client'
import { useEffect, useState, useRef } from 'react'
 
const CAT_ICONS: Record<string, string> = {
  starters: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=120&q=80',
  mains:    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&q=80',
  burgers:  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=120&q=80',
  pizza:    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=120&q=80',
  pasta:    'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=120&q=80',
  salads:   'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&q=80',
  desserts: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=120&q=80',
  drinks:   'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=120&q=80',
  specials: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=120&q=80',
}
 
export default function CategoryNav({
  categories,
  labels,
}: {
  categories: string[]
  labels: Record<string, string>
}) {
  const [active, setActive] = useState(categories[0] ?? '')
  const navRef = useRef<HTMLDivElement>(null)
 
  // Scroll-spy: highlight active category as user scrolls
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('cat-', '')
            setActive(id)
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    categories.forEach((cat) => {
      const el = document.getElementById(`cat-${cat}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [categories])
 
  // Auto-scroll the nav pill into view when active changes
  useEffect(() => {
    const nav  = navRef.current
    const pill = nav?.querySelector(`[data-cat="${active}"]`) as HTMLElement | null
    if (nav && pill) {
      const navLeft   = nav.scrollLeft
      const navRight  = navLeft + nav.clientWidth
      const pillLeft  = pill.offsetLeft
      const pillRight = pillLeft + pill.offsetWidth
      if (pillLeft < navLeft + 16)       nav.scrollTo({ left: pillLeft - 16, behavior: 'smooth' })
      else if (pillRight > navRight - 16) nav.scrollTo({ left: pillRight - nav.clientWidth + 16, behavior: 'smooth' })
    }
  }, [active])
 
  function scrollTo(cat: string) {
    setActive(cat)
    const el = document.getElementById(`cat-${cat}`)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 200
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }
 
  return (
    <>
      <style>{`
        .icon-cat-nav {
          position: sticky;
          top: 110px;
          z-index: 900;
          background: #ffffff;
          border-bottom: 1px solid #f0e8df;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
        }
        .icon-cat-nav-inner {
          display: flex;
          align-items: stretch;
          overflow-x: auto;
          scrollbar-width: none;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 8px;
          gap: 2px;
        }
        .icon-cat-nav-inner::-webkit-scrollbar { display: none; }
 
        .icon-cat-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          padding: 14px 18px 10px;
          cursor: pointer;
          border: none;
          background: none;
          min-width: 80px;
          position: relative;
          border-bottom: 3px solid transparent;
          transition: border-color 0.2s;
          text-decoration: none;
          flex-shrink: 0;
        }
        .icon-cat-pill:hover .pill-img-wrap {
          background: #fff2e8;
          transform: scale(1.05);
        }
        .icon-cat-pill.active {
          border-bottom-color: #e85d04;
        }
        .icon-cat-pill.active .pill-img-wrap {
          background: #fff2e8;
          outline: 2.5px solid #e85d04;
          outline-offset: 2px;
        }
        .icon-cat-pill.active .pill-label {
          color: #e85d04;
          font-weight: 700;
        }
        .pill-img-wrap {
          width: 58px;
          height: 58px;
          border-radius: 16px;
          overflow: hidden;
          background: #f5ede6;
          transition: background 0.2s, transform 0.2s, outline 0.15s;
          flex-shrink: 0;
        }
        .pill-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pill-label {
          font-size: 11px;
          font-weight: 600;
          color: #666;
          letter-spacing: 0.3px;
          white-space: nowrap;
          text-align: center;
          transition: color 0.2s;
          text-transform: none;
        }
 
        @media (max-width: 600px) {
          .icon-cat-pill { min-width: 66px; padding: 10px 10px 8px; }
          .pill-img-wrap { width: 48px; height: 48px; border-radius: 12px; }
          .pill-label { font-size: 10px; }
        }
      `}</style>
 
      <nav className="icon-cat-nav" aria-label="Menu categories">
        <div className="icon-cat-nav-inner" ref={navRef}>
          {categories.map((cat) => (
            <button
              key={cat}
              data-cat={cat}
              className={`icon-cat-pill${active === cat ? ' active' : ''}`}
              onClick={() => scrollTo(cat)}
              aria-label={`Jump to ${labels[cat] ?? cat}`}
            >
              <div className="pill-img-wrap">
                <img
                  src={CAT_ICONS[cat] ?? 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=120&q=80'}
                  alt=""
                  loading="lazy"
                />
              </div>
              <span className="pill-label">{labels[cat] ?? cat}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
 