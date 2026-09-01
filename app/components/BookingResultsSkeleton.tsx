export default function BookingResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5" aria-hidden="true">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="casa-zii-booking-card overflow-hidden rounded-xl border border-[#E6E6E6] bg-white"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <div className="flex gap-4 p-4 md:block md:p-0">
            <div className="casa-zii-image-skeleton h-[7.5rem] w-[7.5rem] shrink-0 rounded-lg md:aspect-[5/3] md:h-auto md:w-full md:rounded-none" />
            <div className="flex min-w-0 flex-1 flex-col gap-3 py-1 md:p-6">
              <div className="casa-zii-image-skeleton h-3 w-24 rounded" />
              <div className="casa-zii-image-skeleton h-4 w-full max-w-[16rem] rounded" />
              <div className="casa-zii-image-skeleton h-3 w-32 rounded" />
              <div className="casa-zii-image-skeleton mt-2 h-4 w-40 rounded" />
              <div className="casa-zii-image-skeleton mt-2 h-9 w-36 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
