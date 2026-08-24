import { NextResponse } from "next/server";
import { GuestyError } from "@/lib/guesty";

export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDateInput(value: string): boolean {
  if (!DATE_RE.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function validateDateRange(checkIn: string, checkOut: string): string | null {
  if (!isValidDateInput(checkIn) || !isValidDateInput(checkOut)) {
    return "checkIn y checkOut deben ser fechas válidas en formato YYYY-MM-DD.";
  }
  if (checkOut <= checkIn) {
    return "checkOut debe ser posterior a checkIn.";
  }
  return null;
}

export function toErrorResponse(error: unknown): NextResponse {
  if (error instanceof GuestyError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }
  console.error("[guesty] error inesperado:", error);
  return NextResponse.json(
    { error: "Error inesperado del servidor.", code: "INTERNAL" },
    { status: 500 }
  );
}

export function badRequest(message: string): NextResponse {
  return NextResponse.json({ error: message, code: "VALIDATION" }, { status: 400 });
}
