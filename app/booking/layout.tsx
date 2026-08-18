import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservar | Casa Zii — La Punta, Zicatela",
  description:
    "Consulta disponibilidad en tiempo real, cotiza tu estancia y solicita tu reservación en Casa Campeche o Casa Palmas, La Punta de Zicatela.",
  alternates: {
    canonical: "/booking",
    languages: {
      es: "/booking",
      en: "/booking",
      "x-default": "/booking",
    },
  },
  openGraph: {
    title: "Reservar | Casa Zii — La Punta, Zicatela",
    description:
      "Disponibilidad en tiempo real y cotización directa en Casa Campeche o Casa Palmas.",
    images: ["/BackgroundBookNow.png"],
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
