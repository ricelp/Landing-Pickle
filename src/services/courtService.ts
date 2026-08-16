import type { Court } from '../data/courts.ts'
import { courts } from '../data/courts.ts'
import type { TimeSlot } from '../data/availability.ts'
import { availabilityByCourt } from '../data/availability.ts'

const MOCK_DELAY = 650

function mockResolve<T>(data: T, delay = MOCK_DELAY): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}

export function getCourts(): Promise<Court[]> {
  return mockResolve(courts)
}

export function getAvailability(courtId: string): Promise<TimeSlot[]> {
  const slots = availabilityByCourt[courtId]
  if (!slots) {
    return Promise.reject(new Error(`No se encontró la cancha: ${courtId}`))
  }
  return mockResolve(slots)
}