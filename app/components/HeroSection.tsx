// Figma 2007:16 "Video banner": 1920×946, capped so the page title shows above the booking bar on laptops.
export default function HeroSection() {
  return (
    <section className="w-full overflow-hidden bg-black pt-16 md:pt-[var(--nav-h)]">
      <div className="relative h-[46vh] min-h-[360px] w-full sm:h-[56vh] md:h-[max(300px,min(calc(var(--f)*946),calc(100svh-var(--nav-h)-250px)))] md:min-h-0">
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
      </div>
    </section>
  );
}
