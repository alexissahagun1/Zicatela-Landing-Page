import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const bookingPage = readFileSync(resolve(root, "app/booking/page.tsx"), "utf8");

test("booking route uses the canonical interactive map and verified addresses", () => {
  assert.match(bookingPage, /import MapSection from "\.\.\/components\/MapSection"/);
  assert.match(bookingPage, /<MapSection \/>/);
  assert.match(bookingPage, /Calle Campeche S\/N/);
  assert.match(bookingPage, /Calle de la Paloma S\/N/);
  assert.doesNotMatch(bookingPage, /\/Mapa\.png/);
  assert.doesNotMatch(bookingPage, /\+52 55 9999 9999|hola@casazii\.com|Calle PALMAS, sin Número/);
});
