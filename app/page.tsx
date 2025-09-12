import AnnouncementBar from "./components/AnnouncementBar";
import NavigationBar from "./components/NavigationBar";
import HeroSection from "./components/HeroSection";
import MainContent from "./components/MainContent";
import BookNowButton from "./components/BookNowButton";
import PhotoCollage from "./components/PhotoCollage";
import AccommodationSection from "./components/AccommodationSection";
import ArchitecturalGallery from "./components/ArchitecturalGallery";
import LaPuntaSection from "./components/LaPuntaSection";
import MapSection from "./components/MapSection";
import Footer from "./components/Footer";

export default function Home() {
  // Array of your Rectangle images
  const collageImages = [
    '/Rectangle.png',
    '/Rectangle-1.png',
    '/Rectangle-2.png',
    '/Rectangle-3.png',
    '/Rectangle-4.png',
    '/Rectangle-5.png',
    '/Rectangle-6.png',
    '/Rectangle-7.png',
    '/Rectangle-8.png',
    '/Rectangle-9.png',
    '/Rectangle-10.png',
    '/Rectangle-11.png',
    '/Rectangle-12.png',
  ];

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <NavigationBar />
      <HeroSection />
      <MainContent />
      
      {/* Bottom Book Now Button */}
      <div className="bg-white py-8 flex justify-center">
        <BookNowButton variant="secondary" />
      </div>

      {/* Photo Collage Section */}
      <div className="bg-white py-4">
        <PhotoCollage images={collageImages} alt="Zicatela Beach Gallery" />
      </div>
      
      {/* Accommodation Section */}
      <AccommodationSection />
      
      {/* Architectural Gallery Section */}
      <ArchitecturalGallery />
      
      {/* La Punta Section */}
      <LaPuntaSection />
      
      {/* Map Section */}
      <MapSection />
      
      {/* Footer */}
      <Footer />
      
    </div>
  );
}
