import React from 'react';
import { Sparkles, Clock, ShieldCheck, Snowflake, Flame, ArrowDown } from 'lucide-react';
import { Language } from '../types';
import { sounds } from '../utils/sound';

interface HeroBannerProps {
  lang: Language;
  onExploreClick: () => void;
  onMixerClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  lang,
  onExploreClick,
  onMixerClick,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-sky-950 via-slate-900 to-sky-900 text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-sky-800/40">
      {/* Background ambient frosty glow & decorative circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
      
      {/* Floating ice & bubble hints */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left copy column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold backdrop-blur-xs">
              <Snowflake className="w-3.5 h-3.5 text-sky-300 animate-spin" />
              <span>
                {lang === 'en' 
                  ? 'Ice-Cold Guarantee: -2°C to 2°C Delivered Fresh' 
                  : 'ठंडी ठंडी कोल्ड ड्रिंक्स: सीधा आपके दरवाज़े पर!'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              {lang === 'en' ? (
                <>
                  Crisp, Fizzy & <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-300">
                    Sub-Zero Chilled.
                  </span>
                </>
              ) : (
                <>
                  एकदम कड़क, फिज़ी और <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-300">
                    बर्फ जैसी सुपर चिल्ड!
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {lang === 'en'
                ? 'From bold thunder colas and desi masala banta to alphonso fruit chillers and zero-sugar fizzes. Delivered in insulated dry-ice cooler packs in 15 minutes.'
                : 'कड़क कोला, दिल्ली वाला नींबू मसाला बंटा, रत्नागिरी आम चिल्लर और ज़ीरो शुगर सोडा। 15 मिनट में थर्माकोल आइस बॉक्स के साथ डिलीवर!'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2">
              <button
                id="hero-explore-btn"
                onClick={() => { sounds.playCanPop(); onExploreClick(); }}
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'en' ? 'Explore Drinks Menu' : 'सारे कोल्ड ड्रिंक्स देखें'}</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                id="hero-diy-btn"
                onClick={() => { sounds.playFizz(); onMixerClick(); }}
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-full bg-slate-800/80 hover:bg-slate-800 text-white font-bold text-sm sm:text-base border border-slate-700 hover:border-amber-400/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 backdrop-blur-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{lang === 'en' ? 'DIY Fizz Mixer Lab 🧪' : 'अपना ड्रिंक बनाओ (DIY Lab)'}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-4 pt-4 border-t border-slate-800/80 text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 bg-slate-900/40 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">15 Mins</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-400">Express Chill</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 bg-slate-900/40 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 flex items-center justify-center shrink-0">
                  <Snowflake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">-2°C Temp</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-400">Frost Guard</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 bg-slate-900/40 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-500/10 border border-sky-400/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">100% Fizz</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-400">Never Flat</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right visual card column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer decorative card */}
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-sky-400/30 p-6 shadow-2xl backdrop-blur-md overflow-hidden">
                
                {/* Ambient glow inside */}
                <div className="absolute -top-12 -right-12 w-44 h-44 bg-sky-500/20 rounded-full blur-2xl" />
                
                {/* Header row */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      {lang === 'en' ? 'Live Chiller Status' : 'लाइव चिलर स्टेटस'}
                    </span>
                  </div>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    -3.2°C SUB-ZERO
                  </span>
                </div>

                {/* Featured Drink Showcase */}
                <div className="my-5 relative rounded-2xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80"
                    alt="Ice Cold Drink Can"
                    className="w-full h-56 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  {/* Overlay Drink Tag */}
                  <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-xs uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>{lang === 'en' ? 'Trending Pick' : 'ट्रेंडिंग कोल्ड ड्रिंक'}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <div className="text-lg font-black text-white leading-tight">
                      Thunder Bolt Cola
                    </div>
                    <div className="text-xs text-sky-300 font-medium">
                      {lang === 'en' ? 'Extreme Fizz • 330ml Can • Chilled to -2°C' : 'कड़क गैस • 330ml कैन • सुपर चिल्ड'}
                    </div>
                  </div>
                </div>

                {/* Interactive Sound Pad */}
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-300 font-medium flex items-center gap-2">
                    <span className="text-base">🧊</span>
                    <span>{lang === 'en' ? 'Tap for instant cold fizz:' : 'आवाज़ सुनकर ठंडक महसूस करें:'}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      id="hero-pop-sound-btn"
                      onClick={() => sounds.playCanPop()}
                      className="px-2.5 py-1 text-xs font-bold bg-sky-600/80 hover:bg-sky-500 text-white rounded-lg transition-colors cursor-pointer"
                      title="Can Pop Sound"
                    >
                      💥 Can Pop
                    </button>
                    <button
                      id="hero-fizz-sound-btn"
                      onClick={() => sounds.playFizz()}
                      className="px-2.5 py-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-lg transition-colors cursor-pointer"
                      title="Fizzy Sound"
                    >
                      🫧 Fizz
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
