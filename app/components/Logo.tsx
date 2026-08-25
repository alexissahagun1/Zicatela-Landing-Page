import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative h-[42px] w-[88px] md:h-[64px] md:w-[134px]">
      <Image
        src="/LogoCasaZii.png"
        alt="CASA zii Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
