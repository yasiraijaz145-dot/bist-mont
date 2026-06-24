'use client'
import { useCart } from '@/context/CartContext'
import { showToast } from '@/components/Toast'
import type { MenuItem } from '@/lib/db'

export default function MenuSection({ cat, label, items }: { cat: string; label: string; items: MenuItem[] }) {
  const { addToCart } = useCart()

  function handleAdd(item: MenuItem) {
    const img = item.image_url || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80'
    addToCart(item.id, item.name, Number(item.price), img)
    showToast(`${item.name} added to cart!`)
  }

  return (
    <section id={`cat-${cat}`} style={{ paddingTop: '20px', marginBottom: '60px' }}>
      <div className="section-header-giant">
        <h2>{label}</h2>
      </div>
      <div className="container">
        <div className="menu-items-row">
          {items.map(item => {
            const tags = (item.tags || '').split(',').map(t => t.trim()).filter(Boolean)
            const isPopular = tags.includes('chefs-pick')
            const imgUrl = item.image_url || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80'

            return (
              <div className="menu-card" key={item.id}>
                <div className="menu-card-img-wrap">
                  {isPopular && <span className="popular-badge">Popular</span>}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80' }}
                  />
                  <button
                    className="add-btn-circle"
                    onClick={e => { e.stopPropagation(); handleAdd(item) }}
                    aria-label="Add to cart"
                  >
                    +
                  </button>
                </div>
                <div className="menu-card-body">
                  <div className="menu-card-name">{item.name}</div>
                  <div className="menu-card-desc">{item.description}</div>
                  <div className="menu-card-footer">
                    <span className="menu-card-price">${Number(item.price).toFixed(2)}</span>
                    {tags.length > 0 && (
                      <span style={{ fontSize: '11px', color: '#888' }}>
                        {tags.map(t => t === 'vegan' ? '🌱' : t === 'spicy' ? '🌶️' : t === 'gluten-free' ? 'GF' : '').join(' ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
