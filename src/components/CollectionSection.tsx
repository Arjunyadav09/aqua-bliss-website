import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockData';
import { ShoppingBag, Eye, Check, Star } from 'lucide-react';

interface CollectionSectionProps {
  onAddToCart: (product: Product, pack?: 'single' | 'pack6' | 'pack12') => void;
  onOpenQuickView: (product: Product) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onAddToCart,
  onOpenQuickView
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'Active' | 'Elite'>('all');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, 'single');
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  return (
    <section id="collection" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2 block">
              Pure Whey Isolate Infusions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              The Aqua Bliss Collection
            </h2>
          </div>

          {/* Filter segment */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Bottles
            </button>
            <button
              onClick={() => setActiveFilter('Active')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'Active'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Active (15g Protein)
            </button>
            <button
              onClick={() => setActiveFilter('Elite')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'Elite'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Elite (25g Protein)
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isJustAdded = addedProductId === product.id;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-square w-full bg-slate-50 flex items-center justify-center p-6 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/images/bottle_cutout.png';
                    }}
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-slate-900 text-white shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Category pill */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-sky-50 text-sky-700 border border-sky-200/60">
                      {product.proteinGrams}g Protein
                    </span>
                  </div>

                  {/* Quick view button overlay */}
                  <button
                    onClick={() => onOpenQuickView(product)}
                    className="absolute inset-x-6 bottom-4 py-2 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-semibold rounded-xl shadow-md border border-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-slate-900 hover:text-white cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View & Nutrition</span>
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-medium">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-slate-500 text-[11px] ml-1">(4.9/5)</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {product.name}
                    </h3>

                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Per bottle</span>
                      <span className="text-2xl font-black text-slate-900 tracking-tight">
                        ₹{product.formattedPrice}
                      </span>
                    </div>

                    <button
                      onClick={() => handleQuickAdd(product)}
                      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-900 text-white hover:bg-sky-600'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Shop Now</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
