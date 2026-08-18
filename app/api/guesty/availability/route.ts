import { NextRequest, NextResponse } from "next/server";
import { nightsBetween, searchAvailability, type House } from "@/lib/guesty";
import { mockSearchAvailability } from "@/lib/guesty-mock";
import { DATE_RE, badRequest, toErrorResponse } from "../_shared";

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const checkIn = sp.get("checkIn")?.trim() ?? "";
  const checkOut = sp.get("checkOut")?.trim() ?? "";
  const adults = Number(sp.get("adults") ?? "2");
  const houseParam = sp.get("house")?.trim() ?? "";

  if (!DATE_RE.test(checkIn) || !DATE_RE.test(checkOut)) {
    return badRequest("checkIn y checkOut deben ser fechas en formato YYYY-MM-DD.");
  }
  if (checkOut <= checkIn) {
    return badRequest("checkOut debe ser posterior a checkIn.");
  }
  if (!Number.isInteger(adults) || adults < 1 || adults > 30) {
    return badRequest("adults debe ser un entero entre 1 y 30.");
  }

  const house: House | undefined =
    houseParam === "campeche" || houseParam === "palmas" ? houseParam : undefined;

  try {
    const results =
      process.env.GUESTY_MOCK === "1"
        ? mockSearchAvailability({ checkIn, checkOut, adults, house })
        : await searchAvailability({ checkIn, checkOut, adults, house });
    return NextResponse.json(
      {
        results,
        nights: nightsBetween(checkIn, checkOut),
        ...(process.env.GUESTY_MOCK === "1" ? { mock: true } : {}),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return toErrorResponse(error);
  }
}
