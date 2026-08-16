# PICKLEBALL BOQUETE — Landing page de alquiler de canchas de pickleball

Landing page moderna, responsiva y accesible para promocionar el alquiler de 3 canchas de pickleball.
Construida con **React 19 + Vite + TypeScript** y estilos CSS modernos (Mobile First).

> El nombre de la marca, los precios, los contactos y los testimonios son datos ficticios
> centralizados en archivos de configuración para poder cambiarlos fácilmente.

## Requisitos

- Node.js 18+ y npm

## Instalar y ejecutar

```bash
npm install
npm run dev        # servidor de desarrollo con HMR
npm run build      # typecheck (tsc -b) + build de producción
npm run lint       # oxlint (no ESLint)
npm run preview    # sirve el build de producción
```

No hay framework de tests. La verificación es `npm run lint` + `npm run build`.

## Estructura del proyecto

```
src/
├── components/          # Secciones de la landing (una carpeta por sección)
│   ├── Header/          # Sticky, menú móvil, smooth scroll
│   ├── Hero/
│   ├── Courts/          # Las 3 canchas + sistema de disponibilidad (loading/error/vacío)
│   ├── Benefits/
│   ├── Services/
│   ├── HowItWorks/
│   ├── Pricing/
│   ├── Gallery/         # Grid + lightbox (teclado: ← → Esc)
│   ├── Testimonials/    # Carrusel responsive
│   ├── FAQ/             # Acordeón accesible
│   ├── CTASection/
│   ├── BookingForm/     # Formulario con validaciones y estados
│   ├── Footer/
│   ├── FloatActions/    # Botón WhatsApp + botón "Asistente Pickle" (AI-UX)
│   └── UI/              # Primitivas reutilizables (Button, SectionHead, Logo, SmartImage)
├── data/                # Datos mock y configuración (ver abajo)
├── services/            # Capa para futura API (getCourts, getAvailability, createBooking…)
├── hooks/               # useReveal, useScrollY, useLockBodyScroll, useEscape
├── utils/               # validaciones y formato
├── assets/              # (fallback de imágenes)
├── App.tsx              # Ensambla todas las secciones
└── index.css            # Design system (tokens, botones, formularios, reveal)
```

## Cómo modificar la información

### Marca y contacto (nombre, teléfono, WhatsApp, redes, dirección)

Edita `src/data/site.ts`. Todo el sitio se alimenta desde ahí:

- `name`, `shortName`, `tagline`
- `phone` / `phoneDisplay` / `email`
- `whatsapp` (número con código de país, sin `+` ni espacios) y `whatsappMessage`
- `socials` (URLs de Instagram, Facebook, TikTok)

El botón flotante de WhatsApp usa `whatsapp` + `whatsappMessage` automáticamente.

### Precios

Edita `src/data/pricing.ts`. Cada plan tiene `price`, `unit` y `features`.
La moneda se configura con `currency` en `src/data/site.ts`.

### Canchas y disponibilidad

- `src/data/courts.ts` — las 3 canchas (capacidad, superficie, iluminación, características, precio, imagen).
- `src/data/availability.ts` — horarios y estados (`available` / `partial` / `unavailable`).
  Los estados se muestran con verde / amarillo / rojo **y** texto (no solo color).

### Servicios, beneficios, testimonios, FAQ y galería

Cada sección tiene su archivo en `src/data/` (`services.ts`, `benefits.ts`,
`testimonials.ts`, `faq.ts`, `gallery.ts`). Los testimonios son contenido de demostración.

### Imágenes

Las fotos se cargan desde Unsplash a través de `src/data/images.ts`.
Para usar tus propias fotos:

1. Colócalas en `public/` (o impórtalas en el componente).
2. Reemplaza la URL en el archivo de datos correspondiente (p. ej. `courts.ts`).

Si una imagen no carga (por ejemplo sin internet), se muestra automáticamente una
ilustración de respaldo local (`public/assets/court-fallback.svg`) gracias a
`SmartImage`.

## Preparado para una API real

La capa de servicios en `src/services/` aísla la lógica de datos de los componentes:

- `courtService.ts` → `getCourts()` y `getAvailability(courtId)`
- `bookingService.ts` → `createBooking(payload)`
- `contactService.ts` → `sendContactMessage(payload)`

Hoy devuelven datos mock con un pequeño retardo. Para conectar una API REST,
reemplaza el cuerpo de cada función por `fetch(...)` manteniendo la misma firma
(promesa + tipos). Los componentes no necesitarán cambios.

### Preselección de cancha/horario

Las tarjetas de cancha y los horarios disponibles emiten el evento `pb:select-court`
(`{ courtId, time? }`) que el formulario de reserva escucha para rellenar los campos.
Esto permite preseleccionar cancha y hora desde cualquier punto del sitio sin dependencias
de rutas.

## Notas técnicas

- TypeScript estricto: `verbatimModuleSyntax` (usa `import type`), `erasableSyntaxOnly`
  (nada de enums), `noUnusedLocals`/`noUnusedParameters`. Los imports relativos llevan
  extensión explícita (`./App.tsx`).
- `prefers-reduced-motion` desactiva animaciones para usuarios que lo prefieren.
- Accesibilidad: HTML semántico, un solo `h1`, labels en el formulario, foco visible,
  ARIA en menú/acordeón/lightbox, navegación con teclado y skip link.
- SEO: title y meta description en `index.html`.