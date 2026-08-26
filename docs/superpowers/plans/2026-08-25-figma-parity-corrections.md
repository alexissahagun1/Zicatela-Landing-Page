# Casa Zii Figma Parity Corrections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the visual and functional differences found in the deep Figma audit while preserving the approved static hero photograph and interactive Google map.

**Architecture:** A shared reservation value contract removes room counts from every entry point. The booking route reuses the canonical map and address data. Presentation components use Figma-derived container dimensions while the existing language provider and map runtime remain unchanged.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, date-fns, Node test runner.

---

### Task 1: Reservation contract and functional entry points

**Files:**
- Modify: `app/components/BookingSearchBar.tsx`
- Modify: `app/components/BookingResults.tsx`
- Modify: `app/components/NavigationBar.tsx`
- Modify: `app/components/BookNowButton.tsx`
- Test: `tests/reservation-contract.test.mjs`

- [x] Write a failing contract test that rejects `rooms`, verifies the guest summary has only adults, and asserts header booking controls use the shared direct reservation action.
- [x] Run `npm test -- tests/reservation-contract.test.mjs` and confirm the new assertions fail because room state and `/booking` links exist.
- [x] Remove room state, copy, stepper, result logic, and submission values from the reservation flow; use the common action for header controls.
- [x] Run `npm test -- tests/reservation-contract.test.mjs` and confirm it passes.

### Task 2: Booking route map and verified location copy

**Files:**
- Modify: `app/booking/page.tsx`
- Test: `tests/booking-page-contract.test.mjs`

- [x] Write a failing test that rejects `/Mapa.png` and placeholder contact values and requires `MapSection` plus the two verified Casa Zii addresses.
- [x] Run `npm test -- tests/booking-page-contract.test.mjs` and confirm the test fails.
- [x] Replace the static map/contact panel with the canonical interactive `MapSection` and verified address copy; retain the Figma booking hero structure.
- [x] Run `npm test -- tests/booking-page-contract.test.mjs` and confirm it passes.

### Task 3: Landing and property visual parity corrections

**Files:**
- Modify: `app/components/AccommodationSection.tsx`
- Modify: `app/components/ArchitecturalGallery.tsx`
- Modify: `app/components/LaPuntaSection.tsx`
- Modify: `app/components/NavigationBar.tsx`
- Modify: `app/casa-campeche/page.tsx`
- Modify: `app/casa-palmas/page.tsx`
- Test: `tests/figma-parity-contract.test.mjs`

- [x] Write failing tests for Figma-derived desktop widths, single Courier Prime family, no debug logs, no legacy strip/Prensa, and the canonical map/footer on property routes.
- [x] Run `npm test -- tests/figma-parity-contract.test.mjs` and confirm the assertions fail.
- [x] Apply the measured landing dimensions, title scale, and remove the non-Courier mobile classes/debug logs; keep the static beach photograph and interactive map untouched.
- [x] Run `npm test -- tests/figma-parity-contract.test.mjs` and confirm it passes.

### Task 4: Full verification

**Files:**
- Test: `tests/*.test.*`

- [x] Run `npm test` and verify all tests pass.
- [x] Run `npx tsc --noEmit` and verify type checking passes.
- [x] Run `npm run build` and verify the production build passes.
- [x] Inspect the final diff and verify there are no generated local-agent files or unrelated changes.
