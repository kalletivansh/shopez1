import React from 'react';
import { ShoppingBag, Search, Store, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
  cartCount,
  onOpenCart,
}) => {
  return (
    <nav className="h-20 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shrink-0 shadow-sm sticky top-0 z-30">
      <div className="flex items-center gap-6 md:gap-10">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setActiveTab('catalog');
            setSelectedCategory('All');
          }}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 bg-indigo-600 group-hover:bg-indigo-700 transition-colors rounded-xl flex items-center justify-center shadow-md shadow-indigo-600/20">
            <div className="w-5 h-5 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-slate-800 leading-none">ShopEZ</span>
            <span className="text-[10px] font-semibold text-indigo-600 tracking-wider uppercase">India</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-500">
          <button
            onClick={() => {
              setActiveTab('catalog');
              setSelectedCategory('All');
            }}
            className={`transition-colors py-1 ${
              activeTab === 'catalog'
                ? 'text-indigo-600 font-bold border-b-2 border-indigo-600'
                : 'hover:text-slate-800'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => {
              setActiveTab('catalog');
              setSelectedCategory('Deals');
            }}
            className="hover:text-slate-800 flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Deals
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'dashboard'
                ? 'text-amber-600 font-bold border-b-2 border-amber-600'
                : 'hover:text-slate-800 text-amber-600 font-semibold'
            }`}
          >
            <Store className="w-4 h-4" />
            Seller Central
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Pill Search Input */}
        <div className="relative w-48 sm:w-64 md:w-80">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'catalog') setActiveTab('catalog');
            }}
            placeholder="Search products in India..."
            className="w-full pl-9 pr-4 py-2 bg-slate-100 hover:bg-slate-200/70 border-none rounded-full text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Cart Button */}
        <button
          onClick={onOpenCart}
          className="relative w-10 h-10 bg-slate-100 hover:bg-indigo-50 rounded-full flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-colors focus:outline-none"
          title="Shopping Cart"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
              {cartCount}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm shadow-sm" title="Logged in as Vansh Kalleti">
            VK
          </div>
        </div>
      </div>
    </nav>
  );
};
