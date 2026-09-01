import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const read = (file) => readFileSync(resolve(root, file), "utf8");
const navigation = read("app/components/NavigationBar.tsx");
const accommodation = read("app/components/AccommodationSection.tsx");
const gallery = read("app/components/ArchitecturalGallery.tsx");
const propertyCarousel = read("app/components/PropertyCarousel.tsx");
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
  assert.doesNotMatch(gallery, />\s*(Prev|Sig|Next)\s*</);
  assert.match(gallery, /\/figma\/casa-campeche\/right-03-pool\.png/);
  assert.match(gallery, /\/figma\/casa-campeche\/left-02-lounge\.png/);
  assert.match(gallery, /\/figma\/casa-palmas\/palmas-i-07\.jpg/);
  assert.match(gallery, /\/figma\/casa-palmas\/palmas-ii-06\.jpg/);
  assert.match(gallery, /Casa Palmas I/);
  assert.match(gallery, /Casa Palmas II/);
  assert.doesNotMatch(gallery, /\/CasaPalmas(?:I|II)\.png/);
  assert.doesNotMatch(gallery, /\/figma\/landing\/casa-campeche-(?:i|ii)\.jpg/);
  assert.match(gallery, /ChevronLeft/);
  assert.match(gallery, /ChevronRight/);
  assert.match(gallery, /\/casa-campeche#campeche-i/);
  assert.match(gallery, /\/casa-palmas#palmas-ii/);
  assert.match(gallery, /aria-current=\{index === activePage/);
});

test("property routes keep the canonical interactive map and footer", () => {
  for (const page of [campeche, palmas]) {
    assert.match(page, /<MapSection \/>/);
    assert.match(page, /<Footer \/>/);
    assert.doesNotMatch(page, /Prensa|Solo para adultos/);
  }
});

test("Casa Campeche keeps every Figma photograph inside static property carousels", () => {
  assert.match(campeche, /\/figma\/casa-campeche\/hero\.jpg/);
  assert.doesNotMatch(campeche, /\/CasaCampecheI\.png|\/CasaCampecheII\.png/);
  assert.doesNotMatch(campeche, /CasaCampecheSideGallery|Galería lateral/);
  assert.match(propertyCarousel, /<Carousel\b/);
  assert.match(propertyCarousel, /<CarouselContent\b/);
  assert.match(propertyCarousel, /<CarouselItem\b/);
  assert.doesNotMatch(propertyCarousel, /key=\{`outgoing-/);
  assert.doesNotMatch(propertyCarousel, /setInterval|autoplay|autoPlay/);

  const carouselPhotographs = [
    "\/figma\/casa-campeche\/campeche-i\\.png",
    "\/figma\/casa-campeche\/campeche-ii\\.jpg",
    "\/figma\/casa-campeche\/left-01-kitchen\\.png",
    "\/figma\/casa-campeche\/left-02-lounge\\.png",
    "\/figma\/casa-campeche\/left-03-bathroom\\.png",
    "\/figma\/casa-campeche\/left-04-bedroom\\.png",
    "\/figma\/casa-campeche\/left-05-interior\\.jpg",
    "\/figma\/casa-campeche\/left-06-interior\\.jpg",
    "\/figma\/casa-campeche\/left-07-interior\\.jpg",
    "\/figma\/casa-campeche\/left-08-vertical\\.jpg",
    "\/figma\/casa-campeche\/right-01-shower\\.png",
    "\/figma\/casa-campeche\/right-02-bedroom\\.png",
    "\/figma\/casa-campeche\/right-03-pool\\.png",
    "\/figma\/casa-campeche\/right-04-lounge\\.png",
    "\/figma\/casa-campeche\/right-05-portal\\.png",
    "\/figma\/casa-campeche\/right-06-dining\\.png",
    "\/figma\/casa-campeche\/right-07-kitchen\\.png",
    "\/figma\/casa-campeche\/right-08-bathroom\\.png",
  ];

  for (const photograph of carouselPhotographs) {
    assert.match(campeche, new RegExp(photograph), `Missing carousel photograph: ${photograph}`);
  }
});
