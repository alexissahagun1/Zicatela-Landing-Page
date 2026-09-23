import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const house = readFileSync(resolve(root, "app/components/HousePage.tsx"), "utf8");
const palmas = readFileSync(resolve(root, "app/casa-palmas/page.tsx"), "utf8");

test("house heroes keep the Figma crop and centre the brand symbol", () => {
  // Figma 2011:238 crops the Palmas photo to 16:9 and shifts it up 3.52%: ≈40% of the cover overflow.
  assert.match(palmas, /objectPosition: "center 40%"/);
  assert.match(house, /objectPosition\?: string/);
  assert.match(house, /objectPosition: hero\.objectPosition \?\? "center"/);
  assert.match(house, /left-1\/2 top-1\/2/);
});
