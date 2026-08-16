import type { CSSProperties } from 'react'
import { ChevronDown, Clock, MapPin, Sun } from 'lucide-react'
import { unsplash } from '../../data/images.ts'
import { useReveal } from '../../hooks/useReveal.ts'
import { Button } from '../UI/Button.tsx'
import { SmartImage } from '../UI/SmartImage.tsx'
import './Hero.css'

const heroImage = unsplash({
  id: 'photo-1761644518970-2ed0ab543e1b',
  alt: 'Cuatro jugadores disfrutando un partido de pickleball en una cancha azul',
  width: 1920,
  height: 1280,
})

export function Hero() {
  const ref = useReveal<HTMLElement>()

  return (
    <section id="inicio" className="hero" ref={ref}>
      <div className="hero__media" aria-hidden="true">
        <SmartImage src={heroImage.src} alt="" className="hero__img" fetchPriority="high" />
        <div className="hero__overlay hero__overlay--top" />
        <div className="hero__overlay hero__overlay--bottom" />
      </div>

      <div className="container hero__content">
        <span className="hero__badge" data-reveal>
          <span className="dot dot--available" aria-hidden="true" />
          3 canchas disponibles
        </span>

        <h1 className="hero__title" data-reveal style={{ '--reveal-delay': '0.08s' } as CSSProperties}>
          Juega. Compite. <span className="text-gradient">Disfruta.</span>
        </h1>

        <p className="hero__subtitle" data-reveal style={{ '--reveal-delay': '0.16s' } as CSSProperties}>
          Tres canchas de pickleball listas para tu próximo partido.
        </p>

        <div className="hero__actions" data-reveal style={{ '--reveal-delay': '0.24s' } as CSSProperties}>
          <Button href="#reservar">Reservar una cancha</Button>
          <Button href="#canchas" variant="outline-light">
            Conocer nuestras canchas
          </Button>
        </div>

        <ul className="hero__meta" data-reveal style={{ '--reveal-delay': '0.32s' } as CSSProperties}>
          <li>
            <Clock aria-hidden="true" /> Horarios flexibles · 8:00 AM - 10:00 PM
          </li>
          <li>
            <MapPin aria-hidden="true" /> Boquete, Chiriquí
          </li>
          <li>
            <Sun aria-hidden="true" /> Juega de día o de noche
          </li>
        </ul>
      </div>

      <a className="hero__scroll" href="#canchas" aria-label="Desplazarse a la sección de canchas">
        <ChevronDown aria-hidden="true" />
      </a>
    </section>
  )
}
