import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const page = readFileSync(resolve(root, "app/casa-palmas/page.tsx"), "utf8");
const layout = readFileSync(resolve(root, "app/casa-palmas/layout.tsx"), "utf8");

const palmasSlides = [
  "palmas-i-01.jpg",
  "palmas-i-02.jpg",
  "palmas-i-03.jpg",
  "palmas-i-04.jpg",
  "palmas-i-05.jpg",
  "palmas-i-06.jpg",
  "palmas-i-07.jpg",
  "palmas-i-08.jpg",
  "palmas-i-09.jpg",
  "palmas-ii-01.jpg",
  "palmas-ii-02.jpg",
  "palmas-ii-03.jpg",
  "palmas-ii-04.jpg",
  "palmas-ii-05.jpg",
  "palmas-ii-06.jpg",
  "palmas-ii-07.jpg",
  "palmas-ii-08.jpg",
  "palmas-ii-09.jpg",
];

test("Casa Palmas keeps Figma photos as horizontal carousel slides", () => {
  assert.doesNotMatch(page, /\/CasaPalmasI\.png|\/CasaPalmasII\.png/);
  assert.match(page, /\/figma\/casa-palmas\/hero\.jpg/);
  assert.match(layout, /\/figma\/casa-palmas\/hero\.jpg/);

  for (const slide of palmasSlides) {
    const path = `/figma/casa-palmas/${slide}`;
    assert.match(page, new RegExp(path.replaceAll(".", "\\.")));
    assert.ok(
      existsSync(resolve(root, `public${path}`)),
      `Missing direct Figma export: public${path}`,
    );
  }
});
