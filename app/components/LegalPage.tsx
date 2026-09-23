"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import NavigationBar from "./NavigationBar";
import SiteClosing from "./SiteClosing";
import { useLanguage } from "../contexts/LanguageContext";

// Figma eNHBCVNfWSH0nXswrrvnuS frames 2017:748 (FAQs), 2020:851 (Términos) and 2020:901 (Aviso), 1920 wide:
// 692px intro at x=320/y=460 with a 425×563 photo at x=1175/y=367, a 1280px body (Courier Prime 18/25,
// bold headings), then the closing line fixed at y=3156, the map and the footer. Spanish only in Figma.

export type LegalSection = { heading?: string; lines: ReactNode[] };

export type LegalContent = { intro: ReactNode; sections: LegalSection[]; closing: string };

type Props = {
  photo: { src: string; alt: string };
  content: { es: LegalContent; en: LegalContent };
  /** Figma y where the body text starts (933 for FAQs/Términos, 963 for the Aviso). */
  bodyTop: number;
  /** FAQs leave one empty 25px line between blocks; Términos and the Aviso run on. */
  sectionGap?: number;
};

/** 40px regular title with a 25px line, as in every legal frame. */
export const legalTitleClass =
  "text-[26px] font-normal leading-[30px] md:text-[max(26px,calc(var(--f)*40))] md:leading-[calc(var(--f)*25)]";

const bodyClass =
  "font-[family-name:var(--font-courier)] text-[14px] leading-[20px] text-[#222222] md:text-[max(13px,calc(var(--f)*18))] md:leading-[calc(var(--f)*25)]";

export default function LegalPage({ photo, content, bodyTop, sectionGap = 0 }: Props) {
  const { language } = useLanguage();
  const { intro, sections } = content[language];

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--page-bg)]">
      <NavigationBar />

      <main
        className="px-4 pt-16 md:px-[calc(var(--f)*320)] md:pt-[var(--nav-h)]"
        style={{ ["--hero-h" as string]: bodyTop - 261, ["--body-min" as string]: 3156 - 127 - bodyTop, ["--section-gap" as string]: sectionGap }}
      >
        <div className="relative grid grid-cols-1 gap-8 pt-8 md:block md:h-[calc(var(--f)*var(--hero-h))] md:pt-0">
          <div className={`${bodyClass} md:absolute md:left-0 md:top-[calc(var(--f)*199)] md:w-[calc(var(--f)*692)]`}>{intro}</div>
          <div className="relative aspect-[425/563] w-full max-w-[320px] md:absolute md:left-[calc(var(--f)*855)] md:top-[calc(var(--f)*106)] md:w-[calc(var(--f)*425)] md:max-w-none">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 23vw, 320px" className="object-cover" priority />
          </div>
        </div>

        <div className={`mt-12 space-y-[20px] md:mt-0 md:min-h-[calc(var(--f)*var(--body-min))] md:space-y-[calc(var(--f)*var(--section-gap))] ${bodyClass}`}>
          {sections.map((section, index) => (
            <div key={index}>
              {section.heading ? <p className="font-bold">{section.heading}</p> : null}
              {section.lines.map((line, lineIndex) => (
                <p key={lineIndex}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </main>

      <div className="pt-16 md:pt-[calc(var(--f)*127)]">
        <SiteClosing variant="legal" />
      </div>
    </div>
  );
}
