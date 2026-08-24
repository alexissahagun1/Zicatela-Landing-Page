# Casa Zii Map and Footer Correction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the incorrect Google Directions map and stale footer with the approved public My Maps embed and Figma node `29:373`, while keeping the floating reservation bar unchanged.

**Architecture:** Keep `MapSection` responsible for one public My Maps iframe, exact locations, and direct destination links. Keep `Footer` responsible for the responsive adaptation of the Figma footer only. Add a small Node contract test suite for the no-route/no-placeholder requirements, then validate the rendered route and build without using headless Chrome.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Google My Maps public embed, Node’s built-in test runner.

---

### Task 1: Add regression contracts before production changes

**Files:**
- Create: `tests/map-footer-contract.test.mjs`
- Modify: `package.json:7-10`

- [ ] **Step 1: Add the failing contract tests**

Create `tests/map-footer-contract.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const footer = readFileSync(resolve(root, "app/components/Footer.tsx"), "utf8");
const map = readFileSync(resolve(root, "app/components/MapSection.tsx"), "utf8");
const layout = readFileSync(resolve(root, "app/layout.tsx"), "utf8");

test("footer follows the current Figma content and has no placeholder contact data", () => {
  assert.match(footer, /Casa Zii Palmas/);
  assert.match(footer, /Casa Zii Campeche/);
  assert.match(footer, /FAQs/);
  assert.doesNotMatch(footer, /\+52 00 0000 0000/);
  assert.doesNotMatch(footer, /reservaciones@casazii\.com/);
  assert.doesNotMatch(footer, /CENTRO DE RESERVACIONES/);
});

test("map uses the public My Maps embed instead of a directions route", () => {
  assert.match(
    map,
    /https:\/\/www\.google\.com\/maps\/d\/embed\?mid=1dCV9ESC259QOIK4lcq_udz08L2uKZvg/,
  );
  assert.match(map, /15\.831041,-97\.040609/);
  assert.match(map, /15\.8315562,-97\.0404726/);
  assert.doesNotMatch(map, /saddr|daddr/);
});

test("the floating reservation bar remains mounted globally", () => {
  assert.match(layout, /<StickyBookingBar \/>/);
});
```

- [ ] **Step 2: Register the test command**

Add the script to `package.json`:

```json
"test": "node --test tests"
```

- [ ] **Step 3: Run the contracts and verify the red state**

Run: `npm test`

Expected: the footer and map tests fail because the current footer still contains the old booking/contact layout and the map still contains `saddr`/`daddr`; the reservation-bar test passes.

- [ ] **Step 4: Commit the red tests**

```bash
git add package.json tests/map-footer-contract.test.mjs
git commit -m "test: lock map and footer acceptance contracts"
```

---

### Task 2: Rebuild the footer from Figma node 29:373

**Files:**
- Modify: `app/components/Footer.tsx:1-76`
- Create: `public/figma-footer-instagram.svg`

- [ ] **Step 1: Store the exported Figma Instagram vector**

Save the exact exported Figma vector at `public/figma-footer-instagram.svg` and render it at 21 × 22 px. Do not draw a replacement icon.

- [ ] **Step 2: Replace the old footer composition**

Implement the footer with this desktop geometry at a 1280 px reference width:

```tsx
<footer className="w-full bg-[#F9F9F9]">
  <div className="relative mx-auto h-[372px] w-full max-w-[1280px] overflow-hidden">
    <a className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-2 ...">
      <Image src="/figma-footer-instagram.svg" width={21} height={22} ... />
      <span>CASA ZII</span>
    </a>
    <div className="absolute left-[4.69%] top-[23.66%] ...">...</div>
    <div className="absolute left-[4.69%] top-[47.85%] ...">...</div>
    <div className="absolute right-[4.71%] top-[29.84%] ...">FAQs</div>
    <div className="absolute right-[4.71%] top-[51.61%] ...">...</div>
  </div>
</footer>
```

Use the exact Figma copy and Courier Prime sizes:
- property titles: 20 px / 20 px line height;
- address lines: 13 px / 20 px line height;
- FAQs/legal: 13 px / 20 px line height;
- brand: 13 px / 20 px line height.

