export type ContactPayload = {
  name: string
  email: string
  phone: string
  message: string
}

export type ContactResult = {
  ok: true
}

export function sendContactMessage(_payload: ContactPayload): Promise<ContactResult> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true }), 700)
  })
}