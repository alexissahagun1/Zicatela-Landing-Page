import { NextRequest, NextResponse } from "next/server";
import { createQuote } from "@/lib/guesty";
import { mockCreateQuote } from "@/lib/guesty-mock";
import { badRequest, toErrorResponse, validateDateRange } from "../_shared";

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
  const adults = Number(body?.adults ?? 2);
  const children = body?.children == null ? 0 : Number(body.children);
  const infants = body?.infants == null ? 0 : Number(body.infants);
  if (body?.promoCode != null && typeof body.promoCode !== "string") {
    return badRequest("promoCode debe ser texto.");
  }
  const promoCode = body?.promoCode == null ? "" : body.promoCode.trim().toUpperCase();

  if (typeof listingId !== "string" || !listingId.trim()) {
    return badRequest("listingId es obligatorio.");
  }
  if (typeof checkIn !== "string" || typeof checkOut !== "string") {
    return badRequest("checkIn y checkOut deben ser fechas en formato YYYY-MM-DD.");
  }
  const dateError = validateDateRange(checkIn, checkOut);
  if (dateError) return badRequest(dateError);
  if (promoCode.length > 50 || (promoCode && !/^[A-Z0-9_-]+$/.test(promoCode))) {
    return badRequest("promoCode solo puede contener letras, números, guiones y guiones bajos.");
  }
  if (!Number.isInteger(adults) || adults < 1 || adults > 30) {
    return badRequest("adults debe ser un entero entre 1 y 30.");
  }
  if (
    !Number.isInteger(children) ||
    children < 0 ||
    children > 20 ||
    !Number.isInteger(infants) ||
    infants < 0 ||
    infants > 20
  ) {
    return badRequest("children e infants deben ser enteros entre 0 y 20.");
  }

  try {
    const quote =
      process.env.GUESTY_MOCK === "1"
        ? mockCreateQuote({
            listingId: listingId.trim(),
            checkIn,
            checkOut,
            adults,
            promoCode: promoCode || undefined,
          })
        : await createQuote({
            listingId: listingId.trim(),
            checkIn,
            checkOut,
            adults,
            children,
            infants,
            couponCode: promoCode || undefined,
          });
    return NextResponse.json(
      {
        quote,
        ...(process.env.GUESTY_MOCK === "1" ? { mock: true } : {}),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return toErrorResponse(error);
  }
}
