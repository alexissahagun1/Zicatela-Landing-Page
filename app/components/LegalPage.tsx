"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import NavigationBar from "./NavigationBar";
import MapSection from "./MapSection";
import Footer from "./Footer";
import { useLanguage } from "../contexts/LanguageContext";

// Figma 2017:748 (FAQs) and 2020:851 (Términos): intro block 692px wide at left with a 425×563 photo at right,
// body text 1280px wide (Courier Prime 18/25, bold section headings), closing line, map and footer.
// Both pages exist in Spanish only in Figma.

export type LegalSection = { heading?: string; lines: ReactNode[] };

export type LegalContent = { intro: ReactNode; sections: LegalSection[]; closing: string };

type Props = {
  photo: { src: string; alt: string };
  content: { es: LegalContent; en: LegalContent };
};

const bodyClass =
  "font-[family-name:var(--font-courier)] text-[14px] leading-[20px] text-[#222222] md:text-[15px] md:leading-[22px]";

export default function LegalPage({ photo, content }: Props) {
  const { language } = useLanguage();
  const { intro, sections, closing } = content[language];

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />

      <div className="px-4 pt-16 md:pt-[74px]">
        <div className="mx-auto max-w-[1073px] pt-[32px] lg:pt-[56px]">
          <div className="grid grid-cols-1 items-start gap-[32px] lg:grid-cols-[1fr_320px] lg:gap-[99px]">
            <div className={bodyClass}>{intro}</div>
            <div className="relative aspect-[425/563] w-full max-w-[320px] lg:justify-self-end">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 320px, 100vw" className="object-cover" priority />
            </div>
          </div>

          <div className={`mt-[48px] space-y-[22px] lg:mt-[64px] ${bodyClass}`}>
            {sections.map((section, index) => (
              <div key={index}>
                {section.heading ? <p className="font-bold">{section.heading}</p> : null}
                {section.lines.map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-[48px] max-w-[579px] text-center font-[family-name:var(--font-courier)] text-[14px] leading-[22px] text-[#222222] md:text-[15px] md:leading-[24px] lg:mt-[64px]">
            {closing}
          </p>
        </div>
      </div>

      <MapSection />
      <Footer />
    </div>
  );
}
