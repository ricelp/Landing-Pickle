import type { CSSProperties } from 'react'
import { Check, Star } from 'lucide-react'
import { pricing } from '../../data/pricing.ts'
import type { PricingPlan } from '../../data/pricing.ts'
import { formatPrice } from '../../utils/format.ts'
import { useReveal } from '../../hooks/useReveal.ts'
import { Button } from '../UI/Button.tsx'
import { SectionHead } from '../UI/SectionHead.tsx'
import './Pricing.css'

export function Pricing() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="precios" className="section" ref={ref}>
      <div className="container">
        <SectionHead
          center
          eyebrow="Precios"
          title="Precios simples y transparentes"
          subtitle="Sin letra pequeña. Elige la opción que mejor se adapte a tu frecuencia de juego."
        />

        <div className="pricing-grid">
          {pricing.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  return (
    <article
      className={`pricing-card ${plan.recommended ? 'pricing-card--recommended' : ''}`}
      data-reveal
      style={{ '--reveal-delay': `${index * 0.1}s` } as CSSProperties}
    >
      {plan.recommended && (
        <span className="pricing-card__badge">
          <Star aria-hidden="true" fill="currentColor" /> Recomendado
        </span>
      )}

      <h3 className="pricing-card__name">{plan.name}</h3>
      <p className="pricing-card__tagline">{plan.tagline}</p>

      <p className="pricing-card__price">
        <strong>{formatPrice(plan.price)}</strong>
        <span>{plan.unit}</span>
      </p>

      <p className="pricing-card__duration">{plan.duration}</p>

      <ul className="pricing-card__features">
        {plan.features.map((feature) => (
          <li key={feature}>
            <span className="pricing-card__check" aria-hidden="true">
              <Check />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        href={plan.cta.href}
        variant={plan.recommended ? 'primary' : 'secondary'}
        className="pricing-card__cta"
      >
        {plan.cta.label}
      </Button>
    </article>
  )
}