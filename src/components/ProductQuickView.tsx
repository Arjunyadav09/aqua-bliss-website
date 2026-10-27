import React, { useState } from 'react';
import { Product } from '../types';
import { X, Check, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, pack: 'single' | 'pack6' | 'pack12') => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [selectedPack, setSelectedPack] = useState<'single' | 'pack6' | 'pack12'>('single');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const packMultipliers = {
    single: { count: 1, discount: 0, label: 'Single Bottle' },
    pack6: { count: 6, discount: 0.05, label: '6-Pack Case (5% Off)' },
    pack12: { count: 12, discount: 0.10, label: '12-Pack Case (10% Off)' }
  };

  const currentPackInfo = packMultipliers[selectedPack];
  const originalPrice = product.price * currentPackInfo.count;
  const finalPrice = Math.round(originalPrice * (1 - currentPackInfo.discount));

  const handleAdd = () => {
    onAddToCart(product, selectedPack);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Visual Showcase */}
          <div className="relative aspect-square bg-slate-50 rounded-2xl p-8 flex items-center justify-center border border-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain drop-shadow-lg"
              onError={(e) => {
                const target = e.currentTarget;
                target.src = '/images/bottle_cutout.png';
              }}
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-900 text-white">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details & Nutrition */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>{product.category} Formulation • {product.proteinGrams}g Whey Isolate</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.name}
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pack Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Bundle Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['single', 'pack6', 'pack12'] as const).map((packKey) => {
                  const info = packMultipliers[packKey];
                  const isSelected = selectedPack === packKey;
                  return (
                    <button
                      key={packKey}
                      type="button"
                      onClick={() => setSelectedPack(packKey)}
                      className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-sky-600 bg-sky-50/70 text-sky-950 ring-2 ring-sky-600/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="font-bold">{info.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        ₹{Math.round(product.price * info.count * (1 - info.discount))}/-
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nutrition Facts Table */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Per Bottle ({product.volume}) Nutrition
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-white p-2 rounded-lg border border-slate-100 text-center">
                  <span className="text-slate-500 block text-[10px]">PROTEIN</span>
                  <span className="font-extrabold text-sky-600 text-sm">{product.nutrition.protein}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-100 text-center">
                  <span className="text-slate-500 block text-[10px]">SUGAR</span>
                  <span className="font-extrabold text-slate-900 text-sm">{product.nutrition.sugar}</span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-100 text-center">
                  <span className="text-slate-500 block text-[10px]">CALORIES</span>
                  <span className="font-extrabold text-slate-900 text-sm">{product.nutrition.calories}</span>
                </div>
              </div>
            </div>

            {/* Price & Add to Cart button */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block font-medium">Total Amount</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">₹{finalPrice}/-</span>
                  {currentPackInfo.discount > 0 && (
                    <span className="text-sm text-slate-400 line-through">₹{originalPrice}/-</span>
                  )}
                </div>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 text-white hover:bg-sky-600'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
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
