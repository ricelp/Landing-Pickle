export function validateRequired(value: string): string | null {
  return value.trim().length > 0 ? null : 'Este campo es obligatorio.'
}

export function validateName(value: string): string | null {
  if (!value.trim()) return 'Ingresa tu nombre completo.'
  if (value.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.'
  return null
}

export function validateEmail(value: string): string | null {
  if (!value.trim()) return 'Ingresa tu correo electrónico.'
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
  return ok ? null : 'Ingresa un correo electrónico válido.'
}

export function validatePhone(value: string): string | null {
  if (!value.trim()) return 'Ingresa tu teléfono.'
  const digits = value.replace(/\D/g, '')
  const ok = digits.length >= 7 && digits.length <= 15
  return ok ? null : 'Ingresa un teléfono válido.'
}

export function validateDate(value: string): string | null {
  if (!value) return 'Selecciona una fecha.'
  return null
}

export function validateTime(value: string): string | null {
  if (!value) return 'Selecciona un horario.'
  return null
}