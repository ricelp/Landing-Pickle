import { site } from '../../data/site.ts'

type LogoProps = {
  className?: string
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <a href="#inicio" className={`logo ${className}`} aria-label={`${site.name} — Ir al inicio`}>
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" width="34" height="34">
          <rect width="64" height="64" rx="16" fill="var(--accent)" />
          <circle cx="32" cy="32" r="19" fill="none" stroke="var(--accent-ink)" strokeWidth="3" />
          <circle cx="24" cy="24" r="3.4" fill="var(--accent-ink)" />
          <circle cx="40" cy="24" r="3.4" fill="var(--accent-ink)" />
          <circle cx="24" cy="40" r="3.4" fill="var(--accent-ink)" />
          <circle cx="40" cy="40" r="3.4" fill="var(--accent-ink)" />
          <circle cx="32" cy="32" r="3.4" fill="var(--accent-ink)" />
        </svg>
      </span>
      <span className="logo__text">
        {site.shortName.toUpperCase()}
        <small>TU PRÓXIMO PARTIDO</small>
      </span>
    </a>
  )
}