import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("hero uses the original Casa Zii beach photograph without a video asset", async () => {
  const hero = await readFile("app/components/HeroSection.tsx", "utf8");

  assert.match(hero, /import Image from "next\/image"/);
  assert.match(hero, /src="\/beach-hero\.png"/);
  assert.doesNotMatch(hero, /<video/);
  assert.doesNotMatch(hero, /casa-zii-palmas-hero-loop\.mp4/);
});
