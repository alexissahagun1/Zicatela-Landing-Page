# Casa Zii Google Maps Cost Guard Design

**Date:** 2026-08-24
**Status:** Application guard implemented; billing-account-wide guard pending
**Scope:** Google Maps loading behavior, project quota, shared-account governance, and failure handling

## Objective

Keep the Google Maps JavaScript implementation with the two exact Casa Zii locations while preventing the `zicatela` project from processing a 10,001st monthly Dynamic Maps load. The `zicatela` quota provides that project-level bound. It does not guarantee zero cost for the complete shared billing account unless every Maps project and billable SKU on that account is also bounded within its applicable free usage cap.

## Current constraints

- The map must remain Google Maps.
- One map contains exactly two real markers:
  - Casa Palmas: `15.831041, -97.040609`.
  - Casa Campeche: `15.8315562, -97.0404726`.
- The map must not draw a route or use mock markers.
- The floating reservation bar and Figma footer remain unchanged.
- Google Maps JavaScript requires an API key and a billing-enabled project.
- `zicatela` shares billing account `012C70-4D8CB5-F1B87D` with `gen-lang-client-0908147005`.
- Maps JavaScript API is enabled in both projects. The effective daily Maps JavaScript quota is `250` in `zicatela` and was unlimited in `gen-lang-client-0908147005` when verified on 2026-08-24. Static Maps is also enabled in the latter project.
- Google aggregates monthly usage across all projects linked to the billing account when applying usage tiers and free usage caps. Multiple Google Maps-related billing accounts are not a compliant isolation strategy and must not be created to avoid fees.
- Maps metrics for 2026-08-01 through 2026-08-24 showed zero requests in both projects. This is historical evidence only and does not constrain future usage.

## Architecture

### Explicit activation

`LazyGoogleMap` renders a neutral Casa Zii-styled panel with a `Ver mapa interactivo` button. No Google script or map request occurs during page load, hydration, scrolling, or viewport intersection.

The first explicit button press dynamically imports `GoogleMapsRuntime`. That runtime owns a module-level singleton loader so concurrent calls reuse the same Google script request within the current page session. After auth readiness, the runtime initializes one map and exactly two markers for the activated component.

The existing direct links to Casa Palmas and Casa Campeche remain available without activating the JavaScript map.

### Hard quota

The Google Cloud project `zicatela` has a granted effective `BillableDefaultPerDayPerProject` quota of `250` map loads per day. This limits the project to at most `7,750` loads in a 31-day calendar month, below the Dynamic Maps monthly free usage cap of `10,000`.

The granted Cloud quota is the enforcement boundary for project usage. The component must not treat its own error UI as the quota guard or claim that every exhausted-quota presentation is detectable in the browser.

### Shared billing account and compliant cost guard

Google's billing guidance requires Google Maps-related projects to remain consolidated under one billing account. Creating or maintaining a second Maps-related billing account to separate free usage is prohibited. The compliant strategy is to keep the projects on `012C70-4D8CB5-F1B87D` and bound their aggregate usage.

The `zicatela` project is already bounded to `250` daily Dynamic Maps loads, or at most `7,750` loads in a 31-day month. It therefore cannot process the 10,001st monthly Dynamic Maps load through its own quota. The billing account as a whole is not yet guaranteed to remain free because `gen-lang-client-0908147005` has an unlimited Maps JavaScript daily quota and can consume the remaining shared allowance.

Account-wide zero-cost acceptance requires all of the following:

- Inventory every project on `012C70-4D8CB5-F1B87D` that uses a Google Maps Platform API and every billable SKU it can generate.
- Disable unused Maps APIs or apply hard project quotas so the maximum aggregate monthly usage for each SKU remains within that SKU's current free usage cap. For Dynamic Maps, if only the two known projects can generate the SKU and `zicatela` remains at `250` per day, a daily cap no greater than `72` on `gen-lang-client-0908147005` bounds the 31-day aggregate to `9,982` loads. Any additional project or quota increase requires recalculating this bound.
- Independently cap or disable Static Maps and any other enabled billable Maps SKU; the Dynamic Maps quota does not protect those SKUs.
- Recheck official pricing and granted quotas after any Google pricing, SKU, API, project, or billing configuration change.

Budgets and billing alerts are monitoring controls, not hard spending caps. They may provide warning, but they cannot replace enforced service quotas in this acceptance test.

Google Maps Embed is free, but it does not satisfy the approved single-map design with two custom real-location pins without returning to the rejected Google My Maps presentation. The implementation therefore keeps Maps JavaScript API behind explicit visitor activation.

Official references:

- [Billing Account Violation FAQ](https://developers.google.com/maps/billing-account-violation)
- [Google Maps Platform pay-as-you-go pricing](https://developers.google.com/maps/billing-and-pricing/pay-as-you-go)
- [Google Maps Platform billing overview](https://developers.google.com/maps/billing-and-pricing/billing-overview)

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

During loading, the activation button is replaced by a loading overlay that announces `Cargando mapa`. After success, the map replaces the activation panel. Custom UI shows a concise error for failures it can observe: a missing API key, Google script/network failure, the documented `gm_authFailure`, a detached map container, or a timeout waiting for the first `idle` event.

Google does not expose a dependable client callback for every quota- or billing-related state that may leave a map darkened or watermarked. The component therefore does not claim to detect every quota exhaustion case. The granted `250`-per-day Cloud quota is the enforcement boundary, and the two direct Google Maps destination links remain visible in the activation, loading, success, and failure states.

## Component boundaries

- `MapSection.tsx` owns addresses, exact coordinates, destination links, center, and marker data.
- `LazyGoogleMap.tsx` owns the explicit button activation and activation/loading/error UI.
- `GoogleMapsRuntime.ts` owns the singleton Google loader, auth readiness, and creation of the map and its two markers.
- Google Cloud owns the hard quota and API-key restrictions.
- Google Cloud quotas across every Maps-enabled project on the shared billing account are the infrastructure prerequisite for an account-wide zero-charge guarantee.

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
- No repository or operations documentation claims that a separate Maps-related billing account is a valid isolation mechanism.
- The application-level acceptance criterion is satisfied: `zicatela` cannot process a 10,001st monthly Dynamic Maps load while its granted daily quota remains `250`.
- The billing-account-wide zero-charge criterion remains pending until every Maps-enabled project and billable SKU on `012C70-4D8CB5-F1B87D` has an aggregate hard bound within the corresponding free usage cap. The current zero-request metrics do not satisfy this future-use criterion.
- The two markers use the supplied coordinates and the map draws no route.
- Direct Google Maps links remain visible for all custom UI outcomes, including observable API failures; quota enforcement does not depend on the component detecting every exhausted-quota map state.
