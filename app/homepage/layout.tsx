import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casa Zii - Villas de Lujo en Zicatela",
  description:
    "Villas de diseño solo para adultos con alberca privada en La Punta, Zicatela, Puerto Escondido. Reserva directa en Casa Campeche o Casa Palmas.",
  alternates: {
    canonical: "/homepage",
    languages: {
      es: "/homepage",
      en: "/homepage",
      "x-default": "/homepage",
    },
  },
  openGraph: {
    title: "Casa Zii - Villas de Lujo en Zicatela",
    description:
      "Villas de diseño solo para adultos con alberca privada en La Punta, Zicatela, Puerto Escondido.",
    images: ["/beach-hero.png"],
  },
};

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
