"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from '../contexts/LanguageContext'

interface GalleryItem {
  id: string
  title: string
  image: string
  href: string
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Casa Campeche I",
    image: "/figma/casa-campeche/right-03-pool.png",
    href: "/casa-campeche#campeche-i",
  },
  {
    id: "2",
    title: "Casa Campeche II",
    image: "/figma/casa-campeche/left-02-lounge.png",
    href: "/casa-campeche#campeche-ii",
  },
  {
    id: "3",
    title: "Casa Palmas I",
    image: "/figma/casa-palmas/palmas-i-07.jpg",
    href: "/casa-palmas#palmas-i",
  },
  {
    id: "4",
    title: "Casa Palmas II",
    image: "/figma/casa-palmas/palmas-ii-06.jpg",
    href: "/casa-palmas#palmas-ii",
  },
]

const DESKTOP_SLIDES_PER_PAGE = 2

function CarouselNavigation() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext, api } = useCarousel()
  const [current, setCurrent] = React.useState(0)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  React.useEffect(() => {
    if (!api) return

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap())
    }

    updateCurrent()
    api.on("select", updateCurrent)
    api.on("reInit", updateCurrent)

    return () => {
      api.off("select", updateCurrent)
      api.off("reInit", updateCurrent)
    }
  }, [api])

  const totalPages = isMobile
    ? galleryItems.length
    : Math.ceil(galleryItems.length / DESKTOP_SLIDES_PER_PAGE)

  const activePage = isMobile
    ? current
    : Math.min(Math.floor(current / DESKTOP_SLIDES_PER_PAGE), totalPages - 1)

  const goToPage = (page: number) => {
    if (!api) return
    api.scrollTo(isMobile ? page : page * DESKTOP_SLIDES_PER_PAGE)
  }

  const handlePrev = () => {
    if (isMobile) {
      scrollPrev()
      return
    }

    if (current >= DESKTOP_SLIDES_PER_PAGE) {
      api?.scrollTo(0)
    }
  }

  const handleNext = () => {
    if (isMobile) {
      scrollNext()
      return
    }

    if (current < DESKTOP_SLIDES_PER_PAGE) {
      api?.scrollTo(DESKTOP_SLIDES_PER_PAGE)
    }
  }

  const canGoPrev = isMobile ? canScrollPrev : current > 0
  const canGoNext = isMobile
    ? canScrollNext
    : current < galleryItems.length - DESKTOP_SLIDES_PER_PAGE

  return (
    <div className="mt-8 flex items-center justify-center space-x-4">
      <button
        type="button"
        aria-label="Anterior"
        onClick={handlePrev}
        disabled={!canGoPrev}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#222222]/20 text-[#222222] transition-colors hover:border-[#222222] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
      </button>

      <div
        className="flex space-x-2"
        role="group"
        aria-label="Seleccionar vista de la galería"
      >
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Ir a la vista ${index + 1}`}
            aria-current={index === activePage ? "true" : undefined}
            onClick={() => goToPage(index)}
            disabled={!api}
            className={`h-2.5 w-2.5 rounded-full border border-[#222222] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222] disabled:cursor-not-allowed ${
              index === activePage ? "bg-[#98989A]" : "bg-transparent"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="Siguiente"
        onClick={handleNext}
        disabled={!canGoNext}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#222222]/20 text-[#222222] transition-colors hover:border-[#222222] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  )
}

export default function ArchitecturalGallery() {
  const { language } = useLanguage()

  const buttonText = {
    es: "Ver más",
    en: "Discover",
  } as const

  const currentButtonText = buttonText[language]

  return (
    <section className="py-12 md:py-14">
      <div className="mx-auto max-w-[1308px] px-0">
        <div className="w-full">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
              breakpoints: {
                "(min-width: 768px)": { slidesToScroll: DESKTOP_SLIDES_PER_PAGE },
              },
            }}
          >
            <CarouselContent className="-ml-1">
              {galleryItems.map((item) => (
                <CarouselItem key={item.id} className="basis-full pl-1 md:basis-1/2">
                  <div className="relative h-[360px] w-full overflow-hidden md:h-[490px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    <div className="absolute left-[5.32%] bottom-[3.94%] text-white">
                      <h3 className="font-[family-name:var(--font-courier)] text-base leading-[18px] text-white">
                        {item.title}
                      </h3>
                    </div>

                    <div className="absolute right-[8.25%] bottom-[4.77%]">
                      <Link
                        href={item.href}
                        className="inline-block border border-white/80 bg-black/10 px-4 py-2 font-[family-name:var(--font-courier)] text-base leading-[18px] text-white transition-colors hover:bg-black/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {currentButtonText}
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselNavigation />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
