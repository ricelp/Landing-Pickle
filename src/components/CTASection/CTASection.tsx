import { ArrowRight } from 'lucide-react'
import { unsplash } from '../../data/images.ts'
import { useReveal } from '../../hooks/useReveal.ts'
import { Button } from '../UI/Button.tsx'
import { SmartImage } from '../UI/SmartImage.tsx'
import './CTASection.css'

const ctaImage = unsplash({
  id: 'photo-1780663684798-150dc8879380',
  alt: 'Canchas de pickleball iluminadas para partidos nocturnos',
  width: 1920,
  height: 1080,
})

export function CTASection() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="reserva" className="cta-section" ref={ref}>
      <div className="cta-section__media" aria-hidden="true">
        <SmartImage src={ctaImage.src} alt="" className="cta-section__img" loading="lazy" />
        <div className="cta-section__overlay" />
      </div>

      <div className="container cta-section__content" data-reveal>
        <h2 className="cta-section__title">
          ¿Listo para tu <span className="text-gradient">próximo partido?</span>
        </h2>
        <p className="cta-section__subtitle">
          Reserva tu cancha y vive la experiencia PICKLEBALL BOQUETE.
        </p>
        <Button href="#contacto" variant="light">
          Reservar ahora
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </section>
  )
}