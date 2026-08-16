# AGENTS.md

Single-page Vite + React 19 + TypeScript landing site for pickleball court rentals. No tests, no CI, no routing.

## Commands

- `npm run dev` — Vite dev server (HMR)
- `npm run build` — typecheck (`tsc -b` across `tsconfig.app.json` + `tsconfig.node.json` project references) then `vite build`. **There is no separate typecheck script; build IS the typecheck.**
- `npm run lint` — `oxlint` (not ESLint). Rules in `.oxlintrc.json` (react/typescript/oxc plugins).
- `npm run preview` — serve the production build.

There is no test framework or test script. Verification = `npm run lint` + `npm run build`.

## TypeScript quirks (all enforced at build time)

- `verbatimModuleSyntax` is on: type-only imports MUST use `import type`.
- `erasableSyntaxOnly` is on: no enums, namespaces, or parameter properties.
- `noUnusedLocals` / `noUnusedParameters` are on: unused imports/vars fail the build.
- `allowImportingTsExtensions` is on: relative imports in `src/` use explicit `.tsx`/`.ts` extensions (e.g. `./App.tsx`).
- `noEmit: true`; builds are type-check only, output comes from Vite.

## Architecture

- Entry: `src/main.tsx` → `src/App.tsx` (assembles section components in page order). Root HTML is repo-root `index.html` (SEO title/description live there).
- One folder per section under `src/components/<Section>/` with a `*.tsx` + co-located `*.css` (CSS is global once imported, keep class names scoped to the component).
- **Config/data lives in `src/data/`**: brand + contact/WhatsApp/socials in `site.ts`, prices in `pricing.ts`, courts + availability in `courts.ts`/`availability.ts`. Never hardcode brand name, prices, or contact details in components.
- **API-ready layer**: `src/services/` (`courtService.ts`, `bookingService.ts`, `contactService.ts`) currently return mock data with a delay; replace function bodies with `fetch` later, keeping signatures.
- **`pb:select-court` custom event** (`{ courtId, time? }`) dispatched from court cards/availability slots preselects the booking form fields. Don't change its contract without updating `BookingForm`.
- **Reveal animations**: `useReveal` (IntersectionObserver) adds `.is-revealed` to `[data-reveal]` descendants. Any section that uses `data-reveal` MUST also call `useReveal` on its `<section>` or the content stays invisible.
- **Images**: URLs built from Unsplash IDs in `data/images.ts`; `SmartImage` swaps to `public/assets/court-fallback.svg` on load error, so the site must not depend on network in dev.
- **Icons**: `lucide-react`. Brand icons (Instagram/Facebook/TikTok/WhatsApp) are NOT exported by this lucide version — the footer uses inline SVGs in `components/Footer/SocialIcons.tsx`; reuse those.
- Accessibility baseline to preserve: skip link, one `h1` (Hero), form labels, `aria-expanded` on header/FAQ/assistant, keyboard-driven lightbox (←/→/Esc), `prefers-reduced-motion` overrides in `index.css`.