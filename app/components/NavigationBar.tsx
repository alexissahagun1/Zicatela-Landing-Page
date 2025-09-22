"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from '../contexts/LanguageContext';

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const navigationText = {
    es: {
      casaCampeche: "● CASA CAMPECHE",
      casaPalmas: "▲ CASA PALMAS",
      press: "PRENSA",
      // book: "RESERVA"
    },
    en: {
      casaCampeche: "● CASA CAMPECHE",
      casaPalmas: "▲ CASA PALMAS",
      press: "PRESS",
      // book: "BOOK"
    }
  };

  const currentNavText = navigationText[language];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Apply scroll behavior on all screen sizes
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        setIsNavbarVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav className={`w-full h-16 md:h-26 bg-white flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 transition-transform duration-300 ease-in-out ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      } fixed top-10 left-0 z-40 md:top-11`}>
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
          {/* <Link href="/booking" className="text-[#222222] text-[10px] md:text-[14px] leading-[11px] hover:opacity-70 whitespace-nowrap">
            {currentNavText.book}
          </Link> */}
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

          <Link href="/booking">
            <button className="w-[100px] md:w-[133px] h-[32px] md:h-[37px] bg-[#A04E39] text-white text-[14px] md:text-[20px] leading-[16px] md:leading-[22px] flex items-center justify-center hover:opacity-90">
              {language === 'es' ? 'Reservar' : 'Book Now'}
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
      <div className={`md:hidden fixed inset-0 z-50 bg-[#F5F5F5] transition-all duration-500 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-black">
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
            <div className="flex-1 flex flex-col justify-start px-6 py-8 space-y-6">
              <Link 
                href="/casa-campeche" 
                className="text-black text-lg font-mono tracking-wide hover:opacity-70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CASA CAMPECHE
              </Link>
              <Link 
                href="/casa-palmas" 
                className="text-black text-lg font-mono tracking-wide hover:opacity-70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CASA PALMAS
              </Link>
              <Link 
                href="/prensa" 
                className="text-black text-lg font-mono tracking-wide hover:opacity-70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {currentNavText.press}
              </Link>
              
              {/* Language Selection */}
              <div className="pt-4">
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 hover:opacity-70 cursor-pointer"
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
                  <span className="text-black text-sm font-mono">
                    {language === 'es' ? 'English' : 'Español'}
                  </span>
                </button>
              </div>

              {/* Instagram Link */}
              <div className="pt-2">
                <a href="https://instagram.com/casazii" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:opacity-70">
                  <Image
                    src="/instagram-logo.png"
                    alt="Instagram"
                    width={21}
                    height={22}
                  />
                  <span className="text-black text-sm font-mono">CASA ZII</span>
                </a>
              </div>

              {/* Book Now Button */}
              <div className="pt-6 flex justify-center">
                <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className=" px-8 py-4 bg-[#A04E39] text-white text-md font-mono tracking-wide hover:opacity-90 ">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Contact Information */}
            <div className="px-6 py-6 border-t border-gray-300">
              <div className="text-black">
                <h3 className="text-sm font-mono tracking-wide mb-2">CONTACT</h3>
                <h4 className="text-sm font-mono tracking-wide mb-2">RESERVATION CENTRE</h4>
                <p className="text-sm font-mono mb-1">+52 00 0000 0000</p>
                <p className="text-sm font-mono">reservaciones@CASAZII.COM</p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
