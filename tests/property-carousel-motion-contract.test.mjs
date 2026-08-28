import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const carousel = readFileSync(
  resolve(root, "app/components/PropertyCarousel.tsx"),
  "utf8",
);

test("property carousel crossfades between loaded image layers", () => {
  assert.match(carousel, /const \[transition, setTransition\]/);
  assert.match(carousel, /transition-opacity/);
  assert.match(carousel, /duration-\[650ms\]/);
  assert.match(carousel, /ease-\[cubic-bezier\(0\.16,1,0\.3,1\)\]/);
  assert.match(carousel, /onTransitionEnd/);
  assert.match(carousel, /onLoad=.*markIncomingImageReady|markIncomingImageReady/);
});

test("property carousel queues a target while a transition is active", () => {
  assert.match(carousel, /queuedImageIndexRef/);
  assert.match(carousel, /transitionRef/);
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
  assert.match(carousel, /finishTransition\(imageIndex\)/);
});
