import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../../data/services.ts'
import { useReveal } from '../../hooks/useReveal.ts'
import { SectionHead } from '../UI/SectionHead.tsx'
import './Services.css'

export function Services() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="servicios" className="section" ref={ref}>
      <div className="container">
        <SectionHead
          eyebrow="Servicios"
          title="Más que una cancha"
          subtitle="Todo lo que rodea tu partido para que la experiencia sea completa, desde el equipamiento hasta torneos y eventos."
        />

        <ul className="services-grid">
          {services.map((service, index) => (
            <li
              key={service.id}
              className="service-card"
              data-reveal
              style={{ '--reveal-delay': `${(index % 4) * 0.08}s` } as CSSProperties}
            >
              <span className="service-card__icon" aria-hidden="true">
                <service.icon />
              </span>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.description}</p>
              <a className="service-card__cta" href={service.cta.href}>
                {service.cta.label}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}