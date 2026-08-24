import Image from "next/image";

const PALMAS_ADDRESS =
  "Calle de la Paloma S/N, in front of Casa Paloma, La Punta, Brisas de Zicatela, 70938 Puerto Escondido, Oaxaca, Mexico";
const CAMPECHE_ADDRESS =
  "Calle Campeche S/N, in front of Pancho Villas Punta Zicatela, La Punta, Brisas de Zicatela, 70938 Puerto Escondido, Oaxaca, Mexico";

const PALMAS_MAPS_URL = "https://maps.app.goo.gl/a55kcKdejJfsQu89A";
const CAMPECHE_MAPS_URL = "https://maps.app.goo.gl/3pygvtLVaZn8kiYB7";
const EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(
  "La Punta, Brisas de Zicatela, 70938 Puerto Escondido, Oaxaca, Mexico"
)}&z=15&output=embed`;

export default function MapSection() {
  return (
    <section className="bg-[#F4EFE6] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid w-full max-w-[1308px] items-start gap-10 md:grid-cols-[minmax(0,680px)_minmax(0,1fr)] md:gap-16">
        <div className="w-full">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "680 / 333" }}>
            <Image
              src="/figma-map.png"
              alt="Mapa ilustrado de Casa Palmas y Casa Campeche en La Punta, Zicatela"
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 680px"
            />
            <a
              href={PALMAS_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A04E39]"
              style={{ left: "38.7%", top: "18.3%", width: "16%", height: "14%" }}
              aria-label="Abrir mapa de Casa Palmas en Google Maps"
            />
            <a
              href={CAMPECHE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A04E39]"
              style={{ left: "56.5%", top: "31.5%", width: "18%", height: "14%" }}
              aria-label="Abrir mapa de Casa Campeche en Google Maps"
            />
          </div>

          <details className="mt-5 border-t border-[#222222]/25 pt-4 font-[family-name:var(--font-courier)] text-sm text-[#222222]">
            <summary className="cursor-pointer underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A04E39]">
              Explorar mapa interactivo
            </summary>
            <iframe
              title="Mapa interactivo de Casa Zii en La Punta, Zicatela"
              src={EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-4 h-[333px] w-full max-w-full border-0"
            />
          </details>
        </div>

        <div className="flex flex-col gap-8 pt-2 font-[family-name:var(--font-courier)] text-[#222222] md:pt-10">
          <div>
            <p className="text-sm uppercase tracking-[0.18em]">Casa Palmas</p>
            <p className="mt-2 text-sm leading-6">{PALMAS_ADDRESS}</p>
            <a
              href={PALMAS_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-[#A04E39] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A04E39]"
            >
              Abrir mapa — Casa Palmas en Google Maps
            </a>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.18em]">Casa Campeche</p>
            <p className="mt-2 text-sm leading-6">{CAMPECHE_ADDRESS}</p>
            <a
              href={CAMPECHE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-[#A04E39] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A04E39]"
            >
              Abrir mapa — Casa Campeche en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
