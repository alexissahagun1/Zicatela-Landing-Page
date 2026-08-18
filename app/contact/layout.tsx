import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Casa Zii — La Punta, Zicatela",
  description:
    "Contacta a Casa Zii para reservar tu estancia en La Punta de Zicatela, Puerto Escondido, Oaxaca. Teléfono, email y ubicación de nuestras villas.",
  alternates: {
    canonical: "/contact",
    languages: {
      es: "/contact",
      en: "/contact",
      "x-default": "/contact",
    },
  },
  openGraph: {
    title: "Contacto | Casa Zii — La Punta, Zicatela",
    description:
      "Contacta a Casa Zii en La Punta de Zicatela, Puerto Escondido, Oaxaca.",
    images: ["/LogoCasaZii.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
