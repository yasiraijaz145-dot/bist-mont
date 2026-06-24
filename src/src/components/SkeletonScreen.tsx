'use client'
import { useEffect, useState } from 'react'

export default function SkeletonScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading]   = useState(false)

  useEffect(() => {
    const handleLoad = () => {
      setFading(true)
      setTimeout(() => setVisible(false), 420)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      // Fallback — hide after 4 s even if load never fires
      const t = setTimeout(handleLoad, 4000)
      return () => { window.removeEventListener('load', handleLoad); clearTimeout(t) }
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`skeleton-wrap${fading ? ' fade-out' : ''}`}>
      {/* Header */}
      <div className="skel-header">
        <div className="skel skel-logo" />
        <div className="skel skel-nav" />
      </div>

      {/* Hero */}
      <div className="skel skel-hero" />

      {/* Trust bar */}
      <div className="skel-trust">
        {[1,2,3,4].map(i => <div key={i} className="skel skel-trust-item" />)}
      </div>

      {/* Two card rows */}
      {[1,2].map(section => (
        <div key={section} className="skel-cards-section">
          <div className="skel skel-section-title" />
          <div className="skel-cards-row">
            {[1,2,3,4].map(i => (
              <div key={i} className="skel-card">
                <div className="skel skel-card-img" />
                <div className="skel-card-body">
                  <div className="skel skel-card-title" />
                  <div className="skel skel-card-sub" />
                  <div className="skel skel-card-price" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}