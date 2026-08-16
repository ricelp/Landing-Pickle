import { useCallback, useState } from 'react'
import type { CSSProperties } from 'react'
import { CalendarCheck, ChevronDown, Lightbulb, Layers, Users } from 'lucide-react'
import { courts } from '../../data/courts.ts'
import type { Court } from '../../data/courts.ts'
import type { TimeSlot } from '../../data/availability.ts'
import { availabilityLabels } from '../../data/availability.ts'
import { getAvailability } from '../../services/courtService.ts'
import { formatPrice } from '../../utils/format.ts'
import { useReveal } from '../../hooks/useReveal.ts'
import { Button } from '../UI/Button.tsx'
import { SectionHead } from '../UI/SectionHead.tsx'
import { SmartImage } from '../UI/SmartImage.tsx'
import './Courts.css'

type AvailabilityState =
  | { status: 'idle' | 'loading' }
  | { status: 'error' }
  | { status: 'loaded'; slots: TimeSlot[] }

function selectCourt(courtId: string, time?: string) {
  window.dispatchEvent(new CustomEvent('pb:select-court', { detail: { courtId, time } }))
  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
}

function CourtAvailability({ courtId }: { courtId: string }) {
  const [state, setState] = useState<AvailabilityState>({ status: 'idle' })
  const [expanded, setExpanded] = useState(false)

  const load = useCallback(() => {
    setState({ status: 'loading' })
    getAvailability(courtId)
      .then((slots) => setState({ status: 'loaded', slots }))
      .catch(() => setState({ status: 'error' }))
  }, [courtId])

  const toggle = () => {
    if (!expanded && state.status === 'idle') load()
    setExpanded((prev) => !prev)
  }

  return (
    <div className="court-avail">
      <button
        type="button"
        className="court-avail__trigger"
        aria-expanded={expanded}
        onClick={toggle}
      >
        <CalendarCheck aria-hidden="true" />
        {expanded ? 'Ocultar disponibilidad' : 'Ver disponibilidad'}
        <ChevronDown className={expanded ? 'court-avail__chevron court-avail__chevron--open' : 'court-avail__chevron'} aria-hidden="true" />
      </button>

      {expanded && (
        <div className="court-avail__panel">
          {state.status === 'loading' && (
            <ul className="court-avail__grid" aria-label="Cargando disponibilidad">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i}>
                  <span className="skeleton court-avail__skeleton" aria-hidden="true" />
                </li>
              ))}
            </ul>
          )}

          {state.status === 'error' && (
            <div className="court-avail__status court-avail__status--error" role="alert">
              <p>No pudimos cargar la disponibilidad. Intenta nuevamente.</p>
              <Button size="sm" variant="secondary" onClick={load}>
                Reintentar
              </Button>
            </div>
          )}

          {state.status === 'loaded' &&
            (state.slots.length === 0 ? (
              <p className="court-avail__empty" role="status">
                Sin horarios disponibles para hoy en esta cancha.
              </p>
            ) : (
              <ul className="court-avail__grid">
                {state.slots.map((slot) => (
                  <li key={slot.id}>
                    <button
                      type="button"
                      className={`slot-pill slot-pill--${slot.status}`}
                      disabled={slot.status === 'unavailable'}
                      onClick={() => selectCourt(courtId, slot.time)}
                      title={availabilityLabels[slot.status]}
                    >
                      <span className={`dot dot--${slot.status}`} aria-hidden="true" />
                      {slot.time}
                    </button>
                  </li>
                ))}
              </ul>
            ))}
        </div>
      )}
    </div>
  )
}

function CourtCard({ court, index }: { court: Court; index: number }) {
  return (
    <article
      className="court-card"
      data-reveal
      style={{ '--reveal-delay': `${index * 0.1}s` } as CSSProperties}
    >
      <div className="court-card__media">
        <SmartImage
          src={court.image.src}
          alt={court.image.alt}
          className="court-card__img"
          loading="lazy"
        />
        <span className="court-card__num" aria-hidden="true">
          {court.number}
        </span>
        <span className="court-card__name">{court.name}</span>
      </div>

      <div className="court-card__body">
        <p className="court-card__tagline">{court.tagline}</p>
        <p className="court-card__desc">{court.description}</p>

        <ul className="court-card__specs">
          <li>
            <Users aria-hidden="true" /> {court.capacity}
          </li>
          <li>
            <Layers aria-hidden="true" /> {court.surface}
          </li>
          <li>
            <Lightbulb aria-hidden="true" /> {court.lighting}
          </li>
        </ul>

        <ul className="court-card__features">
          {court.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <CourtAvailability courtId={court.id} />

        <div className="court-card__footer">
          <p className="court-card__price">
            Desde <strong>{formatPrice(court.priceFrom)}</strong>
            <span>/ hora</span>
          </p>
          <Button
            size="sm"
            onClick={() => selectCourt(court.id)}
            aria-label={`Reservar la cancha ${court.name}`}
          >
            Reservar
          </Button>
        </div>
      </div>
    </article>
  )
}

export function Courts() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="canchas" className="section" ref={ref}>
      <div className="container">
        <SectionHead
          eyebrow="Nuestras canchas"
          title="Elige tu cancha"
          subtitle="Tres canchas diseñadas para todos los niveles. Consulta disponibilidad y reserva tu horario favorito en segundos."
        />

        <div className="courts-grid">
          {courts.map((court, i) => (
            <CourtCard key={court.id} court={court} index={i} />
          ))}
        </div>

        <div className="availability-legend" data-reveal>
          <span className="availability-legend__title">Estado de disponibilidad:</span>
          <span className="availability-legend__item">
            <span className="dot dot--available" aria-hidden="true" /> Disponible
          </span>
          <span className="availability-legend__item">
            <span className="dot dot--partial" aria-hidden="true" /> Reservada parcialmente
          </span>
          <span className="availability-legend__item">
            <span className="dot dot--unavailable" aria-hidden="true" /> No disponible
          </span>
        </div>
      </div>
    </section>
  )
}