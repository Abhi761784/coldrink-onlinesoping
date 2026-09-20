import React, { useState } from 'react';
import { X, ThermometerSnowflake, Sparkles, Plus, Minus, Check, Flame } from 'lucide-react';
import { Drink, Language } from '../types';
import { sounds } from '../utils/sound';

interface DrinkDetailModalProps {
  drink: Drink | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddToCart: (drink: Drink, sizeLabel: string, price: number, volume: string, quantity: number) => void;
}

export const DrinkDetailModal: React.FC<DrinkDetailModalProps> = ({
  drink,
  isOpen,
  onClose,
  lang,
  onAddToCart,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Reset local state when a new drink is opened
  React.useEffect(() => {
    if (drink && isOpen) {
      setSelectedSizeIndex(0);
      setQuantity(1);
      setJustAdded(false);
    }
  }, [drink?.id, isOpen]);

  if (!isOpen || !drink) return null;

  const currentSize = drink.availableSizes[selectedSizeIndex] || drink.availableSizes[0];

  const handleAdd = () => {
    sounds.playCanPop();
    onAddToCart(drink, currentSize.label, currentSize.price, currentSize.volume, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/75 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[94vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => { sounds.playClick(); onClose(); }}
          className="absolute top-3 right-3 z-10 p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-all cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-0 flex-1">
          {/* Hero Banner Image */}
          <div className="relative h-48 sm:h-72 w-full bg-slate-900">
            <img
              src={drink.imageUrl}
              alt={drink.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            
            {/* Badges on image */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-2">
              {drink.badgeText && (
                <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-extrabold text-xs shadow-md">
                  {drink.badgeText}
                </span>
              )}
              <span className="px-2.5 py-1 rounded-lg bg-sky-500 text-white font-extrabold text-xs flex items-center gap-1 shadow-md">
                <ThermometerSnowflake className="w-3.5 h-3.5" />
                <span>{drink.chillTemp} Sub-Zero</span>
              </span>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
              <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">
                {lang === 'en' ? drink.name : drink.nameHinglish}
              </h2>
              <p className="text-xs sm:text-sm text-sky-200 font-medium mt-0.5 sm:mt-1">
                {lang === 'en' ? drink.tagline : drink.taglineHinglish}
              </p>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Description */}
            <p className="text-sm text-slate-700 leading-relaxed">
              {lang === 'en' ? drink.description : drink.descriptionHinglish}
            </p>

            {/* Flavor & Taste Meters */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                <span>{lang === 'en' ? 'Flavor Radar & Chill Factor' : 'स्वाद और गैस प्रोफाइल'}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                {/* Fizz */}
                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>{lang === 'en' ? 'Fizz Intensity' : 'गैस / फिज़'}</span>
                    <span className="text-sky-600">{drink.fizzLevel} / 5</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full transition-all"
                      style={{ width: `${(drink.fizzLevel / 5) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Sweetness */}
                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>{lang === 'en' ? 'Sweetness' : 'मिठास'}</span>
                    <span className="text-amber-600">{drink.sweetness}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${drink.sweetness}%` }}
                    />
                  </div>
                </div>

                {/* Tanginess */}
                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>{lang === 'en' ? 'Tanginess' : 'खट्टापन'}</span>
                    <span className="text-lime-600">{drink.tanginess}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-lime-500 rounded-full transition-all"
                      style={{ width: `${drink.tanginess}%` }}
                    />
                  </div>
                </div>

                {/* Kick / Punch */}
                <div>
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>{lang === 'en' ? 'Throat Kick' : 'तीखा किक'}</span>
                    <span className="text-red-600">{drink.kick}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full transition-all"
                      style={{ width: `${drink.kick}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Quick stats banner */}
              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600 font-medium">
                <div>🔥 {drink.calories} kcal / serving</div>
                <div>❄️ {lang === 'en' ? 'Serving Temp: -2°C to 0°C' : 'सर्विंग तापमान: -2°C कड़क ठंडा'}</div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                {lang === 'en' ? 'Key Ingredients' : 'मुख्य सामग्री'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {drink.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                {lang === 'en' ? 'Choose Size / Packaging' : 'साइज चुनें'}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {drink.availableSizes.map((size, idx) => {
                  const isSelected = selectedSizeIndex === idx;
                  return (
                    <button
                      key={size.label}
                      onClick={() => { sounds.playClick(); setSelectedSizeIndex(idx); }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-50 border-sky-500 text-sky-950 ring-2 ring-sky-300/40 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-extrabold">{size.label}</div>
                      <div className="text-[11px] text-slate-500">{size.volume}</div>
                      <div className="text-sm font-black text-slate-900 mt-1">₹{size.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Sticky Footer with Quantity and Add Button */}
        <div className="p-3 sm:p-5 border-t border-slate-200 bg-white flex items-center justify-between gap-2.5 sm:gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-1.5 sm:gap-2 border border-slate-200 rounded-2xl p-1 bg-slate-50">
            <button
              onClick={() => {
                if (quantity > 1) {
                  sounds.playClick();
                  setQuantity(quantity - 1);
                }
              }}
              disabled={quantity <= 1}
              className="w-9 h-9 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center font-black cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 sm:w-8 text-center text-sm font-black text-slate-900">
              {quantity}
            </span>
            <button
              onClick={() => {
                sounds.playClick();
                setQuantity(quantity + 1);
              }}
              className="w-9 h-9 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-black cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-3 sm:py-3.5 px-4 sm:px-5 min-h-[44px] rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/25 active:scale-98'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{lang === 'en' ? 'Added to Chiller!' : 'कार्ट में जोड़ा गया!'}</span>
              </>
            ) : (
              <>
                <span>{lang === 'en' ? 'Add to Cart' : 'कार्ट में डालें'}</span>
                <span>•</span>
                <span>₹{currentSize.price * quantity}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
