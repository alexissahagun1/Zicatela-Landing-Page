# Casa Zii — Project Documentation

## Overview

Marketing site for **Casa Zii** (La Punta, Zicatela) built with Next.js 15 App Router, React 19, Tailwind CSS, and shadcn/ui primitives. Bilingual ES/EN via `LanguageContext`.

## Current booking UI (2026-07-26)

Replaced the previous stub date inputs on `/booking` with a hotel-style search bar matching the product mock:

| Field | Label (ES) | Behavior |
|-------|------------|----------|
| Dates | Cuándo | Range calendar popover (entrada — salida) |
| Guests | Quién | Adults + rooms steppers |
| Promo | Promoción | Optional coupon code (uppercased) |
| CTA | Buscar | Emits search payload via `onSearch` |

Component: `app/components/BookingSearchBar.tsx`  
Page wiring: `app/booking/page.tsx`  
Results + quote + booking-request UI: `app/components/BookingResults.tsx`

## Guesty integration (2026-08-23)

Credentials are for the **Guesty Open API** (the client key pair was rejected by the
Booking Engine auth endpoint, so the OAPI Reservations V3 flow is used):

1. **Discovery** — `GET /v1/listings?ids=…&available={"checkIn","checkOut","minOccupancy"}`
2. **Quote** — `POST /v1/quotes` (rate plans + per-night pricing, with optional `couponCode`)
3. **Reservation** — `POST /v1/reservations-v3/quote` using the accepted `quoteId` and
   selected `ratePlanId`. Requests use status `reserved` (dates held temporarily, no payment)
   or `inquiry`.

### Server code

- `lib/guesty.ts` — token cache (in-memory + JSON file under the OS temp dir),
  listing catalog, availability/quote/guest/reservation helpers.
- `app/api/guesty/availability/route.ts` — `GET ?checkIn&checkOut&adults[&house]`
- `app/api/guesty/quote/route.ts` — `POST {listingId, checkIn, checkOut, adults, promoCode?}`
- `app/api/guesty/reservation/route.ts` — `POST {listingId, quoteId, ratePlanId?, checkIn, checkOut, adults, status, guest}`
  with a required `Idempotency-Key` header.

### Token quota — read this

Guesty allows **max 5 access tokens per client ID every 24 h**. `getGuestyToken()`
caches the token in memory and in a JSON file (`GUESTY_TOKEN_CACHE_PATH`, defaults to
`$TMPDIR/casazii-guesty-token.json`) and refreshes it ~5 min before expiry, so the
auth endpoint is hit roughly once a day. Never request tokens client-side.

⚠️ During development on 2026-08-18 the 5-token quota was consumed by repeated auth
testing. The lock clears automatically (see `ratelimit-reset` on the 429 response).

### Offline demo mode

Set `GUESTY_MOCK=1` to serve realistic canned availability/quote/reservation
responses without touching Guesty (useful for previews and UI tests; the
responses include `"mock": true`). Scripted failure hooks: quoting **Palmas II**
fails, and reservations with an email containing `fail` fail. Never enable this
in production.

### Env vars (configured in `.env.local`, gitignored)

```
GUESTY_CLIENT_ID=0oaw7qk6yv1jw4Bk45d7
GUESTY_CLIENT_SECRET=… (provided 2026-08-18)
GUESTY_LISTING_CAMPECHE=69e264308acfe70014925284,69e2643427051200144b1197
GUESTY_LISTING_PALMAS=69e26428794b420013556470,69e2642c0cc24200134a0257
```

Listing mapping:

| Site unit | Guesty nickname | Listing ID |
|-----------|-----------------|------------|
| Campeche I | Campeche I | `69e264308acfe70014925284` |
| Campeche II | Campeche II | `69e2643427051200144b1197` |
| Palmas I | Palmas I | `69e26428794b420013556470` |
| Palmas II | Palmas II | `69e2642c0cc24200134a0257` |

### Reservation safety

- Invalid calendar dates are rejected before Guesty is called.
- A reservation cannot be created without a valid quote and selected rate plan.
- `Idempotency-Key` (8–50 safe characters) prevents accidental duplicate submissions for
  24 hours while the server instance is alive and is also sent to Guesty as `originId`.
- `reserved` requests use a 24-hour hold by default. Configure an allowed value with
  `GUESTY_RESERVED_UNTIL_HOURS` (`24`, `48`, `72`, `0.5`, `0.25`, or `0.17`).

### Known limitations

- **Promo codes**: codes are sent to Guesty through `couponCode`. The code must exist in
  the Guesty revenue-management configuration; invalid codes return a quote error.
- **Payment**: not implemented. The booking request creates a Guesty reservation with
  status `reserved` (request) — no charge. Payment UI still awaits a GuestyPay/Stripe
  decision.
- **Multiple rooms**: the current flow books one Casa Zii unit per request. The room
  stepper is retained for the design, but group/multi-unit booking needs a separate
  Guesty group-reservation flow.
- **Webhooks**: calendar/reservation change notifications are not wired yet; the
  availability query is always real-time, so this is only a latency optimization.

## Design notes

- Keep Courier Prime and existing Casa Zii palette (white surfaces, `#7A7A7C` search CTA, dark `#222` accents).
- Search bar is full-bleed over the booking hero image; desktop = pill layout, mobile = stacked card.
- No payment UI yet — awaits GuestyPay/Stripe decision.

## Spec vs Figma (2026-08-23)

Implementation source of truth is **only** Figma [CASA ZII](https://www.figma.com/design/JYwQ77v9OOLOlxmlKaTNu7/CASA-ZII) plus the annotations in `docs/superpowers/specs/2026-08-23-casa-zii-navigation-gallery-map-design.md`. No other sites, no invented layout.

| Node | Locked reading |
|------|----------------|
| `69:3` Nav | White 3-zone header. Frame also includes hero (`1308 × 726`). Annotation: fixed, always visible; remove `AnnouncementBar` and mobile strip `131:3`. |
| `156:2` Galería | `836 × 687.5`, tiles `270 × 337.5`, gutters 13 / 12.5. Annotation: unique Instagram hrefs, no recrop. |
| `18:227` Mapa | Visual reference only. The implementation must use one Google Maps overview with the real Casa Palmas and Casa Campeche pins; the supplied destination links remain the source of truth. |
| `131:91` Footer | Updated compact footer `720 × 372`: centered booking button, Instagram/Casa Zii row, contact/reservation block, and privacy/terms block. |
| Addresses | Use the two strings written in the spec. Do not render the old illustrated map or the old locations/press footer list. |

The six Instagram post URLs are mapped in `app/components/InstagramGallery.tsx`; the two Google Maps URLs are the supplied Casa Palmas and Casa Campeche destinations.

## Navigation, gallery, map (2026-08-23)

Shipped against Figma + spec annotations only:

- Shared `NavigationBar` is fixed, always visible, three-zone desktop layout. `AnnouncementBar` is not rendered on any page.
- Homepage collage is `InstagramGallery` (`156:2` exports). Press still uses `PhotoCollage`.
- `Footer` follows the updated Figma footer node `131:91` in both languages.
- `MapSection` uses one Google Maps directions embed between the two supplied exact coordinates so Google renders both real locations in a single Zicatela overview; both supplied destination links remain available beside it.
- Gallery tiles use the six exact Instagram post URLs matched to the Figma exports; they do not fall back to the profile.
