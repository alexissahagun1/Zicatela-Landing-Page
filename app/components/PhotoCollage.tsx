import Image from 'next/image';

interface PhotoCollageProps {
  images: string[];
  alt?: string;
}

export default function PhotoCollage({ images, alt = "Gallery photo" }: PhotoCollageProps) {
  // Ensure we have exactly 12 images for the 4x3 grid
  const displayImages = images.slice(0, 12);
  
  // Fill remaining slots with a placeholder or leave empty
  const gridImages = Array.from({ length: 12 }, (_, index) => 
    displayImages[index] || null
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-6 sm:grid-rows-4 md:grid-rows-3 gap-2 sm:gap-4 md:gap-6">
        {gridImages.map((image, index) => (
          image ? (
            <div 
              key={index}
              className="relative overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 aspect-[350/264]"
            >
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                width={350}
                height={264}
                className="w-full h-full object-cover"
                priority={index < 4} // Prioritize loading first row
              />
            </div>
          ) : (
            <div 
              key={index}
              className="relative overflow-hidden rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center aspect-[350/264]"
            >
              <span className="text-gray-400 text-sm">Empty</span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
