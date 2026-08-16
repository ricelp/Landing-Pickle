import { useState } from 'react'
import type { CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../../data/faq.ts'
import { useReveal } from '../../hooks/useReveal.ts'
import { SectionHead } from '../UI/SectionHead.tsx'
import './FAQ.css'

export function FAQ() {
  const ref = useReveal<HTMLElement>()
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)

  return (
    <section id="preguntas" className="section section--alt" ref={ref}>
      <div className="container">
        <SectionHead
          center
          eyebrow="Preguntas frecuentes"
          title="Resolvemos tus dudas"
          subtitle="Todo lo que necesitas saber antes de tu primera reserva."
        />

        <div className="faq-list" data-reveal style={{ '--reveal-delay': '0.1s' } as CSSProperties}>
          {faqs.map((item) => {
            const isOpen = openId === item.id
            return (
              <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`} key={item.id}>
                <h3 className="faq-item__heading">
                  <button
                    type="button"
                    className="faq-item__trigger"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-item__icon" aria-hidden="true">
                      <ChevronDown />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  className="faq-item__panel"
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}