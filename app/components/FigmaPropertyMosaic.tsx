import Image from "next/image";
import Link from "next/link";

// Figma 2053:684–687 + 2053:676–683: "● Casa Campeche" / "▲ Casa Palmas" headings, each followed by
// five static photos (one wide, then two rows of wide + tall). No carousel controls exist on these nodes.

type Tile = { src: string; alt: string; wide: boolean };

type Property = {
  id: string;
  href: string;
  marker: string;
  name: string;
  main: { src: string; alt: string };
  rows: [Tile, Tile][];
};

const PROPERTIES: Property[] = [
  {
    id: "campeche",
    href: "/casa-campeche",
    marker: "●",
    name: "Casa Campeche",
    main: { src: "/figma/latest/image-01.jpg", alt: "Casa Campeche, fachada de concreto con puerta circular de madera" },
    rows: [
      [
        { src: "/figma/latest/image-02.jpg", alt: "Casa Campeche, terraza con alberca y sillas de madera", wide: true },
        { src: "/figma/latest/image-05.png", alt: "Casa Campeche, patio interior de concreto", wide: false },
      ],
      [
        { src: "/figma/latest/image-08.jpg", alt: "Casa Campeche, sala con sofá de piel", wide: false },
        { src: "/figma/latest/image-06.jpg", alt: "Casa Campeche, alberca bajo el volado de concreto", wide: true },
      ],
    ],
  },
  {
    id: "palmas",
    href: "/casa-palmas",
    marker: "▲",
    name: "Casa Palmas",
    main: { src: "/figma/latest/image-09.jpg", alt: "Casa Palmas, alberca entre muros de concreto" },
    rows: [
      [
        { src: "/figma/latest/image-10.jpg", alt: "Casa Palmas, alberca iluminada con vista al patio", wide: false },
        { src: "/figma/latest/image-04.jpg", alt: "Casa Palmas, terraza de concreto con vegetación", wide: true },
      ],
      [
        { src: "/figma/latest/image-03.jpg", alt: "Casa Palmas, sala con textil oaxaqueño", wide: true },
        { src: "/figma/latest/image-07.jpg", alt: "Casa Palmas, camastro junto a la alberca", wide: false },
      ],
    ],
  },
];

function Tile({ tile }: { tile: Tile }) {
  return (
    <div className={`relative w-full ${tile.wide ? "aspect-[845/570]" : "aspect-[420/567]"}`}>
      <Image src={tile.src} alt={tile.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
    </div>
  );
}

export default function FigmaPropertyMosaic() {
  return (
    <section className="px-4">
      {PROPERTIES.map((property, index) => (
        <div
          key={property.id}
          id={property.id}
          className={`mx-auto max-w-[1073px] ${index === 0 ? "pt-[16px] lg:pt-[24px]" : "pt-[100px] lg:pt-[216px]"}`}
        >
          <Link
            href={property.href}
            className="mb-[40px] block text-center lg:mb-[84px] font-[family-name:var(--font-courier)] text-[16px] leading-[24px] text-[#222] hover:opacity-70"
          >
            <span className="block">{property.marker}</span>
            <span className="block">{property.name}</span>
          </Link>

          <div className="relative mx-auto aspect-[1120/754] w-full max-w-[836px]">
            <Image src={property.main.src} alt={property.main.alt} fill sizes="(min-width: 1024px) 836px, 100vw" className="object-cover" />
          </div>

          {property.rows.map((row, index) => (
            <div
              key={index}
              className={`mt-[24px] grid grid-cols-1 items-start gap-[24px] lg:mt-[40px] lg:gap-[40px] ${
                row[0].wide ? "lg:grid-cols-[845fr_420fr]" : "lg:grid-cols-[420fr_845fr]"
              }`}
            >
              {row.map((tile) => (
                <Tile key={tile.src} tile={tile} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
