/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, Order, CartItem, ActiveTab, Review } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_ANALYTICS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroPromo } from './components/HeroPromo';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SellerDashboard } from './components/SellerDashboard';
import { Footer } from './components/Footer';
import { ShieldCheck, ArrowRight, Clock, Truck, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [analytics, setAnalytics] = useState(INITIAL_ANALYTICS);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = Array.from(new Set(INITIAL_PRODUCTS.map(p => p.category)));

  // Filter products
  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Deals') return matchesSearch && (prod.discountPercentage || 0) > 25;
    return matchesSearch && prod.category === selectedCategory;
  });

  // Cart actions
  const handleAddToCart = (prod: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart(prev => {
      const existing = prev.find(i => i.product.id === prod.id);
      if (existing) {
        return prev.map(i => i.product.id === prod.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product: prod, quantity: 1 }];
    });
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handlePlaceOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setAnalytics(prev => ({
      ...prev,
      totalRevenue: prev.totalRevenue + newOrder.total,
      totalOrders: prev.totalOrders + 1
    }));
    setCart([]);
  };

  const handleAddReview = (productId: string, newRev: Omit<Review, 'id' | 'date'>) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const createdRev: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: todayStr
    };

    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const nextRevs = [createdRev, ...p.reviews];
        const avgRat = Number((nextRevs.reduce((sum, r) => sum + r.rating, 0) / nextRevs.length).toFixed(1));
        return {
          ...p,
          reviews: nextRevs,
          rating: avgRat,
          reviewsCount: nextRevs.length
        };
      }
      return p;
    }));

    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => {
        if (!prev) return null;
        const nextRevs = [createdRev, ...prev.reviews];
        const avgRat = Number((nextRevs.reduce((sum, r) => sum + r.rating, 0) / nextRevs.length).toFixed(1));
        return {
          ...prev,
          reviews: nextRevs,
          rating: avgRat,
          reviewsCount: nextRevs.length
        };
      });
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const totalCartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="w-full h-screen bg-slate-50 font-sans flex flex-col overflow-hidden text-slate-900 select-text">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex gap-6 p-4 md:p-6 overflow-hidden">
        
        {activeTab === 'catalog' ? (
          <>
            {/* Left Column: Catalog & Grid */}
            <section className="flex-[3] flex flex-col gap-6 overflow-y-auto pr-1 pb-10">
              
              {/* Hero Banner Promo */}
              <HeroPromo 
                onShopSale={() => { setSelectedCategory('Deals'); setSearchQuery(''); }} 
              />

              {/* Category Pills Header */}
              <div className="flex items-center justify-between shrink-0 pt-1">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      selectedCategory === 'All' 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'bg-white hover:bg-slate-200 text-slate-600 border border-slate-200'
                    }`}
                  >
                    All Items ({products.length})
                  </button>
                  <button
                    onClick={() => setSelectedCategory('Deals')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      selectedCategory === 'Deals' 
                        ? 'bg-rose-500 text-white shadow-sm' 
                        : 'bg-white hover:bg-slate-200 text-slate-600 border border-slate-200'
                    }`}
                  >
                    🔥 Weekend Deals
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        selectedCategory === cat 
                          ? 'bg-indigo-600 text-white shadow-sm' 
                          : 'bg-white hover:bg-slate-200 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {searchQuery && (
                  <span className="text-xs text-slate-400 font-medium hidden sm:inline shrink-0 ml-2">
                    Found {filteredProducts.length} results
                  </span>
                )}
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 flex flex-col items-center justify-center my-auto">
                  <p className="text-lg font-bold text-slate-700">No products match your filter criteria.</p>
                  <p className="text-xs text-slate-400 mt-1">Try clearing your search query or switching categories.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-full hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                  {filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onSelect={(p) => setSelectedProduct(p)}
                      onAddToCart={handleAddToCart}
                      isAdded={cart.some(c => c.product.id === prod.id)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Right Column: Seller Preview Sidebar (Matches Sleek Interface Theme) */}
            <aside className="hidden lg:flex flex-1 max-w-sm bg-slate-900 rounded-[32px] p-6 text-white flex-col shrink-0 shadow-xl overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <h2 className="font-bold text-lg">Seller Insights</h2>
                </div>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold rounded uppercase tracking-wider animate-pulse">
                  Live INR
                </span>
              </div>

              <div className="space-y-6 flex-1">
                {/* Revenue Card */}
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
                  <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Total Revenue (INR)</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold font-mono text-white">
                      ₹{analytics.totalRevenue.toLocaleString('en-IN')}
                    </span>
                    <span className="text-green-400 text-xs font-bold font-mono">+12.4%</span>
                  </div>
                </div>

                {/* Mini Chart Visualizer */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400 font-semibold">Daily Sales Volume</span>
                  <div className="h-24 flex items-end gap-2 bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
                    {analytics.revenueHistory.map((day, idx) => {
                      const maxRev = Math.max(...analytics.revenueHistory.map(r => r.revenue));
                      const hPct = Math.max(15, Math.round((day.revenue / maxRev) * 100));
                      return (
                        <div key={idx} className="w-full flex flex-col items-center gap-1 group relative">
                          <div 
                            className={`w-full rounded-t-sm transition-all duration-500 ${idx === 5 ? 'bg-indigo-500 shadow-md shadow-indigo-500/30' : 'bg-slate-700 hover:bg-slate-500'}`}
                            style={{ height: `${hPct}%` }}
                          ></div>
                          <span className="text-[9px] text-slate-500 font-mono">{day.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Active Orders List Preview */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Active Orders ({orders.length})</h3>
                    <span className="text-[10px] text-indigo-400 font-medium">Auto-synced</span>
                  </div>

                  <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                    {orders.slice(0, 3).map((ord) => (
                      <div key={ord.id} className="flex items-center gap-3 p-2.5 bg-slate-800/50 rounded-xl border border-slate-800">
                        <div className="w-8 h-8 bg-slate-700/80 rounded-lg flex items-center justify-center text-xs font-bold shrink-0">
                          📦
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-200 truncate">{ord.id} • {ord.items[0]?.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                            ₹{ord.total.toLocaleString('en-IN')} • {ord.customerName}
                          </p>
                        </div>
                        <div className="shrink-0">
                          {ord.status === 'Pending' && <Clock className="w-4 h-4 text-rose-400" title="Pending" />}
                          {ord.status === 'Processing' && <span className="w-2 h-2 bg-amber-400 rounded-full inline-block" title="Processing"></span>}
                          {ord.status === 'Shipped' && <Truck className="w-4 h-4 text-indigo-400" title="Shipped" />}
                          {ord.status === 'Delivered' && <CheckCircle2 className="w-4 h-4 text-green-400" title="Delivered" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab('dashboard')}
                className="mt-6 w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Open Full Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </aside>
          </>
        ) : (
          /* Full Seller Dashboard View */
          <SellerDashboard
            analytics={analytics}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onClose={() => setActiveTab('catalog')}
          />
        )}
      </main>

      {/* Bottom Status Footer */}
      <Footer />

      {/* Product Details & Reviews Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => handleAddToCart(p)}
        onAddReview={handleAddReview}
        isAdded={selectedProduct ? cart.some(c => c.product.id === selectedProduct.id) : false}
      />

      {/* Shopping Cart & UPI Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}
