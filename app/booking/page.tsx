"use client";

import { useState } from "react";
import AnnouncementBar from "../components/AnnouncementBar";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { CalendarIcon, SearchIcon } from "lucide-react";
import MapSection from "../components/MapSection";

export default function BookingPage() {
  const { language } = useLanguage();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();

  const content = {
    es: {
      selectStayDays: "SELECCIONAR DÍAS DE ESTANCIA",
      checkIn: "Check-in",
      checkOut: "Check-out",
      search: "Buscar",
      contact: "Contacto",
      casaCampeche: "CASA CAMPECHE",
      casaPalmas: "CASA PALMAS",
      entryExitPolicies: "Políticas de entrada y salida",
      propertyCancellationPolicies: "Políticas de propiedad y cancelación",
      termsConditions: "Términos y Condiciones",
      readMore: "Leer más",
      policies: {
        title: "Políticas de Reserva",
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
        laterCancellationFee: "Las cancelaciones realizadas dentro de los 7 días previos a la llegada tendrán un cargo equivalente a una noche."
      },
      terms: {
        article1: "ARTÍCULO 1. RÉGIMEN JURÍDICO.",
        article1Text: "Los servicios que presta el hotel se rigen por las disposiciones legales aplicables en materia comercial, civil, turística y mercantil, así como por las ordenanzas municipales y reglamentos internos del establecimiento. Las presentes disposiciones son de carácter obligatorio y se entienden aceptadas por el huésped desde el momento de su ingreso al hotel.",
        article2: "ARTÍCULO 2. REGISTRO E IDENTIFICACIÓN DEL HUÉSPED.",
        article2Text: "El huésped se obliga a identificarse y registrarse en el hotel, llenando la tarjeta de registro correspondiente y firmando el aviso de privacidad. En caso de grupos, el responsable del mismo deberá proporcionar la lista de huéspedes. El hotel se reserva el derecho de negar el alojamiento cuando no se cumplan los requisitos establecidos.",
        article3: "ARTÍCULO 3. PERIODO DE ALOJAMIENTO.",
        article3Text: "El huésped indicará el número de días de estancia. El acceso a las habitaciones es a partir de las 15:00 horas (check-in), y la estancia termina a las 12:00 horas (check-out) del día siguiente, con un período de gracia de 60 minutos para desalojar."
      }
    },
    en: {
      selectStayDays: "SELECT STAY DAYS",
      checkIn: "Check-in",
      checkOut: "Check-out",
      search: "Search",
      contact: "Contact",
      casaCampeche: "CASA CAMPECHE",
      casaPalmas: "CASA PALMAS",
      entryExitPolicies: "Entry and Exit Policies",
      propertyCancellationPolicies: "Property and Cancellation Policies",
      termsConditions: "Terms and Conditions",
      readMore: "Read more",
      policies: {
        title: "Booking Policies",
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
        laterCancellationFee: "Cancellations made within 7 days prior to arrival will incur a charge equivalent to one night."
      },
      terms: {
        article1: "ARTICLE 1. LEGAL REGIME.",
        article1Text: "The services provided by the hotel are governed by applicable legal provisions in commercial, civil, tourism and commercial matters, as well as by municipal ordinances and internal regulations of the establishment. These provisions are mandatory and are understood to be accepted by the guest from the moment of their entry to the hotel.",
        article2: "ARTICLE 2. GUEST REGISTRATION AND IDENTIFICATION.",
        article2Text: "The guest is obliged to identify and register at the hotel, filling out the corresponding registration card and signing the privacy notice. In case of groups, the person responsible must provide the list of guests. The hotel reserves the right to deny accommodation when the established requirements are not met.",
        article3: "ARTICLE 3. PERIOD OF STAY.",
        article3Text: "The guest will indicate the number of days of stay. Access to rooms is from 3:00 PM (check-in), and the stay ends at 12:00 PM (check-out) the following day, with a 60-minute grace period for vacating."
      }
    }
  };

  const currentContent = content[language];

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(undefined);
    } else if (checkInDate && !checkOutDate) {
      if (date > checkInDate) {
        setCheckOutDate(date);
      } else {
        setCheckInDate(date);
        setCheckOutDate(undefined);
      }
    }
  };

  const handleSearch = () => {
    if (checkInDate && checkOutDate) {
      // Handle search logic here
      console.log("Searching for:", { checkInDate, checkOutDate });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <NavigationBar />
      
      {/* Hero Section with Background */}
      <div 
        className="relative w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
        style={{
          backgroundImage: "url('/BackgroundBookNow.png')",
          height: "75vh"
        }}
      >
        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto">

          {/* Airbnb-style Booking Form */}
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mx-auto"
            style={{
              width: "550px",
              height: "330px"
            }}
          >
            <h2 className="text-center text-2xl font-regular text-gray-800 mb-8 font-['Courier_Prime'] uppercase">
              {currentContent.selectStayDays}
            </h2>
            
            {/* Single Date Selection Field */}
            <div className="mb-8">
              <div className="bg-white p-6 flex items-center justify-center gap-8" style={{ borderRadius: '50px' }}>
                {/* Check-in Section */}
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => (document.getElementById('checkin-input') as HTMLInputElement)?.showPicker()}>
                  <CalendarIcon className="h-6 w-6 text-black" />
                  <span className="font-['Courier_Prime'] text-black text-lg">
                    {checkInDate ? checkInDate.toLocaleDateString() : currentContent.checkIn}
                  </span>
                  <input
                    id="checkin-input"
                    type="date"
                    value={checkInDate ? checkInDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => setCheckInDate(e.target.value ? new Date(e.target.value) : undefined)}
                    min={new Date().toISOString().split('T')[0]}
                    className="absolute opacity-0 pointer-events-none"
                  />
                </div>

                {/* Arrow Separator */}
                <div className="text-black text-5xl ">
                  →
                </div>

                {/* Check-out Section */}
                <div className="flex items-center space-x-3 cursor-pointer" onClick={() => (document.getElementById('checkout-input') as HTMLInputElement)?.showPicker()}>
                  <span className="font-['Courier_Prime'] text-black text-lg">
                    {checkOutDate ? checkOutDate.toLocaleDateString() : currentContent.checkOut}
                  </span>
                  <input
                    id="checkout-input"
                    type="date"
                    value={checkOutDate ? checkOutDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => setCheckOutDate(e.target.value ? new Date(e.target.value) : undefined)}
                    min={checkInDate ? checkInDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                    className="absolute opacity-0 pointer-events-none"
                  />
                </div>
              </div>
            </div>


            {/* Search Button */}
            <div className="mt-8">
              <Button
                onClick={handleSearch}
                disabled={!checkInDate || !checkOutDate}
                className="w-full text-white py-8  text-2xl  rounded-3xl font-['Courier_Prime']  cursor-pointer"
                style={{
                  backgroundColor: "#98989A",
                  opacity: 1
                }}
              >
                {currentContent.search}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact and Map Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 font-['Courier_Prime']">
                {currentContent.contact}
              </h2>
              
              <div className="space-y-6">
                {/* Casa Campeche */}
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2 font-['Courier_Prime']">
                    {currentContent.casaCampeche}
                  </h3>
                  <p className="text-gray-700 font-['Courier_Prime']">
                    Calle Campeche, sin Número<br />
                    La Punta, Zicatela<br />
                    Oaxaca MX 70900
                  </p>
                </div>

                {/* Casa Palmas */}
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2 font-['Courier_Prime']">
                    {currentContent.casaPalmas}
                  </h3>
                  <p className="text-gray-700 font-['Courier_Prime']">
                    Calle PALMAS, sin Número<br />
                    Brisas de Zicatela, Zicatela<br />
                    Oaxaca MX 70900
                  </p>
                </div>

                {/* Contact Details */}
                <div className="pt-4">
                  <p className="text-gray-700 font-['Courier_Prime']">
                    +52 55 9999 9999<br />
                    hola@casazii.com
                  </p>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div>
              <div className="relative w-full aspect-[1180/832] overflow-hidden shadow-lg">
                <img
                  src="/Mapa.png"
                  alt="Mapa de Zicatela"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Entry and Exit Policies Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Entry and Exit Policies */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 font-['Courier_Prime']">
                {currentContent.entryExitPolicies}
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700 font-['Courier_Prime']">{currentContent.policies.checkIn}</p>
                <p className="text-gray-700 font-['Courier_Prime']">{currentContent.policies.checkOut}</p>
                <p className="text-gray-700 font-['Courier_Prime']">{currentContent.policies.lateCheckout}</p>
                <p className="text-gray-700 font-['Courier_Prime']">{currentContent.policies.lateCheckoutFee}</p>
              </div>
            </div>

            {/* Empty space to align with map */}
            <div></div>
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <hr className="border-gray-300" />
        </div>
      </div>

      {/* Property and Cancellation Policies Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Property and Cancellation Policies */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 font-['Courier_Prime']">
                {currentContent.propertyCancellationPolicies}
              </h3>
              
              <div className="space-y-6">
                {/* Immediate Payment */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 font-['Courier_Prime']">
                    {currentContent.policies.immediatePayment}
                  </h4>
                  <div className="space-y-2">
                    <p className="text-gray-700 font-['Courier_Prime']">{currentContent.policies.guaranteePolicy}</p>
                    <p className="text-gray-700 font-['Courier_Prime']">{currentContent.policies.cancellationPolicy}</p>
                    <p className="text-gray-700 font-['Courier_Prime']">{currentContent.policies.cancellationFee}</p>
                  </div>
                </div>

                {/* Later Payment */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 font-['Courier_Prime']">
                    {currentContent.policies.laterPayment}
                  </h4>
                  <div className="space-y-2">
                    <p className="text-gray-700 font-['Courier_Prime']">{currentContent.policies.laterGuaranteePolicy}</p>
                    <p className="text-gray-700 font-['Courier_Prime']">{currentContent.policies.laterCancellationPolicy}</p>
                    <p className="text-gray-700 font-['Courier_Prime']">{currentContent.policies.laterCancellationFee}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty space to align with map */}
            <div></div>
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <hr className="border-gray-300" />
        </div>
      </div>

      {/* Terms and Conditions Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Terms and Conditions */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 font-['Courier_Prime']">
                {currentContent.termsConditions}
              </h3>
              
              <div className="text-gray-700 text-sm leading-relaxed font-['Courier_Prime'] space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">{currentContent.terms.article1}</h4>
                  <p className="text-justify">
                    {currentContent.terms.article1Text}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">{currentContent.terms.article2}</h4>
                  <p className="text-justify">
                    {currentContent.terms.article2Text}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">{currentContent.terms.article3}</h4>
                  <p className="text-justify">
                    {currentContent.terms.article3Text}
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <button className="bg-gray-100 border border-gray-300 rounded-lg px-6 py-3 text-gray-800 font-['Courier_Prime'] hover:bg-gray-200 transition-colors">
                  {currentContent.readMore} →
                </button>
              </div>
            </div>

            {/* Empty space to align with map */}
            <div></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
