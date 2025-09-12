import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import PropertyHeader from "./PropertyHeader";
import AmenitiesSection from "./AmenitiesSection";
import PropertyGallery from "./PropertyGallery";
import BookNowSection from "./BookNowSection";

interface PropertyPageLayoutProps {
  title: string;
  description: string;
  amenities: string;
  exteriorImage: string;
  interiorImage: string;
  exteriorAlt: string;
  interiorAlt: string;
  bookNowTitle: string;
}

export default function PropertyPageLayout({
  title,
  description,
  amenities,
  exteriorImage,
  interiorImage,
  exteriorAlt,
  interiorAlt,
  bookNowTitle
}: PropertyPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      
      {/* Property Content */}
      <div className="relative">
        {/* Property Gallery */}
        <PropertyGallery
          exteriorImage={exteriorImage}
          interiorImage={interiorImage}
          exteriorAlt={exteriorAlt}
          interiorAlt={interiorAlt}
        />
        
        {/* Property Header */}
        <PropertyHeader
          title={title}
          description={description}
        />
        
        {/* Amenities Section */}
        <AmenitiesSection amenities={amenities} />
        
        {/* Book Now Section */}
        <BookNowSection title={bookNowTitle} />
      </div>
      
      <Footer />
    </div>
  );
}
