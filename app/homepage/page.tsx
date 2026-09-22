import NavigationBar from "../components/NavigationBar";
import HeroSection from "../components/HeroSection";
import MainContent from "../components/MainContent";
import FigmaPropertyMosaic from "../components/FigmaPropertyMosaic";
import ExperienceSection from "../components/ExperienceSection";
import MapSection from "../components/MapSection";
import NewsletterForm from "../components/NewsletterForm";
import Footer from "../components/Footer";

export default function Homepage() {
  return (
    <div className="min-h-screen">
      <NavigationBar />
      <HeroSection />
      <div className="pt-[32px] lg:pt-[72px]">
        <MainContent />
      </div>

      <FigmaPropertyMosaic />

      <ExperienceSection />

      <MapSection />

      <div className="pb-[60px] lg:pb-[120px]">
        <NewsletterForm />
      </div>

      <Footer />
    </div>
  );
}
