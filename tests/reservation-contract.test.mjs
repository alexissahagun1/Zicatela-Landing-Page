import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const searchBar = readFileSync(resolve(root, "app/components/BookingSearchBar.tsx"), "utf8");
const results = readFileSync(resolve(root, "app/components/BookingResults.tsx"), "utf8");
const navigation = readFileSync(resolve(root, "app/components/NavigationBar.tsx"), "utf8");

test("reservation entry points use the direct embedded Guesty flow", () => {
  assert.match(navigation, /casa-zii:open-reservation/);
  assert.doesNotMatch(navigation, /href="\/booking"/);
});

test("whole-home reservations collect dates and guests only", () => {
  assert.doesNotMatch(searchBar, /\brooms\b/i);
  assert.doesNotMatch(results, /roomsNote|search\.rooms/);
  assert.match(searchBar, /adults/);
  assert.doesNotMatch(searchBar, /promoCode|Promoción|Promotion|<Tag/);
  assert.doesNotMatch(results, /search\.promoCode|promoCode/);
});

test("booking result cards show a photo for each Guesty unit", () => {
  assert.match(results, /BookingListingPhoto/);
  assert.match(results, /from "@\/lib\/listing-photos"/);
  assert.match(results, /BookingResultsSkeleton/);
  assert.match(results, /casa-zii-booking-card/);
});

test("listing photos use optimized booking-card sources", async () => {
  const photos = await readFile("lib/listing-photos.ts", "utf8");
  const campeche = await readFile("app/casa-campeche/page.tsx", "utf8");
  const palmas = await readFile("app/casa-palmas/page.tsx", "utf8");
  assert.match(photos, /\/figma\/landing\/casa-campeche-i\.jpg/);
  assert.match(photos, /\/figma\/landing\/casa-campeche-ii\.jpg/);
  assert.match(photos, /withListingPhoto/);
  assert.match(campeche, /withListingPhoto\("Campeche I"/);
  assert.match(palmas, /withListingPhoto\("Palmas II"/);
});
