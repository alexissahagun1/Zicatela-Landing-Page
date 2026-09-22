"use client";

import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

// Figma 2053:688–699: "A high-level experience" (the former intro paragraphs), beach photo,
// "La Punta" (no highlight line, no aerial photo), three vertical photos, and the closing sentence before the map.
const content = {
  es: {
    experienceTitle: "Una experiencia de alto nivel",
    experience: [
      "Diseñadas por el reconocido arquitecto Ludwig Godefroy, ofrecen una experiencia arquitectónica única, sensorial y profundamente conectada con la naturaleza.",
      "En Casa Zii, el diseño se funde con el entorno tropical de la costa oaxaqueña para invitarte a reconectar con lo esencial. Las casas integran de manera perfecta espacios interiores y exteriores, brindando una sensación de libertad y fluidez que transforma cada momento.",
      "Disfruta de amenidades premium, internet de alta velocidad con Starlink, y todo lo mejor de Zicatela a tan solo unos pasos. Ubicadas en La Punta, se encuentran a minutos caminando de la playa, restaurantes, bares y cafeterías.",
    ],
    beachAlt: "Atardecer en la playa de La Punta, Zicatela",
    laPuntaTitle: "La Punta",
    laPunta: [
      "En La Punta de Zicatela, el ritmo lo marca el océano. Este rincón de Puerto Escondido conserva el espíritu relajado de un pueblo surfista, donde la vida fluye entre playas doradas, cafés artesanales y calles de tierra bordeadas de palmeras. Aquí, cada atardecer es un espectáculo y cada día una invitación a conectar con la naturaleza.",
      "La playa principal es ideal para quienes buscan iniciarse en el surf o simplemente disfrutar del mar. Al caer la noche, La Punta cobra vida con una vibrante escena de bares, restaurantes y música en vivo. Los mercados y tiendas locales, llenos de color, aromas y sabores, revelan la riqueza de la cultura oaxaqueña.",
      "Desde Casa Zii, todo está al alcance: la tranquilidad del entorno tropical, el diseño contemporáneo en armonía con la naturaleza y la energía única de una comunidad que vive intensamente, al ritmo del sol y las olas.",
    ],
    closing: "Casa Zii es el refugio ideal para olvidar la ciudad, reconectar con la naturaleza y vivir intensamente cada instante.",
  },
  en: {
    experienceTitle: "A high-level experience",
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
    closing: "Casa Zii is the perfect retreat to leave the city behind, reconnect with nature, and fully embrace every moment.",
  },
} as const;

const LA_PUNTA_IMAGES = [
  { src: "/figma/latest/image-12.jpg", alt: "Tablas de surf bajo las palmeras en La Punta" },
  { src: "/figma/latest/image-13.jpg", alt: "Bebida artesanal en un café de La Punta" },
  { src: "/figma/latest/image-14.jpg", alt: "Surfista al atardecer en Zicatela" },
] as const;

// Same title/body styling as the previous LaPuntaSection on main.
const titleClass = "mb-[24px] text-center lg:mb-[40px] font-[family-name:var(--font-courier)] text-[18px] font-bold leading-[20px] text-[#222]";
const bodyStyle = { fontFamily: "Courier Prime", fontWeight: 400, fontSize: "14px", lineHeight: "16px", color: "#222222" } as const;

export default function ExperienceSection() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section className="px-4 pb-[4px] pt-[60px] lg:pb-[40px] lg:pt-[120px]">
      <div className="mx-auto max-w-[1073px]">
        <h2 className={titleClass}>{t.experienceTitle}</h2>
        <div className="mx-auto max-w-[755px] space-y-4 text-center" style={bodyStyle}>
          {t.experience.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="relative mx-auto mt-[60px] aspect-[845/570] lg:mt-[120px] w-full max-w-[836px]">
          <Image src="/figma/latest/image-11.jpg" alt={t.beachAlt} fill sizes="(min-width: 1024px) 836px, 100vw" className="object-cover" />
        </div>

        <h2 className={`mt-[60px] lg:mt-[120px] ${titleClass}`}>{t.laPuntaTitle}</h2>
        <div className="mx-auto max-w-[755px] space-y-4 text-center" style={bodyStyle}>
          {t.laPunta.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-[60px] grid grid-cols-1 gap-[24px] sm:grid-cols-3 lg:mt-[120px] lg:gap-[40px]">
          {LA_PUNTA_IMAGES.map((image) => (
            <div key={image.src} className="relative aspect-[409/609] w-full">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>

        <p className="mx-auto mt-[60px] max-w-[755px] text-center lg:mt-[120px]" style={bodyStyle}>
          {t.closing}
        </p>
      </div>
    </section>
  );
}
