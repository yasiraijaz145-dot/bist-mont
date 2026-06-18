'use client'
import { useState, useEffect, useCallback } from 'react'

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
  const total = slides.length

  const goTo = useCallback((n: number) => {
    setCurrent(((n % total) + total) % total)
  }, [total])

  useEffect(() => {
    const t = setInterval(() => goTo(current + 1), 3000)
    return () => clearInterval(t)
  }, [current, goTo])

  return (
    <section className="hero-slider">
      <div className="hero-slides" style={{ transform: `translateX(-${current * (100 / total)}%)` }}>
        {slides.map((slide, i) => (
          <div key={i} className="hero-slide" onClick={() => window.location.href = slide.link}>
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
              <div className="slide-name">{slide.item}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-arrow prev" onClick={() => goTo(current - 1)} aria-label="Previous">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button className="slider-arrow next" onClick={() => goTo(current + 1)} aria-label="Next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <div className="slider-dots">
        {slides.map((_, i) => (
          <button key={i} className={`slider-dot${i === current ? ' active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}
