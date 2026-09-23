"use client";

import { useLanguage } from '../contexts/LanguageContext';

export default function MainContent() {
  const { language } = useLanguage();

  const content = {
    es: {
      title: "Una forma única de alojarse",
      titleLine2: "en La Punta",
      subtitle: "Dos espléndidas casas duplex de estilo brutalista, donde el diseño se funde",
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
    // Figma 2008:30: 36px bold title, an empty 36px line, 18/30 subtitle in an 821px box, 159px under the video.
    <section className="bg-[var(--page-bg)] px-4 pb-8 pt-8 md:px-0 md:pb-0 md:pt-[min(calc(var(--f)*159),64px)]">
      <div className="mx-auto max-w-[821px] md:h-[calc(var(--f)*167)] md:w-[calc(var(--f)*821)] md:max-w-none">
        {/* Main Heading */}
        <h1 className="mx-auto mb-4 max-w-full text-center font-[family-name:var(--font-courier)] text-[24px] font-bold leading-[26px] text-[#222222] md:mb-[calc(var(--f)*41)] md:text-[max(24px,calc(var(--f)*36))] md:leading-[1.133]">
          {currentContent.title}
          <br />
          {currentContent.titleLine2}
        </h1>
        
        {/* Slogan and introductory text */}
        <p className="text-center text-[14px] leading-[20px] text-[#222222] md:text-[max(14px,calc(var(--f)*18))] md:leading-[1.667]">
          {currentContent.subtitle} {currentContent.subtitleLine2}
        </p>
        
      </div>
    </section>
  );
}
