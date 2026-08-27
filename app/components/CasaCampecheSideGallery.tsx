import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const leftImages: GalleryImage[] = [
  {
    src: "/figma/casa-campeche/left-01-kitchen.png",
    alt: "Cocina y comedor de Casa Campeche",
    width: 540,
    height: 721,
  },
  {
    src: "/figma/casa-campeche/left-02-lounge.png",
    alt: "Sala abierta de Casa Campeche",
    width: 959,
    height: 720,
  },
  {
    src: "/figma/casa-campeche/left-03-bathroom.png",
    alt: "Baño de concreto de Casa Campeche",
    width: 542,
    height: 721,
  },
  {
    src: "/figma/casa-campeche/left-04-bedroom.png",
    alt: "Habitación de Casa Campeche",
    width: 539,
    height: 720,
  },
  {
    src: "/figma/casa-campeche/left-05-interior.jpg",
    alt: "Interior de Casa Campeche",
    width: 4096,
    height: 3072,
  },
  {
    src: "/figma/casa-campeche/left-06-interior.jpg",
    alt: "Espacio interior de Casa Campeche",
    width: 4096,
    height: 3072,
  },
  {
    src: "/figma/casa-campeche/left-07-interior.jpg",
    alt: "Arquitectura interior de Casa Campeche",
    width: 4096,
    height: 3072,
  },
  {
    src: "/figma/casa-campeche/left-08-vertical.jpg",
    alt: "Detalle vertical de Casa Campeche",
    width: 2624,
    height: 3499,
  },
];

const rightImages: GalleryImage[] = [
  {
    src: "/figma/casa-campeche/right-01-shower.png",
    alt: "Regadera de concreto de Casa Campeche",
    width: 539,
    height: 720,
  },
  {
    src: "/figma/casa-campeche/right-02-bedroom.png",
    alt: "Habitación con arte de Casa Campeche",
    width: 960,
    height: 721,
  },
  {
    src: "/figma/casa-campeche/right-03-pool.png",
    alt: "Alberca privada de Casa Campeche",
    width: 961,
    height: 721,
  },
  {
    src: "/figma/casa-campeche/right-04-lounge.png",
    alt: "Sala junto a la alberca de Casa Campeche",
    width: 539,
    height: 721,
  },
  {
    src: "/figma/casa-campeche/right-05-portal.png",
    alt: "Portal circular de Casa Campeche",
    width: 961,
    height: 721,
  },
  {
    src: "/figma/casa-campeche/right-06-dining.png",
    alt: "Comedor de Casa Campeche",
    width: 539,
    height: 721,
  },
  {
    src: "/figma/casa-campeche/right-07-kitchen.png",
    alt: "Cocina de Casa Campeche",
    width: 962,
    height: 721,
  },
  {
    src: "/figma/casa-campeche/right-08-bathroom.png",
    alt: "Baño de Casa Campeche",
    width: 536,
    height: 719,
  },
];

function GalleryColumn({ images }: { images: GalleryImage[] }) {
  return (
    <div className="flex w-full flex-col gap-6">
      {images.slice(0, 3).map((image) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1536px) 18vw, 360px"
          className="h-auto w-full object-cover"
        />
      ))}
    </div>
  );
}

export default function CasaCampecheSideGallery() {
  return (
    <div
      aria-label="Galería lateral de Casa Campeche"
      className="pointer-events-none absolute inset-x-0 top-[1080px] z-0 hidden max-h-[1000px] items-start justify-between gap-8 overflow-hidden px-[clamp(1.5rem,3vw,5rem)] 2xl:flex"
    >
      <aside className="w-[clamp(12rem,18vw,26rem)]">
        <GalleryColumn images={leftImages} />
      </aside>
      <aside className="w-[clamp(12rem,18vw,26rem)]">
        <GalleryColumn images={rightImages} />
      </aside>
    </div>
  );
}
