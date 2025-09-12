import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import BookNowButton from "../components/BookNowButton";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <NavigationBar />
      
      {/* Contact Content */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Contact Us
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Location</h3>
                  <p className="text-gray-600">La Punta, Zicatela, Oaxaca, Mexico</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Email</h3>
                  <p className="text-gray-600">info@casazii.com</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Phone</h3>
                  <p className="text-gray-600">+52 (xxx) xxx-xxxx</p>
                </div>
              </div>
            </div>
            
            {/* Book Now Section */}
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Ready to Book?
              </h2>
              <BookNowButton variant="primary" />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}