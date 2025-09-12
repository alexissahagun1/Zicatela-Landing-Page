import Image from "next/image";

interface PropertyGalleryProps {
  exteriorImage: string;
  interiorImage: string;
  exteriorAlt: string;
  interiorAlt: string;
}

export default function PropertyGallery({ 
  exteriorImage, 
  interiorImage, 
  exteriorAlt, 
  interiorAlt 
}: PropertyGalleryProps) {
  return (
    <>
      {/* Exterior Image Section */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <Image
          src={exteriorImage}
          alt={exteriorAlt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </>
  );
}