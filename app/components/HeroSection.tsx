import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full overflow-hidden bg-black pt-16 md:pt-[74px]">
      <div className="relative h-[236px] w-full md:h-[556.74px]">
        <Image
          src="/beach-hero.png"
          alt="Beach scene with waves and palm trees"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
