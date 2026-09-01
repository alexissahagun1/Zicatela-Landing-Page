export default function HeroSection() {
  return (
    <section className="w-full overflow-hidden bg-black pt-16 md:pt-[74px]">
      <div className="relative h-[46vh] min-h-[360px] w-full sm:h-[56vh] md:h-[min(66vh,680px)]">
        <video
          className="casa-zii-hero-video h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/casa-zii-hero-poster.jpg"
          aria-label="Recorrido cinematográfico de Casa Zii"
        >
          <source src="/casa-zii-hero-loop.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(125deg,rgba(0,0,0,0.34),rgba(0,0,0,0.04)_58%,rgba(0,0,0,0.16))]"
        />
      </div>
    </section>
  );
}
