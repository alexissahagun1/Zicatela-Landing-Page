# SEO Strategy — Casa Zii (La Punta, Zicatela)

> Fecha: 2026-08-18 · Fuentes: guía de search intent de BHW (splishsplash),
> hilos de Google spam update agosto 2026, skill SEO 2025 (GEO/AIO).

## 1. Estado actual (auditoría rápida)

Fortalezas:

- Sitio bilingüe ES/EN, contenido de diseño de autor (Ludwig Godefroy),
  alojamiento solo para adultos con alberca privada — diferencial real.
- Booking directo funcionando con Guesty (disponibilidad + cotización + solicitud).
- Copy ya escrito con enfoque de experiencia (La Punta, surf, atardeceres).

Debilidades detectadas en código:

- `app/layout.tsx` tiene **una sola metadata global**; no hay title/description
  por página, ni `generateMetadata`.
- `<html lang="en">` fijo aunque el idioma por defecto es español → problema de
  internacionalización (hreflang / lang).
- Sin `sitemap.xml`, `robots.txt`, canonical, Open Graph ni schema.
- Sin páginas de contenido (guías de área) → el sitio solo tiene páginas de
  propiedades y no construye grafo tópico.

## 2. Mapa de intenciones por página

Método (BHW): Google ya no rankea keywords, mapea **búsquedas → intenciones**
(primaria/secundaria/terciaria). Cada página resuelve una intención primaria,
cubre las secundarias en el mismo documento y enlaza las terciarias a otros
documentos (grafo tópico).

### Homepage `/homepage`

| Tipo | Intención / contenido |
|---|---|
| Primaria | "Casa Zii: villas con alberca privada en La Punta, Zicatela (adults only)" |
| Secundaria | Amenidades (alberca, Starlink, AC, mascotas), diseño brutalista, solo adultos, dos casas |
| Terciaria (enlaces) | `/casa-campeche`, `/casa-palmas`, `/booking`, guía de La Punta |

Queries objetivo (ES): `villa con alberca la punta`, `casa en renta zicatela`,
`adults only puerto escondido`, `casa zii`.
(EN): `private pool villa la punta`, `adults only puerto escondido`,
`surf house zicatela`.

### Casa Campeche `/casa-campeche`

| Tipo | Intención / contenido |
|---|---|
| Primaria | "Casa Campeche: dúplex de diseño con alberca privada (unidades conectables)" |
| Secundaria | 2 habitaciones, unidades Campeche I y II independientes o conectadas, Starlink, AC, mascotas, políticas, precios (Guesty) |
| Terciaria (enlaces) | `/casa-palmas`, guías de área, `/booking` con fechas pre-cargadas |

Queries: `casa campeche puerto escondido`, `villa alberca zicatela`,
`duplex frente a la playa la punta`, `casa 2 habitaciones puerto escondido`.

### Casa Palmas `/casa-palmas`

| Tipo | Intención / contenido |
|---|---|
| Primaria | "Casa Palmas: villa brutalista con terraza privada y alberca en Brisas de Zicatela" |
| Secundaria | 2 habitaciones, unidades Palmas I y II, privacidad, Starlink, AC, mascotas, políticas, precios |
| Terciaria (enlaces) | `/casa-campeche`, guías de área, `/booking` |

Queries: `casa palmas zicatela`, `villa privada brisas de zicatela`,
`casa con terraza puerto escondido`, `renta villa oaxaca playa`.

### Booking `/booking`

Intención primaria: transaccional (fechas, huéspedes, disponibilidad). Ya está
resuelta con Guesty. Secundarias: políticas de cancelación, check-in/out,
condiciones. Terciarias: guías de área (para que el huésped arme el viaje).

### Contacto `/contact` y Prensa `/prensa`

Señales de confianza/E-E-A-T: dirección, teléfono, email, prensa/menciones.
Conectar con LocalBusiness schema y Google Business Profile.

## 3. Plan de búsquedas (con prioridad)

