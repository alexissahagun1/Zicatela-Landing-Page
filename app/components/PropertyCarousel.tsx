"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  layout?: "image-left" | "image-right";
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

  const labelClass =
    "font-[family-name:var(--font-courier)] text-[16px] leading-none text-[#222222] hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#222222]";

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!api || !canScrollPrev}
        aria-label={language === "es" ? "Imagen anterior" : "Previous image"}
        className={labelClass}
      >
        Prev
      </button>

      <div
        className="flex items-center gap-[6px]"
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
            className={`h-[10px] w-[10px] rounded-full border border-[#222222] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222] disabled:cursor-not-allowed ${
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
        className={labelClass}
      >
        {language === "es" ? "Sig" : "Next"}
      </button>
    </div>
  );
}

export default function PropertyCarousel({
  title,
  sectionId,
  images,
  features,
  layout = "image-left",
}: PropertyCarouselProps) {
  const { language } = useLanguage();
  const isImageLeft = layout === "image-left";
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

  const loadNeighbours = () => setSelected((current) => current ?? api?.selectedScrollSnap() ?? 0);

  // Figma eNHBCVNfWSH0nXswrrvnuS frames 2011:90 / 2011:237 (1920 wide): a 1120×754 photo bleeds to the
  // screen edge, "Prev ○○○ Sig" sits centred under it, and the text column starts 260px (image left) or
  // 230px from the edge (image right). Sizes scale with the viewport and are capped at the Figma values.
  return (
    <div
      id={sectionId}
      className="relative w-full scroll-mt-24 md:left-1/2 md:w-screen md:-translate-x-1/2"
      onPointerEnter={loadNeighbours}
      onFocus={loadNeighbours}
    >
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
        <div className={`flex flex-col gap-8 md:items-start md:gap-0 ${isImageLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
          <div className="relative w-full md:w-[58.333vw] md:shrink-0">
            <CarouselContent className="ml-0 will-change-transform">
              {images.map((image, index) => (
                <CarouselItem
                  key={image.src}
                  className="basis-full pl-0 [backface-visibility:hidden]"
                >
                  {/* Photos stay whole; on desktop they hug the screen edge like the Figma bleed. */}
                  <div className="relative isolate aspect-[4/3] w-full overflow-hidden bg-white md:aspect-[1120/754]">
                    <Image
                      src={image.src}
                      alt={`${title} — ${language === "es" ? "foto" : "photo"} ${index + 1}`}
                      fill
                      loading={isNear(index) ? "eager" : "lazy"}
                      draggable={false}
                      className={`casa-zii-carousel-image select-none object-contain ${isImageLeft ? "md:object-left" : "md:object-right"}`}
                      sizes="(max-width: 767px) 100vw, 59vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-[14px]">
              <CarouselControls count={images.length} language={language} />
            </div>
          </div>

          <div
            className={`flex w-full flex-col md:w-auto md:pt-[8.8vw] ${
              isImageLeft ? "md:pl-[13.54vw]" : "md:mr-auto md:pl-[11.98vw]"
            }`}
          >
            <h2 className="font-[family-name:var(--font-courier)] text-[24px] font-bold leading-[1.133] text-[#000000] md:text-[clamp(22px,1.5625vw,30px)]">
              {title}
            </h2>

            {/* Figma leaves one empty 27px line (1.125em at 24px) between features. */}
            <div className="mt-6 space-y-[1.125em] font-[family-name:var(--font-courier)] text-[16px] leading-[1.125] text-[#000000] md:mt-[clamp(32px,3.33vw,64px)] md:text-[clamp(16px,1.25vw,24px)]">
              {features.map((feature) => (
                <p key={feature} className="m-0">
                  {feature}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
