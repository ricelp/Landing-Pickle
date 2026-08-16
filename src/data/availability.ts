export type AvailabilityStatus = 'available' | 'partial' | 'unavailable'

export type TimeSlot = {
  id: string
  time: string
  status: AvailabilityStatus
}

export const availabilityTimes = ['08:00 AM', '10:00 AM', '12:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'] as const

export const availabilityByCourt: Record<string, TimeSlot[]> = {
  arena: [
    { id: 'arena-08', time: '08:00 AM', status: 'available' },
    { id: 'arena-10', time: '10:00 AM', status: 'available' },
    { id: 'arena-12', time: '12:00 PM', status: 'partial' },
    { id: 'arena-16', time: '04:00 PM', status: 'available' },
    { id: 'arena-18', time: '06:00 PM', status: 'unavailable' },
    { id: 'arena-20', time: '08:00 PM', status: 'available' },
  ],
  pro: [
    { id: 'pro-08', time: '08:00 AM', status: 'unavailable' },
    { id: 'pro-10', time: '10:00 AM', status: 'available' },
    { id: 'pro-12', time: '12:00 PM', status: 'available' },
    { id: 'pro-16', time: '04:00 PM', status: 'partial' },
    { id: 'pro-18', time: '06:00 PM', status: 'partial' },
    { id: 'pro-20', time: '08:00 PM', status: 'unavailable' },
  ],
  club: [
    { id: 'club-08', time: '08:00 AM', status: 'available' },
    { id: 'club-10', time: '10:00 AM', status: 'available' },
    { id: 'club-12', time: '12:00 PM', status: 'partial' },
    { id: 'club-16', time: '04:00 PM', status: 'available' },
    { id: 'club-18', time: '06:00 PM', status: 'partial' },
    { id: 'club-20', time: '08:00 PM', status: 'available' },
  ],
}

export const availabilityLabels: Record<AvailabilityStatus, string> = {
  available: 'Disponible',
  partial: 'Reservada parcialmente',
  unavailable: 'No disponible',
}