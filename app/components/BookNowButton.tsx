"use client";

import Link from "next/link";
import { useLanguage } from '../contexts/LanguageContext';

interface BookNowButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function BookNowButton({ variant = 'primary', className = '' }: BookNowButtonProps) {
  const { language } = useLanguage();
  
  const baseClasses = "text-white flex items-center justify-center transition-opacity duration-200 hover:opacity-90";
  
  const variantClasses = variant === 'primary' 
    ? "w-[133px] h-[37px] bg-[#A04E39] text-[20px] leading-[22px]" 
    : "w-[175.44px] h-[58.28px] bg-[#222222] text-[24px] leading-[27px]";
  
  const buttonText = language === 'es' ? 'Reservar' : 'Book Now';
  
  return (
    <Link href="/booking" className={`${baseClasses} ${variantClasses} ${className}`}>
      {buttonText}
    </Link>
  );
}
