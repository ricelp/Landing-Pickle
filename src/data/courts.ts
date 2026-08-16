import { unsplash } from './images.ts'

export type Court = {
  id: string
  number: string
  name: string
  tagline: string
  description: string
  capacity: string
  surface: string
  lighting: string
  features: string[]
  priceFrom: number
  image: { src: string; alt: string }
  summary: {
    available: number
    partial: number
    unavailable: number
  }
}

export const courts: Court[] = [
  {
    id: 'arena',
    number: '01',
    name: 'Arena',
    tagline: 'Ideal para principiantes y juegos casuales.',
    description:
      'Una cancha amplia y relajada, perfecta para aprender, reunir a los amigos y disfrutar partidos informales durante el día.',
    capacity: 'Hasta 8 jugadores',
    surface: 'Resina acrílica azul',
    lighting: 'Iluminación LED natural',
    features: ['Zona de descanso', 'Red de competición', 'Acceso a equipamiento', 'Apta para principiantes'],
    priceFrom: 8,
    image: unsplash({
      id: 'photo-1756477558468-b3e485757470',
      alt: 'Jugador golpeando la pelota en la cancha Arena de pickleball',
      width: 900,
      height: 620,
    }),
    summary: { available: 4, partial: 1, unavailable: 1 },
  },
  {
    id: 'pro',
    number: '02',
    name: 'Pro',
    tagline: 'Superficie rápida para partidos competitivos.',
    description:
      'Superficie de alto rendimiento y precisión. Diseñada para jugadores que buscan ritmo, control y una experiencia de juego superior.',
    capacity: 'Hasta 8 jugadores',
    surface: 'Resina acrílica con grip',
    lighting: 'Iluminación LED profesional',
    features: ['Superficie de torneo', 'Marcaje oficial', 'Iluminación nocturna', 'Equipamiento premium'],
    priceFrom: 12,
    image: unsplash({
      id: 'photo-1747027694256-575ee28c793e',
      alt: 'Jugadora lista junto a la red en la cancha Pro de pickleball',
      width: 900,
      height: 620,
    }),
    summary: { available: 2, partial: 2, unavailable: 2 },
  },
  {
    id: 'club',
    number: '03',
    name: 'Club',
    tagline: 'Nuestra cancha insignia, ambiente premium.',
    description:
      'La experiencia insignia del club: cancha con ambiente exclusivo, ideal para eventos, partidos nocturnos y jugadores exigentes.',
    capacity: 'Hasta 12 jugadores',
    surface: 'Resina acrílica de alta resistencia',
    lighting: 'Iluminación LED de espectáculo',
    features: ['Zona VIP', 'Sonido ambiente', 'Ideal para eventos', 'Servicio en cancha'],
    priceFrom: 16,
    image: unsplash({
      id: 'photo-1775813037505-fe6d2a77cedc',
      alt: 'Jugadora con palas y pelotas en la cancha Club de pickleball',
      width: 900,
      height: 620,
    }),
    summary: { available: 3, partial: 3, unavailable: 0 },
  },
]