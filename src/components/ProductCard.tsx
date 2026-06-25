import React from 'react';
import { Product } from '../types';
import { Star, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isAdded = false
}) => {
  return (
    <div 
      onClick={() => onSelect(product)}
      className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col transition-all duration-300 hover:shadow-md hover:border-indigo-100 group cursor-pointer relative"
    >
      <div className="h-44 sm:h-48 bg-slate-100 rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.discountPercentage && product.discountPercentage > 0 && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
            -{product.discountPercentage}%
          </span>
        )}
        <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/40 backdrop-blur-md rounded-full flex items-center gap-1 text-white text-[11px] font-medium">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-white/70 text-[9px]">({product.reviewsCount})</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
          {product.category}
        </span>
      </div>

      <h3 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-1 group-hover:text-indigo-600 transition-colors">
        {product.name}
      </h3>
      
      <p className="text-xs text-slate-400 mt-1 line-clamp-2 min-h-[2.25rem]">
        {product.description}
      </p>

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-lg text-indigo-600 font-mono">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-mono">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        <button 
          onClick={(e) => onAddToCart(product, e)}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold shadow-sm transition-all duration-300 cursor-pointer ${
            isAdded 
              ? 'bg-green-500 text-white scale-105' 
              : 'bg-slate-900 hover:bg-indigo-600 text-white active:scale-95'
          }`}
          title="Add to Cart"
        >
          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
