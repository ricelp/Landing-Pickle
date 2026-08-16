import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '../../data/testimonials.ts'
import { useReveal } from '../../hooks/useReveal.ts'
import { SectionHead } from '../UI/SectionHead.tsx'
import './Testimonials.css'

export function Testimonials() {
  const ref = useReveal<HTMLElement>()
  const [visible, setVisible] = useState(1)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 920px)')
    const update = () => setVisible(mq.matches ? 3 : 1)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - visible)

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex))
  }, [maxIndex])

  const prev = () => setIndex((prev) => Math.max(0, prev - 1))
  const next = () => setIndex((prev) => Math.min(maxIndex, prev + 1))

  return (
    <section id="testimonios" className="section" ref={ref}>
      <div className="container">
        <SectionHead
          center
          eyebrow="Testimonios"
          title="Lo dicen nuestros jugadores"
          subtitle="Contenido de demostración para mostrar la experiencia del club."
        />

        <div
          className="carousel"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Testimonios de jugadores"
        >
          <div
            className="carousel__viewport"
            style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
          >
            {testimonials.map((t) => (
              <article className="carousel__slide" key={t.id} aria-label={t.name}>
                <div className="testimonial-card">
                  <span className="testimonial-card__quote" aria-hidden="true">
                    <Quote />
                  </span>
                  <div className="testimonial-card__stars" aria-label={`Valoración: ${t.rating} de 5 estrellas`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} aria-hidden="true" fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="testimonial-card__comment">"{t.comment}"</blockquote>
                  <footer className="testimonial-card__author">
                    <span className="avatar" aria-hidden="true">
                      {t.initials}
                    </span>
                    <span>
                      <span className="testimonial-card__name">{t.name}</span>
                      <span className="testimonial-card__role">{t.role}</span>
                    </span>
                  </footer>
                </div>
              </article>
            ))}
          </div>

          <div className="carousel__controls">
            <button
              type="button"
              className="carousel__arrow"
              onClick={prev}
              disabled={index === 0}
              aria-label="Testimonios anteriores"
            >
              <ChevronLeft aria-hidden="true" />
            </button>

            <div className="carousel__dots" role="tablist" aria-label="Páginas de testimonios">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`carousel__dot ${i === index ? 'carousel__dot--active' : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>

            <button
              type="button"
              className="carousel__arrow"
              onClick={next}
              disabled={index === maxIndex}
              aria-label="Siguientes testimonios"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}