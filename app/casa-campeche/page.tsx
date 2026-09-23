"use client";

import HousePage from "../components/HousePage";
import { campecheI, campecheII } from "@/lib/gallery-photos";
import { AMENITIES } from "@/lib/house-amenities";

// Figma eNHBCVNfWSH0nXswrrvnuS 2011:90 — Spanish copy is the design source; English is a translation of it.

const features = {
  es: ["4 huéspedes", "2 habitaciones", "2 camas matrimoniales", "Alberca privada", "Terraza", "Cocina equipada"],
  en: ["4 guests", "2 bedrooms", "2 double beds", "Private pool", "Terrace", "Equipped kitchen"],
};

export default function CasaCampechePage() {
  return (
    <HousePage
      hero={{ src: "/figma/latest/hero-campeche.jpg", alt: "Casa Campeche" }}
      symbol={{ src: "/figma/latest/symbol-campeche-circle.svg", width: 90, height: 90 }}
      title={{ es: "Casa Campeche I y II", en: "Casa Campeche I and II" }}
      intro={{
        es: [
          "Casa Campeche cuenta con dos casas independientes, excepcionalmente diseñadas, completamente equipadas y ubicadas una junto a la otra. Cada casa dispone de dos recámaras, dos baños, una amplia cocina, espacios ideales para convivir y una piscina privada.",
          "Las dos casas pueden rentarse juntas. Una muy original puerta corrediza circular permite integrarlas en un solo espacio cuando se alquilan en conjunto, o cerrarlas y mantenerlas completamente independientes cuando se rentan por separado.",
        ],
        en: [
          "Casa Campeche is made up of two independent, exceptionally designed and fully equipped houses standing side by side. Each house has two bedrooms, two bathrooms, a large kitchen, spaces made for spending time together and a private pool.",
          "The two houses can be rented together. A striking circular sliding door joins them into a single space when they are booked together, or closes them off so they stay completely independent when rented separately.",
        ],
      }}
      introHeight={361}
      introDeco={{ src: "/figma/latest/deco-campeche-intro.svg", width: 479, height: 344, left: 1292, top: 402 }}
      units={[
        { sectionId: "campeche-i", title: "Campeche I", images: campecheI, features },
        { sectionId: "campeche-ii", title: "Campeche II", images: campecheII, features },
      ]}
      amenities={AMENITIES}
      amenityColumns={[[296, 456], [845, 277], [1261, 439]]}
      amenitiesDeco={{ src: "/figma/latest/deco-campeche-amenities.svg", width: 531, height: 381, left: 694, top: 0, gapAbove: 134, gapBelow: 222 }}
    />
  );
}
