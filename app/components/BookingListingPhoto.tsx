"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type BookingListingPhotoProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function BookingListingPhoto({
  src,
  alt,
  priority = false,
}: BookingListingPhotoProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-[#F5F5F5]",
        "h-[7.5rem] w-[7.5rem] rounded-lg",
        "md:h-auto md:w-full md:rounded-none md:aspect-[5/3]"
      )}
    >
      {!loaded && <div className="casa-zii-image-skeleton absolute inset-0" aria-hidden="true" />}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={72}
        sizes="(max-width: 767px) 120px, (max-width: 1280px) 50vw, 560px"
        className={cn(
          "object-cover transition-opacity duration-300 ease-out motion-reduce:transition-none",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
