const PALMAS_ADDRESS =
  "Calle de la Paloma S/N, in front of Casa Paloma, La Punta, Brisas de Zicatela, 70938 Puerto Escondido, Oaxaca, Mexico";
const CAMPECHE_ADDRESS =
  "Calle Campeche S/N, in front of Pancho Villas Punta Zicatela, La Punta, Brisas de Zicatela, 70938 Puerto Escondido, Oaxaca, Mexico";

const PALMAS_MAPS_URL = "https://maps.app.goo.gl/a55kcKdejJfsQu89A";
const CAMPECHE_MAPS_URL = "https://maps.app.goo.gl/3pygvtLVaZn8kiYB7";
const PALMAS_COORDINATES = "15.831041,-97.040609";
const CAMPECHE_COORDINATES = "15.8315562,-97.0404726";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/d/embed?mid=1dCV9ESC259QOIK4lcq_udz08L2uKZvg";

export default function MapSection() {
  return (
    <section className="bg-[#F4EFE6] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid w-full max-w-[1308px] items-start gap-10 md:grid-cols-[minmax(0,680px)_minmax(0,1fr)] md:gap-16">
        <div className="w-full overflow-hidden border border-[#222222]/15 bg-white">
          <iframe
            title="Mapa de Casa Zii en Zicatela con las ubicaciones de Casa Palmas y Casa Campeche"
            src={MAP_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-[333px] min-h-[333px] w-full border-0"
          />
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
