'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

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

  const goTo = (n: number) => setCurrent(((n % total) + total) % total)

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 4000)
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
          <div key={i} className={`hero-slide slide-${i + 1}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.img} alt={slide.item} />
            <div
              className="hero-slide-content"
              style={{ background: `linear-gradient(to right, ${slide.bg}ee 35%, ${slide.bg}88 60%, transparent 85%)` }}
            >
              <div className="slide-tag">{slide.tag}</div>
              <h2>
                {slide.title.split('\n').map((line, j, arr) => (
                  <span key={j} className={j === arr.length - 1 ? 'slide-title-accent' : undefined}>{line}<br /></span>
                ))}
              </h2>
              <p className="slide-sub">{slide.sub}</p>

              <div className="slide-cta-row" style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
                <Link
                  href="/reservations"
                  style={{
                    display: 'inline-block',
                    background: '#fff',
                    color: '#1c1815',
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
                </Link>
                <Link
                  href="/menu"
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
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-arrow prev" onClick={() => goTo(current - 1)} aria-label="Previous slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button className="slider-arrow next" onClick={() => goTo(current + 1)} aria-label="Next slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <div className="slider-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`slider-dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}