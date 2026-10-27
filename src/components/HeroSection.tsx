import React from 'react';
import { ArrowRight, Zap, ShieldCheck, Droplets } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-white pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold tracking-wide uppercase">
              <Droplets className="w-3.5 h-3.5 text-sky-600" />
              <span>Next-Generation Functional Hydration</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
              Pure Hydration. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">
                Powered by Protein.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Aqua Bliss delivers 15g and 25g of premium whey isolate with zero sugar. The ultimate performance drink for active lives and healthy bodies.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-slate-900 hover:bg-sky-600 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#range"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 text-base font-medium text-slate-700 hover:text-slate-950 bg-slate-100/80 hover:bg-slate-200/70 rounded-xl transition-colors cursor-pointer"
              >
                Explore Range
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-left">
                <div className="flex items-center gap-1.5 text-sky-600 font-bold text-lg sm:text-xl">
                  <Zap className="w-4 h-4 shrink-0" />
                  <span>15g / 25g</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Whey Isolate</p>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5 text-sky-600 font-bold text-lg sm:text-xl">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>0g Sugar</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Zero Recovery Lag</p>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5 text-sky-600 font-bold text-lg sm:text-xl">
                  <Droplets className="w-4 h-4 shrink-0" />
                  <span>4 Ionic</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Electrolytes</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden bg-gradient-to-tr from-sky-100 via-sky-50 to-white border border-sky-100 shadow-xl group">
              <img
                src="/images/hero.png"
                alt="Aqua Bliss Pure Hydration Powered by Protein"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = '/images/bottle_cutout.png';
                }}
              />

              {/* Floating Highlight Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">Performance Drink</p>
                  <p className="text-sm sm:text-base font-bold text-slate-900">Glacier Blue & Mango Sunshine</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Starting at</span>
                  <span className="text-lg font-extrabold text-slate-900">₹99/-</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
