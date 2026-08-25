import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("sticky booking bar reuses the reservation form and opens Guesty results in-page", async () => {
  const sticky = await readFile("app/components/StickyBookingBar.tsx", "utf8");
  const search = await readFile("app/components/BookingSearchBar.tsx", "utf8");
  const styles = await readFile("app/globals.css", "utf8");

  assert.match(sticky, /BookingSearchBar/);
  assert.match(sticky, /BookingResults/);
  assert.match(sticky, /popoverDirection="up"/);
  assert.match(sticky, /role="dialog"/);
  assert.match(sticky, /data-state=\{isPanelClosing \? "closing" : "open"\}/);
  assert.match(sticky, /closeTimerRef/);
  assert.doesNotMatch(sticky, /href="\/booking"/);
  assert.match(search, /popoverDirection\?: "up" \| "down"/);
  assert.match(search, /submitLabel\?: string/);
  assert.match(search, /casa-zii-booking-popover/);
  assert.match(search, /isPopoverClosing/);
  assert.match(search, /requestPopoverClose/);
  assert.match(search, /casa-zii-booking-popover-exit/);
  assert.match(search, /\[--cell-size:3\.25rem\]/);
  assert.match(search, /lg:w-\[22\.75rem\]/);
  assert.match(search, /nav: "absolute top-\[calc\(var\(--cell-size\)\/2\+2rem\)\]/);
  assert.match(search, /mt-8 flex min-h-\[76px\]/);
  assert.match(search, /mb-28 \[--cell-size:3rem\]/);
  assert.match(search, /lg:min-h-\[34rem\]/);
  assert.match(search, /z-10 flex w-auto items-center justify-between rdp-nav/);
  assert.match(styles, /casaZiiBookingPanelEnter/);
  assert.match(styles, /transform-origin: center bottom/);
  assert.match(styles, /casaZiiBookingScrimEnter/);
  assert.match(styles, /casaZiiBookingPopoverEnter/);
  assert.match(styles, /casaZiiBookingPopoverExitUp/);
  assert.match(styles, /casa-zii-booking-popover-exit/);
  assert.match(styles, /prefers-reduced-motion/);
});
