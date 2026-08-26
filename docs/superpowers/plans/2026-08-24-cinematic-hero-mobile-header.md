# Cinematic Hero and Mobile Header Implementation Plan

> **Superseded on 2026-08-26:** the hero video was removed for rights/usage reasons. The current implementation uses the original `public/beach-hero.png` photograph; the mobile-header decisions remain historical context.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the Casa Zii title into the hero video and make the iPhone header fit and behave cleanly without changing desktop navigation.

**Architecture:** `HeroSection` remains a server component that renders the local optimized MP4. CSS utilities provide the ambient hero presentation and reduced-motion fallback. `NavigationBar` keeps its existing state and routes; responsive utility classes define the mobile-only logo, Reserve control, and menu touch target.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, native HTML video.

---

### Task 1: Render the editorial title inside the hero

**Files:**
- Modify: `app/components/HeroSection.tsx`
- Test: `tests/hero-contract.test.mjs`

- [ ] **Step 1: Write the failing contract test**

```js
assert.match(source, /Casa Zii/);
assert.match(source, /prefers-reduced-motion/);
assert.match(source, /casa-zii-palmas-hero-loop\.mp4/);
assert.doesNotMatch(source, /La Punta · Puerto Escondido|Villas de lujo en Zicatela/);
```

- [ ] **Step 2: Run it to verify failure**

Run: `npm test -- tests/hero-contract.test.mjs`

Expected: FAIL because the title and reduced-motion styling do not exist yet.

- [ ] **Step 3: Implement the hero composition**

Add a hero title layer above the video with only `Casa Zii`, use `h-[46vh] sm:h-[56vh] md:h-[min(66vh,680px)]`, a 3.5% 18-second CSS zoom, an 8–18% black gradient veil, and a media query that disables the zoom under reduced motion. Retain `muted`, `loop`, `playsInline`, poster, and the existing optimized MP4 source.

- [ ] **Step 4: Run focused validation**

Run: `npm test -- tests/hero-contract.test.mjs && npx tsc --noEmit --incremental false`

Expected: both commands exit 0.

- [ ] **Step 5: Commit**

```bash
git add app/components/HeroSection.tsx tests/hero-contract.test.mjs public/casa-zii-palmas-hero-loop.mp4 public/casa-zii-palmas-hero-poster.jpg
git commit -m "feat: elevate cinematic Casa Zii hero"
```

### Task 2: Compact the iPhone header

**Files:**
- Modify: `app/components/Logo.tsx`
- Modify: `app/components/NavigationBar.tsx`
- Test: `tests/mobile-header-contract.test.mjs`

- [ ] **Step 1: Write the failing contract test**

```js
assert.match(nav, /h-16/);
assert.match(nav, /h-11 w-11/);
assert.match(nav, /h-\[38px\] w-\[96px\]/);
assert.match(logo, /w-\[88px\] h-\[42px\]/);
assert.doesNotMatch(logo, /scale-75/);
```

- [ ] **Step 2: Run it to verify failure**

Run: `npm test -- tests/mobile-header-contract.test.mjs`

Expected: FAIL because the current logo uses transform scaling and the menu lacks a 44 px touch target.

- [ ] **Step 3: Implement the mobile-only header layout**

Set the logo box to `w-[88px] h-[42px] md:w-[134px] md:h-[64px]`; arrange mobile controls as Reserve followed by the 44 px menu button at the far right; set Reserve to `h-[38px] w-[96px]`; use 8/16 px gaps and preserve all `md:` desktop utilities and existing overlay behavior.

- [ ] **Step 4: Run focused validation**

Run: `npm test -- tests/mobile-header-contract.test.mjs && npx tsc --noEmit --incremental false`

Expected: both commands exit 0.

- [ ] **Step 5: Commit**

```bash
git add app/components/Logo.tsx app/components/NavigationBar.tsx tests/mobile-header-contract.test.mjs
git commit -m "fix: refine mobile navigation header"
```

### Task 3: Verify the real responsive output

**Files:**
- Verify: `app/homepage/page.tsx`

- [ ] **Step 1: Start the local server only if it is not already listening**

Run: `lsof -nP -iTCP:3000 -sTCP:LISTEN || npm run dev`

Expected: a Next.js server is available on port 3000.

- [ ] **Step 2: Verify markup and production build without concurrent dev/build writes**

Run: `curl -sS http://localhost:3000/homepage | rg 'Casa Zii|casa-zii-palmas-hero-loop.mp4'`

Expected: homepage HTML exposes the integrated title and local video source.

- [ ] **Step 3: Verify the complete suite**

Run: `npm test && npx tsc --noEmit --incremental false && git diff --check`

Expected: all commands exit 0.
