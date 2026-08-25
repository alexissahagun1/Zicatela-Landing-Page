import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("mobile header has explicit compact logo, reserve button and tap-safe menu", async () => {
  const nav = await readFile("app/components/NavigationBar.tsx", "utf8");
  const logo = await readFile("app/components/Logo.tsx", "utf8");

  assert.match(nav, /h-16/);
  assert.match(nav, /h-11 w-11/);
  assert.match(nav, /h-\[38px\] w-\[96px\]/);
  assert.match(logo, /h-\[42px\] w-\[88px\]/);
  assert.doesNotMatch(logo, /scale-75/);
});
