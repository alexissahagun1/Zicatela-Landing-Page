"use client";

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import PropertyHeader from "../components/PropertyHeader";
import AmenitiesSection from "../components/AmenitiesSection";
import PropertyGallery from "../components/PropertyGallery";
import PropertyCarousel from "../components/PropertyCarousel";
import MapSection from "../components/MapSection";
import { campecheI, campecheII } from "@/lib/gallery-photos";
import { useLanguage } from '../contexts/LanguageContext';

export default function CasaCampechePage() {
  const { language } = useLanguage();

  const content = {
    es: {
      title: "Casa Campeche I y II",
      description: "Casa Campeche es una residencia dúplex elegante con un diseño simétrico y funcional. Puedes rentar toda la casa o cada unidad independientemente, ya que ambas son completamente autónomas. Los dos espacios se conectan a través de un área compartida que cuenta con una alberca privada — perfecta para disfrutar del sol y el exuberante entorno tropical. Ideal para grupos o parejas que viajan juntos.",
      amenities: "Toallas de baño y alberca / Shampoo, gel de baño, acondicionador, jabón de manos, loción corporal / Cocina completamente equipada / WiFi de alta velocidad vía Starlink / Aire acondicionado / Mascotas bienvenidas",
      features: {
        guests: "4 huéspedes",
        bedrooms: "2 habitaciones",
        beds: "2 camas matrimoniales",
        pool: "Alberca privada",
        terrace: "Terraza",
        kitchen: "Cocina equipada"
      },
    },
    en: {
      title: "Casa Campeche I and II",
      description: "Casa Campeche is a stylish duplex residence with a symmetrical and functional design. You can rent the entire house or each unit independently, as both are fully self-contained. The two spaces connect through a shared area featuring a private pool — perfect for soaking up the sun and the lush tropical surroundings. Ideal for groups or couples traveling together.",
      amenities: "Bath and pool towels / Shampoo, shower gel, conditioner, hand soap, body lotion / Fully equipped kitchen / High-speed WiFi via Starlink / Air conditioning / Pet friendly",
      features: {
        guests: "4 guests",
        bedrooms: "2 bedrooms",
        beds: "2 double beds",
        pool: "Private pool",
        terrace: "Terrace",
        kitchen: "Equipped kitchen"
      },
    }
  };

  const currentContent = content[language];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-white">
      <NavigationBar />
      
      {/* Casa Campeche Content */}
      <div className="relative z-10 mx-auto max-w-7xl text-center md:text-left pt-16 md:pt-[74px]">
        {/* Property Gallery */}
        <PropertyGallery
          exteriorImage="/figma/casa-campeche/hero.jpg"
          interiorImage="/figma/casa-campeche/campeche-i.png"
          exteriorAlt="Casa Campeche Exterior"
          interiorAlt="Casa Campeche Interior"
          objectPosition="center 90%"
        />
        
        {/* Property Header */}
        <PropertyHeader
          title={currentContent.title}
          description={currentContent.description}
        />
        
        {/* Amenities Section */}
        <AmenitiesSection amenities={currentContent.amenities} />
        
        {/* Static property carousels: all Figma gallery photographs stay in-flow. */}
        <div className="space-y-20 px-4 py-6 md:space-y-[11.5vw] md:py-[6vw]">
          {/* Casa Campeche I */}
          <PropertyCarousel
            sectionId="campeche-i"
            title="Campeche I"
            images={campecheI}
            features={[
              currentContent.features.guests,
              currentContent.features.bedrooms,
              currentContent.features.beds,
              currentContent.features.pool,
              currentContent.features.terrace,
              currentContent.features.kitchen,
            ]}
            layout="image-left"
          />
          
          {/* Casa Campeche II */}
          <PropertyCarousel
            sectionId="campeche-ii"
            title="Campeche II"
            images={campecheII}
            features={[
              currentContent.features.guests,
              currentContent.features.bedrooms,
              currentContent.features.beds,
              currentContent.features.pool,
              currentContent.features.terrace,
              currentContent.features.kitchen,
            ]}
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
