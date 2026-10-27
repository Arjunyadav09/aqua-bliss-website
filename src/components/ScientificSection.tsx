import React from 'react';
import { SCIENTIFIC_PILLARS } from '../data/mockData';
import { Dna, Activity, Sparkles } from 'lucide-react';

const icons = [
  <Dna key="dna" className="w-6 h-6 text-sky-600" />,
  <Activity key="activity" className="w-6 h-6 text-sky-600" />,
  <Sparkles key="sparkles" className="w-6 h-6 text-sky-600" />
];

export const ScientificSection: React.FC = () => {
  const marqueeItems = [
    'LOW CARB',
    'HIGH PROTEIN',
    'ELECTROLYTES',
    'ZERO SUGAR',
    '100% WHEY ISOLATE',
    'CLEAN HYDRATION',
    'FAST ABSORPTION',
    'NO CHALKINESS'
  ];

  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
      {/* Ticker / Marquee Ribbon */}
      <div className="border-y border-slate-800 bg-slate-950/70 py-3 mb-16 overflow-hidden select-none">
        <div className="flex w-max animate-marquee space-x-8 text-xs sm:text-sm font-extrabold tracking-widest text-sky-400 uppercase">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((text, i) => (
            <div key={i} className="flex items-center gap-8">
              <span>{text}</span>
              <span className="text-slate-600 font-normal">●</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400 block mb-3">
            Sports Nutrition Engineered
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Scientifically Formulated for Peak Performance
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed text-balance">
            Every bottle is calibrated for rapid osmolarity and pure protein delivery, eliminating digestion heavy-load so you stay light and powerful.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SCIENTIFIC_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700/70 hover:border-sky-500/50 hover:bg-slate-800/90 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-xl bg-sky-950/80 border border-sky-800/60 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:bg-sky-900 transition-all duration-200">
                  {icons[idx]}
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-sky-400 tracking-wider uppercase block">
                    {pillar.stat}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span>Clinical Standard</span>
                <span className="font-semibold text-sky-300">{pillar.metric}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
