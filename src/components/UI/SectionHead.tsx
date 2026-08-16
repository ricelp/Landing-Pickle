import type { ReactNode } from 'react'

type SectionHeadProps = {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  center?: boolean
}

export function SectionHead({ eyebrow, title, subtitle, center = false }: SectionHeadProps) {
  return (
    <div
      className={center ? 'section-head section-head--center' : 'section-head'}
      data-reveal
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title">{title}</h2>
      {subtitle ? <p className="section-sub">{subtitle}</p> : null}
    </div>
  )
}