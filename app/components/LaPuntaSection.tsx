"use client";

import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

export default function LaPuntaSection() {
  const { language } = useLanguage();

  const content = {
    es: {
      title: "La Punta",
      paragraph1: "En La Punta de Zicatela, el ritmo lo marca el océano. Este rincón de Puerto Escondido conserva el espíritu relajado de un pueblo surfista, donde la vida fluye entre playas doradas, cafés artesanales y calles de tierra bordeadas de palmeras. Aquí, cada atardecer es un espectáculo y cada día una invitación a conectar con la naturaleza.",
      highlight: "VIVE LA PUNTA COMO LOCAL",
      paragraph2: "La playa principal es ideal para quienes buscan iniciarse en el surf o simplemente disfrutar del mar. Al caer la noche, La Punta cobra vida con una vibrante escena de bares, restaurantes y música en vivo. Los mercados y tiendas locales, llenos de color, aromas y sabores, revelan la riqueza de la cultura oaxaqueña.",
      paragraph3: "Desde Casa Zii, todo está al alcance: la tranquilidad del entorno tropical, el diseño contemporáneo en armonía con la naturaleza y la energía única de una comunidad que vive intensamente, al ritmo del sol y las olas."
    },
    en: {
      title: "Discover La Punta",
      paragraph1: "In La Punta de Zicatela, life moves to the rhythm of the ocean. This laid-back corner of Puerto Escondido preserves the soul of a surf town, where golden beaches, artisan cafés, and palm-lined dirt roads set the tone for slow, intentional living. Here, every sunset is a spectacle, and each day is an invitation to reconnect with nature.",
      highlight: "LIVE LA PUNTA LIKE A LOCAL",
      paragraph2: "The main beach is perfect for those learning to surf or simply enjoying the sea. As night falls, La Punta comes alive with vibrant bars, live music, and an eclectic mix of restaurants. Local markets and shops, bursting with color, flavor, and tradition, offer a true taste of Oaxacan culture.",
      paragraph3: "From Casa Zii, everything is within reach: the calm of a tropical setting, contemporary design in harmony with nature, and the magnetic energy of a community that lives fully — in sync with the sun and the waves."
    }
  };

  const currentContent = content[language];

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:gap-24">
          {/* Left Content - Text */}
          <div className="flex-1 lg:max-w-[631px] w-full">
            <h2 className="text-2xl md:text-4xl font-bold text-black mb-6">
              {currentContent.title}
            </h2>
            
            <div className="space-y-4" style={{
              fontFamily: 'Courier Prime',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '16px',
              color: '#222222'
            }}>
              <p className="text-justify md:text-justify">
                {currentContent.paragraph1}
              </p>
              
              <p className="text-left text-teal-600 font-regular text-base md:text-lg">
                {currentContent.highlight}
              </p>
              
              <p className="text-justify md:text-justify">
                {currentContent.paragraph2}
              </p>
              
              <p className="text-justify md:text-justify">
                {currentContent.paragraph3}
              </p>
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="w-full lg:w-[343px] lg:h-[457px] flex-shrink-0 mt-8 lg:mt-0">
            <div className="relative w-full h-[300px] lg:h-[457px]">
              <Image
                src="/LaPunta.png"
                alt="La Punta de Zicatela - Vista aérea de la calle con palmeras y surfistas"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 343px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
