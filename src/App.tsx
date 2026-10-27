/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RangeSection } from './components/RangeSection';
import { CollectionSection } from './components/CollectionSection';
import { ScientificSection } from './components/ScientificSection';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickView } from './components/ProductQuickView';
import { CheckoutModal } from './components/CheckoutModal';
import { NotificationsModal } from './components/NotificationsModal';
import { AuthModal } from './components/AuthModal';
import { ShopView } from './components/ShopView';
import { BlogView } from './components/BlogView';
import { Product, CartItem, NotificationItem } from './types';
import { PRODUCTS, INITIAL_NOTIFICATIONS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'blog'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Glacier blue preloaded
      quantity: 1,
      selectedPack: 'single'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'Arjun Yadav',
    email: '27-arjun.yadav@fiib.edu.in'
  });

  const cartTotalCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const handleAddToCart = (product: Product, pack: 'single' | 'pack6' | 'pack12' = 'single') => {
    const multiplier = pack === 'pack12' ? 12 : pack === 'pack6' ? 6 : 1;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + multiplier }
            : item
        );
      }
      return [...prev, { product, quantity: multiplier, selectedPack: pack }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    setNotifications((prev) => [
      {
        id: `order-${Date.now()}`,
        title: 'Order Confirmed!',
        description: 'Your Aqua Bliss delivery has been scheduled. Track dispatch in your account.',
        timestamp: 'Just now',
        read: false,
        type: 'order'
      },
      ...prev
    ]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSelectRangeCategory = (rangeId: string) => {
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-sky-100 selection:text-sky-900">
      
      {/* Top Navbar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadNotificationsCount={unreadNotificationsCount}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Section 1: Hero */}
            <HeroSection onShopClick={() => setActiveTab('shop')} />

            {/* Section 2: Explore Our Range */}
            <RangeSection onSelectCategory={handleSelectRangeCategory} />

            {/* Section 3: The Aqua Bliss Collection */}
            <CollectionSection
              onAddToCart={handleAddToCart}
              onOpenQuickView={(p) => setQuickViewProduct(p)}
            />

            {/* Section 4: Scientifically Formulated for Peak Performance */}
            <ScientificSection />

            {/* Section 5: The Heart of Aqua Bliss */}
            <StorySection />
          </>
        )}

        {activeTab === 'shop' && (
          <ShopView
            onBackToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onOpenQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {activeTab === 'blog' && (
          <BlogView
            onBackToHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShopClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Section 6: Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Interactive Cart Slide-Over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Product Quick View & Nutrition Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Functional Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Notifications Drawer Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllNotificationsRead}
      />

      {/* User Login/Account Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onLogin={(name, email) => setUser({ name, email })}
        onLogout={() => setUser(null)}
      />

    </div>
  );
}
