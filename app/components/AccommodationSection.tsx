import BookNowButton from './BookNowButton';
import Image from 'next/image';

const amenities = [
  {
    icon: '/wifi-icon.png',
    text: "wifi alta velocidad"
  },
  {
    icon: '/alberca-icon.png',
    text: "alberca privada"
  },
  {
    icon: '/terraza-icon.png',
    text: "terrazas privadas"
  },
  {
    icon: '/mascota-icon.png',
    text: "mascotas bienvenidas"
  },
  {
    icon: '/aeropuerto-icon.png',
    text: "a 15 min. del aeropuerto"
  }
];

export default function AccommodationSection() {
  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row md:gap-48 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">
              Alojamiento
            </h2>
            
            <p className="text-justify" style={{ 
              width: '577px', 
              height: '124px',
              fontFamily: 'Courier Prime',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '17px',
              color: '#222222'
            }}>
              Casa Zii ofrece alojamientos solo para adultos, con un diseño brutalista y esencia tropical. Cada casa —Casa Campeche y Casa Palmas— combina arquitectura de autor con interiores abiertos al paisaje natural. Disfruta de terrazas privadas, alberca, detalles inspirados en la costa oaxaqueña y todas las comodidades modernas para una escapada serena y auténtica en La Punta, Zicatela.
            </p>
            
             <div className="pt-4 flex justify-end">
               <button 
                 className="md:w-[186px] md:h-[45px] w-[100px] h-[32px] bg-transparent border border-[#A04E39] text-[#A04E39] text-[20px] leading-[22px] flex items-center justify-center transition-opacity duration-200 hover:opacity-90"
               >
                 Book Now
               </button>
             </div>
          </div>
          
           {/* Right Content - Amenities */}
           <div className="mt-16 space-y-6">
             {amenities.map((amenity, index) => (
               <div key={index} className="flex items-center space-x-4">
                 <div className="flex-shrink-0">
                   <Image
                     src={amenity.icon}
                     alt={amenity.text}
                     width={22}
                     height={16}
                     className="w-[22px] h-[16px]"
                   />
                 </div>
                 <span className="text-teal-600 text-lg whitespace-nowrap">
                   {amenity.text}
                 </span>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
