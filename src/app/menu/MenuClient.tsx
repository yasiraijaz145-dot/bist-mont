'use client'
import { useState, useEffect } from 'react'
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
  { key: 'vegan', label: '🌱 Vegan' },
  { key: 'gluten-free', label: 'GF Gluten-Free' },
  { key: 'spicy', label: '🌶️ Spicy' },
  { key: 'chefs-pick', label: '⭐ Chef\'s Pick' },
]

export default function MenuClient({ menuByCategory }: { menuByCategory: Record<string, MenuItem[]> }) {
  const [activeFilter, setActiveFilter] = useState('')
  const [showBackTop, setShowBackTop] = useState(false)

  useEffect(() => {
    const handler = () => setShowBackTop(window.scrollY > 600)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const filtered: Record<string, MenuItem[]> = {}
  for (const [cat, items] of Object.entries(menuByCategory)) {
    const f = activeFilter
      ? items.filter(i => (i.tags || '').split(',').map(t => t.trim()).includes(activeFilter))
      : items
    if (f.length) filtered[cat] = f
  }

  return (
    <>
      {/* Filter bar */}
      <div style={{ position: 'sticky', top: '110px', zIndex: 800, background: '#fff', borderBottom: '1px solid #f0e8df', padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
            >{label}</button>
          ))}
        </div>
      </div>

      <main style={{ paddingTop: '20px', minHeight: '80vh' }}>
        {Object.keys(filtered).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px', color: '#888' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🍽️</div>
            <p style={{ fontSize: '16px' }}>No items match this filter.</p>
          </div>
        ) : (
          Object.entries(filtered).map(([cat, items]) => (
            <MenuSection key={cat} cat={cat} label={CAT_LABELS[cat] ?? cat.toUpperCase()} items={items} />
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