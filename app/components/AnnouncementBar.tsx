"use client";

import { useLanguage } from '../contexts/LanguageContext';

export default function AnnouncementBar() {
  const { language } = useLanguage();

  const content = {
    es: "Una estancia única / Solo para adultos",
    en: "A unique stay / Adults only"
  };

  const currentContent = content[language];

  return (
    <div className="w-full h-10 md:h-11 bg-[#222222] flex items-center justify-center px-4">
      <p className="text-white text-[13px] md:text-[15px] leading-[15px] md:leading-[17px] font-normal text-center">
        {currentContent}
      </p>
    </div>
  );
}
