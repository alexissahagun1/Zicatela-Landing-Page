interface PropertyHeaderProps {
  title: string;
  description: string;
}

export default function PropertyHeader({ title, description }: PropertyHeaderProps) {
  return (
    <div className="relative bg-white">
      {/* Background Rectangle */}
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Content Container */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 pt-8 md:pt-16">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-courier text-[#222222] text-xl md:text-2xl lg:text-3xl font-bold">
              {title}
            </h1>
          </div>
          
          {/* Description Text */}
          <div className="text-center mb-6 md:mb-8">
            <p className="font-courier text-[#222222] text-sm md:text-base leading-[17px] md:leading-[19px] max-w-[700px] mx-auto">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}