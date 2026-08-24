# Casa Zii Map and Footer Correction Design

**Date:** 2026-08-24
**Status:** Implemented
**Scope:** Shared location section and shared footer

## Sources of truth

- Footer: Figma file `2lNQfVwXyb9q3PlVs6yhgP`, node `29:373`.
- Casa Palmas location: `15.831041, -97.040609` from the supplied Google Maps destination.
- Casa Campeche location: `15.8315562, -97.0404726` from the supplied Google Maps destination.
- Product constraint: one interactive map, both exact locations, no route, no mock pins, and a hard usage limit that bounds `zicatela` project usage and reduces charge risk. Because billing is currently shared, it cannot provide an absolute `$0` guarantee until `zicatela` is isolated as the only Dynamic Maps project on a dedicated billing account.

These requirements supersede the older footer node `131:91`, the illustrated map, and the Google Directions iframe documented previously.

## Map

Use one Google Maps JavaScript map. The browser key is read from `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, is restricted by HTTP referrer to the approved local and Casa Zii domains, and is not committed to the repository. The map contains exactly two markers:

- `CASA PALMAS` at `15.831041, -97.040609`.
- `CASA CAMPECHE` at `15.8315562, -97.0404726`.

The initial camera shows the Zicatela and La Punta area rather than fitting tightly to the short distance between the houses. The map is interactive and must not render a route. `LazyGoogleMap` presents a `Ver mapa interactivo` button and owns the activation, loading, and error UI. Only that button press dynamically imports `GoogleMapsRuntime`; the runtime then loads Google Maps and initializes one map with the two markers. Page load, hydration, scrolling, and viewport intersection do not load a Google script or make a map request. The loaded map has a useful accessible title, fills its container, and cannot create horizontal page overflow.

The existing supplied Google Maps destination links remain visible for opening each property directly. The project `zicatela` is linked to billing because Google Maps JavaScript API requires it, but its granted `BillableDefaultPerDayPerProject` quota is `250` effective map loads per day. That is at most `7,750` loads in a 31-day calendar month. The current billing account is shared, and Google aggregates Dynamic Maps usage across its projects, so this project limit is not an absolute `$0` guarantee. That guarantee requires `zicatela` to be the only Dynamic Maps project on a dedicated billing account. The implementation uses one restricted browser key and requests no optional Places, Geocoding, Routes, Static Maps, or Street View services or libraries.

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

- `app/components/MapSection.tsx` owns the exact location constants, direct destination links, and location presentation.
- `app/components/LazyGoogleMap.tsx` owns the explicit button activation and activation/loading/error UI.
- `app/components/GoogleMapsRuntime.ts` owns the singleton Google loader, auth readiness, and creation of the map and its two real markers.
- `app/components/Footer.tsx` owns only the Figma footer composition and localized footer copy.
- Documentation is updated to point to the new Figma file/node and the quota-protected Google Maps JavaScript architecture.

No booking, Guesty, navigation, gallery, property-page, or API behavior changes are included.

## Failure handling

- If the Maps JavaScript API is unavailable, the visible address blocks and direct Google Maps links still let visitors reach both properties.
- Custom UI reports failures it can observe, while the granted `250`-per-day Cloud quota remains the usage-enforcement boundary; Google does not expose a dependable client callback for every quota or billing state that can produce a darkened or watermarked map.
- No hidden synthetic markers or fallback image imply that the map is interactive when it is not.

## Verification

1. In a signed-out/private browser window, confirm no Google script or map request occurs before pressing `Ver mapa interactivo`, then confirm the button loads one map with two named markers, no route, and a Zicatela-area initial view.
2. Compare the desktop footer against Figma node `29:373` at 1280 px width.
3. Check footer and map at mobile width for overflow, overlap, and readable order.
4. Verify both direct Google Maps links open their supplied destinations.
5. Verify Spanish/English footer copy.
6. Run TypeScript, production build, and whitespace checks.
7. Close any browser automation session and confirm it left no runaway headless Chrome process.

## Acceptance criteria

- One explicit press of `Ver mapa interactivo` dynamically imports the runtime and initializes at most one interactive location map; loading, hydration, scrolling, and viewport intersection do not activate Google Maps.
- Both markers use the supplied exact coordinates and are not connected by a route.
- The implementation uses one restricted browser key, click-to-load initialization, and a granted 250-loads-per-day project quota to bound usage to at most 7,750 loads in a 31-day calendar month.
- An absolute `$0` guarantee requires `zicatela` to be the only Dynamic Maps project on a dedicated billing account.
- The footer matches the content and hierarchy of Figma node `29:373`.
- No fake phone number, fake email, placeholder, old booking CTA, or stale footer content remains.
- Desktop and mobile layouts remain usable and free of horizontal overflow.
