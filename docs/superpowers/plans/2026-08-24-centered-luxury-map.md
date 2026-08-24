# Centered Luxury Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render one centered, contemporary two-pin Google map that starts loading only when it approaches the viewport and contains no visible address or activation copy.

**Architecture:** `MapSection` becomes map-only. `LazyGoogleMap` owns one-time in-view loading and a neutral surface; `GoogleMapsRuntime` stays the singleton script loader and marker renderer. The Cloud quota remains unchanged.

**Tech Stack:** Next.js 15, React 19, TypeScript, Google Maps JavaScript API, Node test runner.

---

### Task 1: Lock the map-only visual contract

**Files:**
- Modify: `tests/map-footer-contract.test.mjs`

- [ ] **Step 1: Write the failing assertions**

```js
test("the map section has no visible address copy", () => {
  assert.doesNotMatch(map, /Calle de la Paloma|Calle Campeche|Abrir mapa/);
  assert.match(map, /max-w-\[1180px\]/);
  assert.doesNotMatch(lazyGoogleMap, /Ver mapa interactivo|mapa interactivo es opcional/);
});

test("the map starts once when it approaches the viewport", () => {
  assert.match(lazyGoogleMap, /IntersectionObserver/);
  assert.match(lazyGoogleMap, /rootMargin: "0px 0px 240px 0px"/);
  assert.match(lazyGoogleMap, /hasInitializedRef\.current/);
});
```

- [ ] **Step 2: Run RED**

Run: `npm test -- --test-name-pattern='map section has|map starts once'`
Expected: failure because address content and manual activation remain.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/map-footer-contract.test.mjs
git commit -m "test: require centered in-view map"
```

### Task 2: Simplify the section and load in view

**Files:**
- Modify: `app/components/MapSection.tsx`
- Modify: `app/components/LazyGoogleMap.tsx`

- [ ] **Step 1: Replace the split layout**

Keep only `MAP_CENTER` and `MAP_PINS`, rendered inside:

```tsx
<section className="bg-[#F4EFE6] px-4 py-20 md:px-8 md:py-28">
  <div className="mx-auto w-full max-w-[1180px] overflow-hidden border border-[#222222]/10 bg-[#E8E1D7]">
    <LazyGoogleMap title="Mapa de Casa Zii en Zicatela" center={MAP_CENTER} pins={MAP_PINS} />
  </div>
</section>
```

Remove all headings, addresses, direct links, and the two-column grid.

- [ ] **Step 2: Replace manual activation with an observer lifecycle**

Use `useEffect`, a wrapper ref, and a one-time observer:

```tsx
useEffect(() => {
  const wrapper = wrapperRef.current;
  if (!wrapper || hasInitializedRef.current) return;
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting || hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    observer.disconnect();
    void loadMap();
  }, { rootMargin: "0px 0px 240px 0px" });
  observer.observe(wrapper);
  return () => observer.disconnect();
}, [center, pins]);
```

`loadMap` imports the runtime, renders once into a connected element, and updates an internal ready/error state. Do not show a button, loading text, or overlay. Keep the neutral warm surface on errors so the page never blocks.

- [ ] **Step 3: Run GREEN**

Run: `npm test -- --test-name-pattern='map section has|map starts once'`
Expected: both tests pass.

- [ ] **Step 4: Commit**

```bash
git add app/components/MapSection.tsx app/components/LazyGoogleMap.tsx tests/map-footer-contract.test.mjs
git commit -m "feat: center map with in-view loading"
```

### Task 3: Verify visual, runtime, and server behavior

**Files:**
- Test: `tests/google-maps-runtime.test.mjs`

- [ ] **Step 1: Run complete verification**

```bash
npm test
npx tsc --noEmit --incremental false
npm run build
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 2: Verify local behavior without Chrome headless**

Use the existing feature server, verify `/homepage` returns HTTP 200 with `curl`, inspect in the human browser, then scroll to the map. Confirm no text appears in the neutral state and one map with two pins appears after the section nears view.
