import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";

const courierPrime = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Casa Zii - Una estancia única en La Punta, Zicatela",
  description: "Dos espléndidas casas duplex de estilo brutalista diseñadas por Ludwig Godefroy. Donde el diseño se funde con la naturaleza en el corazón de La Punta, Oaxaca.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${courierPrime.variable} font-courier antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
