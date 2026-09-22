"use client";

import { useLanguage } from '../contexts/LanguageContext';

export default function MainContent() {
  const { language } = useLanguage();

  const content = {
    es: {
      title: "Una forma única de alojarse",
      titleLine2: "en La Punta",
      subtitle: "Dos espléndidas casas dúplex de estilo brutalista, donde el diseño se funde",
      subtitleLine2: "con la naturaleza en el corazón de La Punta."
    },
    en: {
      title: "A unique way to stay",
      titleLine2: "in La Punta",
      subtitle: "Two stunning brutalist-style duplex homes, where design blends seamlessly",
      subtitleLine2: "with nature in the heart of La Punta."
    }
  };

  const currentContent = content[language];

  return (
    <section className="bg-white px-4 pb-8 pt-4 md:px-8 md:pb-16 md:pt-8">
      <div className="max-w-[755px] mx-auto">
        {/* Main Heading */}
        <h1 className="mx-auto mb-4 max-w-full text-center font-[family-name:var(--font-courier)] text-[22px] font-bold leading-[24px] text-black md:mb-6 md:text-[24px] md:leading-[26px]">
          {currentContent.title}
          <br />
          {currentContent.titleLine2}
        </h1>
        
        {/* Slogan and introductory text */}
        <div className="w-full md:w-[821px] mx-auto">
          <p className="text-[12px] md:text-[16px] leading-[14px] md:leading-[18px] text-[#222222] text-center mb-2">
            {currentContent.subtitle}
            <br className="hidden md:block" />
            {currentContent.subtitleLine2}
          </p>
        </div>
        
      </div>
    </section>
  );
}
