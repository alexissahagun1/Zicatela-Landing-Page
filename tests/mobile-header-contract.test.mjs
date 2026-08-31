import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("mobile header has explicit compact logo, reserve button and tap-safe menu", async () => {
  const nav = await readFile("app/components/NavigationBar.tsx", "utf8");
  const logo = await readFile("app/components/Logo.tsx", "utf8");

  assert.match(nav, /h-20/);
  assert.match(nav, /md:h-\[96px\]/);
  assert.match(nav, /h-11 w-11/);
  assert.match(nav, /h-\[38px\] w-\[96px\]/);
  assert.match(logo, /h-\[42px\] w-\[88px\]/);
  assert.match(logo, /LogoCasaZii@4x\.png/);
  assert.doesNotMatch(logo, /scale-75/);
  assert.match(nav, /aria-hidden=\{!isMobileMenuOpen\}/);
  assert.match(nav, /tabIndex=\{isMobileMenuOpen \? 0 : -1\}/);
  assert.equal(
    (nav.match(/onClick=\{openDirectReservation\}/g) ?? []).length,
    1,
    "only the header reserve control belongs in NavigationBar; the sticky bar owns the other one",
  );
  assert.match(nav, /lastScrollY/);
  assert.match(nav, /scrollDirection|isHeaderVisible/);
  assert.match(nav, /transition-transform/);
  assert.match(nav, /scrollThreshold = 5/);
  assert.match(nav, /currentScrollY <= 0/);
  assert.match(nav, /duration-\[350ms\]/);
  assert.match(nav, /ease-\[ease\]/);
  assert.match(nav, /-translate-y-full/);
});
