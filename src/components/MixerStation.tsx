import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Plus, Check, RefreshCw, Snowflake, Flame } from 'lucide-react';
import { MIXER_BASES, MIXER_FLAVORS, MIXER_GARNISHES } from '../data/drinks';
import { Language } from '../types';
import { sounds } from '../utils/sound';

interface MixerStationProps {
  lang: Language;
  onAddCustomDrink: (customMix: {
    name: string;
    base: string;
    flavor: string;
    fizz: string;
    ice: string;
    garnish: string;
    price: number;
    color: string;
  }) => void;
}

export const MixerStation: React.FC<MixerStationProps> = ({
  lang,
  onAddCustomDrink,
}) => {
  const [selectedBase, setSelectedBase] = useState(MIXER_BASES[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(MIXER_FLAVORS[0]);
  const [fizzLevel, setFizzLevel] = useState(5);
  const [iceLevel, setIceLevel] = useState<'normal' | 'extra-crushed' | 'sub-zero'>('extra-crushed');
  const [selectedGarnishes, setSelectedGarnishes] = useState<string[]>(['mint', 'lemon-slice']);
  const [customName, setCustomName] = useState('My Summer Banta Fizz');
  const [isPouring, setIsPouring] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Calculated price
  const basePrice = 50;
  const garnishPrice = selectedGarnishes.length * 5;
  const totalPrice = basePrice + garnishPrice;

  const toggleGarnish = (id: string) => {
    sounds.playClick();
    if (selectedGarnishes.includes(id)) {
      setSelectedGarnishes(selectedGarnishes.filter((g) => g !== id));
    } else {
      setSelectedGarnishes([...selectedGarnishes, id]);
    }
  };

  const handleBaseChange = (base: typeof MIXER_BASES[0]) => {
    sounds.playFizz();
    setSelectedBase(base);
    triggerPourEffect();
  };

  const handleFlavorChange = (flavor: typeof MIXER_FLAVORS[0]) => {
    sounds.playFizz();
    setSelectedFlavor(flavor);
    triggerPourEffect();
  };

  const triggerPourEffect = () => {
    setIsPouring(true);
    setTimeout(() => setIsPouring(false), 800);
  };

  const handleAddCustomToCart = () => {
    sounds.playCanPop();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: [selectedFlavor.color, '#38bdf8', '#fbbf24'],
      });
    } catch {
      // Ignore
    }

    const garnishNames = selectedGarnishes
      .map((gId) => MIXER_GARNISHES.find((item) => item.id === gId)?.name)
      .filter(Boolean)
      .join(', ') || 'No Garnish';

    onAddCustomDrink({
      name: customName || (lang === 'en' ? 'Custom Chiller Mix' : 'कस्टम चिल्ड मिक्स'),
      base: selectedBase.name,
      flavor: selectedFlavor.name,
      fizz: `${fizzLevel}/5 Carbonation`,
      ice: iceLevel === 'extra-crushed' ? 'Extra Crushed Ice' : iceLevel === 'sub-zero' ? 'Sub-Zero Arctic' : 'Normal Chilled',
      garnish: garnishNames,
      price: totalPrice,
      color: selectedFlavor.color,
    });

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <section id="mixer-lab-section" className="py-12 bg-gradient-to-b from-sky-950 via-slate-900 to-sky-950 text-white relative overflow-hidden border-y border-sky-800/60">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'DIY Cold Drink Lab' : 'देसी बंटा और सोडा मिक्सर'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            {lang === 'en' ? 'Mix Your Own Chilled Soda' : 'बनाएं अपनी मनपसंद ठंडी कोल्ड ड्रिंक!'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2">
            {lang === 'en'
              ? 'Select your fizzy soda base, flavor syrup, sub-zero ice level, and chatpata garnishes. Freshly bottled in a sanitized chilled glass.'
              : 'सोडा बेस, फ्लेवर, बर्फ की मात्रा और काला नमक-पुदीना चुनें। लाइव ग्लास में बनते हुए देखें!'}
          </p>
        </div>

        {/* Studio Grid: Controls on Left & Live Glass on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Base Soda */}
            <div className="bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-slate-800 backdrop-blur-xs">
              <label className="text-xs font-black uppercase tracking-wider text-sky-400 block mb-3">
                {lang === 'en' ? 'Step 1: Choose Fizzy Soda Base' : 'स्टेप 1: सोडा बेस चुनें'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {MIXER_BASES.map((base) => {
                  const isSelected = selectedBase.id === base.id;
                  return (
                    <button
                      key={base.id}
                      onClick={() => handleBaseChange(base)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-600/30 border-sky-400 text-white shadow-md shadow-sky-500/10 ring-1 ring-sky-400'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-lg mb-1">{base.icon}</div>
                      <div className="text-xs font-bold line-clamp-1">{lang === 'en' ? base.name : base.nameHi}</div>
                      <div className="text-[10px] text-sky-300/80 mt-0.5">{base.fizz}★ Fizz</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Flavor Syrup Shot */}
            <div className="bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-slate-800 backdrop-blur-xs">
              <label className="text-xs font-black uppercase tracking-wider text-amber-400 block mb-3">
                {lang === 'en' ? 'Step 2: Add Flavor Syrup Shot' : 'स्टेप 2: फ्लेवर सिरप चुनें'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MIXER_FLAVORS.map((flavor) => {
                  const isSelected = selectedFlavor.id === flavor.id;
                  return (
                    <button
                      key={flavor.id}
                      onClick={() => handleFlavorChange(flavor)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-white/10 border-white/60 text-white ring-1 ring-white/60 shadow-xs'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border border-white/30"
                        style={{ backgroundColor: flavor.color }}
                      />
                      <div className="text-xs font-bold line-clamp-1">
                        {lang === 'en' ? flavor.name : flavor.nameHi}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Fizz & Ice Levels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Fizz slider */}
              <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-sky-300 mb-2">
                  <span>{lang === 'en' ? 'Carbonation Level' : 'गैस की मात्रा'}</span>
                  <span className="text-sky-400 font-extrabold">{fizzLevel} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={fizzLevel}
                  onChange={(e) => {
                    sounds.playFizz();
                    setFizzLevel(Number(e.target.value));
                  }}
                  className="w-full accent-sky-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Gentle</span>
                  <span>Classic</span>
                  <span>Banta Pop 🔥</span>
                </div>
              </div>

              {/* Ice Level */}
              <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800">
                <div className="text-xs font-black uppercase tracking-wider text-cyan-300 mb-2">
                  {lang === 'en' ? 'Ice & Temperature' : 'बर्फ और ठंडक'}
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['normal', 'extra-crushed', 'sub-zero'] as const).map((lvl) => {
                    const isSelected = iceLevel === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => {
                          sounds.playIceClink();
                          setIceLevel(lvl);
                        }}
                        className={`p-1.5 rounded-lg border text-center text-[10px] font-bold cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {lvl === 'normal' ? 'Normal' : lvl === 'extra-crushed' ? 'Crushed 🧊' : 'Arctic ❄️'}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Step 4: Garnishes */}
            <div className="bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                  {lang === 'en' ? 'Step 4: Chatpata Garnishes (+₹5 each)' : 'स्टेप 4: पुदीना, नींबू व मसाला गार्निश (+₹5)'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {selectedGarnishes.length} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {MIXER_GARNISHES.map((garnish) => {
                  const isSelected = selectedGarnishes.includes(garnish.id);
                  return (
                    <button
                      key={garnish.id}
                      onClick={() => toggleGarnish(garnish.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-1 ring-emerald-400'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{garnish.icon}</span>
                      <span>{lang === 'en' ? garnish.name : garnish.nameHi}</span>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drink Name Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={lang === 'en' ? 'Name your custom soda...' : 'अपने ड्रिंक का नाम रखें...'}
                className="flex-1 bg-slate-900 border border-slate-700 focus:border-sky-400 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
              />
              <button
                onClick={() => {
                  sounds.playClick();
                  const names = ['Delhi Chandni Fizz', 'Summer Monsoon Pop', 'Midnight Chiller', 'Zesty Banta Blast', 'Citrus Storm'];
                  setCustomName(names[Math.floor(Math.random() * names.length)]);
                }}
                title="Random Name"
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Live Animated Glass Visualizer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div className="relative w-full max-w-xs bg-slate-900/90 rounded-3xl border border-sky-400/40 p-6 shadow-2xl backdrop-blur-md flex flex-col items-center">
              
              {/* Live Temperature tag */}
              <div className="w-full flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                <span className="flex items-center gap-1 text-cyan-300 font-bold">
                  <Snowflake className="w-3.5 h-3.5 animate-spin" />
                  <span>
                    {iceLevel === 'sub-zero' ? '-2°C Arctic' : iceLevel === 'extra-crushed' ? '-0.5°C Frost' : '1°C Chilled'}
                  </span>
                </span>
                <span className="font-extrabold text-white">₹{totalPrice}</span>
              </div>

              {/* Glass Container */}
              <div className="relative w-36 h-64 my-6 flex flex-col justify-end items-center">
                
                {/* Garnish on rim (Lemon slice) */}
                {selectedGarnishes.includes('lemon-slice') && (
                  <div className="absolute -top-3 -right-3 text-3xl animate-bounce z-20">
                    🍋
                  </div>
                )}
                {/* Mint on top */}
                {selectedGarnishes.includes('mint') && (
                  <div className="absolute top-1 left-2 text-2xl z-20">
                    🍃
                  </div>
                )}

                {/* Glass outer shell */}
                <div className="relative w-32 h-60 border-4 border-t-0 border-white/40 rounded-b-3xl overflow-hidden bg-white/5 backdrop-blur-xs shadow-inner flex flex-col justify-end">
                  
                  {/* Condensation drips outside glass */}
                  <div className="absolute top-4 left-3 w-1 h-3 bg-white/40 rounded-full animate-pulse" />
                  <div className="absolute top-12 right-3 w-1 h-5 bg-white/30 rounded-full" />
                  <div className="absolute top-24 left-4 w-1 h-4 bg-white/20 rounded-full" />

                  {/* Liquid inside the glass */}
                  <div
                    className={`w-full transition-all duration-700 relative overflow-hidden rounded-b-2xl ${
                      isPouring ? 'h-full animate-pulse' : 'h-[85%]'
                    }`}
                    style={{
                      backgroundColor: selectedFlavor.color,
                      opacity: 0.88,
                    }}
                  >
                    {/* Secondary gradient tone from base soda */}
                    <div
                      className="absolute inset-0 opacity-40 mix-blend-overlay"
                      style={{ backgroundColor: selectedBase.color }}
                    />

                    {/* Rising fizz bubbles animation */}
                    <div className="absolute inset-0 flex justify-around items-end overflow-hidden pointer-events-none">
                      {Array.from({ length: fizzLevel * 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce"
                          style={{
                            animationDuration: `${0.8 + (i % 5) * 0.3}s`,
                            animationDelay: `${(i * 0.15)}s`,
                            marginBottom: `${(i * 12) % 180}px`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Floating ice cubes */}
                    {iceLevel !== 'none' && (
                      <div className="absolute top-2 inset-x-2 flex justify-around z-10">
                        <div className="w-5 h-5 rounded-md bg-white/60 border border-white/80 shadow-xs rotate-12 backdrop-blur-xs" />
                        <div className="w-6 h-6 rounded-md bg-white/70 border border-white/80 shadow-xs -rotate-6 backdrop-blur-xs" />
                        {iceLevel === 'extra-crushed' && (
                          <div className="w-4 h-4 rounded-sm bg-white/50 border border-white/70 rotate-45" />
                        )}
                      </div>
                    )}

                    {/* Garnish elements inside the drink */}
                    {selectedGarnishes.includes('boondi') && (
                      <div className="absolute bottom-3 inset-x-4 flex justify-between text-xs opacity-80">
                        <span>🟡</span>
                        <span>🟡</span>
                        <span>🟡</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Glass base pedestal */}
                <div className="w-20 h-2 bg-white/40 rounded-full mt-1" />
              </div>

              {/* Custom Drink Summary Card */}
              <div className="w-full text-center space-y-1 my-2">
                <div className="text-sm font-extrabold text-white line-clamp-1">
                  {customName || 'Custom Chiller'}
                </div>
                <div className="text-xs text-sky-300 line-clamp-1">
                  {selectedBase.name} + {selectedFlavor.name}
                </div>
                <div className="text-[11px] text-slate-400">
                  {fizzLevel}★ Fizz • {selectedGarnishes.length} Garnishes
                </div>
              </div>

              {/* Add to cart CTA */}
              <button
                id="add-custom-drink-btn"
                onClick={handleAddCustomToCart}
                className={`w-full mt-3 py-3 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-orange-500/20 active:scale-95'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{lang === 'en' ? 'Custom Mix Added!' : 'ड्रिंक कार्ट में जुड़ गया!'}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>{lang === 'en' ? 'Add Custom Mix to Cart' : 'यह ड्रिंक ऑर्डर करें'}</span>
                    <span>(₹{totalPrice})</span>
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
