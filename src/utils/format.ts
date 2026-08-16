import { site } from '../data/site.ts'

export function formatPrice(amount: number, unit = ''): string {
  return `${site.currency}${amount}${unit}`
}

export function formatWhatsAppLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}