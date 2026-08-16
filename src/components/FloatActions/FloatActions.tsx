import { useState } from 'react'
import { Bot, Sparkles, X } from 'lucide-react'
import { site } from '../../data/site.ts'
import { formatWhatsAppLink } from '../../utils/format.ts'
import { useEscape } from '../../hooks/useInteraction.ts'
import { WhatsAppIcon } from '../Footer/SocialIcons.tsx'
import './FloatActions.css'

export function FloatActions() {
  const [assistantOpen, setAssistantOpen] = useState(false)
  useEscape(() => setAssistantOpen(false), assistantOpen)

  return (
    <div className="floating-stack">
      <div className="assistant">
        {assistantOpen && (
          <div className="assistant__panel" id="assistant-panel" role="dialog" aria-label="Asistente Pickle">
            <header className="assistant__head">
              <span className="assistant__title">
                <Sparkles aria-hidden="true" /> Asistente Pickle
              </span>
              <button
                type="button"
                className="assistant__close"
                onClick={() => setAssistantOpen(false)}
                aria-label="Cerrar asistente"
              >
                <X aria-hidden="true" />
              </button>
            </header>
            <p className="assistant__text">
              Próximamente podré recomendarte horarios y canchas, responder tus dudas y ayudarte a
              reservar. Por ahora, escríbenos por WhatsApp.
            </p>
            <a
              className="assistant__cta"
              href={formatWhatsAppLink(site.whatsapp, site.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> Hablar con el club
            </a>
          </div>
        )}

        <button
          type="button"
          className="assistant__toggle"
          aria-expanded={assistantOpen}
          aria-controls="assistant-panel"
          aria-label="Abrir Asistente Pickle, asistente virtual del club"
          onClick={() => setAssistantOpen((prev) => !prev)}
        >
          <Bot aria-hidden="true" />
          <span className="assistant__label">Asistente Pickle</span>
        </button>
      </div>

      <a
        className="whatsapp-float"
        href={formatWhatsAppLink(site.whatsapp, site.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp para reservar"
      >
        <WhatsAppIcon />
        <span className="whatsapp-float__label">¿Quieres reservar? Escríbenos</span>
      </a>
    </div>
  )
}