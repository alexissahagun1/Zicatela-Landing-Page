# Centered Luxury Map Design

**Date:** 2026-08-24  
**Status:** Approved

## Goal

Replace the split address-and-map section with one centered, contemporary map experience. It should feel calm and premium rather than like a utility card or retro booking widget.

## Layout

- Remove the visible Casa Palmas and Casa Campeche headings, full addresses, and external Google Maps links from the section.
- Render a single centered map frame inside a restrained, wide container: max width 1180px, responsive 16:10 desktop aspect ratio, with a subtle warm-white border and no heavy card shadow.
- Keep the surrounding pale Casa Zii background and use generous vertical whitespace so the map reads as the single visual element.
- Preserve one Google map with exactly the two supplied real pins and no route.

## Loading

- Do not show text, a CTA button, or a blocking overlay before the map loads.
- Start loading Google Maps only when the section approaches the viewport, using an `IntersectionObserver` with a positive bottom root margin.
- Until the real map draws, show only a silent neutral warm surface matching the page. The page remains completely scrollable and all other content remains interactive.
- Retain the existing restricted key and Cloud quota of 250 map loads per day. The automatic in-view trigger means only visitors who reach the map can cause a load.

## Visual behavior

- Use Google Maps' standard interactive controls, but no custom labels floating over the map.
- The camera shows Zicatela and La Punta rather than fitting too tightly around the two nearby houses.
- On narrow screens, keep the centered composition with a 4:3 minimum-height frame and no horizontal overflow.

## Acceptance

- The section contains no visible address copy, property headings, links, loading copy, or map activation button.
- Scrolling to the map begins the load once; opening the homepage without reaching it does not request Google Maps.
- The map remains interactive after it loads, renders both exact pins, and draws no route.
- The fixed reservation bar remains usable above the section and does not cover or block the map controls.
