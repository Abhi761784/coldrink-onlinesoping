import React from 'react';
import { MOOD_QUENCHERS } from '../data/drinks';
import { Language } from '../types';
import { sounds } from '../utils/sound';

interface MoodQuencherProps {
  selectedMood: string | null;
  onSelectMood: (moodId: string | null) => void;
  lang: Language;
}

export const MoodQuencher: React.FC<MoodQuencherProps> = ({
  selectedMood,
  onSelectMood,
  lang,
}) => {
  const handleClick = (id: string) => {
    sounds.playClick();
    if (selectedMood === id) {
      onSelectMood(null);
    } else {
      onSelectMood(id);
      sounds.playIceClink();
    }
  };

  return (
    <div className="bg-slate-50 border-b border-slate-200/80 py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>{lang === 'en' ? 'Quick Mood Quencher' : 'कैसा है आपका मूड?'}</span>
              <span className="text-xs font-medium text-slate-500">
                {lang === 'en' ? '— Filter sodas by your current craving' : '— अपनी जरूरत के हिसाब से ड्रिंक चुनें'}
              </span>
            </h2>
          </div>
          {selectedMood && (
            <button
              onClick={() => { sounds.playClick(); onSelectMood(null); }}
              className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors self-start md:self-auto cursor-pointer"
            >
              {lang === 'en' ? '✕ Clear Mood Filter' : '✕ फ़िल्टर हटाएं'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {MOOD_QUENCHERS.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                id={`mood-btn-${mood.id}`}
                onClick={() => handleClick(mood.id)}
                className={`text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20 scale-[1.02]'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-sky-300 hover:bg-sky-50/50'
                }`}
              >
                <div className="font-extrabold text-xs sm:text-sm leading-tight">
                  {lang === 'en' ? mood.label : mood.labelHi}
                </div>
                <div className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                  {mood.tag}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