On narrow screens, switch to a normal-flow stack with the same content and no horizontal overflow. Keep the Instagram link external. Render FAQs/legal as text because no real routes exist; do not create dead `#` links. Localize only the copy that has an approved English equivalent. Do not include the reservation CTA, old contact block, fake phone, or fake email in this component.

- [ ] **Step 3: Run the footer contract**

Run: `npm test -- --test-name-pattern="footer"`

Expected: footer contract passes.

- [ ] **Step 4: Commit the footer**

```bash
git add app/components/Footer.tsx public/figma-footer-instagram.svg
git commit -m "fix: match footer to current Figma node"
```

---

### Task 3: Replace the directions iframe with the public My Maps embed

**Files:**
- Modify: `app/components/MapSection.tsx:1-58`

- [ ] **Step 1: Set the public embed source**

Replace the route source with:

```ts
const MAP_EMBED_SRC =
  "https://www.google.com/maps/d/embed?mid=1dCV9ESC259QOIK4lcq_udz08L2uKZvg";
```

Keep these exact values unchanged:

```ts
const PALMAS_COORDINATES = "15.831041,-97.040609";
const CAMPECHE_COORDINATES = "15.8315562,-97.0404726";
```

- [ ] **Step 2: Render one interactive map**

Keep exactly one `iframe`, with `loading="lazy"`, `referrerPolicy="no-referrer-when-downgrade"`, `allowFullScreen`, useful title, and the existing responsive 680 × 333 desktop container. Do not add a second map, route parameters, mock markers, or an image fallback that pretends to be interactive.

Keep the two direct Google Maps links and address blocks so each property remains individually reachable.

- [ ] **Step 3: Run the map contract**

Run: `npm test -- --test-name-pattern="map"`

Expected: map contract passes and no route parameter remains.

- [ ] **Step 4: Commit the map**

```bash
git add app/components/MapSection.tsx
git commit -m "fix: use public My Maps location embed"
```

---

### Task 4: Synchronize project documentation

**Files:**
- Modify: `DOCUMENTATION.md:106-127`

- [ ] **Step 1: Replace stale source-of-truth notes**

Update the design-source table to reference the current Figma file/node `2lNQfVwXyb9q3PlVs6yhgP / 29:373`, describe the public My Maps embed, and state that the floating reservation bar remains mounted globally. Remove the claim that the footer follows `131:91` and that the map uses a Directions embed.

- [ ] **Step 2: Verify documentation consistency**

Run: `rg -n "131:91|saddr|daddr|CENTRO DE RESERVACIONES|\+52 00 0000 0000" DOCUMENTATION.md app/components/Footer.tsx app/components/MapSection.tsx`

Expected: no matches.

- [ ] **Step 3: Commit the documentation**

```bash
git add DOCUMENTATION.md
git commit -m "docs: align map and footer source of truth"
```

---

### Task 5: Verify the complete implementation

**Files:**
- No new files.

- [ ] **Step 1: Run all contract tests**

Run: `npm test`

Expected: all three tests pass.

- [ ] **Step 2: Run static checks**

Run: `npx tsc --noEmit --incremental false`

Expected: exit code 0.

Run: `git diff --check HEAD~5..HEAD`

Expected: no output.

- [ ] **Step 3: Run the production build**

Run: `npm run build`

Expected: exit code 0 and no TypeScript/build errors.

- [ ] **Step 4: Verify rendered HTML and public map endpoint**

Run: `curl -sS http://127.0.0.1:3000/homepage | rg "CASA ZII|Casa Zii Palmas|Casa Zii Campeche|StickyBookingBar"`

Expected: the page response contains the footer content and reservation bar markup.

Run: `curl -sS -o /dev/null -w "%{http_code}\n" "https://www.google.com/maps/d/embed?mid=1dCV9ESC259QOIK4lcq_udz08L2uKZvg"`

Expected: `200`.

- [ ] **Step 5: Check process hygiene**

Run: `pgrep -af "Chrome Headless|chrome-headless|chromium.*headless" || true`

Expected: no runaway headless browser process.

- [ ] **Step 6: Inspect final diff and status**

Run: `git status --short && git log --oneline -8`

Expected: only intentional commits are present and the worktree is clean.
