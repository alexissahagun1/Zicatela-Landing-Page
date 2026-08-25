# Functional Sticky Booking Bar and Morph Transition — Implementation Plan

> **For implementation:** execute in order; keep the map work untouched.

**Goal:** Make the fixed bar collect a complete stay search and open the existing Guesty availability flow in place, with a restrained premium morph transition.

**Architecture:** `BookingSearchBar` owns the shared visual form, with an upward-popover variant for the sticky shell. `StickyBookingBar` passes a validated search directly to `BookingResults` in an accessible dialog; `/booking` remains an independent page. CSS owns the entry/exit morph from pill to panel and respects reduced-motion preferences.

## Steps

1. Add a static contract test for the direct in-page flow and its motion hooks; run it red.
2. Reuse `BookingSearchBar` directly in `StickyBookingBar`, with upward popovers and no `/booking` navigation.
3. Pass a valid search to `BookingResults` inside an accessible dialog; block body scrolling, support outside click and Escape, and preserve the standalone `/booking` experience.
4. Add entry/exit animation for panel and scrim: 260ms opening expansion, 180ms closing collapse, central-bottom transform origin, and `prefers-reduced-motion` fallback. Clean up close timers on unmount.
5. Run focused contracts, typecheck, whitespace checks, then dogfood empty state, valid search, Escape close, desktop, and mobile. Record no real reservation submission.
