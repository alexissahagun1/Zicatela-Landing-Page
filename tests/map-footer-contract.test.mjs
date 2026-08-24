import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const footer = readFileSync(resolve(root, "app/components/Footer.tsx"), "utf8");
const map = readFileSync(resolve(root, "app/components/MapSection.tsx"), "utf8");
const layout = readFileSync(resolve(root, "app/layout.tsx"), "utf8");

test("footer follows the current Figma content and has no placeholder contact data", () => {
  assert.match(footer, /Casa Zii Palmas/);
  assert.match(footer, /Casa Zii Campeche/);
  assert.match(footer, /FAQs/);
  assert.doesNotMatch(footer, /\+52 00 0000 0000/);
  assert.doesNotMatch(footer, /reservaciones@casazii\.com/);
  assert.doesNotMatch(footer, /CENTRO DE RESERVACIONES/);
});

test("map uses the public My Maps embed instead of a directions route", () => {
  assert.match(
    map,
    /https:\/\/www\.google\.com\/maps\/d\/embed\?mid=1dCV9ESC259QOIK4lcq_udz08L2uKZvg/,
  );
  assert.match(map, /15\.831041,-97\.040609/);
  assert.match(map, /15\.8315562,-97\.0404726/);
  assert.doesNotMatch(map, /saddr|daddr/);
});

test("the floating reservation bar remains mounted globally", () => {
  assert.match(layout, /<StickyBookingBar \/>/);
});
