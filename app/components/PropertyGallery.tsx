import Image from "next/image";

interface PropertyGalleryProps {
  exteriorImage: string;
  interiorImage: string;
  exteriorAlt: string;
  interiorAlt: string;
  objectPosition?: string;
}

export default function PropertyGallery({ 
  exteriorImage, 
  interiorImage, 
  exteriorAlt, 
  interiorAlt,
  objectPosition = "center",
}: PropertyGalleryProps) {
  return (
    <>
      {/* Exterior Image Section */}
      <div className="relative w-full h-[40vh] md:h-[60vh] md:w-screen md:left-1/2 md:transform md:-translate-x-1/2 overflow-hidden">
        <Image
          src={exteriorImage}
          alt={exteriorAlt}
          fill
          className="object-cover"
          style={{ objectPosition }}
          priority
        />
      </div>
    </>
  );
}
