import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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
