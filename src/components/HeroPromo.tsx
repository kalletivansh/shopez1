import React from 'react';

interface HeroPromoProps {
  onShopSale: () => void;
}

export const HeroPromo: React.FC<HeroPromoProps> = ({ onShopSale }) => {
  return (
    <div className="h-52 sm:h-48 md:h-44 bg-indigo-600 rounded-[32px] p-6 md:p-8 flex items-center relative overflow-hidden text-white shadow-md shrink-0">
      <div className="relative z-10 max-w-md">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-200 inline-block bg-indigo-700/50 px-2.5 py-0.5 rounded-full mb-1">
          ⚡ Limited Time Offer
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 leading-tight">
          Upgrade your workspace.
        </h2>
        <p className="mt-2 text-indigo-100 opacity-90 text-xs sm:text-sm max-w-sm">
          Get up to 40% off on premium desk accessories, mechanical keyboards, and ergonomics this weekend only.
        </p>
        <button 
          onClick={onShopSale}
          className="mt-4 bg-white hover:bg-indigo-50 text-indigo-600 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          Shop Sale
        </button>
      </div>
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute right-20 top-0 w-32 h-32 bg-indigo-400 rounded-full blur-2xl opacity-30 pointer-events-none"></div>
      
      {/* Subtle decorative graphic */}
      <div className="hidden md:flex absolute right-12 bottom-6 w-36 h-36 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 items-center justify-center transform rotate-12 pointer-events-none">
        <div className="text-center">
          <span className="text-3xl font-black text-white">-40%</span>
          <span className="block text-[10px] uppercase tracking-wider font-semibold text-indigo-200 mt-1">Weekend Sale</span>
        </div>
      </div>
    </div>
  );
};
