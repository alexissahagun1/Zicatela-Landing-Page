import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative h-[42px] w-[88px] md:h-[max(70px,calc(var(--f)*70))] md:w-[max(148px,calc(var(--f)*148))]">
      <Image
        src="/LogoCasaZii@4x.png"
        alt="CASA zii Logo"
        fill
        sizes="(min-width: 768px) 148px, 88px"
        className="object-contain"
        priority
      />
    </div>
  );
}
