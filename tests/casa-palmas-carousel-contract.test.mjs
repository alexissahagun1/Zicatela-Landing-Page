import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "app/casa-palmas/page.tsx"), "utf8");
const layout = readFileSync(resolve(root, "app/casa-palmas/layout.tsx"), "utf8");


test("Casa Palmas keeps Figma photos as horizontal carousel slides", () => {
  assert.doesNotMatch(page, /\/CasaPalmasI\.png|\/CasaPalmasII\.png/);
  assert.match(page, /\/figma\/casa-palmas\/hero\.jpg/);
  assert.match(layout, /\/figma\/casa-palmas\/hero\.jpg/);

  assert.match(page, /images=\{palmasI\}/);
  assert.match(page, /images=\{palmasII\}/);
  const manifest = readFileSync(resolve(root, "lib/gallery-photos.ts"), "utf8");
  const slides = [...manifest.matchAll(/src: "(\/figma\/casa-palmas\/[^"]+)"/g)].map((m) => m[1]);
  assert.equal(slides.length, 37);
  for (const path of slides) {
    assert.ok(existsSync(resolve(root, `public${path}`)), `Missing gallery photo: public${path}`);
  }
});
