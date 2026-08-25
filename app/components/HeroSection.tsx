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
          preload="auto"
          poster="/casa-zii-palmas-hero-poster.jpg"
          aria-label="Recorrido cinematográfico de Casa Zii Palmas"
        >
          <source src="/casa-zii-palmas-hero-loop.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(125deg,rgba(0,0,0,0.34),rgba(0,0,0,0.04)_58%,rgba(0,0,0,0.16))]"
        />
        <h1 className="absolute bottom-8 left-6 m-0 font-[family-name:var(--font-courier)] text-[clamp(4.5rem,12vw,10rem)] font-bold leading-[0.7] tracking-[-0.1em] text-white md:bottom-12 md:left-12">
          Casa<br />Zii
        </h1>
      </div>
    </section>
  );
}
