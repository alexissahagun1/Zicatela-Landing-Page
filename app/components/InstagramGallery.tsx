"use client";

import Image from "next/image";
import { useLanguage } from "../contexts/LanguageContext";

export type InstagramGalleryItem = {
  src: string;
  alt: string;
  href: string;
};

const GALLERY_ITEMS: Omit<InstagramGalleryItem, "alt">[] = [
  {
    src: "/instagram-gallery/figma-01.png",
    href: "https://www.instagram.com/casazii/p/DVWvJ4rjTMF/",
  },
  {
    src: "/instagram-gallery/figma-02.png",
    href: "https://www.instagram.com/casazii/p/DSamkV7DyZ-/",
  },
  {
    src: "/instagram-gallery/figma-03.png",
    href: "https://www.instagram.com/casazii/p/DaVGXVMSzZp/",
  },
  {
    src: "/instagram-gallery/figma-04.png",
    href: "https://www.instagram.com/casazii/p/DRc3gZ0D1Fm/",
  },
  {
    src: "/instagram-gallery/figma-05.png",
    href: "https://www.instagram.com/casazii/p/DVWvWG6jQwD/",
  },
  {
    src: "/instagram-gallery/figma-06.png",
    href: "https://www.instagram.com/casazii/p/DRc2Yktj0gR/",
  },
];

export default function InstagramGallery() {
  const { language } = useLanguage();

  const alts =
    language === "es"
      ? [
          "Portal circular de concreto y patio con alberca en Casa Zii",
          "Sala de Casa Zii con piso de ladrillo y apertura circular al jardín",
          "Playa de La Punta al atardecer con palmas y tabla de surf",
          "Interior de varios niveles con banca de concreto y vista a la alberca",
          "Alberca rectangular contra muro de concreto texturizado",
          "Alberca de noche con escaleras de concreto e iluminación cálida",
        ]
      : [
          "Circular concrete portal and courtyard pool at Casa Zii",
          "Casa Zii living room with brick floor and circular garden opening",
          "La Punta beach at sunset with palms and a surfboard",
          "Multi-level interior with concrete bench and pool view",
          "Rectangular pool against a textured concrete wall",
          "Night pool with concrete stairs and warm lighting",
        ];

  return (
    <section className="bg-white px-4 py-8" aria-label="Instagram">
      <div className="mx-auto grid w-full max-w-[836px] grid-cols-1 gap-x-[13px] gap-y-[12.5px] sm:grid-cols-2 md:grid-cols-3">
        {GALLERY_ITEMS.map((item, index) => {
          const alt = alts[index];
          const image = (
            <Image
              src={item.src}
              alt={alt}
              width={270}
              height={338}
              className="h-full w-full object-cover"
            />
          );

          const className =
            "relative block aspect-[270/337.5] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222] hover:opacity-90";

          if (item.href) {
            return (
              <a
                key={item.src}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={className}
              >
                {image}
                <span className="sr-only">
                  {language === "es"
                    ? "Abrir publicación de Instagram"
                    : "Open Instagram post"}
                </span>
              </a>
            );
          }

          return (
            <div key={item.src} className={className}>
              {image}
            </div>
          );
        })}
      </div>
    </section>
  );
}
