import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const read = (file) => readFileSync(resolve(root, file), "utf8");
const press = read("app/prensa/page.tsx");
const architecturalGallery = read("app/components/ArchitecturalGallery.tsx");
const campecheLayout = read("app/casa-campeche/layout.tsx");

test("active media surfaces use real property photographs instead of legacy renders", () => {
  assert.doesNotMatch(press, /\/Rectangle(?:-[0-9]+)?\.png/);
  assert.doesNotMatch(
    architecturalGallery,
    /\/figma\/landing\/casa-campeche-(?:i|ii)\.jpg/,
  );
  assert.doesNotMatch(campecheLayout, /\/CasaCampecheI\.png/);

  for (const photograph of [
    "/figma/casa-campeche/right-03-pool.png",
    "/figma/casa-campeche/left-02-lounge.png",
    "/figma/casa-campeche/hero.jpg",
  ]) {
    assert.match(
      `${press}\n${architecturalGallery}\n${campecheLayout}`,
      new RegExp(photograph.replaceAll(".", "\\.")),
    );
  }
});
