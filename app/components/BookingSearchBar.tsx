"use client";

import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import {
  Calendar as CalendarIcon,
  Tag,
  Users,
  Minus,
  Plus,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useLanguage } from "../contexts/LanguageContext";

export type BookingSearchValues = {
  checkIn?: Date;
  checkOut?: Date;
  adults: number;
  promoCode: string;
};

type OpenPanel = "when" | "who" | "promo" | null;

type BookingSearchBarProps = {
  onSearch?: (values: BookingSearchValues) => void;
  className?: string;
  popoverDirection?: "up" | "down";
  submitLabel?: string;
  mobileCompact?: boolean;
};

const copy = {
  es: {
    when: "Cuándo",
    who: "Quién",
    promo: "Promoción",
    datePlaceholder: "Entrada — Salida",
    codePlaceholder: "Código",
    search: "Buscar",
    adults: "Adultos",
    adultsShort: "adultos",
    apply: "Listo",
  },
  en: {
    when: "When",
    who: "Who",
    promo: "Promotion",
    datePlaceholder: "Check-in — Check-out",
    codePlaceholder: "Code",
    search: "Search",
    adults: "Adults",
    adultsShort: "adults",
    apply: "Done",
  },
} as const;

function formatDateRange(
  checkIn: Date | undefined,
  checkOut: Date | undefined,
  language: "es" | "en",
  placeholder: string
) {
  if (!checkIn) return placeholder;
  const locale = language === "es" ? es : enUS;
  const start = format(checkIn, "d MMM", { locale });
  if (!checkOut) return `${start} — …`;
  const end = format(checkOut, "d MMM", { locale });
  return `${start} — ${end}`;
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-2">
      <span className="font-['Courier_Prime'] text-sm text-[#222]">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D0D0D0] text-[#222] transition-colors hover:border-[#98989A] disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center font-['Courier_Prime'] text-sm tabular-nums text-[#222]">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D0D0D0] text-[#222] transition-colors hover:border-[#98989A] disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function BookingSearchBar({
  onSearch,
  className,
  popoverDirection = "down",
  submitLabel,
  mobileCompact = false,
}: BookingSearchBarProps) {
  const { language } = useLanguage();
  const t = copy[language];
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [isPopoverClosing, setIsPopoverClosing] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [promoCode, setPromoCode] = useState("");
  const [calendarMonths, setCalendarMonths] = useState(1);
  const [calendarIsCompact, setCalendarIsCompact] = useState(false);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        requestPopoverClose();
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") requestPopoverClose();
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openPanel, isPopoverClosing]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    function openDirectReservation() {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      setOpenPanel("when");
      setIsPopoverClosing(false);
      requestAnimationFrame(() => {
        rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    window.addEventListener("casa-zii:open-reservation", openDirectReservation);
    return () => window.removeEventListener("casa-zii:open-reservation", openDirectReservation);
  }, []);

  useEffect(() => {
    const twoMonthMedia = window.matchMedia(
      "(min-width: 1024px) and (min-height: 760px)"
    );
    const compactMedia = window.matchMedia("(max-height: 699px)");
    const sync = () => {
      setCalendarMonths(twoMonthMedia.matches ? 2 : 1);
      setCalendarIsCompact(compactMedia.matches);
    };
    sync();
    twoMonthMedia.addEventListener("change", sync);
    compactMedia.addEventListener("change", sync);
    return () => {
      twoMonthMedia.removeEventListener("change", sync);
      compactMedia.removeEventListener("change", sync);
    };
  }, []);

  const checkIn = dateRange?.from;
  const checkOut = dateRange?.to;
  const canSearch = Boolean(checkIn && checkOut);

  const whoSummary = `${adults} ${t.adultsShort}`;

  const dateSummary = formatDateRange(
    checkIn,
    checkOut,
    language,
    t.datePlaceholder
  );
  const popoverAnchor =
    popoverDirection === "up"
      ? "bottom-[calc(100%+10px)]"
      : "top-[calc(100%+10px)]";
  const calendarClassName =
    calendarMonths === 2
      ? "p-0 [--cell-size:2.5rem] lg:[--cell-size:3rem]"
      : calendarIsCompact
        ? "p-0 [--cell-size:2rem]"
        : "p-0 [--cell-size:2.25rem]";
  const calendarMonthClassName =
    calendarMonths === 2
      ? "w-full lg:w-[22.75rem] lg:shrink-0 rdp-month"
      : "w-[calc(var(--cell-size)*7)] rdp-month";
  const calendarPopoverPaddingClassName =
    calendarMonths === 2
      ? "px-6 pt-6 lg:px-8 lg:pt-8"
      : calendarIsCompact
        ? "px-5 pt-5"
        : "px-6 pt-6";

  function requestPopoverClose() {
    if (!openPanel || isPopoverClosing) return;

    setIsPopoverClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setOpenPanel(null);
      setIsPopoverClosing(false);
      closeTimerRef.current = null;
    }, 190);
  }

  function togglePanel(panel: Exclude<OpenPanel, null>) {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);

    if (openPanel === panel && !isPopoverClosing) {
      requestPopoverClose();
      return;
    }

    setOpenPanel(panel);
    setIsPopoverClosing(false);
  }

  function handleSearch() {
    if (!canSearch) {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      setOpenPanel("when");
      setIsPopoverClosing(false);
      return;
    }
    requestPopoverClose();
    onSearch?.({
      checkIn,
      checkOut,
      adults,
      promoCode: promoCode.trim(),
    });
  }

  return (
    <div ref={rootRef} data-casa-zii-booking-search className={cn("relative w-full", className)}>
      {mobileCompact && (
        <div className="flex min-h-[68px] items-stretch gap-1 rounded-2xl bg-white p-1 shadow-[0_18px_50px_rgba(0,0,0,0.18)] lg:hidden">
          <button
            type="button"
            onClick={() => togglePanel("when")}
            aria-expanded={openPanel === "when" && !isPopoverClosing}
            className={cn(
              "group flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 text-left transition-colors",
              openPanel === "when" && !isPopoverClosing ? "bg-[#F7F7F7]" : "hover:bg-[#FAFAFA]",
            )}
          >
            <CalendarIcon className="h-4 w-4 shrink-0 text-[#6B6B6B]" strokeWidth={1.5} />
            <span className="min-w-0">
              <span className="block font-['Courier_Prime'] text-[9px] uppercase tracking-[0.08em] text-[#8A8A8A]">
                {t.when}
              </span>
              <span className="block truncate font-['Courier_Prime'] text-[13px] leading-tight text-[#222]">
                {dateSummary}
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => togglePanel("who")}
            aria-expanded={openPanel === "who" && !isPopoverClosing}
            className={cn(
              "flex w-[86px] shrink-0 items-center gap-1.5 rounded-xl px-2 text-left transition-colors",
              openPanel === "who" && !isPopoverClosing ? "bg-[#F7F7F7]" : "hover:bg-[#FAFAFA]",
            )}
          >
            <Users className="h-4 w-4 shrink-0 text-[#6B6B6B]" strokeWidth={1.5} />
            <span className="min-w-0 truncate font-['Courier_Prime'] text-[12px] leading-tight text-[#222]">
              {whoSummary}
            </span>
          </button>

          <button
            type="button"
            onClick={() => togglePanel("promo")}
            aria-expanded={openPanel === "promo" && !isPopoverClosing}
            aria-label={`${t.promo}: ${promoCode || t.codePlaceholder}`}
            title={`${t.promo}: ${promoCode || t.codePlaceholder}`}
            className={cn(
              "flex w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
              openPanel === "promo" && !isPopoverClosing ? "bg-[#F7F7F7]" : "hover:bg-[#FAFAFA]",
            )}
          >
            <Tag className="h-4 w-4 text-[#6B6B6B]" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={handleSearch}
            className={cn(
              "w-[92px] shrink-0 rounded-xl bg-[#7A7A7C] px-2 font-['Courier_Prime'] text-[12px] text-white transition-all hover:bg-[#5F5F61] active:scale-[0.99]",
              !canSearch && "opacity-90",
            )}
          >
            {submitLabel ?? t.search}
          </button>
        </div>
      )}

      <div
        className={cn(
          mobileCompact ? "hidden lg:flex" : "flex",
          "flex-col overflow-visible bg-white shadow-[0_18px_50px_rgba(0,0,0,0.18)]",
          "rounded-2xl lg:flex-row lg:items-stretch lg:rounded-full"
        )}
      >
        {/* When */}
        <button
          type="button"
          onClick={() => togglePanel("when")}
          aria-expanded={openPanel === "when" && !isPopoverClosing}
          className={cn(
            "group relative flex min-w-0 flex-1 items-center gap-3 px-5 py-4 text-left transition-colors",
            "rounded-t-2xl lg:rounded-l-full lg:rounded-tr-none",
            openPanel === "when" && !isPopoverClosing ? "bg-[#F7F7F7]" : "hover:bg-[#FAFAFA]"
          )}
        >
          <CalendarIcon className="h-5 w-5 shrink-0 text-[#6B6B6B]" strokeWidth={1.5} />
          <span className="min-w-0">
            <span className="block font-['Courier_Prime'] text-[11px] uppercase tracking-[0.08em] text-[#8A8A8A]">
              {t.when}
            </span>
            <span
              className={cn(
                "block truncate font-['Courier_Prime'] text-[15px] leading-tight",
                checkIn ? "text-[#222]" : "text-[#6B6B6B]"
              )}
            >
              {dateSummary}
            </span>
          </span>
        </button>

        <div className="hidden h-auto w-px self-stretch bg-[#E6E6E6] lg:block" />
        <div className="h-px w-full bg-[#E6E6E6] lg:hidden" />

        {/* Who */}
        <button
          type="button"
          onClick={() => togglePanel("who")}
          aria-expanded={openPanel === "who" && !isPopoverClosing}
          className={cn(
            "group relative flex min-w-0 flex-1 items-center gap-3 px-5 py-4 text-left transition-colors",
            openPanel === "who" && !isPopoverClosing ? "bg-[#F7F7F7]" : "hover:bg-[#FAFAFA]"
          )}
        >
          <Users className="h-5 w-5 shrink-0 text-[#6B6B6B]" strokeWidth={1.5} />
          <span className="min-w-0">
            <span className="block font-['Courier_Prime'] text-[11px] uppercase tracking-[0.08em] text-[#8A8A8A]">
              {t.who}
            </span>
            <span className="block truncate font-['Courier_Prime'] text-[15px] leading-tight text-[#222]">
              {whoSummary}
            </span>
          </span>
        </button>

        <div className="hidden h-auto w-px self-stretch bg-[#E6E6E6] lg:block" />
        <div className="h-px w-full bg-[#E6E6E6] lg:hidden" />

        {/* Promo */}
        <button
          type="button"
          onClick={() => togglePanel("promo")}
          aria-expanded={openPanel === "promo" && !isPopoverClosing}
          className={cn(
            "group relative flex min-w-0 flex-1 items-center gap-3 px-5 py-4 text-left transition-colors",
            openPanel === "promo" && !isPopoverClosing ? "bg-[#F7F7F7]" : "hover:bg-[#FAFAFA]"
          )}
        >
          <Tag className="h-5 w-5 shrink-0 text-[#6B6B6B]" strokeWidth={1.5} />
          <span className="min-w-0">
            <span className="block font-['Courier_Prime'] text-[11px] uppercase tracking-[0.08em] text-[#8A8A8A]">
              {t.promo}
            </span>
            <span
              className={cn(
                "block truncate font-['Courier_Prime'] text-[15px] leading-tight",
                promoCode ? "text-[#222]" : "text-[#6B6B6B]"
              )}
            >
              {promoCode || t.codePlaceholder}
            </span>
          </span>
        </button>

        {/* Search */}
        <div className="flex items-center p-2 lg:pl-1">
          <button
            type="button"
            onClick={handleSearch}
            className={cn(
              "w-full rounded-xl px-8 py-3.5 font-['Courier_Prime'] text-base text-white transition-all",
              "bg-[#7A7A7C] hover:bg-[#5F5F61] active:scale-[0.99]",
              "lg:min-w-[132px] lg:rounded-full",
              !canSearch && "opacity-90"
            )}
          >
            {submitLabel ?? t.search}
          </button>
        </div>
      </div>

      {/* When panel */}
      {openPanel === "when" && (
        <div
          className={cn(
            "casa-zii-booking-popover absolute left-0 right-0 z-30 lg:left-0 lg:right-auto",
            popoverAnchor,
            popoverDirection === "up"
              ? "casa-zii-booking-popover-up"
              : "casa-zii-booking-popover-down",
            isPopoverClosing && "casa-zii-booking-popover-exit pointer-events-none"
          )}
        >
          <div
            className={cn(
              "grid grid-rows-[auto_auto] overflow-hidden rounded-[28px] border border-[#E8E8E8] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.16)]",
              calendarPopoverPaddingClassName
            )}
          >
            <Calendar
              mode="range"
              numberOfMonths={calendarMonths}
              selected={dateRange}
              onSelect={setDateRange}
              disabled={{ before: new Date() }}
              defaultMonth={checkIn ?? new Date()}
              locale={language === "es" ? es : enUS}
              className={calendarClassName}
              classNames={{
                months: "relative flex flex-col gap-8 md:flex-row lg:gap-14 rdp-months",
                month: calendarMonthClassName,
                nav: "absolute inset-x-0 top-0 z-10 flex w-full items-center justify-between rdp-nav",
              }}
            />
            <footer className="relative z-10 flex h-[60px] items-center justify-end border-t border-[#EFEFEF] bg-white px-2">
              <button
                type="button"
                onClick={requestPopoverClose}
                disabled={!checkIn || !checkOut}
                className="rounded-full bg-[#222] px-5 py-2 font-['Courier_Prime'] text-sm text-white disabled:opacity-40"
              >
                {t.apply}
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Who panel */}
      {openPanel === "who" && (
        <div className={cn("casa-zii-booking-popover absolute left-0 right-0 z-30 lg:left-[28%] lg:right-auto lg:w-[320px]", popoverAnchor, popoverDirection === "up" ? "casa-zii-booking-popover-up" : "casa-zii-booking-popover-down", isPopoverClosing && "casa-zii-booking-popover-exit pointer-events-none")}>
          <div className="rounded-2xl border border-[#E8E8E8] bg-white px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
            <Stepper
              label={t.adults}
              value={adults}
              min={1}
              max={16}
              onChange={setAdults}
            />
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={requestPopoverClose}
                className="rounded-full bg-[#222] px-5 py-2 font-['Courier_Prime'] text-sm text-white"
              >
                {t.apply}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Promo panel */}
      {openPanel === "promo" && (
        <div className={cn("casa-zii-booking-popover absolute left-0 right-0 z-30 lg:left-auto lg:right-[160px] lg:w-[300px]", popoverAnchor, popoverDirection === "up" ? "casa-zii-booking-popover-up" : "casa-zii-booking-popover-down", isPopoverClosing && "casa-zii-booking-popover-exit pointer-events-none")}>
          <div className="rounded-2xl border border-[#E8E8E8] bg-white px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
            <label
              htmlFor="promo-code"
              className="mb-2 block font-['Courier_Prime'] text-[11px] uppercase tracking-[0.08em] text-[#8A8A8A]"
            >
              {t.promo}
            </label>
            <input
              id="promo-code"
              type="text"
              autoFocus
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              placeholder={t.codePlaceholder}
              className="w-full rounded-xl border border-[#E0E0E0] bg-[#FAFAFA] px-4 py-3 font-['Courier_Prime'] text-sm text-[#222] outline-none transition focus:border-[#98989A] focus:bg-white"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={requestPopoverClose}
                className="rounded-full bg-[#222] px-5 py-2 font-['Courier_Prime'] text-sm text-white"
              >
                {t.apply}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
