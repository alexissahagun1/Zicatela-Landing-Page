"use client";

import Image from "next/image";
import NavigationBar from "./NavigationBar";
import PropertyCarousel from "./PropertyCarousel";
import SiteClosing from "./SiteClosing";
import { useLanguage } from "../contexts/LanguageContext";
import type { GalleryPhoto } from "@/lib/gallery-photos";

// Figma eNHBCVNfWSH0nXswrrvnuS frames 2011:90 (Casa Campeche) and 2011:237 (Casa Palmas), 1920 wide.
// Every md+ measurement below is written as calc(var(--f) * <Figma px>) so it is exact at 1920 and scales below.

type Bilingual<T> = { es: T; en: T };

type Deco = {
  src: string;
  width: number;
  height: number;
  /** Figma x of the graphic's box. */
  left: number;
  /** Figma y relative to the top of its section. */
  top: number;
  /** The Palmas amenities graphic ships vertical and is turned -90° in Figma. */
  rotated?: boolean;
};

type Unit = { sectionId: string; title: string; images: GalleryPhoto[]; features: Bilingual<string[]> };

type Props = {
  hero: { src: string; alt: string; objectPosition?: string };
  /** Brand symbol over the hero: circle for Casa Campeche, triangle for Casa Palmas (as in the nav). */
  symbol: { src: string; width: number; height: number };
  title: Bilingual<string>;
  intro: Bilingual<string[]>;
  /** Figma intro box height; the first gallery starts 116px below it (y=1836 in both frames). */
  introHeight: number;
  introDeco: Deco;
  units: [Unit, Unit];
  amenities: Bilingual<[string[], string[], string[]]>;
  /** Figma x and width of each amenities column. */
  amenityColumns: [[number, number], [number, number], [number, number]];
  amenitiesDeco: Deco & { gapAbove: number; gapBelow: number };
};

const f = (px: number) => `calc(var(--f) * ${px})`;

function DecoGraphic({ deco, className }: { deco: Deco; className: string }) {
  const boxW = deco.rotated ? deco.height : deco.width;
  const boxH = deco.rotated ? deco.width : deco.height;
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{ width: f(boxW), height: f(boxH), ["--x" as string]: deco.left, ["--y" as string]: deco.top }}
    >
      <Image
        src={deco.src}
        alt=""
        width={deco.width}
        height={deco.height}
        unoptimized
        className="absolute left-1/2 top-1/2 max-w-none"
        style={{
          width: f(deco.width),
          height: f(deco.height),
          transform: `translate(-50%, -50%)${deco.rotated ? " rotate(-90deg)" : ""}`,
        }}
      />
    </div>
  );
}

export default function HousePage({ hero, symbol, title, intro, introHeight, introDeco, units, amenities, amenityColumns, amenitiesDeco }: Props) {
  const { language } = useLanguage();
  const amenitiesTitle = language === "es" ? "Amenidades y Servicios" : "Amenities and Services";

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--page-bg)]">
      <NavigationBar />

      <main className="pt-16 md:pt-[var(--nav-h)]">
        {/* Hero 1920×946 with the brand symbol centred. */}
        <section className="relative h-[56vw] w-full md:h-[calc(var(--f)*946)]">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: hero.objectPosition ?? "center" }}
          />
          <Image
            src={symbol.src}
            alt=""
            aria-hidden
            width={symbol.width}
            height={symbol.height}
            unoptimized
            className="absolute left-1/2 top-1/2 h-auto w-[max(40px,calc(var(--f)*var(--symbol-w)))] -translate-x-1/2 -translate-y-1/2"
            style={{ ["--symbol-w" as string]: symbol.width }}
          />
        </section>

        {/* Intro: 36px bold title, 18/25 copy in an 895px column, decorative graphic to the right. */}
        <section className="relative px-4 pb-16 pt-12 md:px-0 md:pb-[calc(var(--f)*116)] md:pt-[calc(var(--f)*152)]">
          <div
            className="mx-auto max-w-[895px] text-center font-[family-name:var(--font-courier)] text-[#222222] md:min-h-[calc(var(--f)*var(--intro-h))] md:w-[calc(var(--f)*895)] md:max-w-none"
            style={{ ["--intro-h" as string]: introHeight }}
          >
            <h1 className="text-[26px] font-bold leading-normal md:text-[max(24px,calc(var(--f)*36))]">{title[language]}</h1>
            <div className="mt-8 space-y-[20px] text-[15px] leading-[22px] md:mt-[calc(var(--f)*41)] md:text-[max(14px,calc(var(--f)*18))] md:leading-[1.39]">
              {intro[language].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <DecoGraphic
            deco={introDeco}
            className="hidden md:absolute md:left-[calc(var(--f)*var(--x))] md:top-[calc(var(--f)*var(--y))] md:block"
          />
        </section>

        <div className="space-y-20 px-4 md:space-y-[calc(var(--f)*222)] md:px-0">
          {units.map((unit, index) => (
            <PropertyCarousel
              key={unit.sectionId}
              sectionId={unit.sectionId}
              title={unit.title}
              images={unit.images}
              features={unit.features[language]}
              layout={index === 0 ? "image-left" : "image-right"}
            />
          ))}
        </div>

        {/* Amenidades y Servicios: 30px title, three 18/35 columns at their Figma x positions. */}
        <section className="px-4 pt-20 md:px-0 md:pt-[calc(var(--f)*261)]">
          <h2 className="text-center font-[family-name:var(--font-courier)] text-[24px] leading-normal text-black md:text-[max(22px,calc(var(--f)*30))] md:leading-[1.133]">
            {amenitiesTitle}
          </h2>
          <div className="relative mt-8 grid gap-6 font-[family-name:var(--font-courier)] text-[15px] leading-[28px] text-[#222222] md:mt-[calc(var(--f)*111)] md:block md:h-[calc(var(--f)*291)] md:text-[max(13px,calc(var(--f)*18))] md:leading-[1.944]">
            {amenities[language].map((column, index) => (
              <ul
                key={index}
                className="md:absolute md:top-0 md:left-[calc(var(--f)*var(--col-x))] md:w-[calc(var(--f)*var(--col-w))]"
                style={{ ["--col-x" as string]: amenityColumns[index][0], ["--col-w" as string]: amenityColumns[index][1] }}
              >
                {column.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ))}
          </div>
          <div className="flex justify-center pt-16 md:pt-[var(--deco-gap)]" style={{ ["--deco-gap" as string]: f(amenitiesDeco.gapAbove) }}>
            <DecoGraphic deco={amenitiesDeco} className="relative min-h-[60px] min-w-[60px]" />
          </div>
        </section>

        <div className="pt-20 md:pt-[var(--closing-gap)]" style={{ ["--closing-gap" as string]: f(amenitiesDeco.gapBelow) }}>
          <SiteClosing />
        </div>
      </main>
    </div>
  );
}
