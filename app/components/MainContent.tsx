"use client";

import { useLanguage } from '../contexts/LanguageContext';

export default function MainContent() {
  const { language } = useLanguage();

  const content = {
    es: {
      title: "Bienvenidos a Casa Zii",
      slogan: "DONDE EL DISEÑO SE FUNDE CON LA NATURALEZA EN EL CORAZÓN DE LA PUNTA",
      subtitle: "Dos espléndidas casas duplex de estilo brutalista.",
      casaCampeche: "● Casa Campeche",
      casaPalmas: "▲ Casa Palmas",
      description: `Diseñadas por el reconocido arquitecto Ludwig Godefroy, ofrecen una experiencia arquitectónica única, sensorial y profundamente conectada con la naturaleza. <br />
            <br />

            En Casa Zii, el diseño se funde con el entorno tropical de la costa oaxaqueña para invitarte a reconectar con lo esencial. Las casas integran de manera perfecta espacios interiores y exteriores, brindando una sensación de libertad y fluidez que transforma cada momento.  <br />
            <br />

            Disfruta de amenidades premium, internet de alta velocidad con Starlink, y todo lo mejor de Zicatela a tan solo unos pasos. Ubicadas en La Punta, se encuentran a minutos caminando de la playa, restaurantes, bares y cafeterías. <br />
            <br />
            
            Casa Zii es el refugio ideal para olvidar la ciudad, reconectar con la naturaleza y vivir intensamente cada instante.`
    },
    en: {
      title: "Welcome to Casa Zii",
      slogan: "WHERE DESIGN MEETS NATURE IN THE HEART OF LA PUNTA",
      subtitle: "Two stunning brutalist-style duplex homes.",
      casaCampeche: "● Casa Campeche",
      casaPalmas: "▲ Casa Palmas",
      description: `Designed by renowned architect Ludwig Godefroy, Casa Zii offers a unique, sensory architectural experience deeply connected to nature. <br />
            <br />

            At Casa Zii, design merges with the tropical landscape of Oaxaca's coast, inviting you to reconnect with what truly matters. The homes seamlessly blend indoor and outdoor spaces, creating a sense of freedom and flow that transforms every moment. <br />
            <br />

            Enjoy premium amenities, high-speed Starlink internet, and the best of Zicatela just steps away. Located in La Punta, you're only minutes from the beach, restaurants, bars, and cafés. <br />
            <br />
            
            Casa Zii is the ideal escape to forget the city, reconnect with nature, and live each moment to the fullest.`
    }
  };

  const currentContent = content[language];

  return (
    <section className="bg-white py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-[755px] mx-auto">
        {/* Main Heading */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black text-center mb-4 md:mb-6">
          {currentContent.title}
        </h1>
        
        {/* Slogan and introductory text */}
        <div className="w-full md:w-[666px] md:h-[116px] mx-auto">
          <p className="text-[12px] md:text-[16px] leading-[14px] md:leading-[18px] text-[#4C86A0] text-center mb-3 md:mb-4">
            {currentContent.slogan}
          </p>
          <p className="text-[12px] md:text-[16px] leading-[14px] md:leading-[18px] text-[#222222] text-center mb-2">
            {currentContent.subtitle}
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
            <span className="text-[12px] md:text-[16px] leading-[14px] md:leading-[18px] text-[#222222]">
              {currentContent.casaCampeche}
            </span>
            <span className="text-[12px] md:text-[16px] leading-[14px] md:leading-[18px] text-[#222222]">
              {currentContent.casaPalmas}
            </span>
          </div>
        </div>
        
        {/* Descriptive paragraphs */}
        <div className="w-full mx-auto">
          <p 
            className="text-[12px] md:text-[15px] leading-[14px] md:leading-[17px] text-[#222222] text-left md:text-justify"
            dangerouslySetInnerHTML={{ __html: currentContent.description }}
          />
        </div>
      </div>
    </section>
  );
}
