"use client";

import BookNowButton from './BookNowButton';
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
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-48 items-start">
          {/* Left Content */}
          <div className="space-y-6 w-full lg:w-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
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
            
             <div className="pt-4 flex justify-end">
               <BookNowButton variant="secondary" />
             </div>
          </div>
          
           {/* Right Content - Amenities */}
           <div className="mt-8 lg:mt-16 space-y-4 lg:space-y-6 w-full lg:w-auto">
             {currentAmenities.map((amenity, index) => (
               <div key={index} className="flex items-center space-x-4">
                 <div className="flex-shrink-0">
                   <Image
                     src={amenity.icon}
                     alt={amenity.text}
                     width={22}
                     height={16}
                     className="w-[22px] h-[16px]"
                   />
                 </div>
                 <span className="text-teal-600 text-base lg:text-lg uppercase">
                   {amenity.text}
                 </span>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