Prioridad (P1 = alta intención + baja dificultad; P2 = media; P3 = competitiva):

| Prioridad | Query ES | Query EN | Página objetivo |
|---|---|---|---|
| P1 | casa en renta zicatela / la punta | villa for rent zicatela | homepage + propiedades |
| P1 | villa con alberca privada puerto escondido | private pool villa puerto escondido | homepage + propiedades |
| P1 | casa campeche / casa palmas (brand) | casa campeche / casa palmas | propiedades |
| P1 | adults only oaxaca playa | adults only puerto escondido | homepage |
| P2 | casa 2 habitaciones con alberca oaxaca | 2 bedroom villa oaxaca | propiedades |
| P2 | qué hacer en la punta zicatela | things to do la punta zicatela | guías |
| P2 | cómo llegar a puerto escondido | how to get to puerto escondido | guía |
| P2 | surf en zicatela / mejores spots | zicatela surf guide | guía |
| P3 | casa en renta puerto escondido (competitivo) | vacation rental puerto escondido | guías + propiedades |

Regla (BHW): escribir para la intención, no repetir anclas exactas; cubrir
secundarias en la página y enlazar las terciarias. Antes de publicar cada
artículo, revisar el SERP real (¿hay AI Overview? ¿qué estructura tienen los
top 5? ¿qué falta?).

## 4. Topic cluster: guías de área (grafo tópico)

