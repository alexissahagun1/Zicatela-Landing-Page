import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("hero presents Casa Zii over the cinematic video without descriptive copy", async () => {
  const hero = await readFile("app/components/HeroSection.tsx", "utf8");
  const styles = await readFile("app/globals.css", "utf8");

  assert.match(hero, /Casa Zii/);
  assert.match(hero, /casa-zii-palmas-hero-loop\.mp4/);
  assert.match(hero, /<h1/);
  assert.doesNotMatch(hero, /La Punta · Puerto Escondido|Villas de lujo en Zicatela/);
  assert.match(styles, /casaZiiHeroBreath/);
  assert.match(styles, /prefers-reduced-motion/);
});
