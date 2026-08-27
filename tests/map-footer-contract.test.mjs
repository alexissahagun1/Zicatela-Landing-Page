import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const footer = readFileSync(resolve(root, "app/components/Footer.tsx"), "utf8");
const map = readFileSync(resolve(root, "app/components/MapSection.tsx"), "utf8");
const lazyGoogleMap = readFileSync(
  resolve(root, "app/components/LazyGoogleMap.tsx"),
  "utf8",
);
const googleMapsRuntimePath = resolve(
  root,
  "app/components/GoogleMapsRuntime.ts",
);
const googleMapsRuntime = existsSync(googleMapsRuntimePath)
  ? readFileSync(googleMapsRuntimePath, "utf8")
  : "";
const nextConfig = readFileSync(resolve(root, "next.config.ts"), "utf8");
const layout = readFileSync(resolve(root, "app/layout.tsx"), "utf8");

test("footer follows the current Figma content and has no placeholder contact data", () => {
  assert.match(footer, /bg-white/);
  assert.match(footer, /Casa Zii Palmas/);
  assert.match(footer, /Casa Zii Campeche/);
  assert.match(footer, /<span>Casa Zii<\/span>/);
  assert.doesNotMatch(footer, /<span>CASA ZII<\/span>/);
  assert.match(footer, /text-\[15px\]/);
  assert.match(footer, /FAQs/);
  assert.match(footer, /md:left-\[81\.86%\] md:top-\[111px\]/);
  assert.match(footer, /w-\[172px\][^\n]*md:left-\[81\.86%\] md:top-\[192px\]/);
  assert.doesNotMatch(footer, /md:right-\[4\.71%\]/);
  assert.doesNotMatch(footer, /\+52 00 0000 0000/);
  assert.doesNotMatch(footer, /reservaciones@casazii\.com/);
  assert.doesNotMatch(footer, /CENTRO DE RESERVACIONES/);
});

test("map remains a single Google map with the two exact pins and no route", () => {
  assert.match(map, /<LazyGoogleMap/);
  assert.match(map, /15\.831041,-97\.040609/);
  assert.match(map, /15\.8315562,-97\.0404726/);
  assert.doesNotMatch(map, /maps\/d\/embed/);
  assert.doesNotMatch(map, /saddr|daddr/);
  assert.match(googleMapsRuntime, /NEXT_PUBLIC_GOOGLE_MAPS_API_KEY/);
  assert.match(googleMapsRuntime, /maps\.googleapis\.com\/maps\/api\/js/);
  assert.match(googleMapsRuntime, /libraries=marker/);
  assert.match(googleMapsRuntime, /NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID/);
  assert.match(googleMapsRuntime, /mapId:/);
  assert.match(googleMapsRuntime, /new google\.maps\.Map/);
  assert.match(googleMapsRuntime, /AdvancedMarkerElement/);
  assert.doesNotMatch(googleMapsRuntime, /new google\.maps\.Marker/);
});

