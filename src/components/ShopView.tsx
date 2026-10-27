import React, { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';
import { ShoppingBag, Eye, Star, Filter, ArrowLeft, Check } from 'lucide-react';

interface ShopViewProps {
  onBackToHome: () => void;
  onAddToCart: (product: Product, pack?: 'single' | 'pack6' | 'pack12') => void;
  onOpenQuickView: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  onBackToHome,
  onAddToCart,
  onOpenQuickView
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Active' | 'Elite'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'protein'>('featured');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.flavor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'protein') return b.proteinGrams - a.proteinGrams;
    return 0;
  });

  const handleAdd = (product: Product) => {
    onAddToCart(product, 'single');
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="py-12 bg-slate-50/50 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filtered.length} products
          </span>
        </div>

        {/* Title & Filter Bar */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm mb-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Official Aqua Bliss Catalog
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Shop High-Protein Hydration
              </h1>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72">
              <input
                type="text"
                placeholder="Search flavor, protein..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Tier:</span>
              </span>
              {(['all', 'Active', 'Elite'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Products' : cat === 'Active' ? 'Active (15g)' : 'Elite (25g)'}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 font-semibold bg-white focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="protein">Highest Protein</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((product) => {
            const isAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image Showcase */}
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

                  {product.badge && (
                    <span className="absolute top-4 left-4 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-slate-900 text-white shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  <span className="absolute top-4 right-4 px-2.5 py-1 text-[11px] font-bold rounded-md bg-sky-50 text-sky-700 border border-sky-200/60">
                    {product.proteinGrams}g Whey Isolate
                  </span>

                  <button
                    onClick={() => onOpenQuickView(product)}
                    className="absolute inset-x-6 bottom-4 py-2 bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-semibold rounded-xl shadow-md border border-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-slate-900 hover:text-white cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View & Facts</span>
                  </button>
                </div>

                {/* Details */}
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

                    <div className="flex flex-wrap gap-2 pt-2 text-[11px] text-slate-500">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">Zero Sugar</span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">Electrolytes</span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">500ml</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Per bottle</span>
                      <span className="text-2xl font-black text-slate-900 tracking-tight">
                        ₹{product.formattedPrice}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-900 text-white hover:bg-sky-600'
                      }`}
                    >
                      {isAdded ? (
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
    </div>
  );
};
