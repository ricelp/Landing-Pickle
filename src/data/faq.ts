export type FaqItem = {
  id: string
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    id: 'experiencia',
    question: '¿Necesito experiencia para jugar?',
    answer:
      'No. Nuestras canchas son aptas para todos los niveles. Si eres principiante, puedes tomar una clase o simplemente llegar a probar: el pickleball es fácil de aprender en tu primer partido.',
  },
  {
    id: 'pala',
    question: '¿Puedo alquilar una pala?',
    answer:
      'Sí. Ofrecemos alquiler de palas y pelotas en todas las canchas. También puedes adquirir tu propio equipamiento en el club.',
  },
  {
    id: 'jugadores',
    question: '¿Cuántas personas pueden jugar?',
    answer:
      'Cada cancha admite hasta 8 jugadores en modo recreativo. Para partidos oficiales (dobles) se recomiendan 4 jugadores por cancha.',
  },
  {
    id: 'cancelar',
    question: '¿Puedo cancelar mi reserva?',
    answer:
      'Sí. Puedes cancelar o reprogramar tu reserva hasta 24 horas antes sin costo. Pasado ese plazo se aplica la política de reservas.',
  },
  {
    id: 'estacionamiento',
    question: '¿Hay estacionamiento?',
    answer:
      'Sí, contamos con estacionamiento gratuito y amplio dentro del complejo, con acceso directo a las canchas.',
  },
  {
    id: 'clases',
    question: '¿Ofrecen clases?',
    answer:
      'Ofrecemos clases grupales e individuales para todos los niveles, además de entrenamiento personalizado. Consulta disponibilidad en la sección de contacto.',
  },
  {
    id: 'eventos',
    question: '¿Puedo reservar una cancha para eventos?',
    answer:
      'Claro. La cancha Club es ideal para eventos privados: cumpleaños, actividades corporativas y celebraciones. Escríbenos para cotizar.',
  },
  {
    id: 'horarios',
    question: '¿Cuáles son los horarios?',
    answer:
      'Abrimos de lunes a domingo de 8:00 AM a 10:00 PM. Puedes consultar la disponibilidad en tiempo real en la sección de canchas.',
  },
]