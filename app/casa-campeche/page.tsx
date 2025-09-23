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
        terrace: "Terraza"
      },
      connectionNote: "*Opción de conectarse con Campeche II por el área de la alberca.",
      buttonText: "Explorar fechas disponibles"
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
        terrace: "Terrace"
      },
      connectionNote: "*Option to connect to Campeche II through the pool area.",
      buttonText: "Explore available dates"
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <NavigationBar />
      
      {/* Casa Campeche Content */}
      <div className="relative max-w-7xl mx-auto text-center md:text-left pt-26 md:pt-32">
        {/* Property Gallery */}
        <PropertyGallery
          exteriorImage="/CasaCampecheI.png"
          interiorImage="/CasaCampecheII.png"
          exteriorAlt="Casa Campeche Exterior"
          interiorAlt="Casa Campeche Interior"
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
          {/* Casa Campeche I */}
          <PropertyCarousel
            title="CAMPECHE I"
            images={[
              "/CasaCampecheI.png",
              "/CasaCampecheII.png"
            ]}
            imageAlts={[
              "Casa Campeche I Interior",
              "Casa Campeche I Exterior"
            ]}
            features={[
              currentContent.features.guests,
              currentContent.features.bedrooms,
              currentContent.features.beds,
              currentContent.features.pool,
              currentContent.features.terrace
            ]}
            connectionNote={currentContent.connectionNote}
            buttonText={currentContent.buttonText}
            layout="image-left"
            onButtonClick={() => {
              // Handle button click - could navigate to booking page
              console.log("Navigate to booking for Campeche I");
            }}
          />
          
          {/* Casa Campeche II */}
          <PropertyCarousel
            title="CAMPECHE II"
            images={[
              "/CasaCampecheII.png",
              "/CasaCampecheI.png"
            ]}
            imageAlts={[
              "Casa Campeche II Exterior",
              "Casa Campeche II Interior"
            ]}
            features={[
              currentContent.features.guests,
              currentContent.features.bedrooms,
              currentContent.features.beds,
              currentContent.features.pool,
              currentContent.features.terrace
            ]}
            connectionNote={currentContent.connectionNote}
            buttonText={currentContent.buttonText}
            layout="image-right"
            onButtonClick={() => {
              // Handle button click - could navigate to booking page
              console.log("Navigate to booking for Campeche II");
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
