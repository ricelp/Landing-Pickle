export const FALLBACK_IMAGE = '/assets/court-fallback.svg'

export type ImageSpec = {
  id: string
  alt: string
  width?: number
  height?: number
}

export function unsplash({ id, alt, width = 1200, height = 800 }: ImageSpec): { src: string; alt: string } {
  const params = new URLSearchParams({
    fm: 'jpg',
    q: '70',
    w: String(width),
    h: String(height),
    fit: 'crop',
    auto: 'format',
  })
  return { src: `https://images.unsplash.com/${id}?${params.toString()}`, alt }
}