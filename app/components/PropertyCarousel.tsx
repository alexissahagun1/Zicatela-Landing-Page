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
      <div className={`flex flex-col lg:flex-row gap-2 lg:gap-12 ${
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
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="space-y-6">
            {/* Navigation Controls - Mobile only, above title */}
            <div className="flex justify-center items-center space-x-4 lg:hidden">
              <button 
                onClick={goToPrevious}
                className="relative w-[39px] h-[18px] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                <span className="font-courier font-normal text-base leading-[18px] text-[#222222]">
                  {currentNavText.prev}
                </span>
              </button>
              
              {/* Navigation dots */}
              <div className="flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-[10px] h-[10px] rounded-full border border-[#222222] transition-colors ${
                      index === currentImageIndex ? 'bg-[#98989A]' : 'bg-transparent'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={goToNext}
                className="relative w-[29px] h-[18px] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                <span className="font-courier font-normal text-base leading-[18px] text-black">
                  {currentNavText.next}
                </span>
              </button>
            </div>

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
      
      {/* Navigation Controls - Desktop only, centered with image based on layout */}
      <div className="hidden lg:flex justify-center items-center mt-3 space-x-4">
        {isImageLeft ? (
          // Image is on the left, navigation should be on the left
          <>
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={goToPrevious}
                  className="relative w-[39px] h-[18px] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <span className="font-courier font-normal text-base leading-[18px] text-[#222222]">
                    {currentNavText.prev}
                  </span>
                </button>
                
                {/* Navigation dots */}
                <div className="flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-[10px] h-[10px] rounded-full border border-[#222222] transition-colors ${
                        index === currentImageIndex ? 'bg-[#98989A]' : 'bg-transparent'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={goToNext}
                  className="relative w-[29px] h-[18px] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <span className="font-courier font-normal text-base leading-[18px] text-black">
                    {currentNavText.next}
                  </span>
                </button>
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2"></div>
          </>
        ) : (
          // Image is on the right, navigation should be on the right
          <>
            <div className="hidden lg:block lg:w-1/2"></div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={goToPrevious}
                  className="relative w-[39px] h-[18px] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <span className="font-courier font-normal text-base leading-[18px] text-[#222222]">
                    {currentNavText.prev}
                  </span>
                </button>
                
                {/* Navigation dots */}
                <div className="flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-[10px] h-[10px] rounded-full border border-[#222222] transition-colors ${
                        index === currentImageIndex ? 'bg-[#98989A]' : 'bg-transparent'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={goToNext}
                  className="relative w-[29px] h-[18px] disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <span className="font-courier font-normal text-base leading-[18px] text-black">
                    {currentNavText.next}
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
