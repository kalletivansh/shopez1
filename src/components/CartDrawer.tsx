import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onPlaceOrder
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  
  // Shipping & Payment form
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [upiId, setUpiId] = useState('');
  
  // Discount coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 2000 || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - appliedDiscount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'STUDENT10' || code === 'SHOPEZ10') {
      const disc = Math.round(subtotal * 0.1);
      setAppliedDiscount(disc);
    } else if (code === 'FLAT500' && subtotal >= 3000) {
      setAppliedDiscount(500);
    } else {
      setCouponError('Invalid code. Try "STUDENT10" for 10% off.');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !address.trim() || !pincode.trim()) return;

    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim() || 'guest@shopez.in',
      shippingAddress: `${address.trim()}, ${city}, Pin: ${pincode}`,
      items: cart.map(i => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image
      })),
      subtotal,
      discount: appliedDiscount,
      shipping: shippingFee,
      total,
      status: 'Pending',
      paymentMethod: paymentMethod === 'upi' ? `UPI (${upiId || 'Google Pay'})` : paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card',
      createdAt: 'Just now',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      trackingNumber: `IND-${Math.floor(100000 + Math.random() * 900000)}`
    };

    onPlaceOrder(newOrder);
    setCheckoutStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden relative">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h2 className="font-extrabold text-lg text-slate-800">
              {checkoutStep === 'cart' && `Your Bag (${cart.length})`}
              {checkoutStep === 'shipping' && 'Secure Checkout'}
              {checkoutStep === 'success' && 'Order Confirmed!'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* STEP 1: CART LIST */}
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-700 text-base">Your shopping bag is empty</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">Looks like you have not added any workspace accessories or gadgets yet.</p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-md hover:bg-indigo-700 transition-all cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 items-center">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-white border border-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-800 truncate">{item.product.name}</h4>
                        <p className="text-[11px] font-mono font-bold text-indigo-600 mt-0.5">
                          ₹{item.product.price.toLocaleString('en-IN')}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => onUpdateQty(item.product.id, -1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-slate-800 select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQty(item.product.id, 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Coupon Box */}
                  <div className="pt-4 border-t border-slate-100">
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code (e.g. STUDENT10)"
                        className="flex-1 px-3 py-2 bg-slate-100 rounded-xl text-xs uppercase outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-600 transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                    {couponError && <p className="text-[10px] text-rose-500 mt-1 font-medium">{couponError}</p>}
                    {appliedDiscount > 0 && <p className="text-[10px] text-green-600 mt-1 font-bold">✓ Coupon applied successfully! Saved ₹{appliedDiscount}</p>}
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: SHIPPING & PAYMENT */}
          {checkoutStep === 'shipping' && (
            <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">1. Shipping Address</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Name *"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-600"
                  />
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Email Address for Invoice (Optional)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-600"
                  />
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Hostel Room No / House No, Street Area *"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-600 resize-none"
                  ></textarea>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City (e.g. Bengaluru) *"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-600"
                    />
                    <input
                      type="text"
                      required
                      pattern="[0-9]{6}"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Pincode (6 digits) *"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-600 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">2. Payment Method</h3>
                <div className="space-y-2">
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-indigo-600 bg-indigo-50/50 font-bold' : 'border-slate-200 bg-white'}`}>
                    <input type="radio" name="pay" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="accent-indigo-600" />
                    <span className="text-xs text-slate-800 flex-1">⚡ Instant UPI (GPay, PhonePe, Paytm)</span>
                  </label>
                  {paymentMethod === 'upi' && (
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Enter UPI ID (e.g. name@okaxis)"
                      className="w-full px-3 py-2 ml-6 w-[88%] bg-white border border-indigo-200 rounded-lg text-xs font-mono mb-2 outline-none"
                    />
                  )}

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50/50 font-bold' : 'border-slate-200 bg-white'}`}>
                    <input type="radio" name="pay" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-indigo-600" />
                    <span className="text-xs text-slate-800 flex-1">💵 Cash on Delivery (COD)</span>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50/50 font-bold' : 'border-slate-200 bg-white'}`}>
                    <input type="radio" name="pay" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-indigo-600" />
                    <span className="text-xs text-slate-800 flex-1">💳 Credit / Debit Card (RuPay, Visa)</span>
                  </label>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER SUCCESS */}
          {checkoutStep === 'success' && (
            <div className="text-center py-10 space-y-4 flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Thank you for ordering!</h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Your order has been placed successfully and dispatched to our Bengaluru fulfillment center.
              </p>
              
              <div className="bg-slate-50 p-4 rounded-2xl w-full text-left space-y-2 border border-slate-100 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Order ID:</span>
                  <span className="font-mono font-bold text-slate-800">#ORD-NEW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment:</span>
                  <span className="font-semibold text-green-600">Verified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Delivery:</span>
                  <span className="font-bold text-slate-800">3 Business Days</span>
                </div>
              </div>

              <button
                onClick={() => { setCheckoutStep('cart'); onClose(); }}
                className="mt-4 px-8 py-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-full text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && checkoutStep !== 'success' && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/80 space-y-3 shrink-0">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-mono font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Shipping Fee</span>
                <span className="font-mono">{shippingFee === 0 ? <span className="text-green-600 font-bold">FREE</span> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="font-mono text-indigo-600">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                onClick={() => setCheckoutStep('shipping')}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all active:scale-98 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Pay & Confirm Order • ₹{total.toLocaleString('en-IN')}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
