import React, { useState } from 'react';
import { Product, Review } from '../types';
import { Star, X, ShieldCheck, Truck, RotateCcw, Plus, Check } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onAddReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  isAdded?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onAddReview,
  isAdded = false
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [comment, setComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!product) return null;

  const currentImg = selectedImage || product.image;
  const imagesList = product.images || [product.image];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;

    onAddReview(product.id, {
      userName: reviewerName.trim(),
      rating,
      comment: comment.trim(),
      verified: true
    });

    setReviewerName('');
    setComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full">
              {product.category}
            </span>
            <span className="text-xs text-slate-400 font-medium">• In Stock ({product.stock} units)</span>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col md:flex-row gap-8">
          
          {/* Gallery Column */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="h-72 sm:h-80 bg-slate-100 rounded-3xl overflow-hidden relative flex items-center justify-center">
              <img 
                src={currentImg} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discountPercentage && product.discountPercentage > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-rose-500 text-white font-bold text-xs rounded-full uppercase tracking-wider">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            {imagesList.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                      currentImg === img ? 'border-indigo-600 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Badges */}
            <div className="grid grid-cols-3 gap-2 mt-2 pt-4 border-t border-slate-100">
              <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-slate-50">
                <ShieldCheck className="w-5 h-5 text-indigo-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-700">BIS Certified</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-slate-50">
                <Truck className="w-5 h-5 text-indigo-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-700">Free All-India Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-2xl bg-slate-50">
                <RotateCcw className="w-5 h-5 text-indigo-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-700">7-Day Replacement</span>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-200'}`} 
                  />
                ))}
              </div>
              <span className="font-bold text-sm text-slate-800">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviews.length} customer reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-3xl font-extrabold text-indigo-600 font-mono">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through font-mono">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-xs text-green-600 font-semibold mt-1">
              ✓ Inclusive of all GST taxes
            </p>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 mt-6 gap-6">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-3 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'desc' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'specs' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                Specs
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'reviews' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                Reviews ({product.reviews.length})
              </button>
            </div>

            {/* Tab Body */}
            <div className="py-4 flex-1">
              {activeTab === 'desc' && (
                <div className="space-y-3">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {product.description}
                  </p>
                  <ul className="space-y-2 mt-4 text-xs text-slate-700">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold mt-0.5">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="divide-y divide-slate-100 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="py-2.5 flex justify-between">
                      <span className="font-semibold text-slate-500">{key}</span>
                      <span className="font-medium text-slate-800">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4 max-h-56 overflow-y-auto pr-2">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-700">Verified Buyer Feedback</span>
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="text-xs font-bold text-indigo-600 hover:underline"
                    >
                      {showReviewForm ? 'Cancel' : '+ Add Review'}
                    </button>
                  </div>

                  {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-4 rounded-2xl space-y-3 border border-slate-200">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Rating</label>
                        <div className="flex gap-1 cursor-pointer">
                          {[1, 2, 3, 4, 5].map((starVal) => (
                            <Star
                              key={starVal}
                              onClick={() => setRating(starVal)}
                              className={`w-5 h-5 ${starVal <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="e.g. Vansh K."
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Review Comment</label>
                        <textarea
                          required
                          rows={2}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="What did you like about this product?"
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-600 resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Post Review
                      </button>
                    </form>
                  )}

                  {product.reviews.length === 0 ? (
                    <p className="text-xs text-slate-400 italic text-center py-6">No reviews yet. Be the first to review!</p>
                  ) : (
                    product.reviews.map((rev) => (
                      <div key={rev.id} className="bg-slate-50/70 p-3 rounded-2xl">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-slate-800 text-xs">{rev.userName}</span>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Action Bottom Bar */}
            <div className="mt-auto pt-6 border-t border-slate-100 flex gap-4">
              <button
                onClick={() => onAddToCart(product)}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                  isAdded 
                    ? 'bg-green-600 text-white' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-98'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Add to Cart • ₹{product.price.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
