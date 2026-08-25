# Functional Sticky Booking Bar Design

**Date:** 2026-08-24  
**Status:** Proposed

## Goal

Turn the global fixed booking bar into a real Guesty reservation entry point. A guest chooses a stay, party size, and optional promotion from any non-booking page; pressing the primary action searches Guesty directly in an in-page reservation panel. The separate `/booking` page remains available, but is not part of this flow.

## User flow

1. The bar remains fixed above the browser safe area on every page except `/booking`.
2. It has four usable controls: **When**, **Who**, **Promotion**, and **Reserve**.
3. **When** opens the existing date-range calendar *above* the bar. Past dates are disabled. A complete check-in/check-out range is required to reserve.
4. **Who** opens a panel above the bar with bounded steppers: 1–16 adults and 1–4 rooms.
5. **Promotion** opens an input above the bar. The value is uppercased and uses the same validation already enforced by the quote API.
6. The primary action is disabled until both dates exist. It never performs a fake search or redirects to `/booking`.
7. On submit, the bar opens an accessible in-page panel containing the existing `BookingResults` flow. It queries Guesty availability directly, then supports quote and reservation request with the existing Guesty API routes.
8. The standalone booking page remains unchanged and independently usable.
9. Missing, partial, or invalid stays keep the date panel open and never call Guesty. Invalid guest counts fall back to the existing defaults; an invalid promotion is treated as empty and is not sent to quote.

## Architecture

`BookingSearchBar` becomes the single owner of booking search UI and state. It gains controlled initial values and a submit callback, while retaining its standalone default behavior for the booking page.

`StickyBookingBar` renders `BookingSearchBar` directly, instead of reproducing static summary links. The bar is therefore visually identical to the form on `/booking`. Its calendar and panels open upward so they remain visible above the fixed shell.

`StickyBookingBar` owns the direct reservation panel. A valid form submission provides the selected values to `BookingResults`, which already owns availability, quote, guest details, idempotency, and Guesty reservation requests.

## Accessibility and responsive behavior

- Every control remains a semantic button or labeled input with `aria-expanded` where relevant.
- The action exposes its disabled state and does not rely on color alone.
- Calendar and popovers render upward from the fixed bar on desktop and mobile; the compact bar becomes a two-row grid on narrow screens instead of clipping fields.
- Closing a panel via Escape or outside click preserves chosen values.
- Spanish and English labels use the active language context.

## Failure behavior

- The bar calls Guesty only after a valid complete stay is submitted.
- The in-page reservation panel uses the existing `BookingResults` API error states for availability, quote, and reservation failures.

## Tests and adversarial dogfood acceptance

Automated tests must cover:

- required dates block submission;
- a valid compact-bar search opens the in-page Guesty reservation panel with dates, adults, rooms, and optional promotion;
- no sticky-bar action navigates to `/booking`;
- a valid direct submission triggers one availability search;
- the initial fixed bar, its panels, and the booking page remain bilingual.

After implementation, dogfood `http://localhost:3000` as a guest without reading source while testing:

- desktop and narrow mobile viewport selection;
- empty, partial, reversed, past, and shared-URL dates;
- guest/room boundaries and promotion normalization;
- submit, drawer close/reopen, reload, and the standalone `/booking` page;
- availability, quote, and reservation error states; and
- console errors, focus/keyboard escape, panel overlap, and sticky-bar clipping.

Every reproducible issue found during dogfood receives screenshots and exact steps in `dogfood-output/`; blocking issues are fixed and re-tested before handoff.
