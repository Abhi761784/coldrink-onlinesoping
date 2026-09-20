import React from 'react';
import { DrinkCategory, Language } from '../types';
import { sounds } from '../utils/sound';

interface CategoryFilterProps {
  selectedCategory: DrinkCategory;
  onSelectCategory: (category: DrinkCategory) => void;
  lang: Language;
  counts: Record<DrinkCategory, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  lang,
  counts,
}) => {
  const categories: { id: DrinkCategory; nameEn: string; nameHi: string; icon: string }[] = [
    { id: 'all', nameEn: 'All Drinks', nameHi: 'सभी ड्रिंक्स', icon: '🥤' },
    { id: 'cola', nameEn: 'Colas & Sodas', nameHi: 'कड़क कोला', icon: '⚡' },
    { id: 'desi-masala', nameEn: 'Desi Masala Banta', nameHi: 'देसी मसाला बंटा', icon: '🍋' },
    { id: 'fruit-chiller', nameEn: 'Fruit Chillers', nameHi: 'फ्रूट चिल्लर्स', icon: '🥭' },
    { id: 'energy-zero', nameEn: 'Energy & Zero Sugar', nameHi: 'एनर्जी और डाइट', icon: '🍃' },
    { id: 'crates-combos', nameEn: 'Party Crates & Combos', nameHi: 'पार्टी क्रेट्स', icon: '📦' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const count = counts[cat.id] || 0;
        return (
          <button
            key={cat.id}
            id={`filter-${cat.id}`}
            onClick={() => {
              sounds.playClick();
              onSelectCategory(cat.id);
            }}
            className={`shrink-0 flex items-center gap-2 px-3.5 sm:px-4 py-2 min-h-[38px] rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              isSelected
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 scale-[1.02]'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{lang === 'en' ? cat.nameEn : cat.nameHi}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isSelected ? 'bg-sky-700/60 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
