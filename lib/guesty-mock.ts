/**
 * Offline demo mode for the Guesty integration.
 *
 * Enabled only when GUESTY_MOCK=1 (never in production). Returns realistic
 * canned responses so the booking flow can be previewed or adversarially
 * tested without consuming Guesty's daily token quota.
 *
 * Scripted failure hooks (to exercise the UI error paths):
 * - Quote: listing "69e2642c0cc24200134a0257" (Palmas II) -> simulated quote failure
 * - Reservation: email containing "fail" -> simulated reservation failure
 */

import {
  GuestyError,
  nightsBetween,
  type AvailableListing,
  type GuestyQuote,
  type House,
} from "./guesty";

const MOCK_LISTINGS: AvailableListing[] = [
  {
    id: "69e264308acfe70014925284",
    nickname: "Campeche I",
    title: "2BR Architectural Retreat with Private Pool NEW",
    house: "campeche",
    unit: "Campeche I",
    accommodates: 4,
    minNights: 2,
    maxNights: 365,
    currency: "MXN",
    basePrice: 7995,
    cleaningFee: 850,
    extraPersonFee: 1800,
    guestsIncludedInRegularFee: 4,
    address: "C. Campeche Esquina, Brisas de Zicatela, Oaxaca 70934, Mexico",
  },
  {
    id: "69e2643427051200144b1197",
    nickname: "Campeche II",
    title: "Design-Forward 2BR Villa with Private Pool NEW",
    house: "campeche",
    unit: "Campeche II",
    accommodates: 4,
    minNights: 3,
    maxNights: 365,
    currency: "MXN",
    basePrice: 7995,
    cleaningFee: 850,
    extraPersonFee: 1800,
    guestsIncludedInRegularFee: 4,
    address: "Calle Campeche, Punta de Zicatela, Oaxaca 70934, Mexico",
  },
  {
    id: "69e26428794b420013556470",
    nickname: "Palmas I",
    title: "Stylish Villa w/priv. pool, Starlink-Casa Zii(NEW)",
    house: "palmas",
    unit: "Palmas I",
    accommodates: 4,
    minNights: 2,
    maxNights: 365,
    currency: "MXN",
    basePrice: 7995,
    cleaningFee: 850,
    extraPersonFee: 1800,
    guestsIncludedInRegularFee: 4,
    address: "1 Calle de la Paloma, Brisas de Zicatela, Oaxaca 70934, Mexico",
  },
  {
    id: "69e2642c0cc24200134a0257",
    nickname: "Palmas II",
    title: "Stunning Design with pool Starlink  Casa Zii",
    house: "palmas",
    unit: "Palmas II",
    accommodates: 4,
    minNights: 3,
    maxNights: 365,
    currency: "MXN",
    basePrice: 7995,
    cleaningFee: 850,
    extraPersonFee: 1800,
    guestsIncludedInRegularFee: 4,
    address: "Paraíso, Brisas de Zicatela, Oaxaca 70934, Mexico",
  },
];

export function mockSearchAvailability(opts: {
  checkIn: string;
  checkOut: string;
  adults: number;
  house?: House;
}): AvailableListing[] {
  const nights = nightsBetween(opts.checkIn, opts.checkOut);

  const available = MOCK_LISTINGS.filter((listing) => {
    if (opts.house && listing.house !== opts.house) return false;
    if (opts.adults > listing.accommodates) return false;
    if (listing.minNights && nights < listing.minNights) return false;
    return true;
  });

  // Long stays: simulate a partially booked calendar (only one unit left).
  if (nights >= 15) return available.slice(0, 1);
  return available;
}

export function mockCreateQuote(opts: {
  listingId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  promoCode?: string;
}): GuestyQuote {
  if (opts.listingId === "69e2642c0cc24200134a0257") {
    throw new GuestyError(
      "Error simulado de cotización (GUESTY_MOCK).",
      422,
      "MOCK_QUOTE_ERROR"
    );
  }

  const listing =
    MOCK_LISTINGS.find((item) => item.id === opts.listingId) ?? MOCK_LISTINGS[0];
  const nights = nightsBetween(opts.checkIn, opts.checkOut);
  const basePrice = listing.basePrice ?? 7995;
  const cleaningFee = listing.cleaningFee ?? 850;
  const currency = listing.currency ?? "MXN";

  const days = Array.from({ length: nights }, (_, index) => {
    const date = new Date(`${opts.checkIn}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + index);
    return {
      date: date.toISOString().slice(0, 10),
      basePrice,
      price: basePrice,
    };
  });
  const subtotal = days.reduce((sum, day) => sum + day.price, 0);

  return {
    quoteId: `mock_quote_${opts.listingId.slice(-6)}`,
    listingId: opts.listingId,
    checkIn: opts.checkIn,
    checkOut: opts.checkOut,
    nights,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    coupons: opts.promoCode ? [opts.promoCode] : [],
    ratePlans: [
      {
        id: `mock_rate_${opts.listingId.slice(-6)}`,
        name: "Flexible",
        cancellationPolicy: "moderate",
        currency,
        days,
        subtotal,
        cleaningFee,
        total: subtotal + cleaningFee,
      },
    ],
  };
}

export function mockCreateReservation(opts: {
  listingId: string;
  quoteId: string;
  guest?: { firstName: string; lastName: string; email: string };
}): { reservationId: string; confirmationCode: string | null; status: string } {
  if (opts.guest?.email.toLowerCase().includes("fail")) {
    throw new GuestyError(
      "Error simulado al crear la reservación (GUESTY_MOCK).",
      422,
      "MOCK_RESERVATION_ERROR"
    );
  }
  return {
    reservationId: `mock_res_${opts.listingId.slice(-6)}`,
    confirmationCode: `MOCK-${opts.listingId.slice(-4).toUpperCase()}`,
    status: "reserved",
  };
}
