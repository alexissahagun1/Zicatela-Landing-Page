"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../contexts/LanguageContext";

const copy = {
  es: {
    who: "QUIÉN",
    whoValue: "2 adultos · 1 habitación",
    promo: "PROMOCIÓN",
    promoValue: "Código",
    action: "RESERVAR",
    label: "Reservar una estancia en Casa Zii",
  },
  en: {
    who: "WHO",
    whoValue: "2 adults · 1 room",
    promo: "PROMOTION",
    promoValue: "Code",
    action: "BOOK NOW",
    label: "Book a stay at Casa Zii",
  },
} as const;

export default function StickyBookingBar() {
  const pathname = usePathname();
  const { language } = useLanguage();

  if (pathname === "/booking") return null;

  const t = copy[language];

  return (
    <aside
      aria-label={t.label}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-6"
    >
      <div className="pointer-events-auto mx-auto grid max-w-[760px] grid-cols-[1fr_auto] overflow-hidden border border-[#E4E4E4] bg-white/95 shadow-[0_-10px_35px_rgba(0,0,0,0.12)] backdrop-blur-sm md:grid-cols-[1fr_1fr_auto]">
        <Link
          href="/booking"
          className="flex min-w-0 items-center px-4 py-3 text-left hover:bg-[#FAFAFA] md:px-6 md:py-4"
        >
          <span className="min-w-0">
            <span className="block font-['Courier_Prime'] text-[10px] tracking-[0.12em] text-[#8A8A8A]">
              {t.who}
            </span>
            <span className="block truncate font-['Courier_Prime'] text-[13px] text-[#222] md:text-[15px]">
              {t.whoValue}
            </span>
          </span>
        </Link>

        <Link
          href="/booking"
          className="hidden min-w-0 items-center border-l border-[#E4E4E4] px-6 py-4 text-left hover:bg-[#FAFAFA] md:flex"
        >
          <span className="min-w-0">
            <span className="block font-['Courier_Prime'] text-[10px] tracking-[0.12em] text-[#8A8A8A]">
              {t.promo}
            </span>
            <span className="block truncate font-['Courier_Prime'] text-[15px] text-[#222]">
              {t.promoValue}
            </span>
          </span>
        </Link>

        <Link
          href="/booking"
          className="flex items-center justify-center bg-[#222] px-5 py-3 font-['Courier_Prime'] text-[12px] tracking-[0.08em] text-white transition-colors hover:bg-[#A04E39] md:min-w-[150px] md:px-7 md:py-4 md:text-[14px]"
        >
          {t.action}
        </Link>
      </div>
    </aside>
  );
}
