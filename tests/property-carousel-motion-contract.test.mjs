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
  assert.match(carousel, /loading=\{isNear\(index\) \? "eager" : "lazy"\}/);
  assert.doesNotMatch(carousel, /priority=/);
  assert.doesNotMatch(carousel, /key=\{`outgoing-/);
  assert.doesNotMatch(carousel, /transition-opacity/);
});

test("property carousel labels its controls through a valid group role", () => {
  assert.match(carousel, /role="group"/);
  assert.match(carousel, /aria-label=\{language === "es"/);
});

test("property carousel follows Figma frames 2011:90 / 2011:237", () => {
  assert.match(carousel, /md:w-\[58\.333vw\]/);
  assert.match(carousel, /md:aspect-\[1120\/754\]/);
  assert.match(carousel, /isImageLeft \? "md:pl-\[13\.54vw\]" : "md:mr-auto md:pl-\[11\.98vw\]"/);
  assert.match(carousel, />\s*Prev\s*</);
  assert.match(carousel, /language === "es" \? "Sig" : "Next"/);
});

test("property carousel skips visual motion for reduced-motion users", () => {
  assert.match(carousel, /prefers-reduced-motion/);
  assert.match(carousel, /duration: prefersReducedMotion \? 0 : 35/);
  assert.match(carousel, /mediaQuery\.addEventListener\("change"/);
});
