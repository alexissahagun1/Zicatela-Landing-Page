"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  useCarousel,
} from "@/components/ui/carousel";
import { useLanguage } from "../contexts/LanguageContext";
import type { GalleryPhoto } from "@/lib/gallery-photos";

interface PropertyCarouselProps {
  title: string;
  sectionId?: string;
  images: GalleryPhoto[];
  features: string[];
  connectionNote?: string;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function CarouselControls({
  count,
  language,
}: {
  count: number;
  language: "es" | "en";
}) {
  const {
    api,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
  } = useCarousel();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrentIndex = (carouselApi: NonNullable<CarouselApi>) => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    updateCurrentIndex(api);
    api.on("select", updateCurrentIndex);
    api.on("reInit", updateCurrentIndex);

    return () => {
      api.off("select", updateCurrentIndex);
      api.off("reInit", updateCurrentIndex);
    };
  }, [api]);

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!api || !canScrollPrev}
        aria-label={language === "es" ? "Imagen anterior" : "Previous image"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#222222]/20 text-[#222222] transition-colors hover:border-[#222222] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
      </button>

      <div
        className="flex items-center gap-2"
        role="group"
        aria-label={language === "es" ? "Seleccionar imagen" : "Select image"}
      >
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            disabled={!api}
            aria-label={`${language === "es" ? "Ir a imagen" : "Go to image"} ${index + 1}`}
            aria-current={index === currentIndex ? "true" : undefined}
            className={`h-2.5 w-2.5 rounded-full border border-[#222222] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222] disabled:cursor-not-allowed ${
              index === currentIndex ? "bg-[#98989A]" : "bg-transparent"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={scrollNext}
        disabled={!api || !canScrollNext}
        aria-label={language === "es" ? "Imagen siguiente" : "Next image"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#222222]/20 text-[#222222] transition-colors hover:border-[#222222] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}

export default function PropertyCarousel({
  title,
  sectionId,
  images,
  features,
  connectionNote,
}: PropertyCarouselProps) {
  const { language } = useLanguage();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [api, setApi] = useState<CarouselApi>();
  // null until the visitor hovers, focuses or touches this carousel: before that, native lazy loading only fetches what scrolls into view.
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("pointerDown", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("pointerDown", onSelect);
    };
  }, [api]);

  // Once browsing, fetch the next three photos and the previous one so slides never appear empty.
  const isNear = (index: number) => {
    if (selected === null) return false;
    const distance = (index - selected + images.length) % images.length;
    return distance <= 3 || distance === images.length - 1;
  };

  return (
    <div
      id={sectionId}
      className="relative w-full scroll-mt-24"
      onPointerEnter={() => setSelected((current) => current ?? api?.selectedScrollSnap() ?? 0)}
      onFocus={() => setSelected((current) => current ?? api?.selectedScrollSnap() ?? 0)}
    >
      {/* Small type, big photos: the gallery is meant to show off the house. */}
      <div className="mb-4 flex flex-col gap-1 md:mb-5 md:flex-row md:flex-wrap md:items-baseline md:gap-x-6">
        <h2 className="font-[family-name:var(--font-courier)] text-lg font-bold uppercase tracking-wide text-[#000000] md:text-xl">
          {title}
        </h2>
        <p className="m-0 font-[family-name:var(--font-courier)] text-[12px] leading-[16px] text-[#000000] md:text-[13px]">
          {features.join(" · ")}
        </p>
        {connectionNote && (
          <p className="m-0 font-[family-name:var(--font-courier)] text-[12px] italic leading-[16px] text-[#000000] md:text-[13px]">
            {connectionNote}
          </p>
        )}
      </div>

      <Carousel
        setApi={setApi}
        aria-label={title}
        className="w-full"
        opts={{
          align: "start",
          duration: prefersReducedMotion ? 0 : 35,
          loop: images.length > 1,
        }}
      >
        <CarouselContent className="-ml-2 will-change-transform md:-ml-3">
          {images.map((image, index) => (
            <CarouselItem
              key={image.src}
              className="basis-auto pl-2 md:pl-3 [backface-visibility:hidden]"
            >
              {/* Fixed height, natural width: every photo shows whole. Height leaves room for nav, title, controls and the fixed booking bar; the 3:2 cap keeps wide photos inside tablets. */}
              <Image
                src={image.src}
                alt={`${title} — ${language === "es" ? "foto" : "photo"} ${index + 1}`}
                width={image.width}
                height={image.height}
                loading={isNear(index) ? "eager" : "lazy"}
                draggable={false}
                className="casa-zii-carousel-image h-[58vw] w-auto max-w-full select-none bg-[#F5F5F5] object-contain md:h-[max(240px,min(calc(100svh-292px),820px,calc((100vw-2rem)/1.52)))]"
                sizes={`(max-width: 767px) ${Math.ceil(58 * (image.width / image.height))}vw, ${Math.ceil(820 * (image.width / image.height))}px`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-5">
          <CarouselControls count={images.length} language={language} />
        </div>
      </Carousel>
    </div>
  );
}
