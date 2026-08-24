# Casa Zii Sticky Booking Bar and Language Switch Design

## Context

The Casa Zii site needs a persistent reservation affordance inspired by the compact booking strip on Notto's Spanish homepage. The navigation also currently labels the language switch with the active language, which makes the control ambiguous, and the main menu should no longer expose Prensa.

## Approved design

Add a compact, fixed reservation bar at the bottom of the viewport on every public page except `/booking`, where the full booking search already owns the page. The bar will use Casa Zii's existing white, black, and rust palette, remain above page content with a restrained shadow, and provide a direct link to the booking flow. On desktop it will show the guest and promotion summaries plus the reservation CTA; on mobile it will collapse to the guest summary and CTA so it does not consume the viewport.

Update both desktop and mobile language controls to show the destination language: `English` with the English flag while Spanish is active, and `Español` with the Mexico flag while English is active. Add an accessible label describing the action. Remove the Prensa link from the desktop and mobile navigation only; keep the existing page and footer content available.

## Architecture

Create a focused client component, `StickyBookingBar`, that reads the shared `LanguageContext`, hides itself on `/booking`, and links to `/booking`. Mount it once inside the root `LanguageProvider` so it is available across routes without duplicating page markup. Keep `NavigationBar` responsible for navigation and language presentation; do not change the language state model.

## Interaction and responsive behavior

- The reservation bar is fixed to the bottom edge, has a clear landmark label, and uses a z-index below the open mobile menu.
- Desktop shows `QUIÉN`/`WHO`, `PROMOCIÓN`/`PROMOTION`, and `RESERVAR`/`BOOK NOW` in one horizontal strip.
- Mobile shows the guest summary and CTA in one compact row; the whole control links to `/booking`.
- The bar is not rendered on `/booking` to avoid duplicating the full search form.
- The language button swaps both its label and flag to the language it will activate.
- The menu no longer renders a Prensa/Press link in either desktop or mobile navigation.

## Non-goals

- Do not remove the `/prensa` route or its footer reference.
- Do not change the Guesty booking APIs or the existing full booking form.
- Do not add a new language-routing system; the existing in-memory context remains the source of truth.

## Acceptance criteria

1. On `/homepage`, `/casa-campeche`, `/casa-palmas`, `/contact`, and other public routes, the reservation strip remains visible while scrolling and links to `/booking`.
2. The strip is absent from `/booking`.
3. At desktop width, the strip includes guest, promotion, and reservation CTA labels; at mobile width it remains compact and usable.
4. Spanish active shows `English` and the English flag; English active shows `Español` and the Mexico flag, in desktop and mobile controls.
5. `Prensa`/`PRESS` is absent from the main navigation at both breakpoints.
6. `npm run build` succeeds and no whitespace errors are reported by `git diff --check`.

## Validation

Use a real browser at desktop and mobile viewport sizes to verify fixed positioning, route visibility, language-toggle labels, menu contents, and the booking link. Finish with the production build and whitespace checks.
