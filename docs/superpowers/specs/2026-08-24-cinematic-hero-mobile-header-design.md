# Cinematic Hero and Mobile Header Design

> **Superseded on 2026-08-26:** the hero video was removed for rights/usage reasons. The current implementation uses the original `public/beach-hero.png` photograph; the mobile-header decisions remain historical context.

**Status:** User-approved direction pending implementation plan review

## Goal

Make Casa Zii immediately recognizable on the first screen and make the iPhone header compact, deliberate, and fully usable.

## Hero

- Keep the existing Casa Zii Palmas video as the hero media.
- Increase its visual prominence to a cinematic responsive height.
- Overlay only the editorial title `Casa Zii`; omit location, subtitle, and descriptive copy. It uses the existing Courier Prime family only; its scale and placement, not a second typeface, create hierarchy.
- Use one ambient zoom animation and a restrained dark contrast veil. No other decorative motion competes with the video.
- Respect `prefers-reduced-motion` by removing the CSS zoom while retaining the video poster and native controls-free playback.
- Use a consistent 8/16/24/32/48/64/96 px spacing rhythm. The following content starts after 64 px on desktop and 32 px on mobile.

## Mobile header

- Affect only viewports below `md`.
- Establish a 64 px header in the order: compact logo, Reserve button, Menu control.
- Remove the current scale transform from the mobile logo; give it an explicit 88 × 42 px visual box.
- Make Reserve 96 × 38 px. Menu has a 44 px tap target and label-free three-line icon.
- Preserve existing desktop navigation, language switcher, Instagram link, and mobile full-screen menu behavior.
- Use a visible focus indicator and restore page scrolling after the menu closes or unmounts.

## Verification

- TypeScript compilation passes.
- Homepage HTML includes the hero video and title.
- At 390 px width, header controls fit in one row without overlap or clipping.
- At desktop widths, header markup and navigation remain unchanged in behavior.
