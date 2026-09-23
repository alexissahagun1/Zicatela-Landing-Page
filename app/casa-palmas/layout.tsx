import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Casa\u00A0Palmas",
  description:
    "Casa Palmas es una villa brutalista con terraza privada y alberca en Brisas de Zicatela, Puerto Escondido. Solo adultos, con Starlink y reserva directa.",
  alternates: {
    canonical: "/casa-palmas",
    languages: {
      es: "/casa-palmas",
      en: "/casa-palmas",
      "x-default": "/casa-palmas",
    },
  },
  openGraph: {
    title: "Casa\u00A0Zii | Casa\u00A0Palmas",
    description:
      "Villa brutalista con terraza privada y alberca en Brisas de Zicatela, Puerto Escondido. Solo adultos.",
    images: ["/figma/latest/hero-palmas.jpg"],
  },
};

const vacationRentalSchema = {
  "@context": "https://schema.org",
  "@type": "VacationRental",
  name: "Casa Palmas — Casa Zii",
  image: `${SITE_URL}/figma/latest/hero-palmas.jpg`,
  description:
    "Villa brutalista con terraza privada y alberca en Brisas de Zicatela, Puerto Escondido.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Calle de la Paloma",
    addressLocality: "Brisas de Zicatela, Puerto Escondido",
    addressRegion: "Oaxaca",
    postalCode: "70934",
    addressCountry: "MX",
  },
  numberOfRooms: 2,
  petsAllowed: true,
  checkinTime: "15:00",
  checkoutTime: "12:00",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Swimming pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Air conditioning", value: true },
  ],
};

export default function CasaPalmasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vacationRentalSchema) }}
      />
    </>
  );
}
