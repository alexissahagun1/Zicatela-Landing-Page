import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("hero presents the Casa Palmas micro-signature over the cinematic video", async () => {
  const hero = await readFile("app/components/HeroSection.tsx", "utf8");
  const styles = await readFile("app/globals.css", "utf8");

  assert.match(hero, /Casa Palmas/);
  assert.match(hero, /casa-zii-palmas-hero-loop\.mp4/);
  assert.match(hero, /<h1/);
  assert.match(hero, /tracking-\[0\.22em\]/);
  assert.doesNotMatch(hero, /Casa<br \/>Zii/);
  assert.doesNotMatch(hero, /La Punta · Puerto Escondido|Villas de lujo en Zicatela/);
  assert.match(styles, /casaZiiHeroBreath/);
  assert.match(styles, /prefers-reduced-motion/);
});
