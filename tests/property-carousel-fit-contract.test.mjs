import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const carousel = readFileSync(resolve(root, "app/components/PropertyCarousel.tsx"), "utf8");

test("property carousel contains each photograph without cropping it", () => {
  assert.match(carousel, /object-contain/);
  assert.doesNotMatch(carousel, /casa-zii-carousel-image[^\n]*object-cover/);
});
