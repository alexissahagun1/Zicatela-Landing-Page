import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const carousel = readFileSync(
  resolve(root, "app/components/PropertyCarousel.tsx"),
  "utf8",
);

test("property carousel keeps its image slides mounted through Embla", () => {
  assert.match(carousel, /from "@\/components\/ui\/carousel"/);
  assert.match(carousel, /<Carousel\b/);
  assert.match(carousel, /<CarouselContent\b/);
  assert.match(carousel, /<CarouselItem\b/);
  assert.match(carousel, /duration: prefersReducedMotion \? 0 : 35/);
  assert.match(carousel, /loading="eager"/);
  assert.doesNotMatch(carousel, /key=\{`outgoing-/);
  assert.doesNotMatch(carousel, /transition-opacity/);
});

test("property carousel labels its controls through a valid group role", () => {
  assert.match(carousel, /role="group"/);
  assert.match(carousel, /aria-label=\{language === "es"/);
});

test("property carousel aligns reversed desktop controls beneath the image", () => {
  assert.match(carousel, /isImageLeft \? "" : "ml-auto"/);
  assert.match(carousel, /lg:w-\[calc\(\(100%_-_3rem\)_\/_2\)\]/);
});

test("property carousel skips visual motion for reduced-motion users", () => {
  assert.match(carousel, /prefers-reduced-motion/);
  assert.match(carousel, /duration: prefersReducedMotion \? 0 : 35/);
  assert.match(carousel, /mediaQuery\.addEventListener\("change"/);
});
