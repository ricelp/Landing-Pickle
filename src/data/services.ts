import type { LucideIcon } from 'lucide-react'
import { Building2, CircleDot, Crown, GraduationCap, Grip, PartyPopper, Target, Trophy } from 'lucide-react'

export type ClubService = {
  id: string
  icon: LucideIcon
  title: string
  description: string
  cta: { label: string; href: string }
}

export const services: ClubService[] = [
  {
    id: 'palas',
    icon: Grip,
    title: 'Alquiler de palas',
    description: 'Palas profesionales para todos los niveles. Olvídate de llevar tu equipamiento.',
    cta: { label: 'Preguntar disponibilidad', href: '#contacto' },
  },
  {
    id: 'pelotas',
    icon: CircleDot,
    title: 'Alquiler de pelotas',
    description: 'Pelotas oficiales de alta visibilidad, listas para cada partido.',
    cta: { label: 'Ver precios', href: '#precios' },
  },
  {
    id: 'clases',
    icon: GraduationCap,
    title: 'Clases',
    description: 'Aprende desde cero o perfecciona tu técnica con nuestros instructores.',
    cta: { label: 'Agendar clase', href: '#contacto' },
  },
  {
    id: 'entrenamiento',
    icon: Target,
    title: 'Entrenamiento personalizado',
    description: 'Planes enfocados en tu nivel y objetivos para que juegues cada vez mejor.',
    cta: { label: 'Solicitar plan', href: '#contacto' },
  },
  {
    id: 'torneos',
    icon: Trophy,
    title: 'Torneos',
    description: 'Participa en nuestros torneos mensuales y demuestra tu nivel de juego.',
    cta: { label: 'Ver próximos torneos', href: '#contacto' },
  },
  {
    id: 'eventos',
    icon: PartyPopper,
    title: 'Eventos privados',
    description: 'Cumpleaños, team building y celebraciones en un ambiente deportivo único.',
    cta: { label: 'Cotizar evento', href: '#contacto' },
  },
  {
    id: 'membresias',
    icon: Crown,
    title: 'Membresías',
    description: 'Beneficios exclusivos, descuentos en reservas y prioridad en horarios.',
    cta: { label: 'Explorar membresías', href: '#precios' },
  },
  {
    id: 'empresas',
    icon: Building2,
    title: 'Actividades para empresas',
    description: 'Dinámicas corporativas que fortalecen el equipo en un entorno divertido.',
    cta: { label: 'Cotizar actividad', href: '#contacto' },
  },
]