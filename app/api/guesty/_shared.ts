import { NextResponse } from "next/server";
import { GuestyError } from "@/lib/guesty";

export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

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
