"use client";

import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

// Figma eNHBCVNfWSH0nXswrrvnuS Frame 1 (2006:3): "Una experiencia única" (2011:8) + 2008:31, the 845×570 photo,
// "La Punta" (2011:88) + 2016:372 and three 409×609 photos. The closing sentence lives in SiteClosing.
const content = {
  es: {
    experienceTitle: "Una experiencia única",
    experience: [
      "Diseñadas por el reconocido arquitecto Ludwig Godefroy, ofrecen una experiencia arquitectónica única, sensorial y profundamente conectada con la naturaleza.",
      "En Casa Zii, el diseño se funde con el entorno tropical de la costa oaxaqueña para invitarte a reconectar con lo esencial. Las casas integran de manera perfecta espacios interiores y exteriores, brindando una sensación de libertad y fluidez que transforma cada momento.",
      "Disfruta de amenidades premium, internet de alta velocidad con Starlink, y todo lo mejor de Zicatela. Ubicadas en La Punta, se encuentran a minutos caminando de la playa, restaurantes, bares y cafeterías.",
    ],
    beachAlt: "Atardecer en la playa de La Punta, Zicatela",
    laPuntaTitle: "La Punta",
    laPunta: [
      "En La Punta, Zicatela, el ritmo lo marca el océano. Este rincón conserva el espíritu relajado de un pueblo surfista, donde la vida fluye entre playas doradas, cafés artesanales y calles de tierra bordeadas de palmeras. Aquí, cada atardecer es un espectáculo y cada día una invitación a conectar con la naturaleza.",
      "La playa principal es ideal para quienes buscan iniciarse en el surf o simplemente disfrutar del mar. Al caer la noche, La Punta cobra vida con una vibrante escena de bares, restaurantes y música en vivo. Los mercados y tiendas locales, llenos de color, aromas y sabores, revelan la riqueza de la cultura oaxaqueña.",
      "Desde Casa Zii, todo está al alcance: la tranquilidad del entorno tropical, el diseño contemporáneo en armonía con la naturaleza y la energía única de una comunidad que vive intensamente, al ritmo del sol y las olas.",
    ],
  },
  en: {
    experienceTitle: "A unique experience",
    experience: [
      "Designed by renowned architect Ludwig Godefroy, Casa Zii offers a unique architectural experience—sensory, immersive, and deeply connected to nature.",
      "At Casa Zii, design seamlessly merges with the tropical surroundings of Oaxaca’s coast, inviting you to reconnect with what truly matters. The homes effortlessly blend indoor and outdoor spaces, creating a sense of freedom and fluidity that transforms every moment.",
      "Enjoy premium amenities, high-speed Starlink internet, and the very best of Zicatela. Located in La Punta, Casa Zii is just a short walk from the beach, restaurants, bars, and cafés.",
    ],
    beachAlt: "Sunset on La Punta beach, Zicatela",
    laPuntaTitle: "La Punta",
    laPunta: [
      "In La Punta, Zicatela, the ocean sets the pace. This corner of the coast preserves the laid-back spirit of a surf town, where life unfolds between golden beaches, artisanal cafés, and palm-lined dirt roads. Here, every sunset is a spectacle and every day an invitation to connect with nature.",
      "The main beach is ideal for those looking to learn how to surf or simply enjoy the sea. As night falls, La Punta comes alive with a vibrant scene of bars, restaurants, and live music. Local markets and shops, filled with color, aromas, and flavors, reveal the richness of Oaxacan culture.",
      "From Casa Zii, everything is within reach: the tranquility of the tropical surroundings, contemporary design in harmony with nature, and the unique energy of a community that lives fully, moving to the rhythm of the sun and the waves.",
    ],
  },
} as const;

const LA_PUNTA_IMAGES = [
  { src: "/figma/latest/image-12.jpg", alt: "Tablas de surf bajo las palmeras en La Punta", x: 245 },
  { src: "/figma/latest/image-13.jpg", alt: "Bebida artesanal en un café de La Punta", x: 772 },
  { src: "/figma/latest/image-14.jpg", alt: "Surfista al atardecer en Zicatela", x: 1294 },
] as const;

// Figma: 36px bold titles, 18/25 copy with an empty line between paragraphs in an 888px column.
const titleClass =
  "text-center font-[family-name:var(--font-courier)] text-[24px] font-bold leading-[28px] text-[#222222] md:text-[max(24px,calc(var(--f)*36))] md:leading-[1.133]";
const bodyClass =
  "mx-auto mt-8 max-w-[888px] space-y-[25px] text-center font-[family-name:var(--font-courier)] text-[15px] leading-[22px] text-[#222222] md:mt-[calc(var(--f)*103)] md:w-[calc(var(--f)*888)] md:max-w-none md:text-[max(14px,calc(var(--f)*18))] md:leading-[1.389]";

export default function ExperienceSection() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section className="px-4 pt-20 md:px-0 md:pt-[calc(var(--f)*214)]">
      <h2 className={titleClass}>{t.experienceTitle}</h2>
      <div className={`${bodyClass} md:h-[calc(var(--f)*275)]`}>
        {t.experience.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="relative mx-auto mt-12 aspect-[845/570] w-full max-w-[845px] md:mt-[calc(var(--f)*104)] md:w-[calc(var(--f)*845)] md:max-w-none">
        <Image src="/figma/latest/image-11.jpg" alt={t.beachAlt} fill sizes="(min-width: 768px) 44vw, 100vw" className="object-cover" />
      </div>

      <h2 className={`mt-16 md:mt-[calc(var(--f)*112)] ${titleClass}`}>{t.laPuntaTitle}</h2>
      <div className={`${bodyClass} md:h-[calc(var(--f)*308)]`}>
        {t.laPunta.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="relative mt-12 grid gap-6 sm:grid-cols-3 md:mt-[calc(var(--f)*255)] md:block md:h-[calc(var(--f)*609)]">
        {LA_PUNTA_IMAGES.map((image) => (
          <div
            key={image.src}
            className="relative aspect-[409/609] w-full md:absolute md:top-0 md:left-[calc(var(--f)*var(--x))] md:w-[calc(var(--f)*409)]"
            style={{ ["--x" as string]: image.x }}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 22vw, (min-width: 640px) 33vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
