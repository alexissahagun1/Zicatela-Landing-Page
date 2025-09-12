import Image from 'next/image';

export default function MapSection() {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Map Container */}
        <div className="relative w-full max-w-2xl mx-auto">
          {/* Map Background */}
          <div className="relative w-full aspect-[680/332] overflow-hidden shadow-lg">
            <Image
              src="/Mapa.png"
              alt="Mapa de Zicatela"
              fill
              className="object-cover"
              sizes="(max-width: 680px) 100vw, (max-width: 1200px) 80vw, 680px"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
