import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import PhotoCollage from "../components/PhotoCollage";
import ArchitecturalGallery from "../components/ArchitecturalGallery";

export default function PrensaPage() {
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
      <NavigationBar />
      
      {/* Prensa Content */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Prensa
          </h1>
          
          <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            Discover Casa Zii through the lens of architecture and design publications. 
            Explore our press coverage and media gallery showcasing the unique brutalist design.
          </p>
          
          {/* Press Coverage Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              Press Coverage
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Architectural Digest
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  "Ludwig Godefroy's brutalist masterpiece in La Punta redefines coastal architecture..."
                </p>
                <a href="#" className="text-[#A04E39] text-sm hover:underline">
                  Read More →
                </a>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Dezeen
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  "Casa Zii combines brutalist concrete with tropical design in Oaxaca's coast..."
                </p>
                <a href="#" className="text-[#A04E39] text-sm hover:underline">
                  Read More →
                </a>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Wallpaper*
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  "A unique accommodation experience where design meets nature in Zicatela..."
                </p>
                <a href="#" className="text-[#A04E39] text-sm hover:underline">
                  Read More →
                </a>
              </div>
            </div>
          </div>
          
          {/* Photo Collage */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              Media Gallery
            </h2>
            <PhotoCollage images={collageImages} alt="Casa Zii Media Gallery" />
          </div>
          
          {/* Architectural Gallery */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              Architectural Details
            </h2>
            <ArchitecturalGallery />
          </div>
          
          {/* Press Contact */}
          <div className="text-center bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Press Inquiries
            </h2>
            <p className="text-gray-600 mb-4">
              For press inquiries, high-resolution images, or media visits, please contact us.
            </p>
            <a 
              href="mailto:press@casazii.com" 
              className="inline-block bg-[#A04E39] text-white px-6 py-3 rounded hover:opacity-90"
            >
              Contact Press Team
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
