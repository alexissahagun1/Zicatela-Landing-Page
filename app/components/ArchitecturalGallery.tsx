"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel"

interface GalleryItem {
  id: string
  title: string
  image: string
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Casa Campeche I",
    image: "/CasaCampecheI.png"
  },
  {
    id: "2", 
    title: "Casa Campeche II",
    image: "/CasaCampecheII.png"
  },
  {
    id: "3",
    title: "Casa Palmas I",
    image: "/CasaPalmasI.png"
  },
  {
    id: "4",
    title: "Casa Palmas II",
    image: "/CasaPalmasII.png"
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
    console.log('Prev clicked, canScrollPrev:', canScrollPrev)
    scrollPrev()
  }

  const handleNext = () => {
    console.log('Next clicked, canScrollNext:', canScrollNext)
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
        onClick={handlePrev}
        disabled={!canScrollPrev}
        className="relative w-[39px] h-[18px] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        <span className="font-courier font-normal text-base leading-[18px] text-[#222222]">
          Prev
        </span>
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
        onClick={handleNext}
        disabled={!canScrollNext}
        className="relative w-[29px] h-[18px] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        <span className="font-courier font-normal text-base leading-[18px] text-black">
          Sig
        </span>
      </button>
    </div>
  )
}

export default function ArchitecturalGallery() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
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
            <CarouselContent className="-ml-2 md:-ml-4">
              {galleryItems.map((item) => (
                <CarouselItem key={item.id} className="pl-2 md:pl-4 basis-full md:basis-1/2">
                  <div className="relative w-full h-[482px] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Title overlay */}
                    <div className="absolute left-[5.32%] bottom-[3.94%] text-white">
                      <h3 className="font-courier font-normal text-base leading-[18px] text-white">
                        {item.title}
                      </h3>
                    </div>
                    
                    {/* Ver más button */}
                    <div className="absolute right-[8.25%] bottom-[4.77%]">
                      <button className="font-courier font-normal text-base leading-[18px] text-white border border-white/20 bg-white/8 px-4 py-2 hover:bg-white/20 transition-colors">
                        Ver más
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
