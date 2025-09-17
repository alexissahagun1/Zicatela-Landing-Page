"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from '../contexts/LanguageContext';

interface PropertyCarouselProps {
  title: string;
  images: string[];
  imageAlts: string[];
  features: string[];
  connectionNote?: string;
  buttonText: string;
  onButtonClick?: () => void;
  layout?: "image-left" | "image-right";
}

export default function PropertyCarousel({
  title,
  images,
  imageAlts,
  features,
  connectionNote,
  buttonText,
  onButtonClick,
  layout = "image-left"
}: PropertyCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language } = useLanguage();

  const navigationText = {
    es: {
      prev: "Prev",
      next: "Sig"
    },
    en: {
      prev: "Prev",
      next: "Next"
    }
  };

  const currentNavText = navigationText[language];

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  const isImageLeft = layout === "image-left";

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${
        isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}>
        
        {/* Image Section */}
        <div className="relative w-full lg:w-1/2">
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[445px] overflow-hidden">
            <Image
              src={images[currentImageIndex]}
              alt={imageAlts[currentImageIndex]}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Navigation Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="text-[#222222] hover:text-[#A04E39] transition-colors font-['Courier_Prime'] text-base leading-[18px]"
            >
              {currentNavText.prev}
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full border border-[#222222] transition-colors ${
                    index === currentImageIndex 
                      ? "bg-[#98989A] border-[#222222]" 
                      : "bg-transparent hover:bg-[#98989A]/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Next Button */}
            <button
              onClick={goToNext}
              className="text-[#000000] hover:text-[#A04E39] transition-colors font-['Courier_Prime'] text-base leading-[18px]"
            >
              {currentNavText.next}
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="space-y-6">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#000000] font-['Courier_Prime'] uppercase tracking-wide">
              {title}
            </h2>
            
            {/* Features List */}
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index}>
                  <span className="text-[#000000] font-['Courier_Prime'] text-[15px] leading-[17px]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Connection Note */}
            {connectionNote && (
              <p className="text-[#000000] font-['Courier_Prime'] text-sm md:text-[15px] leading-[17px] italic">
                {connectionNote}
              </p>
            )}
            
            {/* Explore Button */}
            <button
              onClick={onButtonClick}
              className="relative w-full max-w-[290px] h-12 border border-[#A14E39] bg-transparent hover:bg-[#A14E39] transition-colors group"
            >
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#A04E39] group-hover:text-white font-['Courier_Prime'] font-bold text-sm md:text-[15px] leading-[17px] transition-colors">
                  {buttonText}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
