"use client";

import AnnouncementBar from "../components/AnnouncementBar";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import PhotoCollage from "../components/PhotoCollage";
import ArchitecturalGallery from "../components/ArchitecturalGallery";
import { useLanguage } from '../contexts/LanguageContext';

export default function PrensaPage() {
  const { language } = useLanguage();
  
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

  const content = {
    es: {
      title: "Prensa",
      subtitle: "Descubre Casa Zii a través de la lente de publicaciones de arquitectura y diseño. Explora nuestra cobertura de prensa y galería de medios que muestra el diseño brutalista único.",
      pressCoverage: "Cobertura de Prensa",
      mediaGallery: "Galería de Medios",
      architecturalDetails: "Detalles Arquitectónicos",
      pressInquiries: "Consultas de Prensa",
      pressInquiriesText: "Para consultas de prensa, imágenes de alta resolución o visitas de medios, por favor contáctanos.",
      contactPressTeam: "Contactar Equipo de Prensa",
      readMore: "Leer más",
      // Policies content
      policies: {
        entryExit: "Políticas de entrada y salida",
        propertyCancellation: "Políticas de propiedad y cancelación",
        termsConditions: "Términos y Condiciones",
        checkIn: "Check-in: 3:00 PM",
        checkOut: "Check-out: 12:00 PM",
        lateCheckout: "Late Checkout: 7:00 PM",
        lateCheckoutFee: "Late Checkout tarifa: 50%",
        immediatePayment: "Pago inmediato y no reembolsable",
        guaranteePolicy: "Política de garantía: Se abonará el importe total de la estancia al realizar la reserva.",
        cancellationPolicy: "Política de cancelación: Esta reserva no es cancelable ni reembolsable.",
        cancellationFee: "Se aplicará el importe total de la estancia en caso de cancelación o no presentación.",
        laterPayment: "Política de pago posterior",
        laterGuaranteePolicy: "Política de garantía: Se abonará el importe total de la estancia 7 días antes de la llegada.",
        laterCancellationPolicy: "Política de cancelación: Cancelación gratuita disponible hasta las 17:00 h (hora local), 8 días antes de la llegada.",
        laterCancellationFee: "Las cancelaciones realizadas dentro de los 7 días previos a la llegada tendrán un cargo equivalente a una noche.",
        termsText: "REGLAMENTO INTERNO DEL HOTEL. ARTÍCULO 1. RÉGIMEN JURÍDICO. Los servicios se rigen por el derecho mercantil, civil, la Ley General de Turismo, sus reglamentos, NOM-010-TUR-2001, la Ley de Establecimientos Mercantiles de la Ciudad de México, y ordenanzas similares en los estados de la República Mexicana. Estas disposiciones se consideran obligatorias, conocidas y aceptadas por el huésped, junto con los usos y prácticas comunes. ARTÍCULO 2. REGISTRO E IDENTIFICACIÓN DEL HUÉSPED. Los huéspedes deberán identificarse y registrarse, llenando personalmente la tarjeta de registro y firmando el aviso de privacidad. Los huéspedes en grupo podrán designar un representante. El hotel podrá negar el alojamiento a huéspedes que no cumplan con este requisito y podrá solicitar la identificación del solicitante y acompañantes. ARTÍCULO 3. PERIODO DE ALOJAMIENTO. Los huéspedes especificarán el número de días de estancia en la tarjeta de registro. El acceso a la habitación es a partir de las 15:00 horas (check-in), y la estancia termina a las 12:00 horas (check-out) del día siguiente, con un período de gracia de 60 minutos para desalojar."
      }
    },
    en: {
      title: "Press",
      subtitle: "Discover Casa Zii through the lens of architecture and design publications. Explore our press coverage and media gallery showcasing the unique brutalist design.",
      pressCoverage: "Press Coverage",
      mediaGallery: "Media Gallery",
      architecturalDetails: "Architectural Details",
      pressInquiries: "Press Inquiries",
      pressInquiriesText: "For press inquiries, high-resolution images, or media visits, please contact us.",
      contactPressTeam: "Contact Press Team",
      readMore: "Read more",
      // Policies content
      policies: {
        entryExit: "Entry and Exit Policies",
        propertyCancellation: "Property and Cancellation Policies",
        termsConditions: "Terms and Conditions",
        checkIn: "Check-in: 3:00 PM",
        checkOut: "Check-out: 12:00 PM",
        lateCheckout: "Late Checkout: 7:00 PM",
        lateCheckoutFee: "Late Checkout fee: 50%",
        immediatePayment: "Immediate and Non-refundable Payment",
        guaranteePolicy: "Guarantee policy: The total amount of the stay will be paid when making the reservation.",
        cancellationPolicy: "Cancellation policy: This reservation is neither cancellable nor refundable.",
        cancellationFee: "The total amount of the stay will be applied in case of cancellation or no-show.",
        laterPayment: "Later Payment Policy",
        laterGuaranteePolicy: "Guarantee policy: The total amount of the stay will be paid 7 days before arrival.",
        laterCancellationPolicy: "Cancellation policy: Free cancellation available until 5:00 PM (local time), 8 days before arrival.",
        laterCancellationFee: "Cancellations made within 7 days prior to arrival will incur a charge equivalent to one night.",
        termsText: "INTERNAL HOTEL REGULATION. ARTICLE 1. LEGAL REGIME. The services are governed by commercial law, civil law, the General Tourism Law, its regulations, NOM-010-TUR-2001, the Law of Commercial Establishments of Mexico City, and similar ordinances in the Mexican Republic states. These provisions are considered mandatory, known, and accepted by the guest, along with common uses and practices. ARTICLE 2. GUEST REGISTRATION AND IDENTIFICATION. Guests must identify and register, personally filling out the registration card and signing the privacy notice. Group guests can designate a representative. The hotel may deny accommodation to guests who do not meet this requirement and may request identification of the applicant and companions. ARTICLE 3. PERIOD OF STAY. Guests will specify the number of days of stay on the registration card. Room access is from 3:00 PM (check-in), and the stay ends at 12:00 PM (check-out) the following day, with a 60-minute grace period for vacating."
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <NavigationBar />
      
      {/* Prensa Content */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            {currentContent.title}
          </h1>
          
          <p className="text-lg text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            {currentContent.subtitle}
          </p>
          
          {/* Press Coverage Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              {currentContent.pressCoverage}
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
                  {currentContent.readMore} →
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
                  {currentContent.readMore} →
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
                  {currentContent.readMore} →
                </a>
              </div>
            </div>
          </div>
          
          {/* Photo Collage */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              {currentContent.mediaGallery}
            </h2>
            <PhotoCollage images={collageImages} alt="Casa Zii Media Gallery" />
          </div>
          
          {/* Architectural Gallery */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              {currentContent.architecturalDetails}
            </h2>
            <ArchitecturalGallery />
          </div>
          
          {/* Press Contact */}
          <div className="text-center bg-gray-50 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {currentContent.pressInquiries}
            </h2>
            <p className="text-gray-600 mb-4">
              {currentContent.pressInquiriesText}
            </p>
            <a 
              href="mailto:press@casazii.com" 
              className="inline-block bg-[#A04E39] text-white px-6 py-3 rounded hover:opacity-90"
            >
              {currentContent.contactPressTeam}
            </a>
          </div>

          {/* Policies and Terms Section */}
          <div className="bg-white border-t border-gray-200 pt-16">
            <div className="max-w-4xl mx-auto">
              {/* Entry and Exit Policies */}
              <div className="mb-12">
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {currentContent.policies.entryExit}
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p>{currentContent.policies.checkIn}</p>
                    <p>{currentContent.policies.checkOut}</p>
                    <p>{currentContent.policies.lateCheckout}</p>
                    <p>{currentContent.policies.lateCheckoutFee}</p>
                  </div>
                </div>
              </div>

              {/* Property and Cancellation Policies */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {currentContent.policies.propertyCancellation}
                </h3>
                
                <div className="space-y-8">
                  {/* Immediate Payment */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      {currentContent.policies.immediatePayment}
                    </h4>
                    <div className="space-y-3 text-gray-700">
                      <p>{currentContent.policies.guaranteePolicy}</p>
                      <p>{currentContent.policies.cancellationPolicy}</p>
                      <p>{currentContent.policies.cancellationFee}</p>
                    </div>
                  </div>

                  {/* Later Payment */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      {currentContent.policies.laterPayment}
                    </h4>
                    <div className="space-y-3 text-gray-700">
                      <p>{currentContent.policies.laterGuaranteePolicy}</p>
                      <p>{currentContent.policies.laterCancellationPolicy}</p>
                      <p>{currentContent.policies.laterCancellationFee}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {currentContent.policies.termsConditions}
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {currentContent.policies.termsText}
                  </p>
                </div>
              </div>

              {/* Read More Button */}
              <div className="text-center">
                <button className="inline-flex items-center gap-2 bg-[#A04E39] text-white px-6 py-3 rounded hover:opacity-90 transition-opacity">
                  {currentContent.readMore}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
