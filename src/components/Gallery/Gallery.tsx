import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { gallery } from '../../data/gallery.ts'
import { useReveal } from '../../hooks/useReveal.ts'
import { useEscape, useLockBodyScroll } from '../../hooks/useInteraction.ts'
import { SectionHead } from '../UI/SectionHead.tsx'
import { SmartImage } from '../UI/SmartImage.tsx'
import './Gallery.css'

export function Gallery() {
  const ref = useReveal<HTMLElement>()
  const [active, setActive] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const prevActiveRef = useRef<number | null>(null)

  const isOpen = active !== null
  useLockBodyScroll(isOpen)
  useEscape(() => setActive(null), isOpen)

  useEffect(() => {
    if (active !== null && prevActiveRef.current === null) closeButtonRef.current?.focus()
    prevActiveRef.current = active
  }, [active])

  useEffect(() => {
    if (active === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setActive((prev) => (prev === null ? prev : (prev + 1) % gallery.length))
      if (event.key === 'ArrowLeft') setActive((prev) => (prev === null ? prev : (prev - 1 + gallery.length) % gallery.length))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active])

  const item = active !== null ? gallery[active] : null

  return (
    <section id="galeria" className="section section--alt" ref={ref}>
      <div className="container">
        <SectionHead
          center
          eyebrow="Galería"
          title="Vive la experiencia"
          subtitle="Canchas, jugadores, equipamiento y ambiente nocturno. Esto es Pickleball Boquete."
        />

        <ul className="gallery-grid">
          {gallery.map((item, index) => {
            const tall = item.height > item.width * 1.15
            const wide = item.width > item.height * 1.45
            return (
              <li
                key={item.id}
                className={`gallery-item ${tall ? 'gallery-item--tall' : ''} ${wide ? 'gallery-item--wide' : ''}`}
                data-reveal
                style={{ '--reveal-delay': `${(index % 4) * 0.08}s` } as CSSProperties}
              >
                <button
                  type="button"
                  className="gallery-item__button"
                  onClick={() => setActive(index)}
                  aria-label={`Ampliar imagen: ${item.alt}`}
                >
                  <SmartImage
                    src={item.src}
                    alt={item.alt}
                    className="gallery-item__img"
                    loading="lazy"
                  />
                  <span className="gallery-item__zoom" aria-hidden="true">
                    <Maximize2 />
                  </span>
                  <span className="gallery-item__meta">
                    <span className="gallery-item__category">{item.category}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {item && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada: ${item.alt}`}
          onClick={() => setActive(null)}
        >
          <div className="lightbox__content" onClick={(event) => event.stopPropagation()}>
            <header className="lightbox__topbar">
              <span className="lightbox__count" aria-live="polite">
                {(active ?? 0) + 1} / {gallery.length} · {item.category}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                className="lightbox__close"
                onClick={() => setActive(null)}
                aria-label="Cerrar imagen"
              >
                <X aria-hidden="true" />
              </button>
            </header>

            <SmartImage src={item.src} alt={item.alt} className="lightbox__img" />

            <p className="lightbox__caption">{item.alt}</p>

            <div className="lightbox__nav">
              <button
                type="button"
                className="lightbox__arrow"
                onClick={() => setActive((prev) => (prev === null ? prev : (prev - 1 + gallery.length) % gallery.length))}
                aria-label="Imagen anterior"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                className="lightbox__arrow"
                onClick={() => setActive((prev) => (prev === null ? prev : (prev + 1) % gallery.length))}
                aria-label="Imagen siguiente"
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}