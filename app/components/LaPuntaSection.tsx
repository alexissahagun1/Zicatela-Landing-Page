import Image from 'next/image';

export default function LaPuntaSection() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start md:gap-24">
          {/* Left Content - Text */}
          <div className="flex-1 lg:max-w-[631px]">
            <h2 className="text-4xl font-bold text-black mb-6">
              La Punta
            </h2>
            
            <div className="space-y-4" style={{
              fontFamily: 'Courier Prime',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '18px',
              color: '#222222'
            }}>
              <p className="text-justify">
                En La Punta de Zicatela, el ritmo lo marca el océano. Este rincón de Puerto Escondido conserva el espíritu relajado de un pueblo surfista, donde la vida fluye entre playas doradas, cafés artesanales y calles de tierra bordeadas de palmeras. Aquí, cada atardecer es un espectáculo y cada día una invitación a conectar con la naturaleza.
              </p>
              
              <p className="text-left text-teal-600 font-regular text-lg">
                VIVE LA PUNTA COMO LOCAL
              </p>
              
              <p className="text-justify">
                La playa principal es ideal para quienes buscan iniciarse en el surf o simplemente disfrutar del mar. Al caer la noche, La Punta cobra vida con una vibrante escena de bares, restaurantes y música en vivo. Los mercados y tiendas locales, llenos de color, aromas y sabores, revelan la riqueza de la cultura oaxaqueña.
              </p>
              
              <p className="text-justify">
                Desde Casa Zii, todo está al alcance: la tranquilidad del entorno tropical, el diseño contemporáneo en armonía con la naturaleza y la energía única de una comunidad que vive intensamente, al ritmo del sol y las olas.
              </p>
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="w-full lg:w-[343px] lg:h-[457px] flex-shrink-0">
            <div className="relative w-full h-[300px] lg:h-[457px]">
              <Image
                src="/LaPunta.png"
                alt="La Punta de Zicatela - Vista aérea de la calle con palmeras y surfistas"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 343px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
