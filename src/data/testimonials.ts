export type Testimonial = {
  id: string
  name: string
  role: string
  comment: string
  initials: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Ana María López',
    role: 'Juega 3 veces por semana',
    comment:
      'Las canchas están increíbles y reservar fue súper fácil. En menos de un minuto tenía mi horario confirmado.',
    initials: 'AM',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Carlos Vega',
    role: 'Participante del torneo mensual',
    comment:
      'La cancha Pro se siente profesional. La iluminación nocturna es excelente y el ambiente del club es de otro nivel.',
    initials: 'CV',
    rating: 5,
  },
  {
    id: 't3',
    name: 'María Fernanda Ruiz',
    role: 'Nueva en el pickleball',
    comment:
      'Empecé sin experiencia y las clases me ayudaron muchísimo. El staff es súper amable y se respira muy buen ambiente.',
    initials: 'MR',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Jorge Castillo',
    role: 'Organizó un evento privado',
    comment:
      'Celebramos el cumpleaños de mi hijo en la cancha Club. Todo impecable: sonido, iluminación y atención de primera.',
    initials: 'JC',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Laura Sánchez',
    role: 'Miembro de la comunidad',
    comment:
      'Con la membresía juego todas las semanas y he conocido a muchísima gente. Es más que una cancha, es una comunidad.',
    initials: 'LS',
    rating: 5,
  },
]