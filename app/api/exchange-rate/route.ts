import { NextResponse } from "next/server";

const MXN_USD_RATE_URL =
  "https://api.frankfurter.dev/v2/providers/banxico/rate/mxn/usd";
const RATE_CACHE_SECONDS = 21_600;

export async function GET() {
  try {
    const response = await fetch(MXN_USD_RATE_URL, {
      next: { revalidate: RATE_CACHE_SECONDS },
    });
    if (!response.ok) throw new Error(`Exchange rate provider returned ${response.status}`);

    const data: unknown = await response.json();
    if (
      !data ||
      typeof data !== "object" ||
      !("rate" in data) ||
      typeof data.rate !== "number" ||
      !Number.isFinite(data.rate) ||
      data.rate <= 0 ||
      !("date" in data) ||
      typeof data.date !== "string"
    ) {
      throw new Error("Exchange rate provider returned invalid data");
    }

    return NextResponse.json(
      { base: "MXN", quote: "USD", rate: data.rate, date: data.date },
      {
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=21600",
        },
      }
    );
  } catch (error) {
    console.error("[exchange-rate] could not retrieve MXN/USD rate:", error);
    return NextResponse.json(
      { error: "No se pudo obtener el tipo de cambio MXN/USD." },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}
