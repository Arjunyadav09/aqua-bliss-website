import React from 'react';
import { Mail, Instagram, Twitter, Facebook, Linkedin, Youtube, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: 'home' | 'shop' | 'blog') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Aqua Bliss"
                className="h-10 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                }}
              />
              <span className="text-2xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
                Aqua Bliss
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The ultimate protein-based hydration for active and health-conscious lifestyles.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-sky-400">
              <button
                onClick={() => onNavClick('home')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>•</span>
              <button
                onClick={() => onNavClick('shop')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Shop Collection
              </button>
              <span>•</span>
              <button
                onClick={() => onNavClick('blog')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Nutrition Blog
              </button>
            </div>
          </div>

          {/* Col 1: Our Mission */}
          <div className="lg:col-span-3 space-y-3">
            <h6 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Our Mission
            </h6>
            <p className="text-base font-semibold text-white">
              Pure Hydration. Powered by Protein.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              To deliver crystal-clear, zero-sugar protein nourishment that fuels high output, accelerates physiological recovery, and elevates daily human vitality.
            </p>
          </div>

          {/* Col 2: Contact Us */}
          <div className="lg:col-span-2 space-y-3">
            <h6 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Contact Us
            </h6>
            <div className="space-y-1.5 text-xs">
              <span className="text-slate-400 block">General Inquiries:</span>
              <a
                href="mailto:hello@aquabliss.com"
                className="text-white hover:text-sky-300 font-medium inline-flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>hello@aquabliss.com</span>
              </a>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Response time: Within 24 business hours.
            </p>
          </div>

          {/* Col 3: Stay Connected */}
          <div className="lg:col-span-2 space-y-3">
            <h6 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Stay Connected
            </h6>
            <p className="text-xs text-slate-400">
              Follow our community of athletes and creators:
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-500 hover:bg-slate-800 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-500 hover:bg-slate-800 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-500 hover:bg-slate-800 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-500 hover:bg-slate-800 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-500 hover:bg-slate-800 transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Aqua Bliss. Powered by Protein. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
