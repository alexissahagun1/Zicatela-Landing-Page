/**
 * Server-side Guesty Open API client.
 *
 * Credentials: GUESTY_CLIENT_ID / GUESTY_CLIENT_SECRET (see .env.local).
 * Docs: https://open-api-docs.guesty.com/
 *
 * IMPORTANT: Guesty allows a maximum of 5 access tokens per client ID every
 * 24 hours. This module caches the token in memory and in a JSON file under
 * the OS temp dir, so the auth endpoint is hit roughly once a day instead of
 * on every request.
 */

import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

export const GUESTY_AUTH_URL = "https://open-api.guesty.com/oauth2/token";
export const GUESTY_BASE_URL = "https://open-api.guesty.com/v1";

/** Refresh the token when it is closer than 5 minutes to expiring. */
const TOKEN_SKEW_MS = 5 * 60 * 1000;

export type House = "campeche" | "palmas";

export class GuestyError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode = 502, code = "GUESTY_ERROR") {
    super(message);
    this.name = "GuestyError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class GuestyConfigError extends GuestyError {
  constructor(message: string) {
    super(message, 500, "GUESTY_CONFIG_ERROR");
    this.name = "GuestyConfigError";
  }
}

export class GuestyTokenLimitError extends GuestyError {
  retryAfterSeconds: number | null;

