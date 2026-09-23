"use client";

import MapSection from "./MapSection";
import NewsletterForm from "./NewsletterForm";
import Footer from "./Footer";
import { useLanguage } from "../contexts/LanguageContext";

const closing = {
  es: "Casa Zii es el refugio ideal para olvidar la ciudad, reconectar con la naturaleza y vivir intensamente cada instante.",
  en: "Casa Zii is the perfect retreat to leave the city behind, reconnect with nature, and fully embrace every moment.",
} as const;

// Figma 2026:1031 ("Footer" group of the home and house frames): closing line in a 635×62 box (18/30), 131px to
// the 1054×516 map, 83px to the newsletter, 124px to the footer. Legal frames (2017:806…): 579×90 closing box,
// 129px to the map, 67px to the footer and no newsletter.
const VARIANTS = {
  page: { width: 635, height: 62, mapGap: 131, footerGap: 124, newsletter: true },
  legal: { width: 579, height: 90, mapGap: 129, footerGap: 67, newsletter: false },
} as const;

export default function SiteClosing({ variant = "page" }: { variant?: keyof typeof VARIANTS }) {
  const { language } = useLanguage();
  const v = VARIANTS[variant];

  return (
    <div style={{ ["--closing-w" as string]: `${v.width}px`, ["--closing-h" as string]: `${v.height}px`, ["--map-gap" as string]: `${v.mapGap}px`, ["--footer-gap" as string]: `${v.footerGap}px` }}>
      <p className="mx-auto max-w-[var(--closing-w)] px-4 text-center md:h-[var(--closing-h)] md:px-0 font-[family-name:var(--font-courier)] text-[15px] leading-[24px] text-[#222222] md:text-[18px] md:leading-[30px]">
        {closing[language]}
      </p>
      <MapSection className="px-4 pt-14 md:px-8 md:pt-[var(--map-gap)]" />
      {v.newsletter && (
        <div className="px-4 pt-14 md:pt-[83px]">
          <NewsletterForm />
        </div>
      )}
      <div className="pt-16 md:pt-[var(--footer-gap)]">
        <Footer />
      </div>
    </div>
  );
}
