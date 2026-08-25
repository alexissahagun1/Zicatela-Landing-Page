"use client";

import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

const amenities = {
  es: [
    {
      icon: '/wifi-icon.png',
      text: "wifi alta velocidad"
    },
    {
      icon: '/alberca-icon.png',
      text: "alberca privada"
    },
    {
      icon: '/terraza-icon.png',
      text: "terrazas privadas"
    },
    {
      icon: '/mascota-icon.png',
      text: "mascotas bienvenidas"
    },
    {
      icon: '/aeropuerto-icon.png',
      text: "a 15 min. del aeropuerto"
    }
  ],
  en: [
    {
      icon: '/wifi-icon.png',
      text: "high-speed wifi"
    },
    {
      icon: '/alberca-icon.png',
      text: "private pool"
    },
    {
      icon: '/terraza-icon.png',
      text: "private terraces"
    },
    {
      icon: '/mascota-icon.png',
      text: "pet-friendly"
    },
    {
      icon: '/aeropuerto-icon.png',
      text: "15 min. from airport"
    }
  ]
};

export default function AccommodationSection() {
  const { language } = useLanguage();

  const content = {
    es: {
      title: "Alojamiento",
      description: "Casa Zii ofrece alojamientos solo para adultos, con un diseño brutalista y esencia tropical. Cada casa —Casa Campeche y Casa Palmas— combina arquitectura de autor con interiores abiertos al paisaje natural. Disfruta de terrazas privadas, alberca, detalles inspirados en la costa oaxaqueña y todas las comodidades modernas para una escapada serena y auténtica en La Punta, Zicatela."
    },
    en: {
      title: "Accommodation",
      description: "Casa Zii offers adults-only stays with a brutalist design and a tropical soul. Each home —Casa Campeche and Casa Palmas— blends signature architecture with open interiors that flow into the surrounding landscape. Enjoy private terraces, a pool, design details inspired by the Oaxacan coast, and all the modern comforts for a serene and authentic escape in La Punta, Zicatela."
    }
  };

  const currentContent = content[language];
  const currentAmenities = amenities[language];

  return (
    <section className="bg-white px-4 py-12 md:py-14">
      <div className="mx-auto max-w-[954px]">
        <div className="flex flex-col items-start lg:flex-row lg:gap-[128px]">
          {/* Left Content */}
          <div className="w-full space-y-5 lg:w-auto">
            <h2 className="font-[family-name:var(--font-courier)] text-[24px] font-bold leading-[25px] text-[#222]">
              {currentContent.title}
            </h2>
            
            <p className="text-justify w-full lg:w-[577px] lg:h-[124px]" style={{ 
              fontFamily: 'Courier Prime',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '17px',
              color: '#222222'
            }}>
              {currentContent.description}
            </p>
            
          </div>
          
           {/* Right Content - Amenities */}
           <div className="mt-8 w-full space-y-4 lg:mt-0 lg:w-auto lg:space-y-[18px]">
             {currentAmenities.map((amenity) => (
               <div key={amenity.text} className="flex items-center space-x-4">
                 <div className="flex-shrink-0">
                   <Image
                     src={amenity.icon}
                     alt={amenity.text}
                     width={22}
                     height={16}
                     className="w-[22px] h-[16px]"
                   />
                 </div>
                 <span className="font-[family-name:var(--font-courier)] text-[16px] leading-[22px]" style={{ color: '#4C86A0' }}>
                   {amenity.text}
                 </span>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
