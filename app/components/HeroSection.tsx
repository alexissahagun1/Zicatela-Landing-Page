import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full overflow-hidden bg-white pt-16 md:pt-[74px]">
      <div className="relative h-[46vh] min-h-[360px] w-full sm:h-[56vh] md:h-[min(66vh,680px)]">
        <Image
          src="/beach-hero.png"
          alt="Playa de La Punta, Zicatela"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(125deg,rgba(0,0,0,0.34),rgba(0,0,0,0.04)_58%,rgba(0,0,0,0.16))]"
        />
      </div>
    </section>
  );
}
