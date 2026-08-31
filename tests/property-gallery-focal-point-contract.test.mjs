import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const gallery = readFileSync(resolve(root, "app/components/PropertyGallery.tsx"), "utf8");
const campeche = readFileSync(resolve(root, "app/casa-campeche/page.tsx"), "utf8");

test("Casa Campeche hero keeps the pool in the lower part of its crop", () => {
  assert.match(campeche, /objectPosition="center 90%"/);
  assert.match(gallery, /objectPosition\?: string/);
  assert.match(gallery, /style=\{\{ objectPosition \}\}/);
});
