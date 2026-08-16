import { useEffect, useState } from 'react'
import type { ChangeEvent, CSSProperties, FormEvent } from 'react'
import { CircleAlert, CircleCheck, Clock, Loader, MapPin, Phone, Send, Users, Volleyball } from 'lucide-react'
import { courts } from '../../data/courts.ts'
import { availabilityTimes } from '../../data/availability.ts'
import { site } from '../../data/site.ts'
import { createBooking } from '../../services/bookingService.ts'
import { validateDate, validateEmail, validateName, validatePhone, validateTime } from '../../utils/validate.ts'
import { useReveal } from '../../hooks/useReveal.ts'
import { Button } from '../UI/Button.tsx'
import { SectionHead } from '../UI/SectionHead.tsx'
import './BookingForm.css'

type FormData = {
  name: string
  email: string
  phone: string
  courtId: string
  date: string
  time: string
  players: string
  message: string
}

type Errors = Partial<Record<keyof FormData, string>>

type Status = { kind: 'idle' } | { kind: 'submitting' } | { kind: 'success'; reference: string } | { kind: 'error' }

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  courtId: '',
  date: '',
  time: '',
  players: '4',
  message: '',
}

function todayISO(): string {
  const today = new Date()
  const offset = today.getTimezoneOffset()
  return new Date(today.getTime() - offset * 60000).toISOString().slice(0, 10)
}

function suggestCourt(players: number): string {
  if (players <= 2) return 'Para 1-2 jugadores, la cancha Arena es perfecta para singles o práctica.'
  if (players <= 4) return 'Con 4 jugadores, la cancha Pro es ideal para un dobles competitivo.'
  return 'Grupos grandes: recomendamos la cancha Club, pensada para más jugadores y eventos.'
}

