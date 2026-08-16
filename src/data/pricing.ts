export type PricingPlan = {
  id: string
  name: string
  tagline: string
  price: number
  unit: string
  duration: string
  features: string[]
  cta: { label: string; href: string }
  recommended?: boolean
}

export const pricing: PricingPlan[] = [
  {
    id: 'individual',
    name: 'Reserva individual',
    tagline: 'Perfecta para un partido casual.',
    price: 8,
    unit: '/ hora',
    duration: '1 hora en cualquier cancha',
    features: [
      'Acceso a 3 canchas',
      'Iluminación incluida',
      'Equipamiento opcional',
      'Cancelación hasta 24 h antes',
    ],
    cta: { label: 'Reservar ahora', href: '#reservar' },
  },
  {
    id: 'pack5',
    name: 'Pack de 5 reservas',
    tagline: 'Para quienes juegan cada semana.',
    price: 35,
    unit: ' / 5 horas',
    duration: '5 horas válidas por 3 meses',
    features: [
      'Ahorro del 12%',
      'Acceso a todas las canchas',
      'Prioridad en horarios pico',
      'Equipamiento gratis en 1 hora',
      'Válido para 1 a 4 personas',
    ],
    cta: { label: 'Comprar pack', href: '#reservar' },
    recommended: true,
  },
  {
    id: 'membresia',
    name: 'Membresía mensual',
    tagline: 'Juego ilimitado todo el mes.',
    price: 60,
    unit: '/ mes',
    duration: 'Renovación mensual automática',
    features: [
      'Horas ilimitadas en cancha Arena',
      'Descuentos en canchas Pro y Club',
      '2 clases grupales al mes',
      'Invita a 1 amigo gratis los domingos',
      'Acceso a torneos del club',
    ],
    cta: { label: 'Unirme', href: '#reservar' },
  },
]