"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import BookingResults from "./BookingResults";
import BookingSearchBar, { type BookingSearchValues } from "./BookingSearchBar";
import { useLanguage } from "../contexts/LanguageContext";

const copy = {
  es: {
    action: "RESERVAR",
    close: "Cerrar reserva",
    panel: "Reserva directa con Casa Zii",
  },
  en: {
    action: "BOOK NOW",
    close: "Close booking",
    panel: "Book directly with Casa Zii",
  },
} as const;

export default function StickyBookingBar() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [search, setSearch] = useState<BookingSearchValues | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPanelClosing, setIsPanelClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const t = copy[language];

  useEffect(() => {
    if (!isPanelOpen) return;
    const previousOverflow = document.body.style.overflow;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closePanel();
    }
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPanelOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  if (pathname === "/booking") return null;

  function handleSearch(values: BookingSearchValues) {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setSearch(values);
    setIsPanelClosing(false);
    setIsPanelOpen(true);
  }

  function closePanel() {
    if (isPanelClosing) return;
    setIsPanelClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setIsPanelOpen(false);
      setIsPanelClosing(false);
      closeTimerRef.current = null;
    }, 180);
  }

  return (
    <>
      <aside
        aria-label={t.panel}
        className="pointer-events-none fixed inset-x-0 bottom-3 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:bottom-5 md:px-6"
      >
        <div className="pointer-events-auto mx-auto w-full max-w-4xl">
          <BookingSearchBar
            onSearch={handleSearch}
            popoverDirection="up"
            submitLabel={t.action}
            mobileCompact
          />
        </div>
      </aside>

      {isPanelOpen && search && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-3 pt-16 md:items-center md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={t.panel}
        >
          <button
            type="button"
            aria-label={t.close}
            onClick={closePanel}
            className="casa-zii-booking-scrim absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          />
          <section
            data-state={isPanelClosing ? "closing" : "open"}
            className={`casa-zii-booking-panel relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_32px_100px_rgba(0,0,0,0.28)] ${
              isPanelClosing ? "casa-zii-booking-panel-exit" : ""
            }`}
          >
            <header className="flex items-center justify-between border-b border-[#E6E6E6] px-5 py-4 md:px-7">
              <p className="font-[family-name:var(--font-courier)] text-[11px] uppercase tracking-[0.16em] text-[#222]">
                {t.panel}
              </p>
              <button
                type="button"
                onClick={closePanel}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E0E0E0] text-[#222] transition-colors hover:bg-[#F7F7F7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222]"
                aria-label={t.close}
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </header>
            <div className="overflow-y-auto px-5 py-6 md:px-8 md:py-8">
              <BookingResults search={search} />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
