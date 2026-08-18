import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Casa Campeche | Villa con alberca privada en La Punta",
  description:
    "Casa Campeche es un dúplex de diseño con alberca privada en La Punta de Zicatela. Dos unidades independientes y conectables, solo adultos. Reserva directa.",
  alternates: {
    canonical: "/casa-campeche",
    languages: {
      es: "/casa-campeche",
      en: "/casa-campeche",
      "x-default": "/casa-campeche",
    },
  },
  openGraph: {
    title: "Casa Campeche | Villa con alberca privada en La Punta",
    description:
      "Dúplex de diseño con alberca privada en La Punta de Zicatela. Dos unidades independientes y conectables, solo adultos.",
    images: ["/CasaCampecheI.png"],
  },
};

const vacationRentalSchema = {
  "@context": "https://schema.org",
  "@type": "VacationRental",
  name: "Casa Campeche — Casa Zii",
  image: `${SITE_URL}/CasaCampecheI.png`,
  description:
    "Dúplex de diseño con alberca privada en La Punta de Zicatela. Dos unidades independientes y conectables.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Campeche",
    addressLocality: "Punta de Zicatela, Puerto Escondido",
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

export default function CasaCampecheLayout({
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
