import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");

const figmaAssets = [
  "public/figma/landing/casa-campeche-i.jpg",
  "public/figma/landing/casa-campeche-ii.jpg",
  "public/figma/casa-campeche/hero.jpg",
  "public/figma/casa-campeche/campeche-i.png",
  "public/figma/casa-campeche/campeche-ii.jpg",
  "public/figma/casa-campeche/right-01-shower.png",
  "public/figma/casa-campeche/right-02-bedroom.png",
  "public/figma/casa-campeche/right-03-pool.png",
  "public/figma/casa-campeche/right-04-lounge.png",
  "public/figma/casa-campeche/right-05-portal.png",
  "public/figma/casa-campeche/right-06-dining.png",
  "public/figma/casa-campeche/right-07-kitchen.png",
  "public/figma/casa-campeche/right-08-bathroom.png",
  "public/figma/casa-campeche/left-01-kitchen.png",
  "public/figma/casa-campeche/left-02-lounge.png",
  "public/figma/casa-campeche/left-03-bathroom.png",
  "public/figma/casa-campeche/left-04-bedroom.png",
  "public/figma/casa-campeche/left-05-interior.jpg",
  "public/figma/casa-campeche/left-06-interior.jpg",
  "public/figma/casa-campeche/left-07-interior.jpg",
  "public/figma/casa-campeche/left-08-vertical.jpg",
];

test("all Casa Campeche photographs are present as local Figma exports", () => {
  for (const asset of figmaAssets) {
    assert.ok(existsSync(resolve(root, asset)), `Missing direct Figma export: ${asset}`);
  }
});
