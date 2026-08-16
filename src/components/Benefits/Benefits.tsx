import type { CSSProperties } from 'react'
import { benefits } from '../../data/benefits.ts'
import { useReveal } from '../../hooks/useReveal.ts'
import { SectionHead } from '../UI/SectionHead.tsx'
import './Benefits.css'

export function Benefits() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="beneficios" className="section section--alt" ref={ref}>
      <div className="container">
        <SectionHead
          center
          eyebrow="Beneficios"
          title="Todo lo que necesitas para jugar mejor"
          subtitle="Nos encargamos de los detalles para que tú solo te concentres en jugar."
        />

        <ul className="benefits-grid">
          {benefits.map((benefit, index) => (
            <li
              key={benefit.title}
              className="benefit-card"
              data-reveal
              style={{ '--reveal-delay': `${(index % 3) * 0.1}s` } as CSSProperties}
            >
              <span className="benefit-card__icon" aria-hidden="true">
                <benefit.icon />
              </span>
              <h3 className="benefit-card__title">{benefit.title}</h3>
              <p className="benefit-card__desc">{benefit.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}