import Logo from "./Logo";
import Image from "next/image";

export default function NavigationBar() {
  return (
    <nav className="w-full h-16 md:h-26 bg-white flex items-center justify-between md:justify-start px-4 md:px-0 xl:gap-36 xl:px-64">
      {/* Logo */}
      <div className="flex items-center">
        <Logo />
      </div>

      {/* Navigation Links - Hidden on mobile */}
      <div className="hidden md:flex items-center space-x-8 xl:space-x-20 pt-12 xl:pr-32 whitespace-nowrap">
        <a href="#" className="text-[#222222] text-[10px] md:text-[14px] leading-[11px] hover:opacity-70 whitespace-nowrap">
          ● CASA CAMPECHE
        </a>
        <a href="#" className="text-[#222222] text-[10px] md:text-[14px] leading-[11px] hover:opacity-70 whitespace-nowrap">
          ▲ CASA PALMAS
        </a>
        <a href="#" className="text-[#222222] text-[10px] md:text-[14px] leading-[11px] hover:opacity-70 whitespace-nowrap">
          PRENSA
        </a>
      </div>

      {/* Right side - Book Now button, Instagram, and English */}
      <div className="flex items-center space-x-2 md:space-x-0 xl:space-x-12 pt-0 md:pt-6">
        <button className="w-[100px] md:w-[133px] h-[32px] md:h-[37px] bg-[#A04E39] text-white text-[14px] md:text-[20px] leading-[16px] md:leading-[22px] flex items-center justify-center hover:opacity-90">
          Book Now
        </button>
        
        {/* Instagram Icon - Hidden on mobile */}
        <Image
          src="/instagram-logo.png"
          alt="Instagram"
          width={21}
          height={22}
          className="hidden md:block hover:opacity-70"
        />
        
        {/* English with UK Flag - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-1">
          <Image
            src="/english-logo.png"
            alt="UK Flag"
            width={16}
            height={16}
          />
          <span className="text-black text-[13px] leading-[15px]">English</span>
        </div>
      </div>
    </nav>
  );
}
