import { NextRequest, NextResponse } from "next/server";
import { createReservation, type ReservationStatus } from "@/lib/guesty";
import { mockCreateReservation } from "@/lib/guesty-mock";
import { DATE_RE, badRequest, toErrorResponse } from "../_shared";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_STATUSES: ReservationStatus[] = ["inquiry", "reserved"];

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return badRequest("Cuerpo JSON inválido.");
  }

  const listingId: unknown = body?.listingId;
  const checkIn: unknown = body?.checkIn;
  const checkOut: unknown = body?.checkOut;
  const status: unknown = body?.status ?? "reserved";
  const guest: unknown = body?.guest;
  const guestId: unknown = body?.guestId;
  const adults = body?.adults == null ? undefined : Number(body.adults);

  if (typeof listingId !== "string" || !listingId.trim()) {
    return badRequest("listingId es obligatorio.");
  }
  if (typeof checkIn !== "string" || !DATE_RE.test(checkIn)) {
    return badRequest("checkIn debe ser una fecha en formato YYYY-MM-DD.");
  }
  if (typeof checkOut !== "string" || !DATE_RE.test(checkOut)) {
    return badRequest("checkOut debe ser una fecha en formato YYYY-MM-DD.");
  }
  if (checkOut <= checkIn) {
    return badRequest("checkOut debe ser posterior a checkIn.");
  }
  if (typeof status !== "string" || !ALLOWED_STATUSES.includes(status as ReservationStatus)) {
    return badRequest('status debe ser "inquiry" o "reserved".');
  }
  if (adults !== undefined && (!Number.isInteger(adults) || adults < 1 || adults > 30)) {
    return badRequest("adults debe ser un entero entre 1 y 30.");
  }
  if (typeof guestId !== "string" && !guest) {
    return badRequest("Se requiere guest (datos del huésped) o guestId.");
  }

  if (guest) {
    const g = guest as Record<string, unknown>;
    if (typeof g.firstName !== "string" || !g.firstName.trim()) {
      return badRequest("guest.firstName es obligatorio.");
    }
    if (typeof g.lastName !== "string" || !g.lastName.trim()) {
      return badRequest("guest.lastName es obligatorio.");
    }
    if (typeof g.email !== "string" || !EMAIL_RE.test(g.email.trim())) {
      return badRequest("guest.email no es válido.");
    }
  }

  try {
    const reservation =
      process.env.GUESTY_MOCK === "1"
        ? mockCreateReservation({
            listingId: listingId.trim(),
            guest: guest
              ? {
                  firstName: String((guest as Record<string, unknown>).firstName).trim(),
                  lastName: String((guest as Record<string, unknown>).lastName).trim(),
                  email: String((guest as Record<string, unknown>).email).trim(),
                }
              : undefined,
          })
        : await createReservation({
            listingId: listingId.trim(),
            checkIn,
            checkOut,
            status: status as ReservationStatus,
            guestId: typeof guestId === "string" && guestId ? guestId : undefined,
            guest: guest
              ? {
                  firstName: String((guest as Record<string, unknown>).firstName).trim(),
                  lastName: String((guest as Record<string, unknown>).lastName).trim(),
                  email: String((guest as Record<string, unknown>).email).trim(),
                  phone: (guest as Record<string, unknown>).phone
                    ? String((guest as Record<string, unknown>).phone).trim()
                    : undefined,
                  notes: (guest as Record<string, unknown>).notes
                    ? String((guest as Record<string, unknown>).notes).trim()
                    : undefined,
                }
              : undefined,
            guestsCount: adults,
          });
    return NextResponse.json(
      {
        reservation,
        ...(process.env.GUESTY_MOCK === "1" ? { mock: true } : {}),
      },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return toErrorResponse(error);
  }
}
