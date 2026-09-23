import NavigationBar from "../components/NavigationBar";
import HeroSection from "../components/HeroSection";
import MainContent from "../components/MainContent";
import FigmaPropertyMosaic from "../components/FigmaPropertyMosaic";
import ExperienceSection from "../components/ExperienceSection";
import SiteClosing from "../components/SiteClosing";

// Figma eNHBCVNfWSH0nXswrrvnuS Frame 1 (2006:3).
export default function Homepage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--page-bg)]">
      <NavigationBar />
      <HeroSection />
      <MainContent />
      <FigmaPropertyMosaic />
      <ExperienceSection />
      {/* Footer group starts 231px under the La Punta photos. */}
      <div className="pt-20 md:pt-[calc(var(--f)*231)]">
        <SiteClosing />
      </div>
    </div>
  );
}
