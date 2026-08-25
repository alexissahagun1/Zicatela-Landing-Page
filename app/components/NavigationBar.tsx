"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const navigationText = {
    es: {
      casaCampeche: "● CASA CAMPECHE",
      casaPalmas: "▲ CASA PALMAS",
      book: "Reservar",
    },
    en: {
      casaCampeche: "● CASA CAMPECHE",
      casaPalmas: "▲ CASA PALMAS",
      book: "Book Now",
    },
  };

  const currentNavText = navigationText[language];
  const alternateLanguage = language === "es" ? "English" : "Español";
  const alternateFlag =
    language === "es" ? "/english-logo.png" : "/Flag_of_Mexico.png";
  const languageAction =
    language === "es" ? "Cambiar a inglés" : "Cambiar a español";

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 z-40 flex h-16 w-full items-center justify-between bg-white px-4 md:grid md:h-[74px] md:grid-cols-[1fr_auto_1fr] md:px-8 lg:px-16 xl:px-24">
        <div className="justify-self-start">
          <Link href="/homepage" onClick={closeMobileMenu}>
            <Logo />
          </Link>
        </div>

        <div className="hidden items-center justify-self-center whitespace-nowrap md:flex md:gap-8 lg:gap-12">
          <Link
            href="/casa-campeche"
            className="font-[family-name:var(--font-courier)] text-[14px] leading-[18px] text-[#222222] hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#222222]"
          >
            {currentNavText.casaCampeche}
          </Link>
          <Link
            href="/casa-palmas"
            className="font-[family-name:var(--font-courier)] text-[14px] leading-[18px] text-[#222222] hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#222222]"
          >
            {currentNavText.casaPalmas}
          </Link>
        </div>

        <div className="flex items-center justify-self-end gap-2 md:gap-4 lg:gap-6">
          <Link href="/booking" className="order-1 md:order-none">
            <span className="flex h-[38px] w-[96px] items-center justify-center bg-[#A04E39] text-[14px] leading-[16px] text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A04E39] md:h-[37px] md:w-[133px] md:text-[20px] md:leading-[22px]">
              {currentNavText.book}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="order-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 p-0 md:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span className="h-px w-5 bg-black" />
            <span className="h-px w-5 bg-black" />
            <span className="h-px w-5 bg-black" />
          </button>

          <a
            href="https://instagram.com/casazii"
            target="_blank"
            rel="noreferrer"
            className="hidden hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222] md:block"
          >
            <Image
              src="/instagram-logo.png"
              alt="Instagram de Casa Zii"
              width={21}
              height={22}
            />
          </a>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={languageAction}
            title={languageAction}
            className="hidden cursor-pointer items-center space-x-1 hover:opacity-70 md:flex"
          >
            <Image src={alternateFlag} alt="" width={16} height={16} />
            <span className="text-[13px] leading-[15px] text-black">{alternateLanguage}</span>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 bg-[#F5F5F5] transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-black p-4">
            <Link href="/homepage" onClick={closeMobileMenu}>
              <Logo />
            </Link>
            <button
              type="button"
              onClick={closeMobileMenu}
              className="p-2"
              aria-label="Cerrar menú"
            >
              <div className="flex h-6 w-6 flex-col justify-center">
                <div className="h-0.5 w-6 translate-y-0.5 rotate-45 bg-black" />
                <div className="-translate-y-0.5 h-0.5 w-6 -rotate-45 bg-black" />
              </div>
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-start space-y-6 px-6 py-8">
            <Link
              href="/casa-campeche"
              className="font-mono text-lg tracking-wide text-black hover:opacity-70"
              onClick={closeMobileMenu}
            >
              CASA CAMPECHE
            </Link>
            <Link
              href="/casa-palmas"
              className="font-mono text-lg tracking-wide text-black hover:opacity-70"
              onClick={closeMobileMenu}
            >
              CASA PALMAS
            </Link>
            <div className="pt-4">
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={languageAction}
                title={languageAction}
                className="flex cursor-pointer items-center space-x-2 hover:opacity-70"
              >
                <Image src={alternateFlag} alt="" width={16} height={16} />
                <span className="font-mono text-sm text-black">{alternateLanguage}</span>
              </button>
            </div>

            <div className="pt-2">
              <a
                href="https://instagram.com/casazii"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 hover:opacity-70"
              >
                <Image
                  src="/instagram-logo.png"
                  alt=""
                  width={21}
                  height={22}
                />
                <span className="font-mono text-sm text-black">
                  Instagram de Casa Zii
                </span>
              </a>
            </div>

            <div className="flex justify-center pt-6">
              <Link href="/booking" onClick={closeMobileMenu}>
                <span className="bg-[#A04E39] px-8 py-4 font-mono text-md tracking-wide text-white hover:opacity-90">
                  {currentNavText.book}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
