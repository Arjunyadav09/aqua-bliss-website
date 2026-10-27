import React from 'react';
import { RANGES } from '../data/mockData';
import { ArrowUpRight } from 'lucide-react';

interface RangeSectionProps {
  onSelectCategory: (category: string) => void;
}

export const RangeSection: React.FC<RangeSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="range" className="py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Our Range
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Discover functional beverages crafted for your lifestyle. From rapid recovery to daily vitality, choose the hydration that fuels your movement.
          </p>
        </div>

        {/* 3 Range Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RANGES.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = '/images/hero.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                {/* Tag pill */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-slate-900 shadow-sm">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-medium text-sky-200 tracking-wider uppercase block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-white flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900">
                  <span className="text-sky-700">{item.protein}</span>
                  <span className="text-slate-400 group-hover:text-slate-900 transition-colors">
                    Explore Flavors →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
