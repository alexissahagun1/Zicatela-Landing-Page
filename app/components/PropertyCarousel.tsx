"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const CAROUSEL_TRANSITION_MS = 650;

interface CarouselTransition {
  from: number;
  to: number;
  incomingImageReady: boolean;
  isAnimating: boolean;
}

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
        role="group"
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
  const [transition, setTransition] = useState<CarouselTransition | null>(null);
  const currentImageIndexRef = useRef(0);
  const transitionRef = useRef<CarouselTransition | null>(null);
  const queuedImageIndexRef = useRef<number | null>(null);
  const { language } = useLanguage();
  const isImageLeft = layout === "image-left";

  const startTransition = useCallback((from: number, to: number) => {
    const nextTransition: CarouselTransition = {
      from,
      to,
      incomingImageReady: false,
      isAnimating: false,
    };

    transitionRef.current = nextTransition;
    setTransition(nextTransition);
  }, []);

  const finishTransition = useCallback((expectedTarget: number) => {
    const activeTransition = transitionRef.current;

    if (!activeTransition || activeTransition.to !== expectedTarget) {
      return;
    }

    const queuedImageIndex = queuedImageIndexRef.current;
    queuedImageIndexRef.current = null;
    currentImageIndexRef.current = activeTransition.to;

    if (queuedImageIndex !== null && queuedImageIndex !== activeTransition.to) {
      const nextTransition: CarouselTransition = {
        from: activeTransition.to,
        to: queuedImageIndex,
        incomingImageReady: false,
        isAnimating: false,
      };

      transitionRef.current = nextTransition;
      setCurrentImageIndex(activeTransition.to);
      setTransition(nextTransition);
      return;
    }

    transitionRef.current = null;
    setCurrentImageIndex(activeTransition.to);
    setTransition(null);
  }, []);

  const requestImage = useCallback(
    (nextImageIndex: number) => {
      if (nextImageIndex === currentImageIndexRef.current && !transitionRef.current) {
        return;
      }

      if (transitionRef.current) {
        queuedImageIndexRef.current = nextImageIndex;
        return;
      }

      startTransition(currentImageIndexRef.current, nextImageIndex);
    },
    [startTransition],
  );

  const getQueuedNavigationIndex = useCallback(
    (direction: -1 | 1) => {
      const baseIndex =
        queuedImageIndexRef.current ??
        transitionRef.current?.to ??
        currentImageIndexRef.current;
      const nextIndex = baseIndex + direction;

      if (nextIndex < 0) {
        return images.length - 1;
      }

      if (nextIndex >= images.length) {
        return 0;
      }

      return nextIndex;
    },
    [images.length],
  );

  const goToPrevious = () => {
    requestImage(getQueuedNavigationIndex(-1));
  };

  const goToNext = () => {
    requestImage(getQueuedNavigationIndex(1));
  };

  const markIncomingImageReady = (imageIndex: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishTransition(imageIndex);
      return;
    }

    setTransition((activeTransition) => {
      if (!activeTransition || activeTransition.to !== imageIndex) {
        return activeTransition;
      }

      return { ...activeTransition, incomingImageReady: true };
    });
  };

  useEffect(() => {
    if (!transition?.incomingImageReady || transition.isAnimating) {
      return;
    }

    let firstFrame = 0;
    let secondFrame = 0;

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setTransition((activeTransition) => {
          if (
            !activeTransition ||
            activeTransition.to !== transition.to ||
            !activeTransition.incomingImageReady
          ) {
            return activeTransition;
          }

          return { ...activeTransition, isAnimating: true };
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [transition]);

  useEffect(() => {
    if (!transition?.isAnimating) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      finishTransition(transition.to);
    }, CAROUSEL_TRANSITION_MS + 100);

    return () => window.clearTimeout(timeoutId);
  }, [finishTransition, transition]);

  useEffect(() => {
    return () => {
      transitionRef.current = null;
      queuedImageIndexRef.current = null;
    };
  }, []);

  const displayImageIndex = transition?.to ?? currentImageIndex;

  return (
    <div className="relative mx-auto w-full max-w-[1080px]">
      <div
        className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 ${
          isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        <div className="relative w-full lg:w-1/2">
          <div className="relative isolate aspect-[4/3] w-full overflow-hidden bg-[#F5F5F5] lg:aspect-[1.55/1]">
            {transition && (
              <Image
                key={`outgoing-${transition.from}`}
                src={images[transition.from]}
                alt=""
                fill
                aria-hidden="true"
                className={`casa-zii-carousel-image pointer-events-none absolute inset-0 z-0 object-cover transition-opacity duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                  transition.isAnimating ? "opacity-0" : "opacity-100"
                }`}
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            )}
            <Image
              key={`current-${displayImageIndex}`}
              src={images[displayImageIndex]}
              alt={imageAlts[displayImageIndex]}
              fill
              className={`casa-zii-carousel-image pointer-events-none absolute inset-0 z-10 object-cover transition-opacity duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                transition && !transition.isAnimating ? "opacity-0" : "opacity-100"
              }`}
              sizes="(max-width: 1023px) 100vw, 50vw"
              priority={!transition && displayImageIndex === 0}
              onLoad={
                transition
                  ? () => markIncomingImageReady(displayImageIndex)
                  : undefined
              }
              onError={
                transition
                  ? () => markIncomingImageReady(displayImageIndex)
                  : undefined
              }
              onTransitionEnd={(event) => {
                if (event.propertyName === "opacity" && transition?.isAnimating) {
                  finishTransition(displayImageIndex);
                }
              }}
            />
          </div>
          <div className="mt-5 lg:hidden">
            <CarouselControls
              count={images.length}
              currentIndex={displayImageIndex}
              onPrevious={goToPrevious}
              onNext={goToNext}
              onSelect={requestImage}
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
        <div
          className={`w-full lg:w-[calc((100%_-_3rem)_/_2)] ${
            isImageLeft ? "" : "ml-auto"
          }`}
        >
          <CarouselControls
            count={images.length}
            currentIndex={displayImageIndex}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onSelect={requestImage}
            language={language}
          />
        </div>
      </div>
    </div>
  );
}
