"use client";

import HousePage from "../components/HousePage";
import { AMENITIES } from "@/lib/house-amenities";
import { palmasI, palmasII } from "@/lib/gallery-photos";

// Figma eNHBCVNfWSH0nXswrrvnuS 2011:237 — Spanish copy is the design source; English is a translation of it.

const features = {
  es: ["4 huéspedes", "2 habitaciones", "2 camas matrimoniales", "Balcón", "Alberca privada", "Terraza", "Cocina equipada"],
  en: ["4 guests", "2 bedrooms", "2 double beds", "Balcony", "Private pool", "Terrace", "Equipped kitchen"],
};

export default function CasaPalmasPage() {
  return (
    <HousePage
      hero={{ src: "/figma/latest/hero-palmas.jpg", alt: "Casa Palmas", objectPosition: "center 40%" }}
      symbol={{ src: "/figma/latest/symbol-palmas-triangle.svg", width: 100.15, height: 90.38 }}
      title={{ es: "Casa Palmas I y II", en: "Casa Palmas I and II" }}
      intro={{
        es: [
          "Casa Palmas ofrece un refugio sereno que captura la esencia de La Punta, Zicatela. Con un diseño brutalista y detalles tropicales, esta residencia invita al descanso con espacios amplios, una terraza privada y alberca exclusiva. Disfruta de todas las amenidades de lujo en un entorno pensado para reconectar con lo esencial, en total privacidad.",
        ],
        en: [
          "Casa Palmas offers a serene retreat that captures the essence of La Punta, Zicatela. With brutalist design and tropical details, this residence invites you to rest in spacious rooms, a private terrace and an exclusive pool. Enjoy every luxury amenity in a setting designed to reconnect with the essentials, in total privacy.",
        ],
      }}
      introHeight={361}
      introDeco={{ src: "/figma/latest/deco-palmas-intro.svg", width: 90.03, height: 284.42, left: 1683, top: 407 }}
      units={[
        { sectionId: "palmas-i", title: "Palmas I", images: palmasI, features },
        { sectionId: "palmas-ii", title: "Palmas II", images: palmasII, features },
      ]}
      amenities={AMENITIES}
      amenityColumns={[[258, 456], [821, 331], [1223, 439]]}
      amenitiesDeco={{ src: "/figma/latest/deco-palmas-amenities.svg", width: 106, height: 338, left: 791, top: 0, rotated: true, gapAbove: 316, gapBelow: 315 }}
    />
  );
}
