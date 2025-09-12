interface AmenitiesSectionProps {
  amenities: string;
}

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  return (
    <div className="relative bg-white">
      {/* Background Rectangle */}
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Content Container */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 pt-6 md:pt-2  md:pb-4">
        <div className="max-w-4xl mx-auto">
          {/* Amenities Section */}
          <div className="mb-12 md:mb-8">
            <h2 className="font-courier text-[#222222] text-lg md:text-xl font-regular text-center mb-8">
              AMENIDADES
            </h2>
            
            <div className="text-center">
              <p className="font-courier text-[#222222] text-sm md:text-base leading-[17px] md:leading-[19px] max-w-[700px] mx-auto">
                {amenities}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}