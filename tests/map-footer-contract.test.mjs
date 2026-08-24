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
  assert.doesNotMatch(map, /maps\/d\/embed/);
  assert.doesNotMatch(map, /saddr|daddr/);
  assert.match(lazyGoogleMap, /onClick=\{activateMap\}/);
  assert.match(lazyGoogleMap, /Ver mapa interactivo/);
  const activateMapStart = lazyGoogleMap.indexOf(
    "const activateMap = async () => {",
  );
  assert.notEqual(activateMapStart, -1);
  const activateMapEnd = lazyGoogleMap.indexOf("\n  };", activateMapStart);
  assert.notEqual(activateMapEnd, -1);
  const activateMapHandlerSource = lazyGoogleMap.slice(
    activateMapStart,
    activateMapEnd + "\n  };".length,
  );
  assert.match(
    activateMapHandlerSource,
    /await import\("\.\/GoogleMapsRuntime"\)/,
  );
  assert.doesNotMatch(lazyGoogleMap, /IntersectionObserver|useEffect/);
  assert.doesNotMatch(lazyGoogleMap, /maps\.googleapis\.com\/maps\/api\/js/);
  assert.match(googleMapsRuntime, /NEXT_PUBLIC_GOOGLE_MAPS_API_KEY/);
  assert.match(googleMapsRuntime, /maps\.googleapis\.com\/maps\/api\/js/);
  assert.doesNotMatch(googleMapsRuntime, /libraries=/);
  assert.match(googleMapsRuntime, /new google\.maps\.Map/);
  assert.match(googleMapsRuntime, /new google\.maps\.Marker/);
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

test("renderGoogleMap waits for authenticated map readiness after markers", () => {
  const renderGoogleMapStart = googleMapsRuntime.indexOf(
    "export async function renderGoogleMap(",
  );
  const renderGoogleMapSource = googleMapsRuntime.slice(renderGoogleMapStart);
  const markerIndex = renderGoogleMapSource.indexOf("new google.maps.Marker");
  const readinessIndex = renderGoogleMapSource.indexOf(
    "await waitForMapReady(google, map);",
  );

  assert.notEqual(markerIndex, -1);
  assert.ok(readinessIndex > markerIndex);
});

test("Google Maps is not constructed in a detached element", () => {
  assert.match(googleMapsRuntime, /if \(!element\.isConnected\)/);
});

test("lazy map state updates stay bounded to the connected captured element", () => {
  const activateMapStart = lazyGoogleMap.indexOf(
    "const activateMap = async () => {",
  );
  const activateMapEnd = lazyGoogleMap.indexOf("\n  };", activateMapStart);
  const activateMapHandlerSource = lazyGoogleMap.slice(
    activateMapStart,
    activateMapEnd + "\n  };".length,
  );
  const connectedElementChecks = activateMapHandlerSource.match(
    /mapElementRef\.current === mapElement && mapElement\.isConnected/g,
  );

  assert.equal(connectedElementChecks?.length, 2);
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
