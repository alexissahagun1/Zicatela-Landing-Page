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

interface PropertyCarouselProps {
  title: string;
  sectionId?: string;
  images: string[];
  imageAlts: string[];
  features: string[];
  connectionNote?: string;
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
  imageAlts,
  features,
  connectionNote,
  layout = "image-left",
}: PropertyCarouselProps) {
  const { language } = useLanguage();
  const isImageLeft = layout === "image-left";
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div id={sectionId} className="relative mx-auto w-full max-w-[1080px] scroll-mt-24">
      <Carousel
        aria-label={title}
        className="w-full"
        opts={{
          align: "start",
          duration: prefersReducedMotion ? 0 : 35,
          loop: images.length > 1,
        }}
      >
        <div
          className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 ${
            isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
          }`}
        >
          <div className="relative w-full lg:w-1/2">
            <CarouselContent className="ml-0 will-change-transform">
              {images.map((image, index) => (
                <CarouselItem
                  key={`${image}-${index}`}
                  className="basis-full pl-0 [backface-visibility:hidden]"
                >
                  <div className="relative isolate aspect-[4/3] w-full overflow-hidden bg-[#F5F5F5] lg:aspect-[1.55/1]">
                    <Image
                      src={image}
                      alt={imageAlts[index] ?? title}
                      fill
                      loading="eager"
                      priority={index === 0}
                      draggable={false}
                      className="casa-zii-carousel-image select-none object-contain"
                      sizes="(max-width: 1023px) 100vw, 50vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-5 lg:hidden">
              <CarouselControls count={images.length} language={language} />
            </div>
          </div>

          <div className="flex w-full flex-col justify-center lg:w-1/2">
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-courier)] text-2xl font-bold uppercase tracking-wide text-[#000000] md:text-3xl">
                {title}
              </h2>

              <div className="space-y-2">
                {features.map((feature) => (
                  <p
                    key={feature}
                    className="m-0 font-[family-name:var(--font-courier)] text-[15px] leading-[17px] text-[#000000]"
                  >
                    {feature}
                  </p>
                ))}
              </div>

              {connectionNote && (
                <p className="m-0 font-[family-name:var(--font-courier)] text-sm italic leading-[17px] text-[#000000] md:text-[15px]">
                  {connectionNote}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 hidden lg:flex">
          <div
            className={`w-full lg:w-[calc((100%_-_3rem)_/_2)] ${
              isImageLeft ? "" : "ml-auto"
            }`}
          >
            <CarouselControls count={images.length} language={language} />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
