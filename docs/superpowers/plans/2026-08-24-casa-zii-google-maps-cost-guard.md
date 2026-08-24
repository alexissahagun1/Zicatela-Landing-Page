# Casa Zii Google Maps Cost Guard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the two-pin Google map while ensuring no Google Maps request occurs until a visitor explicitly activates it and the project remains mathematically below 10,000 monthly Dynamic Maps loads.

**Architecture:** Replace viewport-triggered initialization with a button-driven client component. Move the Google Maps loader and map construction into a dynamically imported runtime module so neither the Google script nor its loader code is fetched until activation. Keep the existing 250-load daily Cloud quota, restricted key, and direct destination links. Google Maps projects remain consolidated under the existing shared billing account; an account-wide zero-cost claim additionally requires aggregate hard quotas for every Maps project and billable SKU on that account.

**Tech Stack:** Next.js 15, React 19, TypeScript, Google Maps JavaScript API, Google Cloud Quotas API, Node test runner, Tailwind CSS.

---

## File structure

- `app/components/LazyGoogleMap.tsx`: activation panel, loading/error states, and dynamic import boundary.
- `app/components/GoogleMapsRuntime.ts`: singleton Google script loader and creation of one map with the supplied pins.
- `app/components/MapSection.tsx`: exact coordinates, addresses, center, and direct Google Maps links; no behavioral change.
- `tests/map-footer-contract.test.mjs`: source contracts for explicit activation, no automatic loading, two real pins, and no optional libraries.
- `DOCUMENTATION.md`: current cost-control behavior and shared-billing caveat.
- `docs/superpowers/specs/2026-08-24-casa-zii-map-footer-correction-design.md`: align the earlier map architecture note with explicit activation.

## Current implementation status (2026-08-24)

- [x] Explicit click-to-load boundary implemented; opening, hydrating, or scrolling the page does not request Google Maps.
- [x] One Maps JavaScript map with the two exact Casa Zii pins, no route, and direct location links implemented.
- [x] `zicatela` API key restrictions and effective `250` daily Maps JavaScript quota verified. This caps that project at `7,750` Dynamic Maps loads in a 31-day month, so the project cannot process its own 10,001st monthly load.
- [x] Tests, TypeScript, production build, initial HTML, HTTP response, and absence of a spawned headless browser verified.
- [ ] Billing-account-wide zero cost is not yet guaranteed. `zicatela` shares `012C70-4D8CB5-F1B87D` with `gen-lang-client-0908147005`; Maps JavaScript is enabled there with an unlimited daily quota, and Static Maps is also enabled.

Metrics for 2026-08-01 through 2026-08-24 showed zero Maps requests in both projects. This historical observation is not a hard cap and does not prove future zero cost. Budgets and billing alerts are likewise notifications, not enforcement boundaries.

