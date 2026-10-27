import React from 'react';
import { Award, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-sky-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story Prose */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Our Origins & Purpose</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              The Heart of Aqua Bliss
            </h3>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Born from a relentless pursuit of better hydration, Aqua Bliss was created for those who refuse to compromise. We believe that what you put into your body should work as hard as you do. Our mission is simple: to merge pure hydration with high-performance nutrition, empowering every athlete and health-conscious individual to reach their peak state, one refreshing sip at a time.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Chalky Residue</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Cold micro-filtered whey that drinks cleanly like crisp spring water.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                <Award className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Athlete Tested</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Formulated with certified nutritionists for seamless gastric emptying.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-xs">
                <HeartHandshake className="w-6 h-6 text-sky-600" />
              </div>
              <p className="text-xs sm:text-sm text-sky-950 font-medium">
                "We believe you should never have to choose between genuine refreshment and serious muscle-building nutrition."
              </p>
            </div>
          </div>

          {/* Right Column: Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <img
                src="/images/heart_aqua_bliss.jpg"
                alt="The Heart of Aqua Bliss"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = '/images/range_recovery.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">Brand Manifesto</p>
                <p className="text-lg font-bold text-white mt-1">
                  Pure Hydration. Powered by Protein.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
