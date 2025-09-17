"use client";

import { useState } from "react";
import Logo from "./Logo";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from '../contexts/LanguageContext';

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const navigationText = {
    es: {
      casaCampeche: "● CASA CAMPECHE",
      casaPalmas: "▲ CASA PALMAS",
      press: "PRENSA"
    },
    en: {
      casaCampeche: "● CASA CAMPECHE",
      casaPalmas: "▲ CASA PALMAS",
      press: "PRESS"
    }
  };

  const currentNavText = navigationText[language];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="w-full h-16 md:h-26 bg-white flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/homepage">
            <Logo />
          </Link>
        </div>

        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-12 whitespace-nowrap">
          <Link href="/casa-campeche" className="text-[#222222] text-[10px] md:text-[14px] leading-[11px] hover:opacity-70 whitespace-nowrap">
            {currentNavText.casaCampeche}
          </Link>
          <Link href="/casa-palmas" className="text-[#222222] text-[10px] md:text-[14px] leading-[11px] hover:opacity-70 whitespace-nowrap">
            {currentNavText.casaPalmas}
          </Link>
          <Link href="/prensa" className="text-[#222222] text-[10px] md:text-[14px] leading-[11px] hover:opacity-70 whitespace-nowrap">
            {currentNavText.press}
          </Link>
        </div>

        {/* Right side - Book Now button, Instagram, and English */}
        <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
          {/* Mobile Menu Button - Only visible on mobile */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col space-y-1 p-2"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
          </button>

          <Link href="/contact">
            <button className="w-[100px] md:w-[133px] h-[32px] md:h-[37px] bg-[#A04E39] text-white text-[14px] md:text-[20px] leading-[16px] md:leading-[22px] flex items-center justify-center hover:opacity-90">
              Book Now
            </button>
          </Link>
          
          {/* Instagram Icon - Hidden on mobile */}
          <a href="https://instagram.com/casazii" target="_blank" rel="noopener noreferrer">
            <Image
              src="/instagram-logo.png"
              alt="Instagram"
              width={21}
              height={22}
              className="hidden md:block hover:opacity-70"
            />
          </a>
          
          {/* Language Toggle with Flag - Hidden on mobile */}
          <button 
            onClick={toggleLanguage}
            className="hidden md:flex items-center space-x-1 hover:opacity-70 cursor-pointer"
          >
            {language === 'es' ? (
              <Image
                src="/english-logo.png"
                alt="UK Flag"
                width={16}
                height={16}
              />
            ) : (
              <Image
                src="/Flag_of_Mexico.png"
                alt="Mexican Flag"
                width={16}
                height={16}
              />
            )}
            <span className="text-black text-[13px] leading-[15px]">
              {language === 'es' ? 'English' : 'Español'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/homepage" onClick={() => setIsMobileMenuOpen(false)}>
                <Logo />
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="p-2"
                aria-label="Close mobile menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center">
                  <div className="w-6 h-0.5 bg-black transform rotate-45 translate-y-0.5"></div>
                  <div className="w-6 h-0.5 bg-black transform -rotate-45 -translate-y-0.5"></div>
                </div>
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex-1 flex flex-col justify-center items-center space-y-8">
              <Link 
                href="/casa-campeche" 
                className="text-[#222222] text-lg hover:opacity-70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentNavText.casaCampeche}
              </Link>
              <Link 
                href="/casa-palmas" 
                className="text-[#222222] text-lg hover:opacity-70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentNavText.casaPalmas}
              </Link>
              <Link 
                href="/prensa" 
                className="text-[#222222] text-lg hover:opacity-70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentNavText.press}
              </Link>
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-4 border-t flex items-center justify-center space-x-4">
              <a href="https://instagram.com/casazii" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/instagram-logo.png"
                  alt="Instagram"
                  width={21}
                  height={22}
                  className="hover:opacity-70"
                />
              </a>
              <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-1 hover:opacity-70 cursor-pointer"
              >
                {language === 'es' ? (
                  <Image
                    src="/english-logo.png"
                    alt="UK Flag"
                    width={16}
                    height={16}
                  />
                ) : (
                  <Image
                    src="/Flag_of_Mexico.png"
                    alt="Mexican Flag"
                    width={16}
                    height={16}
                  />
                )}
                <span className="text-black text-sm">
                  {language === 'es' ? 'English' : 'Español'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
