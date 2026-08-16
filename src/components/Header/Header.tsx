import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../../data/site.ts'
import { useScrollY } from '../../hooks/useScrollY.ts'
import { useEscape, useLockBodyScroll } from '../../hooks/useInteraction.ts'
import { Button } from '../UI/Button.tsx'
import { Logo } from '../UI/Logo.tsx'
import './Header.css'

export function Header() {
  const scrolled = useScrollY(24)
  const [open, setOpen] = useState(false)

  useLockBodyScroll(open)
  useEscape(() => setOpen(false), open)

  const close = () => setOpen(false)

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Logo />

        <nav
          id="menu-principal"
          className={`header__nav ${open ? 'header__nav--open' : ''}`}
          aria-label="Navegación principal"
        >
          <ul className="header__list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="header__link" onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#reservar" size="sm" className="header__cta" onClick={close}>
            Reservar cancha
          </Button>
        </nav>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="menu-principal"
          aria-label={open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}