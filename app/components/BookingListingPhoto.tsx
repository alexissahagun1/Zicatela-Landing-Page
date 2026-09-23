"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Photo = { src: string };

type BookingListingPhotoProps = {
  photos: Photo[];
  alt: string;
  priority?: boolean;
  language: "es" | "en";
};

// Booking-card gallery: a native scroll-snap strip (swipe on touch, trackpad or arrows on desktop).
// Only the first photo loads up front; the rest are lazy and fetched at card width as the guest browses.
export default function BookingListingPhoto({ photos, alt, priority = false, language }: BookingListingPhotoProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const many = photos.length > 1;

  function go(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * track.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div
      className="group relative aspect-[4/3] w-full overflow-hidden bg-[#F5F5F5] md:aspect-[5/3]"
      role={many ? "region" : undefined}
      aria-roledescription={many ? (language === "es" ? "carrusel" : "carousel") : undefined}
      aria-label={alt}
    >
      {!firstLoaded && <div className="casa-zii-image-skeleton absolute inset-0" aria-hidden="true" />}
      <div
        ref={trackRef}
        className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(event) => {
          const track = event.currentTarget;
          setIndex(Math.round(track.scrollLeft / track.clientWidth));
        }}
      >
        {photos.map((photo, i) => (
          <div key={photo.src} className="relative h-full w-full shrink-0 snap-start">
            <Image
              src={photo.src}
              alt={`${alt} — ${language === "es" ? "foto" : "photo"} ${i + 1}`}
              fill
              priority={priority && i === 0}
              loading={i === 0 ? undefined : "lazy"}
              quality={72}
              sizes="(max-width: 767px) 100vw, (max-width: 1280px) 50vw, 560px"
              draggable={false}
              className="select-none object-cover"
              onLoad={i === 0 ? () => setFirstLoaded(true) : undefined}
            />
          </div>
        ))}
      </div>

      {many && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label={language === "es" ? "Foto anterior" : "Previous photo"}
            className="absolute left-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#222] shadow-sm hover:bg-white disabled:opacity-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#222] md:flex md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={index === photos.length - 1}
            aria-label={language === "es" ? "Foto siguiente" : "Next photo"}
            className="absolute right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#222] shadow-sm hover:bg-white disabled:opacity-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#222] md:flex md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <p
            className={cn(
              "pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-0.5",
              "font-[family-name:var(--font-courier)] text-[11px] leading-4 text-white",
            )}
            aria-live="polite"
          >
            {Math.min(index, photos.length - 1) + 1} / {photos.length}
          </p>
        </>
      )}
    </div>
  );
}
