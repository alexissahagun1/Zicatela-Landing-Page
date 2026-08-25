import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative h-[42px] w-[88px] md:h-[64px] md:w-[134px]">
      <Image
        src="/LogoCasaZii@4x.png"
        alt="CASA zii Logo"
        fill
        sizes="(min-width: 768px) 134px, 88px"
        className="object-contain"
        priority
      />
    </div>
  );
}
