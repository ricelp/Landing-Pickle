import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'
import { CircleCheck, Clock, LayoutGrid, Volleyball } from 'lucide-react'
import { useReveal } from '../../hooks/useReveal.ts'
import { SectionHead } from '../UI/SectionHead.tsx'
import './HowItWorks.css'

type Step = {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Elige tu cancha',
    description: 'Selecciona entre Arena, Pro o Club según tu nivel y preferencias.',
    icon: LayoutGrid,
  },
  {
    number: '02',
    title: 'Selecciona el horario',
    description: 'Revisa la disponibilidad en tiempo real y elige el momento ideal.',
    icon: Clock,
  },
  {
    number: '03',
    title: 'Confirma tu reserva',
    description: 'Completa tus datos y recibe la confirmación al instante.',
    icon: CircleCheck,
  },
  {
    number: '04',
    title: 'Ven a jugar',
    description: 'Llega con tiempo, calienta y disfruta tu partido.',
    icon: Volleyball,
  },
]

export function HowItWorks() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="como-funciona" className="section section--alt" ref={ref}>
      <div className="container">
        <SectionHead
          center
          eyebrow="Cómo funciona"
          title="Reserva en 4 pasos"
          subtitle="De la elección de cancha a tu primer saque, sin complicaciones."
        />

        <ol className="steps">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className="step"
              data-reveal
              style={{ '--reveal-delay': `${index * 0.12}s` } as CSSProperties}
            >
              <div className="step__head">
                <span className="step__icon" aria-hidden="true">
                  <step.icon />
                </span>
                <span className="step__num" aria-hidden="true">
                  {step.number}
                </span>
              </div>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__desc">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}