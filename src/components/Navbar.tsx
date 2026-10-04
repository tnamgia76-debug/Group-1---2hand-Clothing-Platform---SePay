"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black italic tracking-tighter text-blue-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2Z"/><path d="M7 11h10"/><path d="M12 2v20"/></svg>
          <span>SMASH<span className="text-slate-800">COURT</span></span>
        </Link>
        <div className="flex items-center gap-6">
          <Link 
            href="/search" 
            className={`text-sm font-bold transition-colors ${pathname.startsWith('/search') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
          >
            Tìm Sân
          </Link>
          <Link href="/cart" className="relative p-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="text-sm font-bold">Lịch Đặt</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