Pilar: **`/guia/la-punta-puerto-escondido`** ("Guía de La Punta, Zicatela: qué
hacer, dónde comer y dónde quedarse").

| Guía (spoke) | URL sugerida | Intención que resuelve |
|---|---|---|
| Surf en Zicatela: mejores olas y escuelas | `/guia/surf-zicatela` | secundaria de pilar |
| Dónde comer en La Punta (cafés y restaurantes) | `/guia/restaurantes-la-punta` | secundaria |
| Cómo llegar a Puerto Escondido (vuelos, aero, buses) | `/guia/como-llegar-puerto-escondido` | terciaria |
| Mejores playas de Puerto Escondido (Zicatela, Carrizalillo…) | `/guia/playas-puerto-escondido` | secundaria |
| Escapadas adults-only en Oaxaca | `/guia/escapadas-adults-only-oaxaca` | difiere a propiedades |
| Cuándo viajar: clima y temporadas en la costa oaxaqueña | `/guia/mejor-epoca-viajar-puerto-escondido` | terciaria |
| Día de playa perfecto en La Punta (itinerario) | `/guia/dia-en-la-punta` | secundaria |
| Excursiones desde Puerto Escondido (Huatulco, Mazunte) | `/guia/excursiones-puerto-escondido` | terciaria |

Interlinking: cada spoke enlaza al pilar y a las propiedades con anclas
contextuales (ej. "villa con alberca privada en La Punta" una sola vez);
las propiedades enlazan a 2-3 guías. Estructura de cada guía según la skill:
respuesta directa en los primeros 100 caracteres, H2 en formato pregunta,
respuesta de 20-40 palabras tras cada H2, FAQ al final, tabla cuando compare
(playas, temporadas), imágenes con alt descriptivo, schema Article + FAQPage.

## 5. Local SEO

- **Google Business Profile**: uno por propiedad (Casa Campeche → Calle
  Campeche, Punta de Zicatela; Casa Palmas → 1 Calle de la Paloma, Brisas de
  Zicatela). Categoría específica ("Cabin rental / Vacation home rental"),
  horarios, fotos (10+), enlace de reserva directa a `/booking`, teléfono.
- **NAP consistente** en sitio, GBP y directorios (misma dirección/telefónico
  que en `app/booking/page.tsx` — ojo: hoy el teléfono es placeholder "+52 55
  9999 9999"; actualizar con el real).
- **Reviews**: pedir después del checkout (plantilla en el flujo de Guesty),
  responder a todas en <24 h.
- **Schema**: `VacationRental` / `LodgingBusiness` + `AggregateRating` en cada
  propiedad; `LocalBusiness` en contacto; breadcrumbs.

## 6. GEO / AI Overviews

- Estructura Q&A: convertir secciones de cada propiedad a preguntas reales
  ("¿Casa Campeche admite mascotas?", "¿Cuántas habitaciones tiene Casa
  Palmas?").
- Datos originales que los competidores no tienen: precios reales vía Guesty,
  detalle de unidades conectables, políticas exactas, fotos propias. Eso es
  "information gain".
- Probar la marca en ChatGPT/Perplexity/Gemini: "mejores villas adults-only
  en Puerto Escondido" — objetivo: que citen casazii.com.
- FAQPage schema en guías y propiedades.

## 7. Anclas y link building (blanco)

- Anclas variadas y contextuales; **nada de anclas exact-match repetidas**.
- Outreach (consenso BHW): vender el contenido/tema primero; el link se
  menciona cuando hay interés; transparencia si es pagado.
- Objetivos: blogs de viajes de México/Oaxaca, guías de surf, prensa local de
  Puerto Escondido, colaboraciones con fotógrafos de surf/diseño (el ángulo
  brutalista de Ludwig Godefroy es buen gancho de PR).
- Directorios legítimos: Google Business Profile, TripAdvisor (perfil de
  alojamiento), Airbnb/Booking (links siguen siendo de marca), guías locales.

## 8. Quick wins técnicos

Estado 2026-08-18: implementado y verificado en build local.

1. ✅ `generateMetadata` por página (ES/EN) con title ≤60 chars y description
   ≤155:
   - `/` → "Casa Zii | Villas con alberca en La Punta, Zicatela"
   - `/casa-campeche` → "Casa Campeche | Villa con alberca privada en La Punta"
   - `/casa-palmas` → "Casa Palmas | Villa brutalista con terraza en Zicatela"
   - `/booking` → "Reservar | Casa Zii, La Punta de Zicatela"
   - (EN equivalentes con `generateMetadata` por locale)
2. ✅ `<html lang="es">` (idioma por defecto). Pendiente: hreflang real
   requiere rutas `/en` (hoy es un solo URL con toggle cliente; se marcó
   `alternates.languages` es/en con el mismo URL como interino).
3. ✅ `app/sitemap.ts` (6 URLs) + `app/robots.ts` (Allow + Sitemap).
4. ✅ `metadataBase` + Open Graph (og:title, og:image con fotos reales) +
   JSON-LD `Organization` (global) y `VacationRental` (por propiedad).
5. ✅ Canonical por página (evitar duplicados /homepage vs /).
6. Imágenes: alt descriptivo (varias ya lo tienen), WebP/AVIF, dimensiones
   fijas (CLS).
7. Verificar Core Web Vitals en PageSpeed (INP <200ms, LCP <2.5s, CLS <0.1).
8. Después de corregir: enviar sitemap a Search Console y monitorear el
   rollout del spam update de agosto 2026 (sin acciones agresivas mientras).

## 9. Qué NO hacer (riesgo para la marca)

- PBNs, guest posts EDU comprados, cuentas viejas de GitHub, SMM panels,
  "AI poisoning" — todo lo que venden los hilos fijos de BHW. Con el spam
  update activo, y siendo un sitio que recibe reservas directas, el riesgo de
  penalización no vale la pena.
- Contenido masivo generado sin editar (thin content / scaled content abuse).
- Anclas exact-match repetidas o compra de links en volumen.

## 10. Plan de 30 días

- Semana 1: quick wins técnicos (metadata, lang/hreflang, sitemap, robots,
  schema VacacionalRental). Enviar sitemap a GSC.
- Semana 2: GBP de ambas propiedades + NAP real + primeras fotos y reviews.
- Semana 3-4: publicar el pilar (guía de La Punta) + 2 spokes (surf, cómo
  llegar) con interlinking a propiedades y FAQ schema.
- Medir: Search Console (impresiones/posición), GA4 (sessions orgánicas),
  pruebas de marca en ChatGPT/Perplexity.
