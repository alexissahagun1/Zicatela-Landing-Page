"use client"

import * as React from "react"
import Image from "next/image"
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
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Casa Campeche I",
    image: "/figma/casa-campeche/right-03-pool.png"
  },
  {
    id: "2",
    title: "Casa Campeche II",
    image: "/figma/casa-campeche/left-02-lounge.png"
  }
]

// Navigation controls component that uses the carousel context
function CarouselNavigation() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext, api } = useCarousel()
  const [current, setCurrent] = React.useState(0)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const handlePrev = () => {
    scrollPrev()
  }

  const handleNext = () => {
    scrollNext()
  }

  // Calculate which dot should be active based on screen size
  const getActiveDot = () => {
    if (isMobile) {
      // On mobile, each image is a separate slide
      return current
    } else {
      // On desktop, each slide shows 2 images, so divide by 2
      return Math.floor(current / 2)
    }
  }

  const getTotalDots = () => {
    if (isMobile) {
      // On mobile, show dots for each image
      return galleryItems.length
    } else {
      // On desktop, show dots for each slide (2 images per slide)
      return Math.ceil(galleryItems.length / 2)
    }
  }

  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      <button
        type="button"
        aria-label="Anterior"
        onClick={handlePrev}
        disabled={!canScrollPrev}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#222222]/20 text-[#222222] transition-colors hover:border-[#222222] disabled:cursor-not-allowed disabled:opacity-35"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
      </button>
      
      {/* Navigation dots */}
      <div className="flex space-x-2">
        {Array.from({ length: getTotalDots() }).map((_, index) => (
          <div 
            key={index}
            className={`w-[10px] h-[10px] rounded-full border border-[#222222] ${
              index === getActiveDot() ? 'bg-[#98989A]' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
      
      <button
        type="button"
        aria-label="Siguiente"
        onClick={handleNext}
        disabled={!canScrollNext}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#222222]/20 text-[#222222] transition-colors hover:border-[#222222] disabled:cursor-not-allowed disabled:opacity-35"
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
    en: "Discover"
  }

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
                '(min-width: 768px)': { slidesToScroll: 2 }
              }
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
                    
                    {/* Title overlay */}
                    <div className="absolute left-[5.32%] bottom-[3.94%] text-white">
                      <h3 className="font-[family-name:var(--font-courier)] text-base leading-[18px] text-white">
                        {item.title}
                      </h3>
                    </div>
                    
                    {/* Ver más button */}
                    <div className="absolute right-[8.25%] bottom-[4.77%]">
                      <button className="border border-white/80 bg-black/10 px-4 py-2 font-[family-name:var(--font-courier)] text-base leading-[18px] text-white transition-colors hover:bg-black/25">
                        {currentButtonText}
                      </button>
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
