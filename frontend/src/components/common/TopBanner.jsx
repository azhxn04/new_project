import React from 'react';

export default function TopBanner() {
  return (
    <div className="bg-[#0a1228] w-full px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-3 border-b border-[#1d2d59] z-50">
      
      {/* Left Side: Ministry & Apex Info */}
      <div className="flex items-center text-xs md:text-sm">
        <div className="flex items-center gap-2">
          {/* Golden Dot */}
          <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
          <span className="font-bold text-white tracking-wide">
            Ministry of Social Justice & Empowerment (MoSJE)
          </span>
        </div>
        
        {/* Divider and Subtext */}
        <span className="text-slate-500 mx-3 hidden md:inline">|</span>
        <span className="text-blue-200/80 font-medium hidden md:inline">
          Apex Corporations: NSFDC • NBCFDC • NSKFDC • NDFDC
        </span>
      </div>

      {/* Right Side: Smart India Hackathon Badge */}
      <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/40 text-amber-400 rounded-full text-[10px] md:text-xs font-bold tracking-wide shadow-sm flex-shrink-0">
        Smart India Hackathon 2026 • Problem ID: 26091
      </div>
      
    </div>
  );
}