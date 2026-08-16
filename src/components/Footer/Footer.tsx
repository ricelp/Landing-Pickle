import { site } from '../../data/site.ts'
import { navLinks } from '../../data/site.ts'
import { formatWhatsAppLink } from '../../utils/format.ts'
import { Logo } from '../UI/Logo.tsx'
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from './SocialIcons.tsx'
import './Footer.css'

const footerNav = navLinks.filter((link) => link.href !== '#inicio')

const legalLinks = [
  { label: 'Política de privacidad', href: '#' },
  { label: 'Términos y condiciones', href: '#' },
  { label: 'Política de reservas', href: '#' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p className="footer__tagline">{site.tagline}</p>
            <ul className="footer__socials">
              <li>
                <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Pickleball Boquete">
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Pickleball Boquete">
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a href={site.socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok de Pickleball Boquete">
                  <TikTokIcon />
                </a>
              </li>
              <li>
                <a
                  href={formatWhatsAppLink(site.whatsapp, site.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp de Pickleball Boquete"
                >
                  <WhatsAppIcon />
                </a>
              </li>
            </ul>
          </div>

          <nav className="footer__col" aria-label="Navegación del sitio">
            <h4 className="footer__heading">Navegación</h4>
            <ul>
              {footerNav.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h4 className="footer__heading">Contacto</h4>
            <ul>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>{site.location}</li>
              <li>{site.schedule}</li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Legal</h4>
            <ul>
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} {site.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}