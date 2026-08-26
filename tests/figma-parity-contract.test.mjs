import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const read = (file) => readFileSync(resolve(root, file), "utf8");
const navigation = read("app/components/NavigationBar.tsx");
const accommodation = read("app/components/AccommodationSection.tsx");
const gallery = read("app/components/ArchitecturalGallery.tsx");
const laPunta = read("app/components/LaPuntaSection.tsx");
const mainContent = read("app/components/MainContent.tsx");
const campeche = read("app/casa-campeche/page.tsx");
const palmas = read("app/casa-palmas/page.tsx");

test("landing sections preserve their measured Figma desktop geometry", () => {
  assert.match(accommodation, /max-w-\[954px\]/);
  assert.match(gallery, /max-w-\[1308px\]/);
  assert.match(laPunta, /max-w-\[1073px\]/);
  assert.match(laPunta, /lg:w-\[343px\].*lg:h-\[457px\]/);
  assert.match(mainContent, /font-\[family-name:var\(--font-courier\)\]/);
  assert.match(mainContent, /text-\[24px\]/);
  assert.match(mainContent, /<h1[^>]*>\s*\{currentContent\.title\}\s*<\/h1>/);
  assert.doesNotMatch(mainContent, /lg:text-5xl/);
});

test("shared chrome uses Courier Prime and removes obsolete navigation", () => {
  assert.doesNotMatch(navigation, /font-mono|Prensa|Solo para adultos/);
  assert.match(navigation, /font-\[family-name:var\(--font-courier\)\]/);
  assert.doesNotMatch(gallery, /console\.log/);
});

test("property routes keep the canonical interactive map and footer", () => {
  for (const page of [campeche, palmas]) {
    assert.match(page, /<MapSection \/>/);
    assert.match(page, /<Footer \/>/);
    assert.doesNotMatch(page, /Prensa|Solo para adultos/);
  }
});
