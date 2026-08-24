import { NextRequest, NextResponse } from "next/server";
import {
  createReservationFromQuote,
  getReservationHoldHours,
  type ReservationResult,
  type ReservationStatus,
} from "@/lib/guesty";
import { mockCreateReservation } from "@/lib/guesty-mock";
import { badRequest, toErrorResponse, validateDateRange } from "../_shared";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IDEMPOTENCY_KEY_RE = /^[A-Za-z0-9._:-]{8,50}$/;
const ALLOWED_STATUSES: ReservationStatus[] = ["inquiry", "reserved"];
const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000;

type IdempotencyEntry = {
  expiresAt: number;
  fingerprint: string;
  reservation: ReservationResult;
};

type InFlightEntry = {
  fingerprint: string;
  promise: Promise<ReservationResult>;
};

// This protects retries within the lifetime of a server instance. The same key
// is also sent to Guesty as originId so a persistent idempotency store can be
// added later without changing the public contract.
const completedRequests = new Map<string, IdempotencyEntry>();
const inFlightRequests = new Map<string, InFlightEntry>();

function cleanIdempotencyCache() {
  const now = Date.now();
  for (const [key, entry] of completedRequests) {
    if (entry.expiresAt <= now) completedRequests.delete(key);
  }
}

function responseFor(reservation: ReservationResult, replayed = false): NextResponse {
  return NextResponse.json(
    {
      reservation,
      ...(process.env.GUESTY_MOCK === "1" ? { mock: true } : {}),
    },
    {
      status: 201,
      headers: {
        "Cache-Control": "no-store",
        ...(replayed ? { "Idempotency-Replayed": "true" } : {}),
      },
    }
  );
}

function conflictResponse() {
  return NextResponse.json(
    {
      error: "El Idempotency-Key ya fue usado con datos diferentes.",
      code: "IDEMPOTENCY_CONFLICT",
    },
    { status: 409 }
  );
}

