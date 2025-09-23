"use client";

import AnnouncementBar from "../components/AnnouncementBar";
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
      buttonText: "Explorar fechas disponibles"
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
      buttonText: "Explore available dates"
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <NavigationBar />
      
      {/* Casa Palmas Content */}
      <div className="relative max-w-7xl mx-auto text-center md:text-left pt-26 md:pt-32">
        {/* Property Gallery */}
        <PropertyGallery
          exteriorImage="/CasaPalmasI.png"
          interiorImage="/CasaPalmasII.png"
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
              "/CasaPalmasI.png",
              "/CasaPalmasII.png"
            ]}
            imageAlts={[
              "Casa Palmas I Interior",
              "Casa Palmas I Exterior"
            ]}
            features={[
              currentContent.features.guests,
              currentContent.features.bedrooms,
              currentContent.features.beds,
              currentContent.features.pool,
              currentContent.features.terrace
            ]}
            connectionNote=""
            buttonText={currentContent.buttonText}
            layout="image-left"
            onButtonClick={() => {
              // Handle button click - could navigate to booking page
              console.log("Navigate to booking for Palmas I");
            }}
          />
          
          {/* Casa Palmas II */}
          <PropertyCarousel
            title="PALMAS II"
            images={[
              "/CasaPalmasII.png",
              "/CasaPalmasI.png"
            ]}
            imageAlts={[
              "Casa Palmas II Exterior",
              "Casa Palmas II Interior"
            ]}
            features={[
              currentContent.features.guests,
              currentContent.features.bedrooms,
              currentContent.features.beds,
              currentContent.features.pool,
              currentContent.features.terrace
            ]}
            connectionNote=""
            buttonText={currentContent.buttonText}
            layout="image-right"
            onButtonClick={() => {
              // Handle button click - could navigate to booking page
              console.log("Navigate to booking for Palmas II");
            }}
          />
        </div>
        
        {/* Map Section */}
        <MapSection />
      </div>
      
      <Footer />
    </div>
  );
}
