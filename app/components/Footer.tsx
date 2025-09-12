import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#EFEFEF] py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-10">
          
          {/* Instagram Link */}
          <div className="flex items-center space-x-3">
            <Link 
              href="https://instagram.com/casazii" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/instagram-logo.png"
                alt="Instagram"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="text-black font-courier text-sm leading-5">
                CASA ZII
              </span>
            </Link>
          </div>

          {/* All Text Content in Aligned Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
            {/* Contact Information */}
            <div className="text-black font-courier text-sm leading-5 space-y-1">
              <div className="font-regular">CONTACTO</div>
              <div className="font-regular">CENTRO DE RESERVACIONES</div>
              <div>+52 00 0000 0000</div>
              <div>reservaciones@casazii.com</div>
            </div>

            {/* Locations & Media */}
            <div className="text-black font-courier text-sm leading-5 space-y-1">
              <div className="font-regular">CASA CAMPECHE</div>
              <div className="font-regular">CASA PALMAS</div>
              <div className="font-regular">PRENSA</div>
              <div className="font-regular">RESERVA</div>
            </div>

            {/* Legal Information */}
            <div className="text-black font-courier text-sm leading-5 space-y-1">
              <div className="font-regular">AVISO DE PRIVACIDAD</div>
              <div className="font-regular">TÉRMINOS Y CONDICIONES</div>
            </div>
          </div>

          {/* Casa Zii Logo */}
          <div className="flex items-center">
            <Image
              src="/LogoCasaZii.png"
              alt="Casa Zii Logo"
              width={138}
              height={64}
              className="h-18 w-auto"
            />
          </div>
        </div>

        {/* Mobile-specific adjustments */}
        <div className="mt-8 pt-6 border-t border-gray-300 md:hidden">
          <div className="text-center">
            <Image
              src="/LogoCasaZii.png"
              alt="Casa Zii Logo"
              width={100}
              height={32}
              className="h-8 w-auto mx-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
