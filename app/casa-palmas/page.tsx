"use client";

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import PropertyHeader from "../components/PropertyHeader";
import AmenitiesSection from "../components/AmenitiesSection";
import PropertyGallery from "../components/PropertyGallery";
import PropertyCarousel from "../components/PropertyCarousel";
import MapSection from "../components/MapSection";
import { useLanguage } from '../contexts/LanguageContext';

export default function CasaPalmasPage() {
  const { language } = useLanguage();

  const content = {
    es: {
      title: "Casa Palmas I y II",
      description: "Casa Palmas ofrece un retiro sereno que captura la esencia de La Punta, Zicatela. Con arquitectura brutalista y detalles tropicales, esta residencia invita a la relajación a través de interiores espaciosos, una terraza privada y una alberca exclusiva. Disfruta de todas las comodidades de lujo en un entorno diseñado para la privacidad total y una conexión profunda con lo esencial.",
      amenities: "Toallas de baño y alberca / Shampoo, gel de baño, acondicionador, jabón de manos, loción corporal / Cocina completamente equipada / WiFi de alta velocidad vía Starlink / Aire acondicionado / Mascotas bienvenidas",
      features: {
        guests: "4 huéspedes",
        bedrooms: "2 habitaciones",
        beds: "2 camas matrimoniales",
        pool: "Alberca privada",
        terrace: "Terraza"
      },
    },
    en: {
      title: "Casa Palmas I and II",
      description: "Casa Palmas offers a serene retreat that captures the essence of La Punta, Zicatela. With brutalist architecture and tropical details, this residence invites relaxation through spacious interiors, a private terrace, and an exclusive pool. Enjoy every luxury amenity in a setting designed for total privacy and a deep connection to the essentials.",
      amenities: "Bath and pool towels / Shampoo, shower gel, conditioner, hand soap, body lotion / Fully equipped kitchen / High-speed WiFi via Starlink / Air conditioning / Pet friendly",
      features: {
        guests: "4 guests",
        bedrooms: "2 bedrooms",
        beds: "2 double beds",
        pool: "Private pool",
        terrace: "Terrace"
      },
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      
      {/* Casa Palmas Content */}
      <div className="relative max-w-7xl mx-auto text-center md:text-left pt-16 md:pt-[74px]">
        {/* Property Gallery */}
        <PropertyGallery
          exteriorImage="/figma/casa-palmas/hero.jpg"
          interiorImage="/figma/casa-palmas/palmas-i-01.jpg"
          exteriorAlt="Casa Palmas Exterior"
          interiorAlt="Casa Palmas Interior"
        />
        
        {/* Property Header */}
        <PropertyHeader
          title={currentContent.title}
          description={currentContent.description}
        />
        
        {/* Amenities Section */}
        <AmenitiesSection amenities={currentContent.amenities} />
        
        {/* Property Carousels */}
        <div className="py-6 px-4 space-y-20">
          {/* Casa Palmas I */}
          <PropertyCarousel
            title="PALMAS I"
            images={[
              "/figma/casa-palmas/palmas-i-01.jpg",
              "/figma/casa-palmas/palmas-i-02.jpg",
              "/figma/casa-palmas/palmas-i-03.jpg",
              "/figma/casa-palmas/palmas-i-04.jpg",
              "/figma/casa-palmas/palmas-i-05.jpg",
              "/figma/casa-palmas/palmas-i-06.jpg",
              "/figma/casa-palmas/palmas-i-07.jpg",
              "/figma/casa-palmas/palmas-i-08.jpg",
              "/figma/casa-palmas/palmas-i-09.jpg"
            ]}
            imageAlts={[
              "Habitación de Casa Palmas I",
              "Habitación de Casa Palmas I",
              "Espejo y regadera de Casa Palmas I",
              "Sala con ventana circular de Casa Palmas I",
              "Cocina de Casa Palmas I",
              "Terraza junto a la alberca de Casa Palmas I",
              "Alberca privada de Casa Palmas I",
              "Comedor y cocina de Casa Palmas I",
              "Regadera exterior de Casa Palmas I"
            ]}
            features={[
              currentContent.features.guests,
              currentContent.features.bedrooms,
              currentContent.features.beds,
              currentContent.features.pool,
              currentContent.features.terrace
            ]}
            connectionNote=""
            layout="image-left"
          />
          
          {/* Casa Palmas II */}
          <PropertyCarousel
            title="PALMAS II"
            images={[
              "/figma/casa-palmas/palmas-ii-01.jpg",
              "/figma/casa-palmas/palmas-ii-02.jpg",
              "/figma/casa-palmas/palmas-ii-03.jpg",
              "/figma/casa-palmas/palmas-ii-04.jpg",
              "/figma/casa-palmas/palmas-ii-05.jpg",
              "/figma/casa-palmas/palmas-ii-06.jpg",
              "/figma/casa-palmas/palmas-ii-07.jpg",
              "/figma/casa-palmas/palmas-ii-08.jpg",
              "/figma/casa-palmas/palmas-ii-09.jpg"
            ]}
            imageAlts={[
              "Habitación de Casa Palmas II",
              "Habitación de Casa Palmas II",
              "Regadera exterior de Casa Palmas II",
              "Baño de Casa Palmas II",
              "Sala con ventana circular de Casa Palmas II",
              "Sala comedor y cocina de Casa Palmas II",
              "Sala con arte de Casa Palmas II",
              "Comedor de Casa Palmas II",
              "Alberca privada de Casa Palmas II"
            ]}
            features={[
              currentContent.features.guests,
              currentContent.features.bedrooms,
              currentContent.features.beds,
              currentContent.features.pool,
              currentContent.features.terrace
            ]}
            connectionNote=""
            layout="image-right"
          />
        </div>
        
        {/* Map Section */}
        <MapSection />
      </div>
      
      <Footer />
    </div>
  );
}
