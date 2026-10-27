import React, { useState } from 'react';
import { ShoppingBag, User, Bell, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'shop' | 'blog';
  setActiveTab: (tab: 'home' | 'shop' | 'blog') => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenAuth,
  onOpenNotifications,
  unreadNotificationsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'shop' | 'blog') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left cursor-pointer focus-visible:outline-none"
            aria-label="Aqua Bliss Home"
          >
            <img
              src="/images/logo.png"
              alt="Aqua Bliss logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              onError={(e) => {
                // Fallback in case image fails
                const target = e.currentTarget;
                target.style.display = 'none';
              }}
            />
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              Aqua Bliss
            </span>
          </button>
        </div>

        {/* Desktop Nav Zone */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => handleNavClick('home')}
            className={`cursor-pointer transition-colors py-1 ${
              activeTab === 'home'
                ? 'text-sky-600 font-semibold border-b-2 border-sky-600'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('blog')}
            className={`cursor-pointer transition-colors py-1 ${
              activeTab === 'blog'
                ? 'text-sky-600 font-semibold border-b-2 border-sky-600'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Blog
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className={`cursor-pointer transition-colors py-1 ${
              activeTab === 'shop'
                ? 'text-sky-600 font-semibold border-b-2 border-sky-600'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Shop
          </button>
          <button
            onClick={onOpenNotifications}
            className="relative cursor-pointer transition-colors text-slate-600 hover:text-slate-950 flex items-center gap-1.5"
            aria-label="Notifications"
          >
            <span>Notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600"></span>
              </span>
            )}
          </button>
        </nav>

        {/* Action Zone */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={() => handleNavClick('shop')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-sky-600 transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap"
          >
            Shop Now
          </button>

          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-sky-600 transition-colors p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
            aria-label="Account Login"
          >
            <User className="w-5 h-5 text-slate-600" />
            <span className="hidden lg:inline text-sm">Log In</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2 text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-slate-800" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-sky-600 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              activeTab === 'home' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('blog')}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              activeTab === 'blog' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Blog
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              activeTab === 'shop' ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Shop
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenNotifications();
            }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
          >
            <span>Notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="bg-sky-100 text-sky-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                {unreadNotificationsCount} new
              </span>
            )}
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('shop')}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
