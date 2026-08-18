"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import type { BookingSearchValues } from "./BookingSearchBar";

type AvailableListing = {
  id: string;
  nickname: string | null;
  title: string | null;
  house: "campeche" | "palmas" | null;
  unit: string | null;
  accommodates: number;
  minNights: number | null;
  maxNights: number | null;
  currency: string | null;
  basePrice: number | null;
  cleaningFee: number | null;
  extraPersonFee: number | null;
  guestsIncludedInRegularFee: number | null;
  address: string | null;
};

type QuoteDay = { date: string; basePrice: number; price: number };

type QuoteRatePlan = {
  id: string;
  name: string;
  cancellationPolicy: string | null;
  currency: string;
  days: QuoteDay[];
  subtotal: number;
  cleaningFee: number;
  total: number;
};

type GuestyQuote = {
  quoteId: string;
  listingId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  expiresAt: string | null;
  ratePlans: QuoteRatePlan[];
};

type QuoteState =
  | { status: "loading" }
  | { status: "ready"; quote: GuestyQuote }
  | { status: "error"; message: string };

type BookingState =
  | { status: "idle" }
  | { status: "form" }
  | { status: "submitting" }
  | { status: "done"; confirmationCode: string | null }
  | { status: "error"; message: string };

type BookingResultsProps = {
  search: BookingSearchValues;
};

const copy = {
  es: {
    availability: "Disponibilidad",
    loading: "Consultando disponibilidad en tiempo real…",
    errorTitle: "No se pudo consultar la disponibilidad",
    noResults: "No hay disponibilidad para esas fechas en este momento.",
    noResultsHint: "Prueba con otras fechas o con menos huéspedes.",
    nights: "noches",
    guests: "huéspedes",
    unitsAvailable: "unidades disponibles",
    roomsNote: (requested: number, available: number) =>
      `Buscaste ${requested} ${
        requested === 1 ? "unidad" : "unidades"
      }, pero solo hay ${available} disponible${available === 1 ? "" : "s"} para esas fechas.`,
    promoNote: (code: string) =>
      `El código "${code}" no se puede aplicar automáticamente con la Open API; requiere la Booking Engine API.`,
    perNight: "/noche",
    from: "Desde",
    plusCleaning: (amount: string) => `+ limpieza ${amount}`,
    quoteCta: "Ver cotización",
    quoteLoading: "Calculando cotización…",
    quoteError: "No se pudo calcular la cotización.",
    quoteTitle: "Cotización",
    ratePlan: "Tarifa",
    nightsBreakdown: "noches",
    subtotal: "Subtotal",
    cleaningFee: "Limpieza",
    total: "Total",
    validUntil: "Válida hasta",
    requestCta: "Solicitar reservación",
    requestInfo: "Se enviará una solicitud de reservación. No se realiza ningún cobro en este paso.",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Email",
    phone: "Teléfono",
    notes: "Notas (opcional)",
    sendRequest: "Enviar solicitud",
    submitting: "Enviando solicitud…",
    requiredField: "Completa nombre, apellido y email.",
    invalidEmail: "El email no es válido.",
    bookingError: "No se pudo enviar la solicitud. Intenta de nuevo.",
    bookingDone: "¡Solicitud enviada!",
    bookingDoneInfo: "Te contactaremos para confirmar la disponibilidad. No se realizó ningún cobro.",
    confirmationCode: "Código de confirmación",
    back: "Volver",
    retry: "Reintentar",
  },
  en: {
    availability: "Availability",
    loading: "Checking real-time availability…",
    errorTitle: "Could not check availability",
    noResults: "There is no availability for those dates right now.",
    noResultsHint: "Try different dates or fewer guests.",
    nights: "nights",
    guests: "guests",
    unitsAvailable: "units available",
    roomsNote: (requested: number, available: number) =>
      `You searched for ${requested} ${requested === 1 ? "unit" : "units"}, but only ${available} ${
        available === 1 ? "is" : "are"
      } available for those dates.`,
    promoNote: (code: string) =>
      `The code "${code}" cannot be applied automatically with the Open API; it requires the Booking Engine API.`,
    perNight: "/night",
    from: "From",
    plusCleaning: (amount: string) => `+ cleaning ${amount}`,
    quoteCta: "Get a quote",
    quoteLoading: "Calculating quote…",
    quoteError: "Could not calculate the quote.",
    quoteTitle: "Quote",
    ratePlan: "Rate plan",
    nightsBreakdown: "nights",
    subtotal: "Subtotal",
    cleaningFee: "Cleaning",
    total: "Total",
    validUntil: "Valid until",
    requestCta: "Request booking",
    requestInfo: "A booking request will be sent. No payment is taken at this step.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    notes: "Notes (optional)",
    sendRequest: "Send request",
    submitting: "Sending request…",
    requiredField: "Fill in first name, last name and email.",
    invalidEmail: "Email is not valid.",
    bookingError: "Could not send the request. Please try again.",
    bookingDone: "Request sent!",
    bookingDoneInfo: "We will contact you to confirm availability. No payment was taken.",
    confirmationCode: "Confirmation code",
    back: "Back",
    retry: "Retry",
  },
} as const;

