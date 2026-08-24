import NavigationBar from "../components/NavigationBar";
import HeroSection from "../components/HeroSection";
import MainContent from "../components/MainContent";
import BookNowButton from "../components/BookNowButton";
import InstagramGallery from "../components/InstagramGallery";
import AccommodationSection from "../components/AccommodationSection";
import ArchitecturalGallery from "../components/ArchitecturalGallery";
import LaPuntaSection from "../components/LaPuntaSection";
import MapSection from "../components/MapSection";
import Footer from "../components/Footer";

export default function Homepage() {
  return (
    <div className="min-h-screen">
      <NavigationBar />
      <HeroSection />
      <MainContent />

      <div className="flex justify-center bg-white py-8">
        <BookNowButton variant="secondary" />
      </div>

      <InstagramGallery />

      <AccommodationSection />

      <ArchitecturalGallery />

      <LaPuntaSection />

      <MapSection />

      <Footer />
    </div>
  );
}
