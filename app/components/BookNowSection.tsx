import BookNowButton from "./BookNowButton";

interface BookNowSectionProps {
  title: string;
  variant?: "primary" | "secondary";
}

export default function BookNowSection({ 
  title, 
  variant = "primary" 
}: BookNowSectionProps) {
  return (
    <div className="bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 className="font-courier text-[#222222] text-xl md:text-2xl font-bold mb-6 md:mb-8">
          {title}
        </h2>
        <BookNowButton variant={variant} />
      </div>
    </div>
  );
}
