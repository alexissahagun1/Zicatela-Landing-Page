import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[300px] md:h-[630.74px] overflow-hidden pt-26 md:pt-32">
      <div className="absolute inset-0">
        {/* Beach hero image */}
        <div className="w-full h-full bg-black">
          <Image
            src="/beach-hero.png"
            alt="Beach scene with waves and palm trees"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
