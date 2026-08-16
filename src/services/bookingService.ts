export type BookingPayload = {
  name: string
  email: string
  phone: string
  courtId: string
  courtName: string
  date: string
  time: string
  players: number
  message: string
}

export type BookingResult = {
  ok: true
  reference: string
}

export function createBooking(payload: BookingPayload): Promise<BookingResult> {
  return new Promise((resolve, reject) => {
    if (!payload.name || !payload.courtId || !payload.date || !payload.time) {
      reject(new Error('Faltan datos obligatorios para la reserva.'))
      return
    }
    setTimeout(() => {
      const reference = `PB-${Date.now().toString(36).toUpperCase()}`
      resolve({ ok: true, reference })
    }, 900)
  })
}