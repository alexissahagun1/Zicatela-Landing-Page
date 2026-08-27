"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

const copy = {
  es: {
    privacy: "AVISO DE PRIVACIDAD",
    terms: "TÉRMINOS Y CONDICIONES",
  },
  en: {
    privacy: "PRIVACY POLICY",
    terms: "TERMS AND CONDITIONS",
  },
} as const;

const addressClass = "font-[family-name:var(--font-courier)] text-black";

export default function Footer() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <footer className="w-full bg-white">
      <div className="relative mx-auto flex min-h-[372px] w-full max-w-[1280px] flex-col overflow-hidden px-6 pb-10 pt-4 text-black md:block md:h-[372px] md:min-h-0 md:px-0 md:pb-0 md:pt-0">
        <Link
          href="https://instagram.com/casazii"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram de Casa Zii"
          className="flex w-fit items-center gap-2 self-center font-[family-name:var(--font-courier)] text-[15px] leading-5 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#222222] md:absolute md:left-1/2 md:top-4 md:-translate-x-1/2"
        >
          <Image
            src="/figma-footer-instagram.svg"
            alt=""
            width={21}
            height={22}
            className="h-[22px] w-[21px]"
          />
          <span>Casa Zii</span>
        </Link>

        <div className={`${addressClass} mt-12 md:absolute md:left-[4.69%] md:top-[88px] md:mt-0`}>
          <p className="m-0 text-[22px] leading-6">Casa Zii Palmas</p>
          <p className="m-0 text-[15px] leading-6">
            Calle de la Paloma S/N, Brisas de Zicatela
          </p>
          <p className="m-0 text-[15px] leading-6">Puerto Escondido, Oaxaca.</p>
        </div>

        <div className={`${addressClass} mt-10 md:absolute md:left-[4.69%] md:top-[178px] md:mt-0`}>
          <p className="m-0 text-[22px] leading-6">Casa Zii Campeche</p>
          <p className="m-0 text-[15px] leading-6">
            Calle Campeche S/N, Brisas de Zicatela
          </p>
          <p className="m-0 text-[15px] leading-6">Puerto Escondido, Oaxaca.</p>
        </div>

        <div className="mt-10 font-[family-name:var(--font-courier)] text-[15px] leading-6 text-black md:absolute md:left-[81.86%] md:top-[111px] md:mt-0">
          <span>FAQs</span>
        </div>

        <div className="mt-6 w-[172px] font-[family-name:var(--font-courier)] text-[15px] leading-6 text-black md:absolute md:left-[81.86%] md:top-[192px] md:mt-0">
          <p className="m-0">{t.privacy}</p>
          <p className="m-0">{t.terms}</p>
        </div>
      </div>
    </footer>
  );
}
