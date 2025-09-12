export default function MainContent() {
  return (
    <section className="bg-white py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-[755px] mx-auto">
        {/* Main Heading */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black text-center mb-4 md:mb-6">
          Bienvenidos a Casa Zii
        </h1>
        
        {/* Slogan and introductory text */}
        <div className="w-full md:w-[666px] md:h-[116px] mx-auto">
          <p className="text-[12px] md:text-[16px] leading-[14px] md:leading-[18px] text-[#4C86A0] text-center mb-3 md:mb-4">
            DONDE EL DISEÑO SE FUNDE CON LA NATURALEZA EN EL CORAZÓN DE LA PUNTA
          </p>
          <p className="text-[12px] md:text-[16px] leading-[14px] md:leading-[18px] text-[#222222] text-center mb-2">
            Dos espléndidas casas duplex de estilo brutalista.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
            <span className="text-[12px] md:text-[16px] leading-[14px] md:leading-[18px] text-[#222222]">
              ● Casa Campeche
            </span>
            <span className="text-[12px] md:text-[16px] leading-[14px] md:leading-[18px] text-[#222222]">
              ▲ Casa Palmas
            </span>
          </div>
        </div>
        
        {/* Descriptive paragraphs */}
        <div className="w-full mx-auto">
          <p className="text-[12px] md:text-[15px] leading-[14px] md:leading-[17px] text-[#222222] text-left md:text-justify">
            Diseñadas por el reconocido arquitecto Ludwig Godefroy, ofrecen una experiencia arquitectónica única, sensorial y profundamente conectada con la naturaleza. <br />
            <br />

            En Casa Zii, el diseño se funde con el entorno tropical de la costa oaxaqueña para invitarte a reconectar con lo esencial. Las casas integran de manera perfecta espacios interiores y exteriores, brindando una sensación de libertad y fluidez que transforma cada momento.  <br />
            <br />

            Disfruta de amenidades premium, internet de alta velocidad con Starlink, y todo lo mejor de Zicatela a tan solo unos pasos. Ubicadas en La Punta, se encuentran a minutos caminando de la playa, restaurantes, bares y cafeterías. <br />
            <br />
            
            Casa Zii es el refugio ideal para olvidar la ciudad, reconectar con la naturaleza y vivir intensamente cada instante.
          </p>
        </div>
      </div>
    </section>
  );
}
