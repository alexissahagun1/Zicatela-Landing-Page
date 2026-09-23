import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prensa",
  description:
    "Cobertura de prensa de Casa Zii: villas de diseño brutalista en La Punta, Zicatela, Puerto Escondido, Oaxaca.",
  alternates: {
    canonical: "/prensa",
    languages: {
      es: "/prensa",
      en: "/prensa",
      "x-default": "/prensa",
    },
  },
  openGraph: {
    title: "Casa\u00A0Zii | Prensa",
    description:
      "Villas de diseño brutalista en La Punta, Zicatela, Puerto Escondido, Oaxaca.",
    images: ["/LogoCasaZii.png"],
  },
};

export default function PrensaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
