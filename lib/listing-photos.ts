export type ListingPhotoMeta = {
  src: string;
  alt: { es: string; en: string };
};

/**
 * Booking-card photographs. Prefer landing exports and hero fallbacks over
 * full-resolution property-carousel sources (e.g. campeche-ii.jpg is ~8 MB).
 */
export const LISTING_PHOTOS: Record<string, ListingPhotoMeta> = {
  "Campeche I": {
    src: "/figma/landing/casa-campeche-i.jpg",
    alt: { es: "Casa Campeche I", en: "Casa Campeche I" },
  },
  "Campeche II": {
    src: "/figma/landing/casa-campeche-ii.jpg",
    alt: { es: "Casa Campeche II", en: "Casa Campeche II" },
  },
  "Palmas I": {
    src: "/figma/casa-palmas/palmas-i-01.jpg",
    alt: { es: "Casa Palmas I", en: "Casa Palmas I" },
  },
  "Palmas II": {
    src: "/figma/casa-palmas/palmas-ii-01.jpg",
    alt: { es: "Casa Palmas II", en: "Casa Palmas II" },
  },
};

const HOUSE_FALLBACKS: Record<
  "campeche" | "palmas",
  { src: string; alt: { es: string; en: string } }
> = {
  campeche: {
    src: "/figma/casa-campeche/hero.jpg",
    alt: { es: "Casa Campeche", en: "Casa Campeche" },
  },
  palmas: {
    src: "/figma/casa-palmas/hero.jpg",
    alt: { es: "Casa Palmas", en: "Casa Palmas" },
  },
};

export function getListingPhotoSrc(unit: string | null, house: "campeche" | "palmas" | null): string | null {
  if (unit && LISTING_PHOTOS[unit]) return LISTING_PHOTOS[unit].src;
  if (house && HOUSE_FALLBACKS[house]) return HOUSE_FALLBACKS[house].src;
  return null;
}

export function getListingPhoto(
  unit: string | null,
  house: "campeche" | "palmas" | null,
  language: "es" | "en"
): { src: string; alt: string } | null {
  if (unit && LISTING_PHOTOS[unit]) {
    const match = LISTING_PHOTOS[unit];
    return { src: match.src, alt: match.alt[language] };
  }
  if (house && HOUSE_FALLBACKS[house]) {
    const fallback = HOUSE_FALLBACKS[house];
    return { src: fallback.src, alt: fallback.alt[language] };
  }
  return null;
}

/** Ensure the booking/listing hero photo leads each property carousel. */
export function withListingPhoto(unit: keyof typeof LISTING_PHOTOS, images: string[]): string[] {
  const photo = LISTING_PHOTOS[unit].src;
  const rest = images.filter((image) => image !== photo);
  return [photo, ...rest];
}

export function listingPhotoAlt(unit: keyof typeof LISTING_PHOTOS, language: "es" | "en"): string {
  return LISTING_PHOTOS[unit].alt[language];
}

/** Warm the browser cache for photos that will appear in the results list. */
export function preloadListingPhotos(sources: string[]): void {
  if (typeof window === "undefined") return;
  for (const src of sources) {
    const img = new window.Image();
    img.decoding = "async";
    img.src = src;
  }
}
