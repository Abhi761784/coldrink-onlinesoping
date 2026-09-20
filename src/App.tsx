import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MoodQuencher } from './components/MoodQuencher';
import { CategoryFilter } from './components/CategoryFilter';
import { DrinkCard } from './components/DrinkCard';
import { DrinkDetailModal } from './components/DrinkDetailModal';
import { MixerStation } from './components/MixerStation';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { Footer } from './components/Footer';

import { DRINKS_DATA, MOOD_QUENCHERS } from './data/drinks';
import { Drink, CartItem, DrinkCategory, Language } from './types';
import { sounds } from './utils/sound';
import { ShoppingBag, ArrowRight, Sparkles, Snowflake } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = useState<DrinkCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      cartItemId: 'sample-1',
      drinkId: 'thunder-cola',
      name: 'Thunder Bolt Cola',
      selectedSize: 'Can',
      volume: '330ml',
      price: 45,
      quantity: 2,
      imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    },
    {
      cartItemId: 'sample-2',
      drinkId: 'nimbu-masala-banta',
      name: 'Desi Masala Nimbu Soda',
      selectedSize: 'Banta Bottle',
      volume: '300ml',
      price: 40,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals state
  const [activeDetailDrink, setActiveDetailDrink] = useState<Drink | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<{
    address: string;
    deliveryTime: string;
    total: number;
    items: CartItem[];
  } | null>(null);

  // Handlers
  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleAddToCart = (drink: Drink, sizeLabel: string, price: number, volume: string, quantity: number = 1) => {
    const existingIndex = cart.findIndex(
      (item) => item.drinkId === drink.id && item.selectedSize === sizeLabel
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        cartItemId: `${drink.id}-${sizeLabel}-${Date.now()}`,
        drinkId: drink.id,
        name: lang === 'en' ? drink.name : drink.nameHinglish,
        selectedSize: sizeLabel,
        volume: volume,
        price: price,
        quantity: quantity,
        imageUrl: drink.imageUrl,
      };
      setCart([...cart, newItem]);
    }
  };

  const handleAddCustomDrink = (customMix: {
    name: string;
    base: string;
    flavor: string;
    fizz: string;
    ice: string;
    garnish: string;
    price: number;
    color: string;
  }) => {
    const newItem: CartItem = {
      cartItemId: `custom-mix-${Date.now()}`,
      drinkId: 'custom-diy-drink',
      name: customMix.name,
      selectedSize: 'DIY Glass',
      volume: '400ml Chilled',
      price: customMix.price,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
      isCustomMix: true,
      customDetails: {
        base: customMix.base,
        flavor: customMix.flavor,
        fizz: customMix.fizz,
        ice: customMix.ice,
        garnish: customMix.garnish,
      },
    };
    setCart([...cart, newItem]);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
    } else {
      setCart(cart.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item)));
    }
  };

  const handleRemoveItem = (cartItemId: string) => {
    sounds.playClick();
    setCart(cart.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleCheckout = (orderDetails: {
    address: string;
    deliveryTime: string;
    total: number;
    items: CartItem[];
  }) => {
    setIsCartOpen(false);
    setTrackingOrder(orderDetails);
    setCart([]);
  };

  const scrollToMixer = () => {
    const el = document.getElementById('mixer-lab-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('drinks-menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<DrinkCategory, number> = {
      all: DRINKS_DATA.length,
      cola: 0,
      'desi-masala': 0,
      'fruit-chiller': 0,
      'energy-zero': 0,
      'crates-combos': 0,
    };
    DRINKS_DATA.forEach((d) => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered drinks
  const filteredDrinks = useMemo(() => {
    let list = [...DRINKS_DATA];

    // Mood filter
    if (selectedMood) {
      const moodObj = MOOD_QUENCHERS.find((m) => m.id === selectedMood);
      if (moodObj) {
        list = list.filter((d) => moodObj.recommendedIds.includes(d.id));
      }
    }

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((d) => d.category === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.nameHinglish.toLowerCase().includes(q) ||
          d.tagline.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q) ||
          d.searchKeywords?.some((k) => k.toLowerCase().includes(q) || q.includes(k.toLowerCase())) ||
          d.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedCategory, searchQuery, selectedMood]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-sky-200">
      {/* Sticky Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        lang={lang}
        onToggleLang={handleToggleLang}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateToMixer={scrollToMixer}
      />

      {/* Hero Showcase with Sub-Zero Guarantee */}
      <HeroBanner
        lang={lang}
        onExploreClick={scrollToMenu}
        onMixerClick={scrollToMixer}
      />

      {/* Mood Quencher filter bar */}
      <MoodQuencher
        selectedMood={selectedMood}
        onSelectMood={setSelectedMood}
        lang={lang}
      />

      {/* Main Catalog Section */}
      <main id="drinks-menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Section Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🧊</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {lang === 'en' ? 'Chilled Soda & Beverage Menu' : 'ताज़ा और ठंडी कोल्ड ड्रिंक्स'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'en'
                ? 'Hyper-carbonated bottles and cans chilled to -2°C, ready for instant quench.'
                : 'कड़क गैस, बर्फ जैसी ठंडक और हर घूंट में ताज़गी - 15 मिनट में डिलीवरी!'}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              lang={lang}
              counts={categoryCounts}
            />
          </div>
        </div>

        {/* Active Filter Indicators */}
        {(selectedMood || searchQuery) && (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">
              {lang === 'en' ? 'Active Filters:' : 'फ़िल्टर:'}
            </span>
            {selectedMood && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 font-bold">
                <span>
                  {MOOD_QUENCHERS.find((m) => m.id === selectedMood)?.label}
                </span>
                <button
                  onClick={() => setSelectedMood(null)}
                  className="hover:text-sky-950 ml-1 font-black cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold">
                <span>"{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:text-amber-950 ml-1 font-black cursor-pointer"
                >
                  ✕
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSelectedMood(null);
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-sky-600 hover:text-sky-800 font-bold ml-2 cursor-pointer"
            >
              {lang === 'en' ? 'Reset All' : 'सभी हटाएं'}
            </button>
          </div>
        )}

        {/* Drinks Grid */}
        {filteredDrinks.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 rounded-3xl border border-slate-200">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-base font-extrabold text-slate-800">
              {lang === 'en' ? 'No cold drinks found' : 'कोई कोल्ड ड्रिंक नहीं मिली'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {lang === 'en'
                ? 'Try searching for "cola", "nimbu", "mango", or clear your filter.'
                : '"कोला", "नींबू", या "बंटा" सर्च करें अथवा फ़िल्टर हटाएं।'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMood(null);
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-sky-600 text-white text-xs font-bold rounded-full hover:bg-sky-500 cursor-pointer shadow-xs"
            >
              {lang === 'en' ? 'View All Drinks' : 'सारे ड्रिंक्स देखें'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDrinks.map((drink) => (
              <DrinkCard
                key={drink.id}
                drink={drink}
                lang={lang}
                onAddToCart={(d, size, price, vol) => handleAddToCart(d, size, price, vol, 1)}
                onOpenDetail={(d) => setActiveDetailDrink(d)}
              />
            ))}
          </div>
        )}

      </main>

      {/* DIY Soda Mixer Station Lab */}
      <MixerStation
        lang={lang}
        onAddCustomDrink={handleAddCustomDrink}
      />

      {/* Floating Bottom Quick-Cart Bar for Mobile / High-Accessibility */}
      {cart.length > 0 && (
        <div className="fixed bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 max-w-xl mx-auto z-40 animate-slide-up">
          <div className="bg-slate-950/95 backdrop-blur-md text-white p-2.5 sm:p-3.5 rounded-2xl shadow-2xl border border-sky-500/30 flex items-center justify-between gap-2.5 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-sky-500 flex items-center justify-center font-black text-slate-950 text-sm sm:text-base shadow-sm shrink-0">
                🥤
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-xs font-bold text-sky-300 flex items-center gap-1 sm:gap-1.5 truncate">
                  <Snowflake className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin text-sky-400 shrink-0" />
                  <span>{totalCartCount} {lang === 'en' ? 'Chilled Drinks' : 'ठंडी ड्रिंक्स'}</span>
                </div>
                <div className="text-xs sm:text-sm font-black text-white">
                  ₹{totalCartPrice}
                </div>
              </div>
            </div>

            <button
              id="floating-cart-view-btn"
              onClick={() => { sounds.playCanPop(); setIsCartOpen(true); }}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 min-h-[38px] rounded-xl bg-sky-500 hover:bg-sky-400 hover:scale-[1.02] active:scale-95 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-sky-500/30 hover:shadow-lg hover:shadow-sky-500/40 transition-all duration-200 cursor-pointer shrink-0"
            >
              <span>{lang === 'en' ? 'View Cart' : 'कार्ट देखें'}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Drink Detail Modal */}
      <DrinkDetailModal
        drink={activeDetailDrink}
        isOpen={Boolean(activeDetailDrink)}
        onClose={() => setActiveDetailDrink(null)}
        lang={lang}
        onAddToCart={(drink, size, price, vol, qty) => handleAddToCart(drink, size, price, vol, qty)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        lang={lang}
      />

      {/* Live Order Tracker Modal */}
      <OrderTrackingModal
        isOpen={Boolean(trackingOrder)}
        onClose={() => setTrackingOrder(null)}
        orderDetails={trackingOrder}
        lang={lang}
      />

      {/* Chilled Footer */}
      <Footer lang={lang} />
    </div>
  );
}
