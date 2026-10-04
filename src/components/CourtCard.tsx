import Link from "next/link";

export default function CourtCard({ court }: { court: any }) {
  return (
    <Link href={`/court/${court.id}`} className="group rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:border-blue-500 hover:shadow-md transition-all block">
      <div className="aspect-video relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={court.image} alt={court.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
          <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-extrabold text-blue-600 border border-slate-200 shadow-sm">
            {court.pricePerHour ? court.pricePerHour.toLocaleString('vi-VN') : "0"}đ/h
          </div>
          <div className="bg-slate-900/80 backdrop-blur px-2 py-1 rounded-md text-xs font-semibold text-white">
            {court.numberOfCourts} sân
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">{court.name}</h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-1 flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {court.address}
        </p>
        <div className="flex flex-wrap gap-2">
          {court.amenities?.map((amenity: string, idx: number) => (
            <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1.5 rounded-md font-medium">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
