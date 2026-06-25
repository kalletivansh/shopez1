import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="h-16 bg-white border-t border-slate-200 px-4 md:px-8 flex items-center justify-between shrink-0 z-10 text-xs">
      <div className="flex gap-6 font-semibold text-slate-500">
        <a href="#terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
        <a href="#privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
        <a href="#help" className="hover:text-indigo-600 transition-colors">Help & Support</a>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-slate-400 font-medium">© 2026 ShopEZ India. All rights reserved.</span>
      </div>
    </footer>
  );
};
