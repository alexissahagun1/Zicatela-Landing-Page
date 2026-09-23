import Image from "next/image";
import Link from "next/link";

// Figma eNHBCVNfWSH0nXswrrvnuS Frame 1 (2006:3): "● Casa Campeche" / "▲ Casa Palmas" (22/30, two lines), each
// followed by one wide photo and two rows of wide + tall photos. Positions are Figma x/width at 1920 via --f.

type Tile = { src: string; alt: string; x: number; w: number; h: number };

type Property = {
  id: string;
  href: string;
  marker: string;
  name: string;
  /** Space above the heading and between heading and main photo (Figma px). */
  gapAbove: number;
  /** Figma centre of the heading box (Palmas sits 19px left of the page centre). */
  headingCenter: number;
  gapHeading: number;
  main: Tile;
  rowGap: number;
  rows: [Tile, Tile][];
};

const PROPERTIES: Property[] = [
  {
    id: "campeche",
    href: "/casa-campeche",
    marker: "●",
    name: "Casa Campeche",
    gapAbove: 159,
    headingCenter: 959,
    gapHeading: 84,
    main: { src: "/figma/latest/image-01.jpg", alt: "Casa Campeche, fachada de concreto con puerta circular de madera", x: 400, w: 1120, h: 754 },
    rowGap: 125,
    rows: [
      [
        { src: "/figma/latest/image-02.jpg", alt: "Casa Campeche, terraza con alberca y sillas de madera", x: 228, w: 845, h: 570 },
        { src: "/figma/latest/image-05.png", alt: "Casa Campeche, patio interior de concreto", x: 1325, w: 420, h: 567 },
      ],
      [
        { src: "/figma/latest/image-08.jpg", alt: "Casa Campeche, sala con sofá de piel", x: 228, w: 420, h: 567 },
        { src: "/figma/latest/image-06.jpg", alt: "Casa Campeche, alberca bajo el volado de concreto", x: 903, w: 842, h: 568 },
      ],
    ],
  },
  {
    id: "palmas",
    href: "/casa-palmas",
    marker: "▲",
    name: "Casa Palmas",
    gapAbove: 216,
    headingCenter: 941,
    gapHeading: 123,
    main: { src: "/figma/latest/image-09.jpg", alt: "Casa Palmas, alberca entre muros de concreto", x: 418, w: 1117, h: 754 },
    rowGap: 129,
    rows: [
      [
        { src: "/figma/latest/image-10.jpg", alt: "Casa Palmas, alberca iluminada con vista al patio", x: 230, w: 420, h: 567 },
        { src: "/figma/latest/image-04.jpg", alt: "Casa Palmas, terraza de concreto con vegetación", x: 900, w: 845, h: 570 },
      ],
      [
        { src: "/figma/latest/image-03.jpg", alt: "Casa Palmas, sala con textil oaxaqueño", x: 228, w: 845, h: 570 },
        { src: "/figma/latest/image-07.jpg", alt: "Casa Palmas, camastro junto a la alberca", x: 1325, w: 420, h: 567 },
      ],
    ],
  },
];

const vars = (entries: Record<string, number>) =>
  Object.fromEntries(Object.entries(entries).map(([key, value]) => [`--${key}`, value]));

function Photo({ tile, sizes }: { tile: Tile; sizes: string }) {
  return (
    <div
      className="relative w-full aspect-[var(--w)/var(--h)] md:absolute md:top-0 md:left-[calc(var(--f)*var(--x))] md:h-[calc(var(--f)*var(--h))] md:w-[calc(var(--f)*var(--w))] md:aspect-auto"
      style={vars({ x: tile.x, w: tile.w, h: tile.h })}
    >
      <Image src={tile.src} alt={tile.alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export default function FigmaPropertyMosaic() {
  return (
    <section className="px-4 md:px-0">
      {PROPERTIES.map((property) => (
        <div
          key={property.id}
          id={property.id}
          className="pt-20 md:pt-[calc(var(--f)*var(--gap-above))]"
          style={vars({ "gap-above": property.gapAbove, "gap-heading": property.gapHeading, "row-gap": property.rowGap, "heading-shift": property.headingCenter - 960 })}
        >
          <Link
            href={property.href}
            className="relative mx-auto block w-fit text-center md:left-[calc(var(--f)*var(--heading-shift))] font-[family-name:var(--font-courier)] text-[18px] leading-[26px] text-[#222222] hover:opacity-70 md:text-[max(16px,calc(var(--f)*22))] md:leading-[1.364]"
          >
            <span className="block">{property.marker}</span>
            <span className="block">{property.name}</span>
          </Link>

          <div className="relative mt-10 md:mt-[calc(var(--f)*var(--gap-heading))] md:h-[calc(var(--f)*754)]">
            <Photo tile={property.main} sizes="(min-width: 768px) 59vw, 100vw" />
          </div>

          {property.rows.map((row, index) => (
            <div
              key={index}
              className="relative mt-6 grid gap-6 md:mt-[calc(var(--f)*var(--row-gap))] md:block md:h-[calc(var(--f)*var(--row-h))]"
              style={vars({ "row-h": Math.max(row[0].h, row[1].h) })}
            >
              {row.map((tile) => (
                <Photo key={tile.src} tile={tile} sizes="(min-width: 768px) 45vw, 100vw" />
              ))}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
