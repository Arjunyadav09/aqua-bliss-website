import React from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 499;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">Your Cart</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                {items.reduce((acc, it) => acc + it.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping bar */}
          <div className="bg-sky-50 px-6 py-3 border-b border-sky-100 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-sky-900 font-medium">
                Add <span className="font-bold">₹{remainingForFreeShipping}</span> more for <span className="font-bold text-sky-700">Free Express Delivery</span>!
              </p>
            ) : (
              <p className="text-emerald-700 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>You unlocked Free Nationwide Delivery!</span>
              </p>
            )}
            <div className="w-full bg-sky-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-sky-600 h-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                  🥤
                </div>
                <h3 className="text-lg font-bold text-slate-800">Your cart is empty</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Fuel your day with our high-protein whey isolate beverages.
                </p>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-contain rounded-lg bg-slate-50 p-1.5 shrink-0"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/images/bottle_cutout.png';
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-sky-700 font-semibold mt-0.5">
                        {product.proteinGrams}g Protein Isolate • 0g Sugar
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-slate-200 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer disabled:opacity-30"
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-slate-900">
                        ₹{product.price * quantity}/-
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/80 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{subtotal}/-</span>
                </div>
                <div className="flex justify-between text-slate-600 text-xs">
                  <span>Estimated Delivery</span>
                  <span className="text-emerald-700 font-semibold">
                    {subtotal >= freeShippingThreshold ? 'FREE' : '₹49/-'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900">Estimated Total</span>
                <span className="text-xl font-black text-slate-900">
                  ₹{subtotal + (subtotal >= freeShippingThreshold ? 0 : 49)}/-
                </span>
              </div>

              <button
                onClick={onProceedCheckout}
                className="w-full py-4 bg-slate-900 hover:bg-sky-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>100% Guaranteed Freshness & Secure Payment</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
