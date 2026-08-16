import { useState } from 'react'
import type { ImgHTMLAttributes, SyntheticEvent } from 'react'
import { FALLBACK_IMAGE } from '../../data/images.ts'

type SmartImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
}

export function SmartImage({ src, onError, ...rest }: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    if (currentSrc !== FALLBACK_IMAGE) {
      setCurrentSrc(FALLBACK_IMAGE)
    }
    onError?.(event)
  }

  return <img src={currentSrc} onError={handleError} {...rest} />
}