export async function POST(request: NextRequest) {
  const idempotencyKey = request.headers.get("Idempotency-Key")?.trim() ?? "";
  if (!IDEMPOTENCY_KEY_RE.test(idempotencyKey)) {
    return badRequest(
      "Idempotency-Key es obligatorio y debe tener entre 8 y 50 caracteres seguros."
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return badRequest("Cuerpo JSON inválido.");
  }

  const listingId: unknown = body?.listingId;
  const quoteId: unknown = body?.quoteId;
  const ratePlanId: unknown = body?.ratePlanId;
  const checkIn: unknown = body?.checkIn;
  const checkOut: unknown = body?.checkOut;
  const status: unknown = body?.status ?? "reserved";
  const guest: unknown = body?.guest;
  const guestId: unknown = body?.guestId;
  const adults = body?.adults == null ? undefined : Number(body.adults);

  if (typeof listingId !== "string" || !listingId.trim()) {
    return badRequest("listingId es obligatorio.");
  }
  if (typeof quoteId !== "string" || !quoteId.trim()) {
    return badRequest("quoteId es obligatorio. Primero calcula una cotización.");
  }
  if (typeof ratePlanId !== "undefined" && typeof ratePlanId !== "string") {
    return badRequest("ratePlanId debe ser texto.");
  }
  if (typeof checkIn !== "string" || typeof checkOut !== "string") {
    return badRequest("checkIn y checkOut deben ser fechas en formato YYYY-MM-DD.");
  }
  const dateError = validateDateRange(checkIn, checkOut);
  if (dateError) return badRequest(dateError);
  if (typeof status !== "string" || !ALLOWED_STATUSES.includes(status as ReservationStatus)) {
    return badRequest('status debe ser "inquiry" o "reserved".');
  }
  if (adults !== undefined && (!Number.isInteger(adults) || adults < 1 || adults > 30)) {
    return badRequest("adults debe ser un entero entre 1 y 30.");
  }
  if (
    typeof guestId !== "undefined" &&
    (typeof guestId !== "string" || !guestId.trim())
  ) {
    return badRequest("guestId debe ser texto no vacío.");
  }
  if (
    (typeof guestId !== "string" || !guestId.trim()) &&
    (!guest || typeof guest !== "object" || Array.isArray(guest))
  ) {
    return badRequest("Se requiere guest (datos del huésped) o guestId.");
  }

  let normalizedGuest:
    | {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        notes?: string;
      }
    | undefined;

  if (guest) {
    const g = guest as Record<string, unknown>;
    const firstName = typeof g.firstName === "string" ? g.firstName.trim() : "";
    const lastName = typeof g.lastName === "string" ? g.lastName.trim() : "";
    const email = typeof g.email === "string" ? g.email.trim().toLowerCase() : "";
    const phone = typeof g.phone === "string" ? g.phone.trim() : "";
    const notes = typeof g.notes === "string" ? g.notes.trim() : "";

    if (!firstName || firstName.length > 80) {
      return badRequest("guest.firstName es obligatorio y debe tener máximo 80 caracteres.");
    }
    if (!lastName || lastName.length > 80) {
      return badRequest("guest.lastName es obligatorio y debe tener máximo 80 caracteres.");
    }
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return badRequest("guest.email no es válido.");
    }
    if (phone.length > 40) return badRequest("guest.phone debe tener máximo 40 caracteres.");
    if (notes.length > 1000) return badRequest("guest.notes debe tener máximo 1000 caracteres.");

    normalizedGuest = {
      firstName,
      lastName,
      email,
      ...(phone ? { phone } : {}),
      ...(notes ? { notes } : {}),
    };
  }

  cleanIdempotencyCache();
  const fingerprint = JSON.stringify({
    listingId: listingId.trim(),
    quoteId: quoteId.trim(),
    ratePlanId: typeof ratePlanId === "string" ? ratePlanId.trim() : "",
    checkIn,
    checkOut,
    status,
    adults: adults ?? null,
    guestId: typeof guestId === "string" ? guestId.trim() : "",
    guest: normalizedGuest ?? null,
  });

  const completed = completedRequests.get(idempotencyKey);
  if (completed) {
    if (completed.fingerprint !== fingerprint) return conflictResponse();
    return responseFor(completed.reservation, true);
  }

  const inFlight = inFlightRequests.get(idempotencyKey);
  if (inFlight) {
    if (inFlight.fingerprint !== fingerprint) return conflictResponse();
    try {
      return responseFor(await inFlight.promise, true);
    } catch (error) {
      return toErrorResponse(error);
    }
  }

  const reservationPromise = (async (): Promise<ReservationResult> => {
    if (process.env.GUESTY_MOCK === "1") {
      return mockCreateReservation({
        listingId: listingId.trim(),
        quoteId: quoteId.trim(),
        guest: normalizedGuest
          ? {
              firstName: normalizedGuest.firstName,
              lastName: normalizedGuest.lastName,
              email: normalizedGuest.email,
            }
          : undefined,
      });
    }

    return createReservationFromQuote({
      quoteId: quoteId.trim(),
      ratePlanId: typeof ratePlanId === "string" && ratePlanId.trim() ? ratePlanId.trim() : undefined,
      status: status as ReservationStatus,
      reservedUntil: status === "reserved" ? getReservationHoldHours() : undefined,
      originId: idempotencyKey,
      guestId: typeof guestId === "string" && guestId.trim() ? guestId.trim() : undefined,
      guest: normalizedGuest,
    });
  })();

  inFlightRequests.set(idempotencyKey, { fingerprint, promise: reservationPromise });
  try {
    const reservation = await reservationPromise;
    completedRequests.set(idempotencyKey, {
      expiresAt: Date.now() + IDEMPOTENCY_TTL_MS,
      fingerprint,
      reservation,
    });
    return responseFor(reservation);
  } catch (error) {
    return toErrorResponse(error);
  } finally {
    if (inFlightRequests.get(idempotencyKey)?.promise === reservationPromise) {
      inFlightRequests.delete(idempotencyKey);
    }
  }
}
