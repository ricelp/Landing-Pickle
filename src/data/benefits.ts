import type { LucideIcon } from 'lucide-react'
import { CalendarCheck, Hand, Lightbulb, ShieldCheck, Sparkles, Users } from 'lucide-react'

export type Benefit = {
  icon: LucideIcon
  title: string
  description: string
}

export const benefits: Benefit[] = [
  {
    icon: Sparkles,
    title: 'Canchas profesionales',
    description: 'Superficies diseñadas para una excelente experiencia de juego.',
  },
  {
    icon: Lightbulb,
    title: 'Iluminación',
    description: 'Juega durante el día o la noche con iluminación LED de alta calidad.',
  },
  {
    icon: Hand,
    title: 'Equipamiento',
    description: 'Opciones de alquiler de palas y pelotas para que no falte nada.',
  },
  {
    icon: CalendarCheck,
    title: 'Reservas fáciles',
    description: 'Reserva desde cualquier dispositivo en menos de un minuto.',
  },
  {
    icon: ShieldCheck,
    title: 'Ambiente seguro',
    description: 'Espacio pensado para disfrutar con amigos y familia.',
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Conoce otros jugadores y participa en actividades del club.',
  },
]