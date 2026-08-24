# Casa Zii Google Maps Cost Guard Design

**Date:** 2026-08-24
**Status:** Approved for implementation planning
**Scope:** Google Maps loading behavior, quota isolation, and failure handling

## Objective

Keep the Google Maps JavaScript implementation with the two exact Casa Zii locations while preventing the `zicatela` project from processing a 10,001st monthly Dynamic Maps load. The project quota bounds Casa Zii usage, but an absolute `$0` guarantee additionally requires billing-account isolation.

## Current constraints

- The map must remain Google Maps.
- One map contains exactly two real markers:
  - Casa Palmas: `15.831041, -97.040609`.
  - Casa Campeche: `15.8315562, -97.0404726`.
- The map must not draw a route or use mock markers.
- The floating reservation bar and Figma footer remain unchanged.
- Google Maps JavaScript requires an API key and a billing-enabled project.
- The current billing account is shared with `gen-lang-client-0908147005`, which also has Maps JavaScript and Static Maps enabled. Because Google aggregates free usage by billing account and SKU, the shared account cannot provide an absolute zero-charge guarantee for Casa Zii; `zicatela` must be the only Dynamic Maps project on a dedicated account first.

## Architecture

### Explicit activation

`LazyGoogleMap` renders a neutral Casa Zii-styled panel with a `Ver mapa interactivo` button. No Google script or map request occurs during page load, hydration, scrolling, or viewport intersection.

The first explicit button press dynamically imports `GoogleMapsRuntime`. That runtime owns a module-level singleton loader so concurrent calls reuse the same Google script request within the current page session. After auth readiness, the runtime initializes one map and exactly two markers for the activated component.

The existing direct links to Casa Palmas and Casa Campeche remain available without activating the JavaScript map.

### Hard quota

The Google Cloud project `zicatela` has a granted effective `BillableDefaultPerDayPerProject` quota of `250` map loads per day. This limits the project to at most `7,750` loads in any 31-day month, below the Dynamic Maps monthly free usage cap of `10,000`.

The granted Cloud quota is the enforcement boundary for project usage. The component must not treat its own error UI as the quota guard or claim that every exhausted-quota presentation is detectable in the browser.

### Billing isolation

For a strict zero-charge guarantee, `zicatela` must be the only Dynamic Maps project on a dedicated billing account. The API key, enabled API, and daily quota remain in `zicatela`; only the billing-account association changes.

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

During loading, the button is disabled and the panel announces `Cargando mapa`. After success, the map replaces the activation panel. Custom UI shows a concise error for failures it can observe: a missing API key, Google script/network failure, the documented `gm_authFailure`, a detached map container, or a timeout waiting for the first `idle` event.

Google does not expose a dependable client callback for every quota- or billing-related state that may leave a map darkened or watermarked. The component therefore does not claim to detect every quota exhaustion case. The granted `250`-per-day Cloud quota is the enforcement boundary, and the two direct Google Maps destination links remain visible in the activation, loading, success, and failure states.

## Component boundaries

- `MapSection.tsx` owns addresses, exact coordinates, destination links, center, and marker data.
- `LazyGoogleMap.tsx` owns the explicit button activation and activation/loading/error UI.
- `GoogleMapsRuntime.ts` owns the singleton Google loader, auth readiness, and creation of the map and its two markers.
- Google Cloud owns the hard quota and API-key restrictions.
- Billing-account isolation is an infrastructure prerequisite for the absolute zero-charge guarantee.

## Testing

Contract tests must prove that:

- The Google Maps script URL is absent from initial server markup.
- `IntersectionObserver` no longer activates the API.
- The loader is called only from the activation button handler.
- `GoogleMapsRuntime` is dynamically imported only after that handler runs.
- One map and two exact markers are created after activation.
- No optional Google Maps libraries are requested.
- The direct location links and floating reservation bar remain present.
- Missing-key, script/network, `gm_authFailure`, detached-container, and first-`idle` timeout failures reach the custom error UI without asserting that every quota/billing map state is detectable.

Verification includes Node tests, TypeScript, a production build with no development server writing to `.next`, and HTTP `200` from the restarted local homepage. Browser verification must not leave a Chrome headless process running.

## Acceptance criteria

- No Google Maps request occurs merely because a visitor opens or scrolls the page.
- One explicit activation creates at most one map instance in that component.
- The project quota remains granted at `250` map loads per day.
- The project cannot mathematically reach `10,001` Dynamic Maps loads in a calendar month through this quota.
- The absolute zero-charge claim is made only after `zicatela` is the sole Dynamic Maps project on a dedicated billing account.
- The two markers use the supplied coordinates and the map draws no route.
- Direct Google Maps links remain visible for all custom UI outcomes, including observable API failures; quota enforcement does not depend on the component detecting every exhausted-quota map state.