  constructor(message: string, retryAfterSeconds: number | null = null) {
    super(message, 429, "GUESTY_TOKEN_LIMIT");
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

/**
 * Casa Zii listings in Guesty. Nicknames match the site units. The env vars
 * GUESTY_LISTING_CAMPECHE / GUESTY_LISTING_PALMAS can override these IDs
 * (comma-separated), which is useful if the account changes.
 */
const KNOWN_LISTINGS: Record<string, { house: House; unit: string }> = {
  "69e264308acfe70014925284": { house: "campeche", unit: "Campeche I" },
  "69e2643427051200144b1197": { house: "campeche", unit: "Campeche II" },
  "69e26428794b420013556470": { house: "palmas", unit: "Palmas I" },
  "69e2642c0cc24200134a0257": { house: "palmas", unit: "Palmas II" },
};

function listingIdsFromEnv(house: House): string[] {
  const raw =
    process.env[house === "campeche" ? "GUESTY_LISTING_CAMPECHE" : "GUESTY_LISTING_PALMAS"];
  if (raw && raw.trim()) {
    return raw
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
  }
  return Object.entries(KNOWN_LISTINGS)
    .filter(([, meta]) => meta.house === house)
    .map(([id]) => id);
}

export function getListingIds(house?: House): string[] {
  const ids =
    house === "campeche" || house === "palmas"
      ? listingIdsFromEnv(house)
      : [...listingIdsFromEnv("campeche"), ...listingIdsFromEnv("palmas")];
  return [...new Set(ids)];
}

export function getListingMeta(listingId: string): { house: House; unit: string } | null {
  return KNOWN_LISTINGS[listingId] ?? null;
}

// ---------------------------------------------------------------------------
// Token cache
// ---------------------------------------------------------------------------

type TokenEntry = { accessToken: string; expiresAt: number };

let memoryCache: TokenEntry | null = null;
let inflight: Promise<string> | null = null;
let blockedUntil: number | null = null;

function tokenCacheFile(): string {
  return (
    process.env.GUESTY_TOKEN_CACHE_PATH ??
    path.join(os.tmpdir(), "casazii-guesty-token.json")
  );
}

async function readTokenCache(): Promise<TokenEntry | null> {
  try {
    const raw = await fs.readFile(tokenCacheFile(), "utf8");
    const parsed = JSON.parse(raw) as Partial<TokenEntry>;
    if (typeof parsed.accessToken === "string" && typeof parsed.expiresAt === "number") {
      return { accessToken: parsed.accessToken, expiresAt: parsed.expiresAt };
    }
  } catch {
    // Missing or corrupt cache is fine; we will request a fresh token.
  }
  return null;
}

async function writeTokenCache(entry: TokenEntry): Promise<void> {
  try {
    await fs.mkdir(path.dirname(tokenCacheFile()), { recursive: true });
    await fs.writeFile(tokenCacheFile(), JSON.stringify(entry), { mode: 0o600 });
  } catch {
    // File caching is best-effort; the in-memory cache still works.
  }
}

export async function getGuestyToken(): Promise<string> {
  const clientId = process.env.GUESTY_CLIENT_ID;
  const clientSecret = process.env.GUESTY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new GuestyConfigError(
      "Faltan GUESTY_CLIENT_ID / GUESTY_CLIENT_SECRET en el entorno. Revisa .env.local."
    );
  }

  const now = Date.now();
  if (memoryCache && memoryCache.expiresAt > now + TOKEN_SKEW_MS) {
    return memoryCache.accessToken;
  }
  if (blockedUntil && now < blockedUntil) {
    throw new GuestyTokenLimitError(
      "Se alcanzó el límite diario de tokens de Guesty. Intenta de nuevo más tarde.",
      Math.ceil((blockedUntil - now) / 1000)
    );
  }
  if (inflight) return inflight;

  inflight = (async () => {
    const cached = await readTokenCache();
    if (cached && cached.expiresAt > Date.now() + TOKEN_SKEW_MS) {
      memoryCache = cached;
      return cached.accessToken;
    }

    const body = new URLSearchParams({
      grant_type: "client_credentials",
      scope: "open-api",
      client_id: clientId,
      client_secret: clientSecret,
    });

    let res: Response;
    try {
      res = await fetch(GUESTY_AUTH_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
        cache: "no-store",
      });
    } catch {
      throw new GuestyError("No se pudo conectar con Guesty para autenticar.", 502, "GUESTY_NETWORK");
    }

    const data: any = await res.json().catch(() => null);

    if (!res.ok) {
      const message =
        (data && (data.message ?? data.errorSummary ?? data.error)) ?? `HTTP ${res.status}`;
      if (res.status === 429) {
        const retrySeconds = Number(res.headers.get("ratelimit-reset") ?? 0);
        blockedUntil = retrySeconds > 0 ? Date.now() + retrySeconds * 1000 : null;
        throw new GuestyTokenLimitError(
          "Se alcanzó el límite diario de tokens de Guesty. Intenta de nuevo más tarde.",
          retrySeconds > 0 ? retrySeconds : null
        );
      }
      if (res.status === 401 || res.status === 403) {
        throw new GuestyConfigError(
          "Credenciales de Guesty inválidas o sin acceso a la Open API. Revisa GUESTY_CLIENT_ID / GUESTY_CLIENT_SECRET."
        );
      }
      throw new GuestyError(`Guesty auth falló: ${message}`, res.status, "GUESTY_AUTH_ERROR");
    }

    const accessToken: string | undefined = data?.access_token;
    if (!accessToken) {
      throw new GuestyError("Guesty no devolvió un access_token.", 502, "GUESTY_AUTH_ERROR");
    }

    const expiresIn = Number(data.expires_in ?? 86400);
    const entry: TokenEntry = { accessToken, expiresAt: Date.now() + expiresIn * 1000 };
    memoryCache = entry;
    await writeTokenCache(entry);
    return accessToken;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

// ---------------------------------------------------------------------------
// Availability
// ---------------------------------------------------------------------------

export type AvailableListing = {
  id: string;
  nickname: string | null;
  title: string | null;
  house: House | null;
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

export async function searchAvailability(opts: {
  checkIn: string;
  checkOut: string;
  adults: number;
  house?: House;
}): Promise<AvailableListing[]> {
  const token = await getGuestyToken();
  const ids = getListingIds(opts.house);

  const url = new URL(`${GUESTY_BASE_URL}/listings`);
  if (ids.length > 0) url.searchParams.set("ids", ids.join(","));
  url.searchParams.set("fields", "_id nickname title type address terms prices accommodates");
  url.searchParams.set(
    "available",
    JSON.stringify({
      checkIn: opts.checkIn,
      checkOut: opts.checkOut,
      minOccupancy: opts.adults,
    })
  );

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    cache: "no-store",
  });
  const data: any = await res.json().catch(() => null);
  if (!res.ok) {
    throw guestyResponseError(res, data, "Error consultando disponibilidad");
  }

  const rawResults: any[] = Array.isArray(data?.results) ? data.results : [];
  return rawResults.map(normalizeAvailableListing).filter((listing) => listing.id);
}

function normalizeAvailableListing(raw: any): AvailableListing {
  const id: string = raw?._id ?? "";
  const meta = getListingMeta(id);
  return {
    id,
    nickname: raw?.nickname ?? null,
    title: raw?.title ?? null,
    house: meta?.house ?? null,
    unit: meta?.unit ?? raw?.nickname ?? null,
    accommodates: Number(raw?.accommodates) || 0,
    minNights: raw?.terms?.minNights ?? null,
    maxNights: raw?.terms?.maxNights ?? null,
    currency: raw?.prices?.currency ?? null,
    basePrice: raw?.prices?.basePrice ?? null,
    cleaningFee: raw?.prices?.cleaningFee ?? null,
    extraPersonFee: raw?.prices?.extraPersonFee ?? null,
    guestsIncludedInRegularFee: raw?.prices?.guestsIncludedInRegularFee ?? null,
    address: raw?.address?.full ?? null,
  };
}

// ---------------------------------------------------------------------------
// Quotes (Reservations V3)
// ---------------------------------------------------------------------------

export type QuoteDay = { date: string; basePrice: number; price: number };

export type QuoteRatePlan = {
  id: string;
  name: string;
  cancellationPolicy: string | null;
  currency: string;
  days: QuoteDay[];
  subtotal: number;
  cleaningFee: number;
  total: number;
};

export type GuestyQuote = {
  quoteId: string;
  listingId: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  expiresAt: string | null;
  ratePlans: QuoteRatePlan[];
};

export async function createQuote(opts: {
  listingId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children?: number;
  infants?: number;
}): Promise<GuestyQuote> {
  const token = await getGuestyToken();
  const adults = opts.adults;
  const children = opts.children ?? 0;
  const infants = opts.infants ?? 0;

  const body = {
    numberOfGuests: {
      numberOfChildren: children,
      numberOfInfants: infants,
      numberOfAdults: adults,
    },
    listingId: opts.listingId,
    checkInDateLocalized: opts.checkIn,
    checkOutDateLocalized: opts.checkOut,
    source: "OAPI",
    guestsCount: adults + children,
    ignoreTerms: false,
    ignoreCalendar: false,
    ignoreBlocks: false,
  };

  const res = await fetch(`${GUESTY_BASE_URL}/quotes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data: any = await res.json().catch(() => null);
  if (!res.ok) {
    throw guestyResponseError(res, data, "Error creando cotización");
  }

  return normalizeQuote(data);
}

function normalizeQuote(raw: any): GuestyQuote {
  const ratePlansRaw: any[] = raw?.rates?.ratePlans ?? [];
  const ratePlans: QuoteRatePlan[] = ratePlansRaw
    .map((plan: any) => {
      const days: QuoteDay[] = Array.isArray(plan?.days)
        ? plan.days
            .filter((day: any) => typeof day?.date === "string" && typeof day?.price === "number")
            .map((day: any) => ({
              date: day.date,
              basePrice: Number(day.basePrice) || Number(day.price) || 0,
              price: Number(day.price) || 0,
            }))
        : [];
      const money = plan?.money?.money;
      const subtotal = days.reduce((sum, day) => sum + day.price, 0);
      const cleaningFee =
        Number(money?.fareCleaning ?? money?.cleaningFee ?? 0) || 0;
      const total =
        Number(money?.subTotalPrice ?? money?.totalPrice ?? 0) || subtotal + cleaningFee;
      return {
        id: plan?.ratePlan?._id ?? "",
        name: plan?.ratePlan?.name ?? "Estándar",
        cancellationPolicy: plan?.ratePlan?.cancellationPolicy ?? null,
        currency: plan?.days?.[0]?.currency ?? money?.currency ?? "MXN",
        days,
        subtotal,
        cleaningFee,
        total,
      };
    })
    .filter((plan: QuoteRatePlan) => plan.id || plan.days.length > 0);

  return {
    quoteId: raw?._id ?? "",
    listingId: raw?.unitTypeId ?? raw?.listingId ?? "",
    checkIn: raw?.checkInDateLocalized ?? "",
    checkOut: raw?.checkOutDateLocalized ?? "",
    nights: nightsBetween(raw?.checkInDateLocalized, raw?.checkOutDateLocalized),
    expiresAt: raw?.expiresAt ?? null,
    ratePlans,
  };
}

// ---------------------------------------------------------------------------
// Reservations
// ---------------------------------------------------------------------------

export type NewGuestInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  notes?: string;
};

export async function createGuest(input: NewGuestInput): Promise<string> {
  const token = await getGuestyToken();
  const body: Record<string, unknown> = {
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    emails: [input.email],
  };
  if (input.phone) {
    body.phone = input.phone;
    body.phones = [input.phone];
  }

  const res = await fetch(`${GUESTY_BASE_URL}/guests-crud`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data: any = await res.json().catch(() => null);
  if (!res.ok) {
    throw guestyResponseError(res, data, "Error creando huésped");
  }
  const guestId: string | undefined = data?._id ?? data?.id;
  if (!guestId) {
    throw new GuestyError("Guesty no devolvió el id del huésped.", 502, "GUESTY_API_ERROR");
  }
  return guestId;
}

export type ReservationStatus = "inquiry" | "reserved" | "confirmed";

export async function createReservation(opts: {
  listingId: string;
  checkIn: string;
  checkOut: string;
  guestsCount?: number;
  status?: ReservationStatus;
  guestId?: string;
  guest?: NewGuestInput;
}): Promise<{ reservationId: string; confirmationCode: string | null; status: string }> {
  const token = await getGuestyToken();

  let guestId = opts.guestId;
  if (!guestId && opts.guest) {
    guestId = await createGuest(opts.guest);
  }
  if (!guestId) {
    throw new GuestyError(
      "Se requiere guestId o guest para crear la reservación.",
      400,
      "GUESTY_VALIDATION"
    );
  }

  const body: Record<string, unknown> = {
    listingId: opts.listingId,
    checkInDateLocalized: opts.checkIn,
    checkOutDateLocalized: opts.checkOut,
    status: opts.status ?? "reserved",
    guestId,
  };
  if (opts.guestsCount) body.guestsCount = opts.guestsCount;

  const res = await fetch(`${GUESTY_BASE_URL}/reservations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data: any = await res.json().catch(() => null);
  if (!res.ok) {
    throw guestyResponseError(res, data, "Error creando reservación");
  }

  return {
    reservationId: data?._id ?? "",
    confirmationCode: data?.confirmationCode ?? null,
    status: data?.status ?? "reserved",
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function nightsBetween(checkIn: string, checkOut: string): number {
  const from = Date.parse(`${checkIn}T00:00:00Z`);
  const to = Date.parse(`${checkOut}T00:00:00Z`);
  if (Number.isNaN(from) || Number.isNaN(to) || to <= from) return 0;
  return Math.round((to - from) / 86_400_000);
}

function guestyResponseError(res: Response, data: any, context: string): GuestyError {
  const message =
    (data && (data.message ?? data.errorSummary ?? data.error ?? data.errorCode)) ??
    `HTTP ${res.status}`;
  const code: string = data?.errorCode ?? "GUESTY_API_ERROR";
  return new GuestyError(`${context}: ${message}`, res.status, code);
}
