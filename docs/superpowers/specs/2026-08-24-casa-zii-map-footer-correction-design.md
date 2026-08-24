# Casa Zii Map and Footer Correction Design

**Date:** 2026-08-24
**Status:** Approved for implementation planning
**Scope:** Shared location section and shared footer

## Sources of truth

- Footer: Figma file `2lNQfVwXyb9q3PlVs6yhgP`, node `29:373`.
- Casa Palmas location: `15.831041, -97.040609` from the supplied Google Maps destination.
- Casa Campeche location: `15.8315562, -97.0404726` from the supplied Google Maps destination.
- Product constraint: one interactive map, both exact locations, no route, no mock pins, and no paid API.

These requirements supersede the older footer node `131:91`, the illustrated map, and the Google Directions iframe documented previously.

## Map

Use one public Google My Maps embed. The custom map contains exactly two place markers:

- `CASA PALMAS` at `15.831041, -97.040609`.
- `CASA CAMPECHE` at `15.8315562, -97.0404726`.

The initial camera shows the Zicatela and La Punta area rather than fitting tightly to the short distance between the houses. The map is interactive and must not render a route. The embed remains lazy-loaded, has a useful accessible title, fills its container, and cannot create horizontal page overflow.

The existing supplied Google Maps destination links remain available for opening each property directly. The implementation does not request or expose a Google Maps API key and does not require billing.

Creating the public My Maps document is a one-time content operation. Its generated embed URL is stored as a named constant in the map component; the exact property coordinates and direct destination URLs remain visible beside it in source.

## Footer

Rebuild the shared footer from Figma node `29:373`, adapting the fixed desktop canvas into a responsive component without changing its visual hierarchy.

Desktop composition:

- White footer, approximately `1280 × 372` at the Figma reference width.
- Instagram icon and `CASA ZII` centered near the top.
- Left column contains two address groups:
  - `Casa Zii Palmas`
  - `Calle de la Paloma S/N, Brisas de Zicatela`
  - `Puerto Escondido, Oaxaca.`
  - `Casa Zii Campeche`
  - `Calle Campeche S/N, Brisas de Zicatela`
  - `Puerto Escondido, Oaxaca.`
- Right column contains `FAQs`, `AVISO DE PRIVACIDAD`, and `TÉRMINOS Y CONDICIONES` in the positions and typographic hierarchy shown in Figma.

Mobile composition stacks the same content in reading order: brand, properties, FAQs, then legal items. It preserves spacing and avoids absolute positioning that could overlap translated content.

Remove the old centered reservation button, reservation-centre copy, fake telephone number, and reservation email. No placeholder or invented content remains.

The footer continues to use the existing language context. Spanish and English copy express the same information. Instagram is an external link. FAQs and legal items use real routes if those routes exist; otherwise they render as honest text, not dead `#` links.

## Component boundaries

- `app/components/MapSection.tsx` owns the My Maps embed, exact location constants, direct destination links, and location presentation.
- `app/components/Footer.tsx` owns only the Figma footer composition and localized footer copy.
- Documentation is updated to point to the new Figma file/node and the My Maps architecture.

No booking, Guesty, navigation, gallery, property-page, or API behavior changes are included.

## Failure handling

- If the My Maps embed is unavailable, the visible address blocks and direct Google Maps links still let visitors reach both properties.
- The iframe uses native lazy loading and a restrictive referrer policy.
- No hidden synthetic markers or fallback image imply that the map is interactive when it is not.

## Verification

1. Confirm the embed displays one map, two named markers, no route, and a Zicatela-area initial view.
2. Compare the desktop footer against Figma node `29:373` at 1280 px width.
3. Check footer and map at mobile width for overflow, overlap, and readable order.
4. Verify both direct Google Maps links open their supplied destinations.
5. Verify Spanish/English footer copy.
6. Run TypeScript, production build, and whitespace checks.
7. Close any browser automation session and confirm it left no runaway headless Chrome process.

## Acceptance criteria

- Exactly one interactive location map is rendered.
- Both markers use the supplied exact coordinates and are not connected by a route.
- The implementation requires no paid API or API key.
- The footer matches the content and hierarchy of Figma node `29:373`.
- No fake phone number, fake email, placeholder, old booking CTA, or stale footer content remains.
- Desktop and mobile layouts remain usable and free of horizontal overflow.
