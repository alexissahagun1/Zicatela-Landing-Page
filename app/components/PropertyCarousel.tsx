"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface PropertyCarouselProps {
  title: string;
  images: string[];
  imageAlts: string[];
  features: string[];
  connectionNote?: string;
  layout?: "image-left" | "image-right";
}

function CarouselControls({
  count,
  currentIndex,
  onPrevious,
  onNext,
  onSelect,
  language,
}: {
  count: number;
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  language: "es" | "en";
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPrevious}
        aria-label={language === "es" ? "Imagen anterior" : "Previous image"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#222222]/20 text-[#222222] transition-colors hover:border-[#222222] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
      </button>

      <div
        className="flex items-center gap-2"
        aria-label={language === "es" ? "Seleccionar imagen" : "Select image"}
      >
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`${language === "es" ? "Ir a imagen" : "Go to image"} ${index + 1}`}
            aria-current={index === currentIndex ? "true" : undefined}
            className={`h-2.5 w-2.5 rounded-full border border-[#222222] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222] ${
              index === currentIndex ? "bg-[#98989A]" : "bg-transparent"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label={language === "es" ? "Imagen siguiente" : "Next image"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#222222]/20 text-[#222222] transition-colors hover:border-[#222222] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}

export default function PropertyCarousel({
  title,
  images,
  imageAlts,
  features,
  connectionNote,
  layout = "image-left",
}: PropertyCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language } = useLanguage();
  const isImageLeft = layout === "image-left";

  const goToPrevious = () => {
    setCurrentImageIndex((previous) =>
      previous === 0 ? images.length - 1 : previous - 1,
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((previous) =>
      previous === images.length - 1 ? 0 : previous + 1,
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-[1080px]">
      <div
        className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 ${
          isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        <div className="relative w-full lg:w-1/2">
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[1.55/1]">
            <Image
              src={images[currentImageIndex]}
              alt={imageAlts[currentImageIndex]}
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="mt-5 lg:hidden">
            <CarouselControls
              count={images.length}
              currentIndex={currentImageIndex}
              onPrevious={goToPrevious}
              onNext={goToNext}
              onSelect={setCurrentImageIndex}
              language={language}
            />
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
        <div className={`w-1/2 ${isImageLeft ? "" : "order-2"}`}>
          <CarouselControls
            count={images.length}
            currentIndex={currentImageIndex}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onSelect={setCurrentImageIndex}
            language={language}
          />
        </div>
      </div>
    </div>
  );
}
