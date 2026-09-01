import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("hero presents Casa Zii over the licensed Ludwig Godefroy video", async () => {
  const hero = await readFile("app/components/HeroSection.tsx", "utf8");
  const styles = await readFile("app/globals.css", "utf8");

  assert.match(hero, /Casa Zii/);
  assert.match(hero, /casa-zii-hero-loop\.mp4/);
  assert.match(hero, /casa-zii-hero-poster\.jpg/);
  assert.match(hero, /<h1/);
  assert.match(hero, /preload="metadata"/);
  assert.doesNotMatch(hero, /La Punta · Puerto Escondido|Villas de lujo en Zicatela/);
  assert.match(styles, /casaZiiHeroBreath/);
  assert.match(styles, /prefers-reduced-motion/);

  await access("public/casa-zii-hero-loop.mp4");
  await access("public/casa-zii-hero-poster.jpg");
});
