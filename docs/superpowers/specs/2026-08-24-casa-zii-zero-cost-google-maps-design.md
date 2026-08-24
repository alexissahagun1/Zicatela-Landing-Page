# Casa Zii Google Maps Cost Guard Design

**Date:** 2026-08-24
**Status:** Approved for implementation planning
**Scope:** Google Maps loading behavior, quota isolation, and failure handling

## Objective

Keep the Google Maps JavaScript implementation with the two exact Casa Zii locations while preventing the Casa Zii site from processing a 10,001st monthly Dynamic Maps load or generating a Maps charge.

## Current constraints

- The map must remain Google Maps.
- One map contains exactly two real markers:
  - Casa Palmas: `15.831041, -97.040609`.
  - Casa Campeche: `15.8315562, -97.0404726`.
- The map must not draw a route or use mock markers.
- The floating reservation bar and Figma footer remain unchanged.
- Google Maps JavaScript requires an API key and a billing-enabled project.
- The current billing account is shared with `gen-lang-client-0908147005`, which also has Maps JavaScript and Static Maps enabled. Because Google aggregates free usage by billing account and SKU, the shared account cannot provide an absolute zero-charge guarantee for Casa Zii.

## Architecture

### Explicit activation

`LazyGoogleMap` renders a neutral Casa Zii-styled panel with a `Ver mapa interactivo` button. Neither the Google Maps script nor a map instance is created during page load, hydration, scrolling, or viewport intersection.

The first explicit button press starts the Google Maps loader. The loader remains a module-level singleton so concurrent components and repeated presses reuse the same script request within the current page session. After the script resolves, the component creates one map and exactly two markers.

The existing direct links to Casa Palmas and Casa Campeche remain available without activating the JavaScript map.

### Hard quota

The Google Cloud project `zicatela` keeps the effective `BillableDefaultPerDayPerProject` quota at `250` map loads per day. This limits the project to at most `7,750` loads in any 31-day month, below the Dynamic Maps monthly free usage cap of `10,000`.

The quota is the enforcement boundary. When exhausted, Google rejects additional map initialization requests instead of allowing the site to continue beyond the project limit.

### Billing isolation

For a strict zero-charge guarantee, `zicatela` must use a billing account that does not contain another project consuming the Dynamic Maps SKU. The API key, enabled API, and daily quota remain in `zicatela`; only the billing-account association changes.

Until that isolation is complete, the site is strongly bounded but not guaranteed to cost zero because another project can consume the shared billing account's monthly free Dynamic Maps allowance.

### API restrictions

The Casa Zii browser key remains restricted to:

- Maps JavaScript API only.
- `http://localhost:3000/*`.
- `http://127.0.0.1:3000/*`.
- `https://zicatela-landing-page.vercel.app/*`.
- `https://casazii.com/*`.
- `https://www.casazii.com/*`.

The implementation does not load Places, Geocoding, Routes, Static Maps, Street View, or marker libraries.

## User experience

Before activation, the map panel clearly states that the interactive map is optional and displays one keyboard-accessible button. The panel is not presented as a loaded map and contains no fabricated map image.

During loading, the button is disabled and the panel announces `Cargando mapa`. After success, the map replaces the activation panel. If the API key is missing, the network fails, or the quota is exhausted, the panel shows a concise error and directs visitors to the two always-visible Google Maps destination links.

## Component boundaries

- `MapSection.tsx` owns addresses, exact coordinates, destination links, center, and marker data.
- `LazyGoogleMap.tsx` owns explicit activation, singleton script loading, map creation, marker creation, and error state.
- Google Cloud owns the hard quota and API-key restrictions.
- Billing-account isolation is an infrastructure prerequisite for the absolute zero-charge guarantee.

## Testing

Contract tests must prove that:

- The Google Maps script URL is absent from initial server markup.
- `IntersectionObserver` no longer activates the API.
- The loader is called only from the activation button handler.
- One map and two exact markers are created after activation.
- No optional Google Maps libraries are requested.
- The direct location links and floating reservation bar remain present.

Verification includes Node tests, TypeScript, a production build with no development server writing to `.next`, and HTTP `200` from the restarted local homepage. Browser verification must not leave a Chrome headless process running.

## Acceptance criteria

- No Google Maps request occurs merely because a visitor opens or scrolls the page.
- One explicit activation creates at most one map instance in that component.
- The project quota remains granted at `250` map loads per day.
- The project cannot mathematically reach `10,001` Dynamic Maps loads in a calendar month through this quota.
- The absolute zero-charge claim is made only after `zicatela` is isolated from other Dynamic Maps projects on its billing account.
- The two markers use the supplied coordinates and the map draws no route.
- Quota or API failures preserve usable direct Google Maps links.
