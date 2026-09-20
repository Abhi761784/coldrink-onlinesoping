import React, { useState } from 'react';
import { Plus, ThermometerSnowflake, Sparkles, Check } from 'lucide-react';
import { Drink, Language } from '../types';
import { sounds } from '../utils/sound';

interface DrinkCardProps {
  drink: Drink;
  lang: Language;
  onAddToCart: (drink: Drink, sizeLabel: string, price: number, volume: string) => void;
  onOpenDetail: (drink: Drink) => void;
}

export const DrinkCard: React.FC<DrinkCardProps> = ({
  drink,
  lang,
  onAddToCart,
  onOpenDetail,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  const currentSize = drink.availableSizes[selectedSizeIndex] || drink.availableSizes[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playCanPop();
    onAddToCart(drink, currentSize.label, currentSize.price, currentSize.volume);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1200);
  };

  return (
    <div
      id={`drink-card-${drink.id}`}
      onClick={() => onOpenDetail(drink)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Image Container with Condensation & Temperature Pill */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={drink.imageUrl}
          alt={drink.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
          {drink.badgeText && (
            <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold shadow-xs">
              {drink.badgeText}
            </span>
          )}
          <span className="ml-auto px-2 py-0.5 rounded-md bg-sky-500/90 backdrop-blur-xs text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs">
            <ThermometerSnowflake className="w-3 h-3" />
            <span>{drink.chillTemp}</span>
          </span>
        </div>

        {/* Fizz Bubble Rating at bottom of image */}
        <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/70 backdrop-blur-xs text-[11px] text-sky-200 font-medium">
          <span>{lang === 'en' ? 'Fizz:' : 'गैस:'}</span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <span
                key={lvl}
                className={`w-2 h-2 rounded-full ${
                  lvl <= drink.fizzLevel ? 'bg-sky-400 animate-pulse' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {drink.isZeroSugar && (
          <div className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded-full bg-emerald-700/80 backdrop-blur-xs text-[10px] text-white font-bold">
            0 Sugar
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-extrabold text-base text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
            {lang === 'en' ? drink.name : drink.nameHinglish}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {lang === 'en' ? drink.tagline : drink.taglineHinglish}
          </p>

          {/* Size Selector Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {drink.availableSizes.map((size, idx) => {
              const isSelected = selectedSizeIndex === idx;
              return (
                <button
                  key={size.label}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    sounds.playClick();
                    setSelectedSizeIndex(idx);
                  }}
                  className={`px-2.5 py-1.5 min-h-[34px] text-[11px] font-bold rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? 'bg-sky-50 border-sky-400 text-sky-700 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {size.label} ({size.volume})
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Price and Add Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">
                ₹{currentSize.price}
              </span>
              {drink.originalPrice && selectedSizeIndex === 0 && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{drink.originalPrice}
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              {currentSize.volume} • Chilled
            </div>
          </div>

          {/* Add to Cart button */}
          <button
            type="button"
            onClick={handleAdd}
            className={`px-3.5 py-2.5 sm:py-2 min-h-[42px] sm:min-h-[38px] rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
              isAddedAnimation
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-sky-600 hover:bg-sky-500 text-white hover:shadow-md hover:shadow-sky-500/20 active:scale-95'
            }`}
          >
            {isAddedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>{lang === 'en' ? 'Added!' : 'जोड़ा गया!'}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>{lang === 'en' ? 'Add Chilled' : 'कार्ट में डालें'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
