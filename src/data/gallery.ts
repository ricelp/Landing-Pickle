import { unsplash } from './images.ts'

export type GalleryItem = {
  id: string
  src: string
  alt: string
  category: string
  width: number
  height: number
}

export const gallery: GalleryItem[] = [
  {
    id: 'g1',
    ...unsplash({ id: 'photo-1761644518970-2ed0ab543e1b', alt: 'Partido de pickleball en la cancha Arena', width: 1200, height: 900 }),
    category: 'Canchas',
    width: 1200,
    height: 900,
  },
  {
    id: 'g2',
    ...unsplash({ id: 'photo-1756477558468-b3e485757470', alt: 'Acción durante un partido en la cancha Arena', width: 900, height: 1200 }),
    category: 'Jugadores',
    width: 900,
    height: 1200,
  },
  {
    id: 'g3',
    ...unsplash({ id: 'photo-1747027694256-575ee28c793e', alt: 'Concentración junto a la red en la cancha Pro', width: 1200, height: 900 }),
    category: 'Jugadores',
    width: 1200,
    height: 900,
  },
  {
    id: 'g4',
    ...unsplash({ id: 'photo-1775813037505-fe6d2a77cedc', alt: 'Jugadora lista con sus palas y pelotas', width: 900, height: 1200 }),
    category: 'Comunidad',
    width: 900,
    height: 1200,
  },
  {
    id: 'g5',
    ...unsplash({ id: 'photo-1693142518230-f049c9fc1ad2', alt: 'Detalle de una pala de pickleball de alta precisión', width: 1200, height: 900 }),
    category: 'Equipamiento',
    width: 1200,
    height: 900,
  },
  {
    id: 'g6',
    ...unsplash({ id: 'photo-1780663684798-150dc8879380', alt: 'Canchas iluminadas para partidos nocturnos', width: 1600, height: 900 }),
    category: 'Noche',
    width: 1600,
    height: 900,
  },
  {
    id: 'g7',
    ...unsplash({ id: 'photo-1761644518970-2ed0ab543e1b', alt: 'Cuatro jugadores disfrutando un partido de dobles', width: 900, height: 900 }),
    category: 'Comunidad',
    width: 900,
    height: 900,
  },
  {
    id: 'g8',
    ...unsplash({ id: 'photo-1747027694256-575ee28c793e', alt: 'El momento justo antes del saque', width: 900, height: 700 }),
    category: 'Eventos',
    width: 900,
    height: 700,
  },
]