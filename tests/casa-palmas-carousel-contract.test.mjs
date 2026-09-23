import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "app/casa-palmas/page.tsx"), "utf8");
const layout = readFileSync(resolve(root, "app/casa-palmas/layout.tsx"), "utf8");


test("Casa Palmas keeps Figma photos as horizontal carousel slides", () => {
  assert.doesNotMatch(page, /\/CasaPalmasI\.png|\/CasaPalmasII\.png/);
  // Figma 2011:237: hero photo with the ▲ brand symbol.
  assert.match(page, /\/figma\/latest\/hero-palmas\.jpg/);
  assert.match(page, /symbol-palmas-triangle\.svg/);
  assert.match(layout, /\/figma\/latest\/hero-palmas\.jpg/);

  assert.match(page, /images: palmasI\b/);
  assert.match(page, /images: palmasII\b/);
  const manifest = readFileSync(resolve(root, "lib/gallery-photos.ts"), "utf8");
  const slides = [...manifest.matchAll(/src: "(\/figma\/casa-palmas\/[^"]+)"/g)].map((m) => m[1]);
  assert.equal(slides.length, 37);
  for (const path of slides) {
    assert.ok(existsSync(resolve(root, `public${path}`)), `Missing gallery photo: public${path}`);
  }
});
