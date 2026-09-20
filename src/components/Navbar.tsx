import React, { useState } from 'react';
import { ShoppingBag, Volume2, VolumeX, Search, Sparkles, ThermometerSnowflake, Languages } from 'lucide-react';
import { Language } from '../types';
import { sounds } from '../utils/sound';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  lang: Language;
  onToggleLang: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateToMixer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  lang,
  onToggleLang,
  searchQuery,
  onSearchChange,
  onNavigateToMixer,
}) => {
  const [soundOn, setSoundOn] = useState(sounds.isEnabled());
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleToggleSound = () => {
    const next = sounds.toggleSound();
    setSoundOn(next);
    if (next) sounds.playCanPop();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-xs">
      {/* Top micro-bar for cold temperature guarantee */}
      <div className="bg-sky-600 text-white text-xs py-1 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1">
          <ThermometerSnowflake className="w-3.5 h-3.5 animate-pulse text-sky-200" />
          <span>{lang === 'en' ? 'Central Chiller: -3°C Super Cold Guarantee' : 'सेंट्रल चिलर: -3°C बर्फ जैसी ठंडी डिलीवरी'}</span>
        </span>
        <span className="hidden md:inline text-sky-300">|</span>
        <span className="hidden md:inline text-sky-100">
          {lang === 'en' ? '⚡ 15-Minute Ice-Cold Express Delivery in Your City' : '⚡ 15 मिनट में बिल्कुल ठंडी कोल्ड ड्रिंक आपके घर'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); sounds.playClick(); }}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md shadow-sky-500/20 text-white group-hover:scale-105 transition-transform shrink-0">
                <span className="text-lg sm:text-xl">🥤</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 flex items-center gap-1">
                  Chill<span className="text-sky-600">Drink</span>
                  <span className="hidden xs:inline text-[9px] sm:text-[10px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Cold</span>
                </span>
                <span className="hidden sm:block text-[11px] font-semibold text-slate-500 -mt-1">
                  {lang === 'en' ? 'Sodas & Chilled Sips' : 'कोल्ड ड्रिंक और देसी बंटा'}
                </span>
              </div>
            </a>
          </div>

          {/* Search bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="search-input-desktop"
                type="text"
                placeholder={lang === 'en' ? 'Search Thums Up, Coca-Cola, Desi Banta, Masala Soda...' : 'सर्च करें: थम्स अप, कोका-कोला, देसी बंटा, नींबू सोडा...'}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white rounded-full border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all placeholder:text-slate-400 text-slate-800"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold px-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* DIY Soda Maker Shortcut */}
            <button
              id="diy-mixer-shortcut"
              onClick={() => { sounds.playClick(); onNavigateToMixer(); }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs hover:shadow-md hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{lang === 'en' ? 'DIY Fizz Mixer 🧪' : 'अपना ड्रिंक बनाओ 🧪'}</span>
            </button>

            {/* Mobile Search Toggle */}
            <button
              id="mobile-search-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Sound FX Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={handleToggleSound}
              title={soundOn ? (lang === 'en' ? 'Mute fizz sounds' : 'आवाज़ बंद करें') : (lang === 'en' ? 'Unmute fizz sounds' : 'आवाज़ चालू करें')}
              className={`p-2 rounded-full border transition-all min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer ${
                soundOn 
                  ? 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100' 
                  : 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-600'
              }`}
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={() => { sounds.playClick(); onToggleLang(); }}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors min-h-[38px] cursor-pointer"
              title="Change Language"
            >
              <Languages className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span className="hidden sm:inline">{lang === 'en' ? 'हिंदी / Hinglish' : 'English'}</span>
              <span className="sm:hidden font-bold">{lang === 'en' ? 'हिं' : 'EN'}</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="cart-btn"
              onClick={() => { sounds.playCanPop(); onOpenCart(); }}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-slate-900 hover:bg-slate-800 text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all min-h-[38px] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">{lang === 'en' ? 'Chiller Cart' : 'कार्ट'}</span>
              {cartCount > 0 ? (
                <span className="bg-sky-500 text-white text-[10px] sm:text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-scale">
                  {cartCount}
                </span>
              ) : (
                <span className="bg-slate-700 text-slate-300 text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full">
                  0
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-3 pt-1">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="search-input-mobile"
                type="text"
                autoFocus
                placeholder={lang === 'en' ? 'Search Thums Up, Coca-Cola, Banta...' : 'सर्च करें: थम्स अप, कोका-कोला, बंटा...'}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 rounded-full border border-slate-200 focus:border-sky-500 focus:bg-white outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
