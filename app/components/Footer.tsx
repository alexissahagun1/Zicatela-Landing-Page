"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    es: {
      bookNow: "Reservar",
      contact: "CONTACTO",
      reservations: "CENTRO DE RESERVACIONES",
      privacy: "AVISO DE PRIVACIDAD",
      terms: "TÉRMINOS Y CONDICIONES"
    },
    en: {
      bookNow: "Book Now",
      contact: "CONTACT",
      reservations: "RESERVATION CENTRE",
      privacy: "PRIVACY POLICY",
      terms: "TERMS AND CONDITIONS"
    }
  };

  const currentContent = content[language];

  return (
    <footer className="relative min-h-[372px] w-full bg-[#EFEFEF] px-6 pb-[72px] pt-[51px] md:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[249px] w-full max-w-[720px] flex-col">
        <div className="flex justify-center">
          <Link
            href="/booking"
            className="flex h-[67px] w-[214px] items-center justify-center bg-[#222222] font-[family-name:var(--font-courier)] text-[14px] leading-5 text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#222222]"
          >
            {currentContent.bookNow}
          </Link>
        </div>

        <Link
          href="https://instagram.com/casazii"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-0 mt-[46px] flex w-fit items-center gap-2 font-[family-name:var(--font-courier)] text-[14px] leading-5 text-black transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#222222] sm:mx-[42px]"
        >
          <Image
            src="/instagram-logo.png"
            alt="Instagram de Casa Zii"
            width={21}
            height={22}
            className="h-[22px] w-[21px]"
          />
          <span>CASA ZII</span>
        </Link>

        <div className="mx-0 mt-[34px] grid grid-cols-1 gap-8 font-[family-name:var(--font-courier)] text-[14px] leading-5 text-black sm:mx-[42px] sm:mr-[63px] sm:grid-cols-[minmax(0,1fr)_192px] sm:gap-10">
          <div>
            <div>{currentContent.contact}</div>
            <div>{currentContent.reservations}</div>
            <div>+52 00 0000 0000</div>
            <div>reservaciones@casazii.com</div>
          </div>

          <div>
            <div>{currentContent.privacy}</div>
            <div>{currentContent.terms}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