export function BookingForm() {
  const ref = useReveal<HTMLElement>()
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Errors>({})
  const [tried, setTried] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ courtId: string; time?: string }>).detail
      setForm((prev) => ({ ...prev, courtId: detail.courtId, time: detail.time ?? prev.time }))
      setStatus({ kind: 'idle' })
    }
    window.addEventListener('pb:select-court', handler)
    return () => window.removeEventListener('pb:select-court', handler)
  }, [])

  const setField = (name: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (tried) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = (data: FormData): Errors => ({
    name: validateName(data.name) ?? undefined,
    email: validateEmail(data.email) ?? undefined,
    phone: validatePhone(data.phone) ?? undefined,
    courtId: data.courtId ? undefined : 'Selecciona una cancha.',
    date: validateDate(data.date) ?? undefined,
    time: validateTime(data.time) ?? undefined,
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setTried(true)
    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      setStatus({ kind: 'error' })
      return
    }

    setStatus({ kind: 'submitting' })
    const court = courts.find((c) => c.id === form.courtId)
    createBooking({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      courtId: form.courtId,
      courtName: court?.name ?? '',
      date: form.date,
      time: form.time,
      players: Number(form.players),
      message: form.message.trim(),
    })
      .then((result) => setStatus({ kind: 'success', reference: result.reference }))
      .catch(() => setStatus({ kind: 'error' }))
  }

  const reset = () => {
    setForm(initialForm)
    setErrors({})
    setTried(false)
    setStatus({ kind: 'idle' })
  }

  const fieldError = (name: keyof FormData) => (errors[name] ? { 'aria-invalid': true, 'aria-describedby': `${name}-error` } : {})

  const inputProps = (name: keyof FormData, onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void) => ({
    value: form[name],
    onChange,
    ...fieldError(name),
  })

  return (
    <section id="contacto" className="section" ref={ref}>
      <div className="container">
        <SectionHead
          eyebrow="Contacto y reservas"
          title="Reserva tu cancha"
          subtitle="Cuéntanos qué necesitas y te confirmamos tu reserva en menos de 24 horas."
        />

        <div className="booking-grid">
          <aside className="booking-info" data-reveal>
            <h3 className="booking-info__title">Información del club</h3>
            <ul className="booking-info__list">
              <li>
                <MapPin aria-hidden="true" />
                <span>
                  <strong>Ubicación</strong>
                  {site.location}
                </span>
              </li>
              <li>
                <Clock aria-hidden="true" />
                <span>
                  <strong>Horario</strong>
                  {site.schedule}
                </span>
              </li>
              <li>
                <Phone aria-hidden="true" />
                <span>
                  <strong>Teléfono / WhatsApp</strong>
                  {site.phoneDisplay}
                </span>
              </li>
            </ul>

            <div className="booking-info__note">
              <h4>¿Qué pasa después de enviar el formulario?</h4>
              <ol>
                <li>Recibimos tu solicitud al instante.</li>
                <li>Verificamos la disponibilidad del horario.</li>
                <li>Te contactamos para confirmar el pago y la reserva.</li>
              </ol>
            </div>

            <p className="booking-info__hint">
              <Volleyball aria-hidden="true" />
              No necesitas experiencia: tenemos palas y pelotas para alquilar.
            </p>
          </aside>

          <div className="booking-form-wrap" data-reveal style={{ '--reveal-delay': '0.1s' } as CSSProperties}>
            {status.kind === 'success' ? (
              <div className="booking-success" role="status">
                <span className="booking-success__icon" aria-hidden="true">
                  <CircleCheck />
                </span>
                <h3 className="booking-success__title">¡Solicitud recibida!</h3>
                <p className="booking-success__text">
                  Nos pondremos en contacto contigo para confirmar tu reserva. Tu referencia es{' '}
                  <strong>{status.reference}</strong>.
                </p>
                <Button onClick={reset}>Realizar otra reserva</Button>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleSubmit} noValidate>
                <div className="booking-form__grid">
                  <div className="field">
                    <label className="label label--required" htmlFor="bk-name">
                      Nombre completo
                    </label>
                    <input
                      id="bk-name"
                      className={`input ${errors.name ? 'input--error' : ''}`}
                      type="text"
                      autoComplete="name"
                      placeholder="Ej. Ana López"
                      {...inputProps('name', (e) => setField('name', e.target.value))}
                    />
                    {errors.name && (
                      <span id="name-error" className="error-text">
                        <CircleAlert aria-hidden="true" /> {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label className="label label--required" htmlFor="bk-email">
                      Email
                    </label>
                    <input
                      id="bk-email"
                      className={`input ${errors.email ? 'input--error' : ''}`}
                      type="email"
                      autoComplete="email"
                      placeholder="ejemplo@correo.com"
                      {...inputProps('email', (e) => setField('email', e.target.value))}
                    />
                    {errors.email && (
                      <span id="email-error" className="error-text">
                        <CircleAlert aria-hidden="true" /> {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label className="label label--required" htmlFor="bk-phone">
                      Teléfono
                    </label>
                    <input
                      id="bk-phone"
                      className={`input ${errors.phone ? 'input--error' : ''}`}
                      type="tel"
                      autoComplete="tel"
                      placeholder="+507 6000 0000"
                      {...inputProps('phone', (e) => setField('phone', e.target.value))}
                    />
                    {errors.phone && (
                      <span id="phone-error" className="error-text">
                        <CircleAlert aria-hidden="true" /> {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="bk-players">
                      Número de jugadores
                    </label>
                    <select
                      id="bk-players"
                      className="select"
                      {...inputProps('players', (e) => setField('players', e.target.value))}
                    >
                      {Array.from({ length: 12 }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'jugador' : 'jugadores'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label className="label label--required" htmlFor="bk-court">
                      Cancha
                    </label>
                    <select
                      id="bk-court"
                      className={`select ${errors.courtId ? 'select--error' : ''}`}
                      {...inputProps('courtId', (e) => setField('courtId', e.target.value))}
                    >
                      <option value="">Selecciona una cancha</option>
                      {courts.map((court) => (
                        <option key={court.id} value={court.id}>
                          Cancha {court.number} · {court.name}
                        </option>
                      ))}
                    </select>
                    {errors.courtId && (
                      <span id="courtId-error" className="error-text">
                        <CircleAlert aria-hidden="true" /> {errors.courtId}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label className="label label--required" htmlFor="bk-date">
                      Fecha
                    </label>
                    <input
                      id="bk-date"
                      className={`input ${errors.date ? 'input--error' : ''}`}
                      type="date"
                      min={todayISO()}
                      {...inputProps('date', (e) => setField('date', e.target.value))}
                    />
                    {errors.date && (
                      <span id="date-error" className="error-text">
                        <CircleAlert aria-hidden="true" /> {errors.date}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label className="label label--required" htmlFor="bk-time">
                      Hora
                    </label>
                    <select
                      id="bk-time"
                      className={`select ${errors.time ? 'select--error' : ''}`}
                      {...inputProps('time', (e) => setField('time', e.target.value))}
                    >
                      <option value="">Selecciona un horario</option>
                      {availabilityTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <span id="time-error" className="error-text">
                        <CircleAlert aria-hidden="true" /> {errors.time}
                      </span>
                    )}
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="bk-message">
                    Mensaje <span className="label__optional">(opcional)</span>
                  </label>
                  <textarea
                    id="bk-message"
                    className="textarea"
                    rows={4}
                    placeholder="Cuéntanos si necesitas palas, clases o alguna preferencia especial."
                    {...inputProps('message', (e) => setField('message', e.target.value))}
                  />
                </div>

                <p className="booking-form__tip">
                  <Users aria-hidden="true" />
                  {suggestCourt(Number(form.players) || 4)}
                </p>

                {status.kind === 'error' && (
                  <div className="status status--error" role="alert">
                    <CircleAlert aria-hidden="true" />
                    <span>
                      No pudimos enviar tu solicitud. Revisa los campos marcados e intenta nuevamente.
                    </span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="booking-form__submit"
                  disabled={status.kind === 'submitting'}
                >
                  {status.kind === 'submitting' ? (
                    <>
                      <Loader className="booking-form__spinner" aria-hidden="true" /> Enviando solicitud…
                    </>
                  ) : (
                    <>
                      <Send aria-hidden="true" /> Enviar solicitud de reserva
                    </>
                  )}
                </Button>

                <p className="booking-form__privacy">
                  Al enviar aceptas nuestra política de privacidad. No compartimos tus datos.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}