test("map section is a centered contemporary visual without location copy or links", () => {
  assert.match(map, /mx-auto w-full max-w-\[640px\]/);
  assert.match(map, /section className="bg-white/);
  assert.doesNotMatch(map, /F4EFE6|E8E1D7/);
  assert.doesNotMatch(map, /Calle de la Paloma|Calle Campeche/);
  assert.doesNotMatch(map, /Abrir mapa|maps\.app\.goo\.gl|<a\b/);
});

test("map waits for nearby scroll, then initializes only once without an overlay", () => {
  assert.match(lazyGoogleMap, /useEffect/);
  assert.match(lazyGoogleMap, /new IntersectionObserver/);
  assert.match(lazyGoogleMap, /rootMargin:\s*["']0px 0px 240px 0px["']/);
  assert.match(lazyGoogleMap, /addEventListener\?\.\("scroll", syncViewport/);
  assert.match(lazyGoogleMap, /getBoundingClientRect/);
  assert.match(lazyGoogleMap, /hasInitializedRef\.current/);
  assert.match(lazyGoogleMap, /import\("\.\/GoogleMapsRuntime"\)/);
  assert.doesNotMatch(lazyGoogleMap, /<button\b|Ver mapa interactivo/);
  assert.doesNotMatch(lazyGoogleMap, /El mapa interactivo es opcional/);
  assert.doesNotMatch(lazyGoogleMap, /Cargando mapa/);
  assert.doesNotMatch(lazyGoogleMap, /E8E1D7|F4EFE6/);
});

test("the public map configuration is included in the client build", () => {
  assert.match(nextConfig, /NEXT_PUBLIC_GOOGLE_MAPS_API_KEY/);
  assert.match(nextConfig, /NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID/);
});

test("Google Maps readiness uses the API callback", () => {
  assert.match(googleMapsRuntime, /callback=__casaZiiGoogleMapsReady/);
  assert.doesNotMatch(googleMapsRuntime, /addEventListener\("load"/);
});

test("Google Maps authentication failures are handled and remain sticky", () => {
  assert.match(googleMapsRuntime, /gm_authFailure/);
  assert.match(googleMapsRuntime, /authFailureError/);
});

test("Google Maps keeps auth failure monitoring active for map readiness", () => {
  assert.match(
    googleMapsRuntime,
    /const authFailureSubscribers = new Set<\(error: Error\) => void>\(\)/,
  );
  assert.match(googleMapsRuntime, /authFailureSubscribers\.forEach/);
  assert.match(googleMapsRuntime, /authFailureSubscribers\.add/);
  assert.match(googleMapsRuntime, /authFailureSubscribers\.delete/);
  assert.doesNotMatch(googleMapsRuntime, /delete browserWindow\.gm_authFailure/);
  assert.doesNotMatch(
    googleMapsRuntime,
    /browserWindow\.gm_authFailure = previousAuthFailure/,
  );
});

test("Google Maps runtime listens once for the first map idle event", () => {
  assert.match(googleMapsRuntime, /addListenerOnce/);
  assert.match(
    googleMapsRuntime,
    /google\.maps\.event\.addListenerOnce\(map, "idle", handleIdle\)/,
  );
  assert.match(googleMapsRuntime, /idleListener\.remove\(\)/);
});

test("renderGoogleMap waits for authenticated map readiness after advanced markers", () => {
  const renderGoogleMapStart = googleMapsRuntime.indexOf(
    "export async function renderGoogleMap(",
  );
  const renderGoogleMapSource = googleMapsRuntime.slice(renderGoogleMapStart);
  const markerIndex = renderGoogleMapSource.indexOf("new google.maps.marker.AdvancedMarkerElement");
  const readinessIndex = renderGoogleMapSource.indexOf(
    "await waitForMapReady(google, map);",
  );

  assert.notEqual(markerIndex, -1);
  assert.ok(readinessIndex > markerIndex);
});

test("Google Maps is not constructed in a detached element", () => {
  assert.match(googleMapsRuntime, /if \(!element\.isConnected\)/);
});

test("nearby initialization only updates a connected captured element", () => {
  assert.match(
    lazyGoogleMap,
    /mapElementRef\.current === observedMapElement &&\s+observedMapElement\.isConnected/,
  );
});

test("empty map container is hidden until it is ready", () => {
  assert.match(
    lazyGoogleMap,
    /role=\{status === "ready" \? "application" : undefined\}/,
  );
  assert.match(
    lazyGoogleMap,
    /aria-label=\{status === "ready" \? title : undefined\}/,
  );
  assert.match(
    lazyGoogleMap,
    /aria-hidden=\{status === "ready" \? undefined : true\}/,
  );
});

test("the floating reservation bar remains mounted globally", () => {
  assert.match(layout, /<StickyBookingBar \/>/);
});
