'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

type Slide = {
  bg: string
  img: string
  tag: string
  title: string
  sub: string
  item: string
  link: string
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = slides.length
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((n: number) => {
    setCurrent(((n % total) + total) % total)
  }, [total])

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setCurrent(c => ((c + 1) % total))
    }, 4000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [paused, total])

  return (
    <section
      className="hero-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Featured dishes slideshow"
    >
      <div
        className="hero-slides"
        style={{ transform: `translateX(-${current * (100 / total)}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="hero-slide"
            onClick={() => window.location.href = slide.link}
            aria-label={`${slide.item} — ${slide.sub}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.img} alt={slide.item} />
            <div
              className="hero-slide-content"
              style={{ background: `linear-gradient(to right, ${slide.bg}ee 35%, ${slide.bg}88 60%, transparent 85%)` }}
            >
              <div className="slide-tag">{slide.tag}</div>
              <h2>{slide.title.split('\n').map((line, j) => (
                <span key={j}>{line}<br /></span>
              ))}</h2>
              <p className="slide-sub">{slide.sub}</p>

              {/* CTA buttons on slide */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
                <a
                  href="/reservations"
                  onClick={e => e.stopPropagation()}
                  style={{
                    display: 'inline-block',
                    background: '#fff',
                    color: '#1a1a1a',
                    padding: '12px 24px',
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '4px',
                  }}
                >
                  Reserve a Table
                </a>
                <a
                  href="/menu"
                  onClick={e => e.stopPropagation()}
                  style={{
                    display: 'inline-block',
                    background: 'transparent',
                    color: '#fff',
                    padding: '12px 24px',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    border: '2px solid rgba(255,255,255,0.6)',
                  }}
                >
                  View Menu
                </a>
              </div>

              <div className="slide-name">{slide.item}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      <button
        className="slider-arrow prev"
        onClick={() => goTo(current - 1)}
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button
        className="slider-arrow next"
        onClick={() => goTo(current + 1)}
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Dots + pause */}
      <div className="slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
          />
        ))}

        {/* Pause / Play button — WCAG 2.2 requirement for auto-playing content */}
        <button
          onClick={() => setPaused(p => !p)}
          aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
          style={{
            width: '28px',
            height: '8px',
            borderRadius: '4px',
            background: 'rgba(255,255,255,0.4)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            marginLeft: '4px',
            flexShrink: 0,
          }}
        >
          {paused ? (
            /* Play icon */
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          ) : (
            /* Pause icon */
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          )}
        </button>
      </div>
    </section>
  )
}