Creating another Google Maps-related billing account is explicitly out of scope because Google identifies multiple Maps-related billing accounts as a Terms of Service violation. The compliant remaining work is to inventory and hard-cap aggregate Maps usage on the existing billing account. See the [Billing Account Violation FAQ](https://developers.google.com/maps/billing-account-violation), [pay-as-you-go aggregation rules](https://developers.google.com/maps/billing-and-pricing/pay-as-you-go), and [billing overview](https://developers.google.com/maps/billing-and-pricing/billing-overview).

Maps Embed remains free but does not meet the approved one-map/two-custom-pin design without the rejected Google My Maps presentation, so the implementation retains Maps JavaScript API.

### Task 1: Lock explicit activation with a failing contract test

**Files:**
- Modify: `tests/map-footer-contract.test.mjs`
- Test: `tests/map-footer-contract.test.mjs`

- [ ] **Step 1: Write the failing test**

Replace the current map contract setup and test with the following. The `existsSync` fallback ensures the expected failure is an assertion while `GoogleMapsRuntime.ts` does not yet exist.

```js
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const footer = readFileSync(resolve(root, "app/components/Footer.tsx"), "utf8");
const map = readFileSync(resolve(root, "app/components/MapSection.tsx"), "utf8");
const googleMap = readFileSync(
  resolve(root, "app/components/LazyGoogleMap.tsx"),
  "utf8",
);
const runtimePath = resolve(root, "app/components/GoogleMapsRuntime.ts");
const googleMapsRuntime = existsSync(runtimePath)
  ? readFileSync(runtimePath, "utf8")
  : "";
const layout = readFileSync(resolve(root, "app/layout.tsx"), "utf8");

test("footer follows the current Figma content and has no placeholder contact data", () => {
  assert.match(footer, /Casa Zii Palmas/);
  assert.match(footer, /Casa Zii Campeche/);
  assert.match(footer, /FAQs/);
  assert.doesNotMatch(footer, /\+52 00 0000 0000/);
  assert.doesNotMatch(footer, /reservaciones@casazii\.com/);
  assert.doesNotMatch(footer, /CENTRO DE RESERVACIONES/);
});

test("map loads Google only after explicit activation", () => {
  assert.match(map, /<LazyGoogleMap/);
  assert.match(map, /15\.831041,-97\.040609/);
  assert.match(map, /15\.8315562,-97\.0404726/);
  assert.doesNotMatch(map, /maps\/d\/embed|saddr|daddr/);

  assert.match(googleMap, /onClick=\{activateMap\}/);
  assert.match(googleMap, /Ver mapa interactivo/);
  assert.match(googleMap, /import\("\.\/GoogleMapsRuntime"\)/);
  assert.doesNotMatch(googleMap, /IntersectionObserver|useEffect/);
  assert.doesNotMatch(googleMap, /maps\.googleapis\.com\/maps\/api\/js/);

  assert.match(googleMapsRuntime, /NEXT_PUBLIC_GOOGLE_MAPS_API_KEY/);
  assert.match(
    googleMapsRuntime,
    /maps\.googleapis\.com\/maps\/api\/js/,
  );
  assert.doesNotMatch(googleMapsRuntime, /libraries=/);
  assert.match(googleMapsRuntime, /new google\.maps\.Map/);
  assert.match(googleMapsRuntime, /new google\.maps\.Marker/);
});

test("the floating reservation bar remains mounted globally", () => {
  assert.match(layout, /<StickyBookingBar \/>/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
npm test
```

Expected: FAIL in `map loads Google only after explicit activation` because `LazyGoogleMap.tsx` has no `onClick={activateMap}` and still contains `IntersectionObserver`/`useEffect`.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/map-footer-contract.test.mjs
git commit -m "test: require explicit Google Maps activation"
```

### Task 2: Move Google Maps behind an explicit dynamic-import boundary

**Files:**
- Create: `app/components/GoogleMapsRuntime.ts`
- Modify: `app/components/LazyGoogleMap.tsx`
- Test: `tests/map-footer-contract.test.mjs`

- [ ] **Step 1: Create the Google Maps runtime module**

Create `app/components/GoogleMapsRuntime.ts` with the complete loader and renderer:

```ts
export type LatLng = {
  lat: number;
  lng: number;
};

export type MapPin = {
  position: LatLng;
  title: string;
  label: string;
};

type GoogleMapOptions = {
  center: LatLng;
  zoom: number;
  mapTypeControl: boolean;
  streetViewControl: boolean;
  fullscreenControl: boolean;
  zoomControl: boolean;
  gestureHandling: "cooperative";
};

type GoogleMapInstance = object;

type GoogleMarkerOptions = {
  map: GoogleMapInstance;
  position: LatLng;
  title: string;
  label: {
    text: string;
    color: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
  };
};

type GoogleMapsApi = {
  maps: {
    Map: new (
      element: HTMLElement,
      options: GoogleMapOptions,
    ) => GoogleMapInstance;
    Marker: new (options: GoogleMarkerOptions) => object;
  };
};

type GoogleMapsWindow = Window & {
  google?: GoogleMapsApi;
};

let googleMapsPromise: Promise<GoogleMapsApi> | null = null;

function loadGoogleMaps(): Promise<GoogleMapsApi> {
  const browserWindow = window as GoogleMapsWindow;

  if (browserWindow.google?.maps) {
    return Promise.resolve(browserWindow.google);
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return Promise.reject(new Error("Google Maps API key is not configured."));
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  googleMapsPromise = new Promise<GoogleMapsApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.dataset.casaZiiGoogleMaps = "true";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async`;
    script.async = true;
    script.defer = true;
    script.addEventListener(
      "load",
      () => {
        const loadedGoogle = (window as GoogleMapsWindow).google;
        if (loadedGoogle?.maps) {
          resolve(loadedGoogle);
        } else {
          reject(new Error("Google Maps loaded without its maps namespace."));
        }
      },
      { once: true },
    );
    script.addEventListener(
      "error",
      () => reject(new Error("Google Maps failed to load.")),
      { once: true },
    );
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    googleMapsPromise = null;
    throw error;
  });

  return googleMapsPromise;
}

export async function renderGoogleMap(
  element: HTMLElement,
  center: LatLng,
  pins: MapPin[],
) {
  const google = await loadGoogleMaps();
  const map = new google.maps.Map(element, {
    center,
    zoom: 13,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true,
    gestureHandling: "cooperative",
  });

  pins.forEach((pin) => {
    new google.maps.Marker({
      map,
      position: pin.position,
      title: pin.title,
      label: {
        text: pin.label,
        color: "#222222",
        fontFamily: "Courier New, monospace",
        fontSize: "12px",
        fontWeight: "600",
      },
    });
  });
}
```

- [ ] **Step 2: Replace automatic activation with the button handler**

Replace `app/components/LazyGoogleMap.tsx` with:

```tsx
"use client";

import { useRef, useState } from "react";
import type { LatLng, MapPin } from "./GoogleMapsRuntime";

type LazyGoogleMapProps = {
  center: LatLng;
  pins: MapPin[];
  title: string;
};

export default function LazyGoogleMap({
  center,
  pins,
  title,
}: LazyGoogleMapProps) {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);
  const [status, setStatus] = useState<"waiting" | "loading" | "ready" | "error">(
    "waiting",
  );

  const activateMap = async () => {
    const mapElement = mapElementRef.current;
    if (!mapElement || hasInitializedRef.current || status === "loading") {
      return;
    }

    hasInitializedRef.current = true;
    setStatus("loading");

    try {
      const { renderGoogleMap } = await import("./GoogleMapsRuntime");
      await renderGoogleMap(mapElement, center, pins);
      setStatus("ready");
    } catch {
      hasInitializedRef.current = false;
      setStatus("error");
    }
  };

  return (
    <div className="relative h-[333px] min-h-[333px] w-full bg-[#E8E1D7]">
      <div
        ref={mapElementRef}
        className="h-full w-full"
        role="application"
        aria-label={title}
      />

      {status === "waiting" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#E8E1D7] px-8 text-center font-[family-name:var(--font-courier)]">
          <p className="text-xs uppercase tracking-[0.16em] text-[#222222]/65">
            Mapa interactivo de Casa Zii
          </p>
          <button
            type="button"
            onClick={activateMap}
            className="border border-[#222222] bg-transparent px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#222222] transition-colors hover:bg-[#222222] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#222222]"
          >
            Ver mapa interactivo
          </button>
        </div>
      ) : null}

      {status === "loading" ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#E8E1D7]/90 font-[family-name:var(--font-courier)] text-xs uppercase tracking-[0.16em] text-[#222222]/65"
          role="status"
          aria-live="polite"
        >
          Cargando mapa
        </div>
      ) : null}

      {status === "error" ? (
        <div
          className="absolute inset-0 flex items-center justify-center bg-[#E8E1D7] px-8 text-center font-[family-name:var(--font-courier)] text-xs leading-5 text-[#222222]/70"
          role="alert"
        >
          El mapa no está disponible. Abre cada ubicación usando los enlaces de
          Google Maps.
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: Run tests and type checking to verify GREEN**

Run:

```bash
npm test
npx tsc --noEmit --incremental false
```

Expected: all three Node tests PASS and TypeScript exits `0`.

- [ ] **Step 4: Commit the runtime boundary**

```bash
git add app/components/LazyGoogleMap.tsx app/components/GoogleMapsRuntime.ts
git commit -m "perf: load Google Maps only on demand"
```

### Task 3: Align documentation with click-to-load behavior

**Files:**
- Modify: `DOCUMENTATION.md`
- Modify: `docs/superpowers/specs/2026-08-24-casa-zii-map-footer-correction-design.md`

- [ ] **Step 1: Update the implementation notes**

In `DOCUMENTATION.md`, replace the viewport sentence with:

```md
- `LazyGoogleMap` does not load Google during page load or scrolling. It dynamically imports the Maps runtime and initializes one map only after a visitor presses `Ver mapa interactivo`. It requests no Places, Geocoding, Routes, or other optional billable libraries.
```

In the earlier correction spec, replace every reference to loading within `300px` of the viewport with explicit button activation. Preserve the exact quota, shared-billing caveat, coordinates, and direct links.

- [ ] **Step 2: Check for stale architecture claims**

Run:

```bash
rg -n "within 300px|IntersectionObserver|public Google My Maps|maps/d/embed" DOCUMENTATION.md docs/superpowers/specs app/components tests
```

Expected: no current architecture document or application file claims automatic viewport activation or My Maps usage. Historical implementation plans may retain past commands and must not be rewritten.

- [ ] **Step 3: Commit documentation**

```bash
git add DOCUMENTATION.md docs/superpowers/specs/2026-08-24-casa-zii-map-footer-correction-design.md
git commit -m "docs: document on-demand Maps loading"
```

### Task 4: Verify shared billing and establish aggregate hard enforcement

**Files:**
- No repository files

- [x] **Step 1: Verify the compliant billing topology**

Verified on 2026-08-24: `zicatela` and `gen-lang-client-0908147005` are linked to billing account `012C70-4D8CB5-F1B87D`. Both have Maps JavaScript enabled; the latter also has Static Maps enabled. Do not create or move `zicatela` to a second Maps-related billing account. Google requires Maps projects to be consolidated and aggregates monthly usage from projects linked to the billing account.

- [x] **Step 2: Record current usage without treating it as a guarantee**

Maps metrics for 2026-08-01 through 2026-08-24 showed zero requests in both projects. This verifies only the observed period. It does not constrain later requests, and billing budgets or alerts do not stop usage.

- [x] **Step 3: Verify the granted `zicatela` daily quota**

Run:

```bash
project_number="753666021411"
access_token="$(gcloud auth print-access-token)"
curl -fsS \
  -H "Authorization: Bearer $access_token" \
  -H "X-Goog-User-Project: zicatela" \
  "https://cloudquotas.googleapis.com/v1/projects/$project_number/locations/global/quotaPreferences/maps-js-daily-cap" |
  jq -e '.service == "maps-backend.googleapis.com" and .quotaId == "BillableDefaultPerDayPerProject" and .quotaConfig.preferredValue == "250" and .quotaConfig.grantedValue == "250"'
```

Expected: `true`, exit `0`.

- [x] **Step 4: Verify API-key restrictions without printing the key**

Run:

```bash
gcloud services api-keys describe \
  projects/753666021411/locations/global/keys/759d84f9-025d-4820-9ebf-d9a2bee6c68d \
  --project=zicatela \
  --format='json(displayName,restrictions)' |
  jq -e '
    .restrictions.apiTargets == [{"service":"maps-backend.googleapis.com"}] and
    (.restrictions.browserKeyRestrictions.allowedReferrers | length) == 5
  '
```

Expected: `true`, exit `0`; the API key string is never printed.

- [ ] **Step 5: Bound every project and SKU on the shared account**

Before claiming account-wide zero cost, inventory every Maps-enabled project and billable SKU on `012C70-4D8CB5-F1B87D`. Disable unused APIs or assign hard project quotas whose 31-day aggregate stays within each SKU's current monthly free usage cap.

For the known Dynamic Maps configuration, `zicatela` contributes at most `250 × 31 = 7,750` loads. If only `zicatela` and `gen-lang-client-0908147005` can generate Dynamic Maps, setting the latter to no more than `72` per day would bound their aggregate to `9,982` loads in a 31-day month. This number must be recalculated if another project can generate the SKU, a quota changes, or Google changes pricing/free usage caps. Static Maps and any other billable SKU require their own independent bound.

Expected: no Maps-enabled project has an unlimited relevant quota, and the sum of hard project bounds for every billable SKU remains within that SKU's current free usage cap.

### Task 5: Complete verification and leave the local server healthy

**Files:**
- Test: `tests/map-footer-contract.test.mjs`

- [ ] **Step 1: Stop the development server before building**

Stop only the known Casa Zii `next dev` session. Verify port 3000 is free:

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN
```

Expected: no listener before the build.

- [ ] **Step 2: Run the complete verification suite**

```bash
npm test
npx tsc --noEmit --incremental false
npm run build
git diff --check
```

Expected: tests PASS, TypeScript exits `0`, production build succeeds, and whitespace check produces no output.

- [ ] **Step 3: Restart development and verify HTTP**

Run `npm run dev` in a persistent terminal session, wait for `Ready`, then run:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/homepage
```

Expected: `200`.

- [ ] **Step 4: Confirm no automatic Maps request appears in server markup**

```bash
curl -sS http://127.0.0.1:3000/homepage |
  rg 'https://maps.googleapis.com/maps/api/js'
```

Expected: no match before client interaction.

- [ ] **Step 5: Confirm no runaway headless browser was created**

```bash
ps -axo pid=,pcpu=,command= |
  rg 'HeadlessChrome|chrome-headless-shell' |
  rg -v 'rg HeadlessChrome|rg chrome-headless-shell'
```

Expected: no process started by this implementation. Do not terminate unrelated browser or Electron processes.

- [ ] **Step 6: Commit final verification-only test adjustments if needed**

If verification required no source changes, do not create an empty commit. If a test-only correction was required:

```bash
git add tests/map-footer-contract.test.mjs
git commit -m "test: finalize Maps cost guard contract"
```

## Final acceptance state

- **Application and `zicatela` project:** accepted. Google loads only after explicit activation, and the granted `250` daily quota mathematically prevents `zicatela` from reaching 10,001 Dynamic Maps loads in a calendar month.
- **Complete billing account:** pending. Zero cost cannot be guaranteed while `gen-lang-client-0908147005` retains an unlimited Maps JavaScript quota or while any enabled Maps SKU lacks an aggregate hard bound.
- **Budgets and alerts:** informational only; they are not accepted as hard caps.
- **Billing topology:** keep Google Maps projects consolidated on the existing account. A second Maps-related billing account is not an accepted mitigation.
- **API choice:** retain Maps JavaScript API. Maps Embed is free but does not implement the approved two-custom-pin design without My Maps.
