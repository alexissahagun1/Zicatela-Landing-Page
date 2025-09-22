"use client";

import AnnouncementBar from "../components/AnnouncementBar";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import PropertyHeader from "../components/PropertyHeader";
import AmenitiesSection from "../components/AmenitiesSection";
import PropertyGallery from "../components/PropertyGallery";
import PropertyCarousel from "../components/PropertyCarousel";
import MapSection from "../components/MapSection";

export default function CasaPalmasPage() {
  const title = "Casa Palmas I and II";
  const description = "Casa Palmas offers a serene retreat that captures the essence of La Punta, Zicatela. With brutalist architecture and tropical details, this residence invites relaxation through spacious interiors, a private terrace, and an exclusive pool. Enjoy every luxury amenity in a setting designed for total privacy and a deep connection to the essentials.";
  const amenities = "Bath and pool towels / Shampoo, shower gel, conditioner, hand soap, body lotion / Fully equipped kitchen / High-speed WiFi via Starlink / Air conditioning / Pet friendly";

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <NavigationBar />
      
      {/* Casa Palmas Content */}
      <div className="relative max-w-7xl mx-auto text-center md:text-left pt-16 md:pt-0">
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
              "4 guests",
              "2 bedrooms",
              "2 double beds",
              "Private pool",
              "Terrace"
            ]}
            connectionNote=""
            buttonText="Explore available dates"
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
              "4 guests",
              "2 bedrooms",
              "2 double beds",
              "Private pool",
              "Terrace"
            ]}
            connectionNote=""
            buttonText="Explore available dates"
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
