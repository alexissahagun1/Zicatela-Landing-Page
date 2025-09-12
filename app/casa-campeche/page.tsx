"use client";

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import PropertyHeader from "../components/PropertyHeader";
import AmenitiesSection from "../components/AmenitiesSection";
import PropertyGallery from "../components/PropertyGallery";
import PropertyCarousel from "../components/PropertyCarousel";
import MapSection from "../components/MapSection";

export default function CasaCampechePage() {
  const title = "Casa Campeche I y II";
  const description = "Casa Campeche es una residencia tipo dúplex con diseño simétrico y funcional. Se puede rentar la casa completa o cada unidad por separado, ya que ambas son totalmente independientes. Se conectan a través de un área común, con alberca privada, perfecta para disfrutar del sol y el entorno tropical. Ideal para grupos o parejas que viajan juntas.";
  const amenities = "Toallas de baño y de alberca / Shampoo, gel de ducha, acondicionador, jabón de manos, loción corporal / Cocina equipada / WiFi de alta velocidad vía Starlink / Aire acondicionado / Pet Friendly";

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      
      {/* Casa Campeche Content */}
      <div className="relative">
        {/* Property Gallery */}
        <PropertyGallery
          exteriorImage="/CasaCampecheI.png"
          interiorImage="/CasaCampecheII.png"
          exteriorAlt="Casa Campeche Exterior"
          interiorAlt="Casa Campeche Interior"
        />
        
        {/* Property Header */}
        <PropertyHeader
          title={title}
          description={description}
        />
        
        {/* Amenities Section */}
        <AmenitiesSection amenities={amenities} />
        
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
              "4 huéspedes",
              "2 habitaciones",
              "2 camas matrimoniales",
              "Alberca privada",
              "Terraza"
            ]}
            connectionNote="*Opción a conectarse con Campeche II por el área de la alberca"
            buttonText="Explorar fechas disponibles"
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
              "4 huéspedes",
              "2 habitaciones",
              "2 camas matrimoniales",
              "Alberca privada",
              "Terraza"
            ]}
            connectionNote="*Opción a conectarse con Campeche I por el área de la alberca"
            buttonText="Explorar fechas disponibles"
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
