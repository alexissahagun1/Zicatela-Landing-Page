"use client";

import AnnouncementBar from "../components/AnnouncementBar";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import PropertyHeader from "../components/PropertyHeader";
import AmenitiesSection from "../components/AmenitiesSection";
import PropertyGallery from "../components/PropertyGallery";
import PropertyCarousel from "../components/PropertyCarousel";
import MapSection from "../components/MapSection";

export default function CasaCampechePage() {
  const title = "Casa Campeche I and II";
  const description = "Casa Campeche is a stylish duplex residence with a symmetrical and functional design. You can rent the entire house or each unit independently, as both are fully self-contained. The two spaces connect through a shared area featuring a private pool — perfect for soaking up the sun and the lush tropical surroundings. Ideal for groups or couples traveling together.";
  const amenities = "Bath and pool towels / Shampoo, shower gel, conditioner, hand soap, body lotion / Fully equipped kitchen / High-speed WiFi via Starlink / Air conditioning / Pet friendly";

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <NavigationBar />
      
      {/* Casa Campeche Content */}
      <div className="relative max-w-7xl mx-auto text-center md:text-left pt-16 md:pt-0">
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
              "4 guests",
              "2 bedrooms",
              "2 double beds",
              "Private pool",
              "Terrace"
            ]}
            connectionNote="*Option to connect to Campeche II through the pool area."
            buttonText="Explore available dates"
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
              "4 guests",
              "2 bedrooms",
              "2 double beds",
              "Private pool",
              "Terrace"
            ]}
            connectionNote="*Option to connect to Campeche I through the pool area."
            buttonText="Explore available dates"
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
