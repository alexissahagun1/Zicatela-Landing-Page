"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
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
  const openDirectReservation = () => {
    closeMobileMenu();
    window.dispatchEvent(new Event("casa-zii:open-reservation"));
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const scrollThreshold = 5;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 0) {
        setIsHeaderVisible(true);
        lastScrollY.current = 0;
        return;
      }

      if (Math.abs(scrollDelta) <= scrollThreshold) return;

      setIsHeaderVisible(scrollDelta < 0);
      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 top-0 z-40 flex h-16 w-full items-center justify-between bg-white px-4 transform-gpu transition-transform duration-[350ms] ease-[ease] will-change-transform md:grid md:h-[74px] md:grid-cols-[1fr_auto_1fr] md:px-8 lg:px-16 xl:px-24 ${
          isHeaderVisible || isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
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
          <button
            type="button"
            onClick={openDirectReservation}
            className="order-1 md:order-none"
          >
            <span className="flex h-[38px] w-[96px] items-center justify-center bg-[#A04E39] text-[14px] leading-[16px] text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A04E39] md:h-[37px] md:w-[133px] md:text-[20px] md:leading-[22px]">
              {currentNavText.book}
            </span>
          </button>

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
            <Image
              src={alternateFlag}
              alt=""
              width={22}
              height={22}
              style={{ width: 16, height: "auto" }}
            />
            <span className="text-[13px] leading-[15px] text-black">{alternateLanguage}</span>
          </button>
        </div>
      </nav>

      <div
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-0 z-50 bg-[#F5F5F5] transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-black p-4">
            <Link
              href="/homepage"
              onClick={closeMobileMenu}
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <Logo />
            </Link>
            <button
              type="button"
              onClick={closeMobileMenu}
              className="p-2"
              aria-label="Cerrar menú"
              tabIndex={isMobileMenuOpen ? 0 : -1}
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
              className="font-[family-name:var(--font-courier)] text-lg tracking-wide text-black hover:opacity-70"
              onClick={closeMobileMenu}
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              CASA CAMPECHE
            </Link>
            <Link
              href="/casa-palmas"
              className="font-[family-name:var(--font-courier)] text-lg tracking-wide text-black hover:opacity-70"
              onClick={closeMobileMenu}
              tabIndex={isMobileMenuOpen ? 0 : -1}
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
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <Image
                  src={alternateFlag}
                  alt=""
                  width={22}
                  height={22}
                  style={{ width: 16, height: "auto" }}
                />
                <span className="font-[family-name:var(--font-courier)] text-sm text-black">{alternateLanguage}</span>
              </button>
            </div>

            <div className="pt-2">
              <a
                href="https://instagram.com/casazii"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 hover:opacity-70"
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <Image
                  src="/instagram-logo.png"
                  alt=""
                  width={21}
                  height={22}
                />
                <span className="font-[family-name:var(--font-courier)] text-sm text-black">
                  Instagram de Casa Zii
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
