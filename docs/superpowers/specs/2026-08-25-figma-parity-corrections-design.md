# Casa Zii Figma Parity Corrections

## Objective

Bring the implemented Casa Zii routes back into parity with the real Figma pages while preserving the two approved exceptions: the cinematic hero video and the lazy-loaded interactive Google map with the two exact property pins.

## Reference and overrides

- Figma file `2lNQfVwXyb9q3PlVs6yhgP` is the visual reference for Landing Page, Casa Campeche, Casa Palmas, Reservaciones, and the current light Footer frame `29:373`.
- The black adults-only strip and `Prensa` are intentionally removed.
- The hero stays video-led instead of reverting to the static Figma hero image.
- All maps use the existing interactive Google Maps component; the old static mock map is removed.
- Casa Zii rents whole homes: the booking form collects dates, guests, and promo code, never a room count.

## Corrective design

1. Use one shared reservation contract across header, sticky bar, and booking route. It contains check-in, check-out, adults, and promo code; submitted searches retain those values and query Guesty.
2. Rebuild the booking route around that contract. It keeps the Figma hero framing, swaps the static map for `MapSection`, uses the verified property addresses, and removes placeholder contact data.
3. Keep the light Figma footer as the canonical footer across all routes. Do not restore the obsolete grey/footer variants present elsewhere in the file.
4. Align landing spacing and component widths to the sampled Figma sections: accommodation (954px), carousel (full 1308px reference), and La Punta (1073px block with a 343px image).
5. Use only Courier Prime throughout all page chrome and mobile navigation. Property pages retain their distinct Figma content structure but use the current canonical nav, footer, reservation behaviour, and interactive map.

## Validation

- Contract tests must prove that no static map, fake contact data, room selector, `font-mono`, or `/booking` redirect remains in the shared reservation path.
- Existing map tests must still prove a lazy, single Google map with two exact pins.
- Type-check, unit tests, and production build must succeed before integration.
