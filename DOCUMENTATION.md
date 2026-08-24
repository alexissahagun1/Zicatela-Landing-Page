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

## Guesty integration (2026-08-18)

Credentials are for the **Guesty Open API** (the client key pair was rejected by the
Booking Engine auth endpoint, so the OAPI Reservations V3 flow is used):

1. **Discovery** — `GET /v1/listings?ids=…&available={"checkIn","checkOut","minOccupancy"}`
2. **Quote** — `POST /v1/quotes` (rate plans + per-night pricing, valid 24 h)
3. **Reservation** — `POST /v1/guests` (if needed) then `POST /v1/reservations` with
   status `reserved` (booking request, no payment) or `inquiry`.

### Server code

- `lib/guesty.ts` — token cache (in-memory + JSON file under the OS temp dir),
  listing catalog, availability/quote/guest/reservation helpers.
- `app/api/guesty/availability/route.ts` — `GET ?checkIn&checkOut&adults[&house]`
- `app/api/guesty/quote/route.ts` — `POST {listingId, checkIn, checkOut, adults}`
- `app/api/guesty/reservation/route.ts` — `POST {listingId, checkIn, checkOut, adults, status, guest}`

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

### Known limitations

- **Promo codes**: OAPI quotes do not support coupons. Applying a code requires a
  Booking Engine API key pair (Growth → Distribution → Booking Engine API). The UI
  shows a note when a code is entered.
- **Payment**: not implemented. The booking request creates a Guesty reservation with
  status `reserved` (request) — no charge. Payment UI still awaits a GuestyPay/Stripe
  decision.
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
| `18:227` Mapa | Illustrated map `680 × 333`, pins `CASA PALMAS` and `CASA CAMPECHE`. Annotation: both spec addresses + Abrir mapa + lazy embed, no API key. |
| Addresses | Use the two strings written in the spec. Footer restyle is out of scope. |

The six Instagram post URLs are mapped in `app/components/InstagramGallery.tsx`; the two Google Maps URLs are the supplied Casa Palmas and Casa Campeche destinations.

## Navigation, gallery, map (2026-08-23)

Shipped against Figma + spec annotations only:

- Shared `NavigationBar` is fixed, always visible, three-zone desktop layout. `AnnouncementBar` is not rendered on any page.
- Homepage collage is `InstagramGallery` (`156:2` exports). Press still uses `PhotoCollage`.
- `MapSection` paints `/figma-map.png` (`18:227`), keeps the interactive Google embed behind an explicit disclosure, shows both spec addresses, and uses the supplied Google Maps URLs.
- Gallery tiles use the six exact Instagram post URLs matched to the Figma exports; they do not fall back to the profile.
