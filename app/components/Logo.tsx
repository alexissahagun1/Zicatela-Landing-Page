import Image from "next/image";

export default function Logo() {
  return (
    <div className="w-[134px] h-[64px] md:scale-100 scale-75 relative">
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
