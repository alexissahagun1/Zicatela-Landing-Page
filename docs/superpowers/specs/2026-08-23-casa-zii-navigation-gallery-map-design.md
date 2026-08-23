# Casa Zii Navigation, Instagram Gallery, and Map Design Spec

**Date:** 2026-08-23  
**Status:** Proposed — awaiting review  
**Scope:** Homepage and shared site chrome

## Goal

Align the site with the approved Casa Zii direction in Figma and the supplied references: a centered, permanently visible white navigation bar; a six-image Instagram gallery using the exact exported Figma images; and a location section that makes both Casa Zii addresses easy to understand and open in Google Maps.

## Source of truth

- Figma file: [CASA ZII](https://www.figma.com/design/JYwQ77v9OOLOlxmlKaTNu7/CASA-ZII)
- Figma nodes inspected:
  - `69:3` — `Nav`
  - `156:2` — `Galería Instagram`
  - `18:227` — `Mapa`
- Reference map layouts:
  - [Casa TO](https://www.casato.mx/)
  - [Casa Yuma](https://www.casayuma.com/)
- User-provided mobile and desktop screenshots

## Design decisions

### 1. Shared navigation

- Remove the black `AnnouncementBar` from every rendered page. The text “Una estancia única / Solo para adultos” is not part of the new header.
- Keep one fixed white `NavigationBar` at the top of the viewport, visible while scrolling in both desktop and mobile layouts.
- Use a three-zone layout so the center navigation is visually centered independently of the logo and right-side controls:
  - left: Casa Zii logo;
  - center: Casa Campeche, Casa Palmas, and Prensa/Press;
  - right: Reservar/Book Now, Instagram, and language toggle.
- Match the Figma desktop proportion: approximately 74px header height, Courier Prime typography, white surface, dark text, and the existing terracotta booking button.
- On mobile, keep the logo and primary action visible, place the menu trigger in a stable position, and use the existing full-screen menu without allowing the header to drift horizontally.
- Add the required content offset so the fixed header never hides the first meaningful section.

### 2. Instagram gallery

- Replace the homepage’s current 13-image collage block with the six-image `Galería Instagram` composition from Figma. Keep the separate architectural carousel below it.
- Use six local PNGs exported directly from the six Figma rectangle nodes. Do not substitute current `public/Rectangle*.png` files and do not recreate or re-crop the images in code.
- Preserve the Figma grid proportions:
  - three columns by two rows on desktop;
  - each image approximately `270 × 338px`;
  - approximately `13px` horizontal and vertical gutters;
  - responsive single/two-column behavior on narrow screens while preserving the image aspect ratio.
- Store the images in `public/instagram-gallery/` with stable local paths:
  - `figma-01.png` through `figma-06.png`.
- Keep the gallery data-driven with an item shape equivalent to:

  ```ts
  type InstagramGalleryItem = {
    src: string;
    alt: string;
    href: string;
  };
  ```

- Each tile is an accessible external link opening the corresponding Instagram post in a new tab with `rel="noreferrer"`. The six exact post URLs are an input still required from the site owner before final acceptance; the component must not silently point every image to the generic profile.
- Add visible keyboard focus and a restrained hover treatment without changing the source image crop.

### 3. Location section

- Replace the current static-only `Mapa.png` section with a responsive two-part location module inspired by the supplied Casa TO and Casa Yuma sections:
  - an interactive Google Maps embed on the left/top;
  - Casa Palmas and Casa Campeche address cards on the right/below;
  - an “Abrir mapa” action for each address using its supplied Google Maps URL.
- Use the provided exact addresses:
  - Casa Palmas: Calle de la Paloma S/N, in front of Casa Paloma, La Punta, Brisas de Zicatela, 70938 Puerto Escondido, Oaxaca, Mexico.
  - Casa Campeche: Calle Campeche S/N, in front of Pancho Villas Punta Zicatela, La Punta, Brisas de Zicatela, 70938 Puerto Escondido, Oaxaca, Mexico.
- Preserve the Casa Zii visual language: warm white/beige surface, Courier Prime, dark text, terracotta accents, generous whitespace, and no generic card-heavy treatment.
- The map embed must be lazy-loaded, have a useful title, and remain usable on mobile without forcing horizontal scrolling. No Google Maps API key is required for the initial embed approach.

## Implementation boundaries

Expected files to modify:

- `app/components/NavigationBar.tsx` — fixed white header and centered layout.
- `app/components/AnnouncementBar.tsx` and page entrypoints that render it — remove the black strip from the rendered site.
- `app/components/PhotoCollage.tsx` or a focused replacement component — six-image Figma gallery.
- `app/homepage/page.tsx` — place the new gallery in the homepage sequence.
- `app/components/MapSection.tsx` — interactive map and two address destinations.
- `public/instagram-gallery/figma-01.png` through `figma-06.png` — exact Figma exports already downloaded.

The Guesty booking flow, property content, footer copy, and existing architectural carousel remain out of scope except where shared header spacing requires a small layout adjustment.

## Accessibility and behavior

- Every navigation item and gallery tile must be keyboard reachable.
- Gallery images need descriptive Spanish/English alt text through the existing language context.
- The mobile menu must close after navigation and must not leave the page scroll-locked after closing.
- External Instagram and Google Maps links must expose their destination through accessible labels.
- Fixed navigation must respect safe content spacing and never cover focus targets.

## Acceptance criteria

1. The black adults-only strip is absent on homepage, booking, property, press, and contact pages.
2. The white navigation remains visible while scrolling and its center menu is visually centered at desktop and mobile widths.
3. The homepage gallery uses the six local Figma exports, not the old image files; each image renders with the same source crop and order as Figma.
4. Each gallery tile opens its own supplied Instagram post URL. Empty or generic fallback URLs are not accepted for final release.
5. The location module exposes both exact addresses, has a usable interactive map, and opens both supplied Google Maps destinations.
6. Desktop and mobile layouts have no horizontal overflow, clipped navigation, or content hidden behind the fixed header.
7. The production build succeeds and browser checks pass with no new console errors.

## Open input before final gallery acceptance

Provide six Instagram post URLs in the Figma order: `figma-01` through `figma-06`. The rest of the design can be implemented independently, but the gallery cannot be marked complete until these destinations are known.
