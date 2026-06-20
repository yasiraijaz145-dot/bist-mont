'use client'
import { useState, useEffect, useRef } from 'react'
import MenuSection from '@/components/MenuSection'
import ToastContainer from '@/components/Toast'
import type { MenuItem } from '@/lib/db'

const CAT_LABELS: Record<string,string> = {
  starters:'Starters', mains:'Mains', burgers:'Burgers',
  pizza:'Pizza', pasta:'Pasta', salads:'Salads',
  desserts:'Desserts', drinks:'Drinks', specials:'Specials'
}

const FILTERS = [
  { key: '', label: 'All' },
  { key: 'vegan', label: 'V · Vegan' },
  { key: 'gluten-free', label: 'GF · Gluten-Free' },
  { key: 'spicy', label: 'S · Spicy' },
  { key: 'chefs-pick', label: "Chef's Pick" },
]

const LEGEND = [
  { badge: 'V', label: 'Vegan', desc: 'No animal products' },
  { badge: 'GF', label: 'Gluten-Free', desc: 'No gluten-containing ingredients' },
  { badge: 'S', label: 'Spicy', desc: 'Contains chili heat' },
  { badge: 'CP', label: "Chef's Pick", desc: "Antoine's personal recommendation" },
]

export default function MenuClient({ menuByCategory }: { menuByCategory: Record<string, MenuItem[]> }) {
  const [activeFilter, setActiveFilter] = useState('')
  const [showBackTop, setShowBackTop] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [showLegend, setShowLegend] = useState(false)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  // Back-to-top visibility
  useEffect(() => {
    const handler = () => setShowBackTop(window.scrollY > 600)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Scroll-spy: highlight the category nav button for the section in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id.replace('cat-', ''))
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [menuByCategory])

  const filtered: Record<string, MenuItem[]> = {}
  for (const [cat, items] of Object.entries(menuByCategory)) {
    const f = activeFilter
      ? items.filter(i => (i.tags || '').split(',').map(t => t.trim()).includes(activeFilter))
      : items
    if (f.length) filtered[cat] = f
  }

  return (
    <>
      {/* Filter bar + legend toggle */}
      <div className="menu-filter-bar" style={{
        position: 'sticky',
        zIndex: 800,
        background: '#fff',
        borderBottom: '1px solid #f0e8df',
        padding: '18px 0',
      }}>
        <div className="container" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              style={{
                padding: '7px 16px',
                border: `1.5px solid ${activeFilter === key ? '#e85d04' : '#e8e0d5'}`,
                background: activeFilter === key ? '#e85d04' : 'transparent',
                color: activeFilter === key ? '#fff' : '#555',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          ))}

          {/* Legend toggle */}
          <button
            onClick={() => setShowLegend(v => !v)}
            style={{
              marginLeft: 'auto',
              padding: '7px 14px',
              border: '1.5px solid #e8e0d5',
              background: 'transparent',
              color: '#888',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
            </svg>
            Dietary key
          </button>
        </div>

        {/* Legend dropdown */}
        {showLegend && (
          <div className="container" style={{ paddingTop: '12px', paddingBottom: '4px' }}>
            <div style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              padding: '16px 20px',
              background: '#f9f5f0',
              borderRadius: '8px',
              border: '1px solid #e8e0d5',
            }}>
              {LEGEND.map(({ badge, label, desc }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '32px',
                    height: '24px',
                    padding: '0 6px',
                    background: '#1a1a1a',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 700,
                    borderRadius: '4px',
                  }}>
                    {badge}
                  </span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#1a1a1a' }}>{label}</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category scroll-spy nav — synced with IntersectionObserver */}
      {!activeFilter && (
        <div className="menu-cat-nav" style={{
          position: 'sticky',
          zIndex: 799,
          background: '#f9f5f0',
          borderBottom: '1px solid #e8e0d5',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          <div className="container" style={{ display: 'flex', gap: '0', minWidth: 'max-content' }}>
            {Object.keys(menuByCategory).map(cat => (
              <a
                key={cat}
                href={`#cat-${cat}`}
                style={{
                  padding: '10px 18px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: activeSection === cat ? '#e85d04' : '#888',
                  textDecoration: 'none',
                  borderBottom: `2px solid ${activeSection === cat ? '#e85d04' : 'transparent'}`,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                {CAT_LABELS[cat] ?? cat}
              </a>
            ))}
          </div>
        </div>
      )}

      <main style={{ paddingTop: '20px', minHeight: '80vh' }}>
        {Object.keys(filtered).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px', color: '#888' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🍽️</div>
            <p style={{ fontSize: '16px' }}>No items match this filter.</p>
            <button
              onClick={() => setActiveFilter('')}
              style={{ marginTop: '16px', padding: '10px 24px', background: '#e85d04', color: '#fff', border: 'none', borderRadius: '20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
            >
              Show all items
            </button>
          </div>
        ) : (
          Object.entries(filtered).map(([cat, items]) => (
            <div
              key={cat}
              ref={(el) => { sectionRefs.current[cat] = el }}
              id={`cat-${cat}`}
            >
              <MenuSection cat={cat} label={CAT_LABELS[cat] ?? cat.toUpperCase()} items={items} />
            </div>
          ))
        )}
      </main>

      {/* Back to top */}
      {showBackTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          style={{
            position: 'fixed', bottom: '32px', right: '32px', zIndex: 999,
            width: '48px', height: '48px', borderRadius: '50%',
            background: '#1a1a1a', color: '#fff', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#e85d04')}
          onMouseLeave={e => (e.currentTarget.style.background = '#1a1a1a')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}

      <ToastContainer />
    </>
  )
}