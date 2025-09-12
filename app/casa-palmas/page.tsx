"use client";

import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import PropertyHeader from "../components/PropertyHeader";
import AmenitiesSection from "../components/AmenitiesSection";
import PropertyGallery from "../components/PropertyGallery";
import PropertyCarousel from "../components/PropertyCarousel";
import MapSection from "../components/MapSection";

export default function CasaPalmasPage() {
  const title = "Casa Palmas I y II";
  const description = "Casa Palmas es una residencia tipo dúplex con diseño simétrico y funcional. Se puede rentar la casa completa o cada unidad por separado, ya que ambas son totalmente independientes. Se conectan a través de un área común, con alberca privada, perfecta para disfrutar del sol y el entorno tropical. Ideal para grupos o parejas que viajan juntas.";
  const amenities = "Toallas de baño y de alberca / Shampoo, gel de ducha, acondicionador, jabón de manos, loción corporal / Cocina equipada / WiFi de alta velocidad vía Starlink / Aire acondicionado / Pet Friendly";

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      
      {/* Casa Palmas Content */}
      <div className="relative">
        {/* Property Gallery */}
        <PropertyGallery
          exteriorImage="/CasaPalmasI.png"
          interiorImage="/CasaPalmasII.png"
          exteriorAlt="Casa Palmas Exterior"
          interiorAlt="Casa Palmas Interior"
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
              "4 huéspedes",
              "2 habitaciones",
              "2 camas matrimoniales",
              "Alberca privada",
              "Terraza"
            ]}
            connectionNote=""
            buttonText="Explorar fechas disponibles"
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
              "4 huéspedes",
              "2 habitaciones",
              "2 camas matrimoniales",
              "Alberca privada",
              "Terraza"
            ]}
            connectionNote=""
            buttonText="Explorar fechas disponibles"
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