function toDateInput(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateLabel(dateStr: string, language: "es" | "en"): string {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString(language === "es" ? "es-MX" : "en-US", {
    day: "numeric",
    month: "short",
  });
}

function formatMoney(amount: number, currency: string | null, language: "es" | "en"): string {
  try {
    return new Intl.NumberFormat(language === "es" ? "es-MX" : "en-US", {
      style: "currency",
      currency: currency ?? "MXN",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency ?? "MXN"} ${amount}`;
  }
}

const inputClass =
  "w-full rounded-lg border border-[#E6E6E6] bg-white px-3 py-2 font-['Courier_Prime'] text-sm text-[#222] outline-none transition-colors placeholder:text-[#B0B0B0] focus:border-[#7A7A7C]";

const ctaClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#7A7A7C] px-6 py-2.5 font-['Courier_Prime'] text-xs uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#5F5F61] disabled:cursor-not-allowed disabled:opacity-50";

export default function BookingResults({ search }: BookingResultsProps) {
  const { language } = useLanguage();
  const t = copy[language];

  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AvailableListing[]>([]);
  const [nights, setNights] = useState(0);
  const [quotes, setQuotes] = useState<Record<string, QuoteState>>({});
  const [bookings, setBookings] = useState<Record<string, BookingState>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const checkIn = search.checkIn;
  const checkOut = search.checkOut;

  useEffect(() => {
    if (!checkIn || !checkOut) return;
    const from = checkIn;
    const to = checkOut;
    let cancelled = false;

    async function load() {
      setPhase("loading");
      setError(null);
      setResults([]);
      setQuotes({});
      setBookings({});
      try {
        const params = new URLSearchParams({
          checkIn: toDateInput(from),
          checkOut: toDateInput(to),
          adults: String(search.adults),
        });
        const res = await fetch(`/api/guesty/availability?${params}`);
        const data = await res.json().catch(() => null);
        if (cancelled) return;
        if (!res.ok) throw new Error(data?.error ?? "GUESTY_ERROR");
        setResults(Array.isArray(data?.results) ? data.results : []);
        setNights(Number(data?.nights) || 0);
        setPhase("ready");
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "GUESTY_ERROR");
        setPhase("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [checkIn, checkOut, search.adults]);

  if (!checkIn || !checkOut) return null;
  const checkInDate: Date = checkIn;
  const checkOutDate: Date = checkOut;

  async function handleQuote(listing: AvailableListing) {
    setQuotes((current) => ({ ...current, [listing.id]: { status: "loading" } }));
    try {
      const res = await fetch("/api/guesty/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          checkIn: toDateInput(checkInDate),
          checkOut: toDateInput(checkOutDate),
          adults: search.adults,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "GUESTY_QUOTE_ERROR");
      setQuotes((current) => ({
        ...current,
        [listing.id]: { status: "ready", quote: data.quote as GuestyQuote },
      }));
    } catch (err) {
      setQuotes((current) => ({
        ...current,
        [listing.id]: {
          status: "error",
          message: err instanceof Error ? err.message : "GUESTY_QUOTE_ERROR",
        },
      }));
    }
  }

  async function handleRequestBooking(listing: AvailableListing) {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setFormErrors((current) => ({ ...current, [listing.id]: t.requiredField }));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setFormErrors((current) => ({ ...current, [listing.id]: t.invalidEmail }));
      return;
    }

    setFormErrors((current) => ({ ...current, [listing.id]: "" }));
    setBookings((current) => ({ ...current, [listing.id]: { status: "submitting" } }));
    try {
      const res = await fetch("/api/guesty/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          checkIn: toDateInput(checkInDate),
          checkOut: toDateInput(checkOutDate),
          adults: search.adults,
          status: "reserved",
          guest: {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim() || undefined,
            notes: form.notes.trim() || undefined,
          },
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "GUESTY_RESERVATION_ERROR");
      setBookings((current) => ({
        ...current,
        [listing.id]: {
          status: "done",
          confirmationCode: data?.reservation?.confirmationCode ?? null,
        },
      }));
    } catch (err) {
      setBookings((current) => ({
        ...current,
        [listing.id]: {
          status: "error",
          message: err instanceof Error ? err.message : t.bookingError,
        },
      }));
    }
  }

  const dateLabel = `${formatDateLabel(toDateInput(checkInDate), language)} — ${formatDateLabel(
    toDateInput(checkOutDate),
    language
  )}`;

  return (
    <section className="mx-auto w-full max-w-6xl">
      {phase === "loading" && (
        <div className="flex items-center justify-center gap-3 py-16 text-[#7A7A7C]">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-['Courier_Prime'] text-sm uppercase tracking-[0.12em]">
            {t.loading}
          </span>
        </div>
      )}

      {phase === "error" && (
        <div className="mx-auto max-w-xl py-16 text-center">
          <AlertCircle className="mx-auto mb-4 h-8 w-8 text-[#C0392B]" />
          <h3 className="mb-2 font-['Courier_Prime'] text-lg uppercase tracking-[0.12em] text-[#222]">
            {t.errorTitle}
          </h3>
          <p className="font-['Courier_Prime'] text-sm text-[#7A7A7C]">{error}</p>
        </div>
      )}

      {phase === "ready" && (
        <>
          <div className="mb-6 border-b border-[#E6E6E6] pb-4">
            <h2 className="font-['Courier_Prime'] text-xl uppercase tracking-[0.12em] text-[#222]">
              {t.availability}
            </h2>
            <p className="mt-1 font-['Courier_Prime'] text-sm text-[#7A7A7C]">
              {dateLabel} · {search.adults} {t.guests} · {nights} {t.nights}
            </p>
            {search.rooms > 1 && results.length < search.rooms && (
              <p className="mt-1 font-['Courier_Prime'] text-xs text-[#8A6D3B]">
                {t.roomsNote(search.rooms, results.length)}
              </p>
            )}
            {search.promoCode && (
              <p className="mt-1 font-['Courier_Prime'] text-xs text-[#7A7A7C]">
                {t.promoNote(search.promoCode)}
              </p>
            )}
          </div>

          {results.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-['Courier_Prime'] text-base text-[#222]">{t.noResults}</p>
              <p className="mt-1 font-['Courier_Prime'] text-sm text-[#7A7A7C]">
                {t.noResultsHint}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {results.map((listing) => {
                const quote = quotes[listing.id];
                const booking = bookings[listing.id] ?? { status: "idle" as const };
                return (
                  <article
                    key={listing.id}
                    className="rounded-xl border border-[#E6E6E6] bg-white p-6 shadow-sm"
                  >
                    <p className="font-['Courier_Prime'] text-[11px] uppercase tracking-[0.16em] text-[#8A8A8A]">
                      {listing.unit ?? listing.nickname ?? listing.house ?? ""}
                    </p>
                    <h3 className="mt-1 font-['Courier_Prime'] text-lg text-[#222]">
                      {listing.title ?? listing.nickname ?? "—"}
                    </h3>
                    <p className="mt-1 font-['Courier_Prime'] text-xs text-[#7A7A7C]">
                      {listing.accommodates} {t.guests}
                      {listing.minNights ? ` · ${t.nightsBreakdown} mín. ${listing.minNights}` : ""}
                    </p>

                    {!quote && booking.status === "idle" && (
                      <div className="mt-5">
                        <p className="font-['Courier_Prime'] text-sm text-[#222]">
                          {listing.basePrice != null && listing.currency ? (
                            <>
                              {t.from}{" "}
                              <span className="text-base">
                                {formatMoney(listing.basePrice, listing.currency, language)}
                              </span>{" "}
                              {t.perNight}
                              {listing.cleaningFee != null ? (
                                <span className="ml-1 text-xs text-[#7A7A7C]">
                                  · {t.plusCleaning(formatMoney(listing.cleaningFee, listing.currency, language))}
                                </span>
                              ) : null}
                            </>
                          ) : (
                            t.quoteCta
                          )}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleQuote(listing)}
                          className={`${ctaClass} mt-4`}
                        >
                          {t.quoteCta}
                        </button>
                      </div>
                    )}

                    {quote?.status === "loading" && (
                      <div className="mt-5 flex items-center gap-2 text-[#7A7A7C]">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="font-['Courier_Prime'] text-xs uppercase tracking-[0.12em]">
                          {t.quoteLoading}
                        </span>
                      </div>
                    )}

                    {quote?.status === "error" && booking.status === "idle" && (
                      <div className="mt-5">
                        <p className="font-['Courier_Prime'] text-xs text-[#C0392B]">
                          {quote.message}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleQuote(listing)}
                          className={`${ctaClass} mt-4`}
                        >
                          {t.retry}
                        </button>
                      </div>
                    )}

                    {quote?.status === "ready" && (
                      <div className="mt-5 border-t border-[#F0F0F0] pt-4">
                        <p className="font-['Courier_Prime'] text-[11px] uppercase tracking-[0.16em] text-[#8A8A8A]">
                          {t.quoteTitle}
                        </p>
                        {quote.quote.ratePlans.map((plan) => (
                          <div key={plan.id || plan.name} className="mt-3">
                            <div className="flex items-baseline justify-between gap-4">
                              <span className="font-['Courier_Prime'] text-sm text-[#222]">
                                {plan.name} · {quote.quote.nights} {t.nightsBreakdown}
                              </span>
                              <span className="font-['Courier_Prime'] text-sm tabular-nums text-[#222]">
                                {formatMoney(plan.total, plan.currency, language)}
                              </span>
                            </div>
                            <div className="mt-2 space-y-1">
                              {plan.days.map((day) => (
                                <div
                                  key={day.date}
                                  className="flex justify-between font-['Courier_Prime'] text-xs text-[#7A7A7C]"
                                >
                                  <span>{formatDateLabel(day.date, language)}</span>
                                  <span className="tabular-nums">
                                    {formatMoney(day.price, plan.currency, language)}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 space-y-1 border-t border-[#F0F0F0] pt-2 font-['Courier_Prime'] text-xs text-[#7A7A7C]">
                              <div className="flex justify-between">
                                <span>{t.subtotal}</span>
                                <span className="tabular-nums">
                                  {formatMoney(plan.subtotal, plan.currency, language)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>{t.cleaningFee}</span>
                                <span className="tabular-nums">
                                  {formatMoney(plan.cleaningFee, plan.currency, language)}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm font-semibold text-[#222]">
                                <span>{t.total}</span>
                                <span className="tabular-nums">
                                  {formatMoney(plan.total, plan.currency, language)}
                                </span>
                              </div>
                            </div>
                            {quote.quote.expiresAt && (
                              <p className="mt-2 font-['Courier_Prime'] text-[11px] text-[#8A8A8A]">
                                {t.validUntil}{" "}
                                {new Date(quote.quote.expiresAt).toLocaleString(
                                  language === "es" ? "es-MX" : "en-US",
                                  { dateStyle: "short", timeStyle: "short" }
                                )}
                              </p>
                            )}
                          </div>
                        ))}

                        {booking.status === "idle" && (
                          <div className="mt-4">
                            <button
                              type="button"
                              onClick={() =>
                                setBookings((current) => ({
                                  ...current,
                                  [listing.id]: { status: "form" },
                                }))
                              }
                              className={ctaClass}
                            >
                              {t.requestCta}
                            </button>
                            <p className="mt-2 font-['Courier_Prime'] text-[11px] text-[#8A8A8A]">
                              {t.requestInfo}
                            </p>
                          </div>
                        )}

                        {booking.status === "form" && (
                          <div className="mt-4 space-y-3">
                            {formErrors[listing.id] && (
                              <p className="font-['Courier_Prime'] text-xs text-[#C0392B]">
                                {formErrors[listing.id]}
                              </p>
                            )}
                            <input
                              className={inputClass}
                              placeholder={t.firstName}
                              value={form.firstName}
                              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            />
                            <input
                              className={inputClass}
                              placeholder={t.lastName}
                              value={form.lastName}
                              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            />
                            <input
                              className={inputClass}
                              type="email"
                              placeholder={t.email}
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                            <input
                              className={inputClass}
                              placeholder={t.phone}
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />
                            <textarea
                              className={`${inputClass} min-h-20 resize-y`}
                              placeholder={t.notes}
                              value={form.notes}
                              onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            />
                            <div className="flex flex-wrap gap-3">
                              <button
                                type="button"
                                onClick={() => handleRequestBooking(listing)}
                                className={ctaClass}
                              >
                                {t.sendRequest}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setBookings((current) => ({
                                    ...current,
                                    [listing.id]: { status: "idle" },
                                  }))
                                }
                                className="inline-flex items-center rounded-full border border-[#D0D0D0] px-5 py-2.5 font-['Courier_Prime'] text-xs uppercase tracking-[0.12em] text-[#7A7A7C] transition-colors hover:bg-[#FAFAFA]"
                              >
                                {t.back}
                              </button>
                            </div>
                          </div>
                        )}

                        {booking.status === "submitting" && (
                          <div className="mt-4 flex items-center gap-2 text-[#7A7A7C]">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="font-['Courier_Prime'] text-xs uppercase tracking-[0.12em]">
                              {t.submitting}
                            </span>
                          </div>
                        )}

                        {booking.status === "error" && (
                          <div className="mt-4">
                            <p className="font-['Courier_Prime'] text-xs text-[#C0392B]">
                              {booking.message}
                            </p>
                            <button
                              type="button"
                              onClick={() =>
                                setBookings((current) => ({
                                  ...current,
                                  [listing.id]: { status: "form" },
                                }))
                              }
                              className={`${ctaClass} mt-3`}
                            >
                              {t.retry}
                            </button>
                          </div>
                        )}

                        {booking.status === "done" && (
                          <div className="mt-4 rounded-lg bg-[#F4F8F4] p-4">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
                              <p className="font-['Courier_Prime'] text-sm font-semibold text-[#222]">
                                {t.bookingDone}
                              </p>
                            </div>
                            <p className="mt-1 font-['Courier_Prime'] text-xs text-[#7A7A7C]">
                              {t.bookingDoneInfo}
                            </p>
                            {booking.confirmationCode && (
                              <p className="mt-2 font-['Courier_Prime'] text-xs text-[#7A7A7C]">
                                {t.confirmationCode}:{" "}
                                <span className="font-semibold text-[#222]">
                                  {booking.confirmationCode}
                                </span>
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
}
