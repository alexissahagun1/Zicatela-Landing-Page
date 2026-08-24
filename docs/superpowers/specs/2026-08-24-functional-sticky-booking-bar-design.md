# Functional Sticky Booking Bar Design

**Date:** 2026-08-24  
**Status:** Proposed

## Goal

Turn the global fixed booking bar into a real reservation search entry point. A guest chooses a stay, party size, and optional promotion from any non-booking page; pressing the primary action opens `/booking` with those exact values restored and automatically searches Guesty availability.

## User flow

1. The bar remains fixed above the browser safe area on every page except `/booking`.
2. It has four usable controls: **When**, **Who**, **Promotion**, and **Reserve**.
3. **When** opens the existing date-range calendar *above* the bar. Past dates are disabled. A complete check-in/check-out range is required to reserve.
4. **Who** opens a panel above the bar with bounded steppers: 1–16 adults and 1–4 rooms.
5. **Promotion** opens an input above the bar. The value is uppercased and uses the same validation already enforced by the quote API.
6. The primary action is disabled until both dates exist. It never performs a fake search or a bare redirect.
7. On submit, the bar navigates to:

   ```text
   /booking?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD&adults=N&rooms=N&promoCode=CODE
   ```

   `promoCode` is omitted when empty.
8. The booking page parses and validates the query once on load, initializes its search controls from it, and calls the existing availability flow automatically. The results scroll into view after rendering.
9. If a URL has missing, malformed, past, or reversed dates, the booking page keeps the user on its normal empty search state and does not call availability. Invalid guest counts fall back to the existing defaults; an invalid promotion is treated as empty and is not sent to quote.

## Architecture

`BookingSearchBar` becomes the single owner of booking search UI and state. It gains controlled initial values and a submit callback, while retaining its standalone default behavior for the booking page.

`StickyBookingBar` renders `BookingSearchBar` in a compact fixed-shell variant instead of reproducing static summary links. The compact variant uses the same calendar, guest steppers, promotion normalization, keyboard escape/outside-click behavior, and validation. Its dropdowns use upward positioning so the fixed bar never hides the current page or the reservation controls.

`app/booking/page.tsx` owns URL hydration and synchronization with `BookingSearchBar`. It uses `useSearchParams` and `useRouter` only for the booking route. A valid query triggers exactly one `handleSearch` call after initial hydration; future changes through the full booking form replace the query to preserve a shareable, back-button-safe search state.

## Accessibility and responsive behavior

- Every control remains a semantic button or labeled input with `aria-expanded` where relevant.
- The action exposes its disabled state and does not rely on color alone.
- Calendar and popovers render upward from the fixed bar on desktop and mobile; the compact bar becomes a two-row grid on narrow screens instead of clipping fields.
- Closing a panel via Escape or outside click preserves chosen values.
- Spanish and English labels use the active language context.

## Failure behavior

- The bar does not call Guesty; it only creates a validated booking URL.
- The booking page remains responsible for availability, quote, and reservation API errors via its existing `BookingResults` states.
- Query parsing must never throw. A malformed shared URL produces an editable empty booking form.

## Tests and adversarial dogfood acceptance

Automated tests must cover:

- required dates block submission;
- a valid compact-bar search builds the canonical booking URL with dates, adults, rooms, and optional promotion;
- URL parsing accepts a valid round trip and rejects malformed/past/reversed ranges;
- a valid booking URL triggers one availability search and restores visible form values;
- the initial fixed bar, its panels, and the booking page remain bilingual.

After implementation, dogfood `http://localhost:3000` as a guest without reading source while testing:

- desktop and narrow mobile viewport selection;
- empty, partial, reversed, past, and shared-URL dates;
- guest/room boundaries and promotion normalization;
- submit, back navigation, reload, and direct copied booking URL;
- availability, quote, and reservation error states; and
- console errors, focus/keyboard escape, panel overlap, and sticky-bar clipping.

Every reproducible issue found during dogfood receives screenshots and exact steps in `dogfood-output/`; blocking issues are fixed and re-tested before handoff.
