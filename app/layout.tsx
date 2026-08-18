import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const courierPrime = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Casa Zii | Villas con alberca en La Punta, Zicatela",
    template: "%s",
  },
  description:
    "Villas de diseño solo para adultos con alberca privada en La Punta, Zicatela, Puerto Escondido. Reserva directa en Casa Campeche o Casa Palmas.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "es_MX",
    images: ["/beach-hero.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/LogoCasaZii.png`,
  sameAs: ["https://instagram.com/casazii"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${courierPrime.variable} font-courier antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
