import React from 'react';
import { Snowflake, ShieldCheck, Clock, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-10 sm:pt-12 pb-24 sm:pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <Snowflake className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <div className="text-sm font-black text-white">
                {lang === 'en' ? '-3°C Cold Chain Delivery' : '-3°C बर्फ जैसी ठंडी डिलीवरी'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {lang === 'en' ? 'Stored in walk-in chillers and dispatched with dry-ice packs.' : 'थर्माकोल आइस बॉक्स और ड्राई आइस में पूरी सुरक्षा।'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <div className="text-sm font-black text-white">
                {lang === 'en' ? '15-Minute Doorstep Express' : '15 मिनट में आपके दरवाज़े पर'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {lang === 'en' ? 'Hyperlocal chilling hubs in your neighborhood.' : 'आपके नजदीकी चिलर हब से तुरंत डिलीवरी।'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-black text-white">
                {lang === 'en' ? '100% Fizz Guarantee' : '100% कड़क गैस और ताज़गी'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {lang === 'en' ? 'Never flat, always pressurized and effervescent.' : 'हर घूंट में जोरदार फिज़ और ताजगी की गारंटी।'}
              </div>
            </div>
          </div>
        </div>

        {/* Links & Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white text-lg font-bold">
                🥤
              </div>
              <span className="font-extrabold text-lg text-white">
                Chill<span className="text-sky-400">Drink</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'en'
                ? 'Your one-stop online cold drink shop. From classic colas and street banta to pulpy fruit sodas and party packs.'
                : 'आपकी अपनी ऑनलाइन कोल्ड ड्रिंक दुकान। कड़क कोला, शिकंजी, बंटा और ताज़ा फ्रूट सोडा - सब कुछ सुपर चिल्ड!'}
            </p>
          </div>

          {/* Categories */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-white mb-3">
              {lang === 'en' ? 'Beverage Flavors' : 'लोकप्रिय वैरायटी'}
            </div>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>{lang === 'en' ? 'Thunder Bolt Cola' : 'थंडर बोल्ट कड़क कोला'}</li>
              <li>{lang === 'en' ? 'Delhi Masala Nimbu Banta' : 'देसी नींबू मसाला बंटा'}</li>
              <li>{lang === 'en' ? 'Alphonso Mango Pulpy Fizz' : 'अलफांसो मैंगो पल्पी चिल्लर'}</li>
              <li>{lang === 'en' ? 'Kala Khatta Pop Sparkler' : 'काला खट्टा गिलासी फिज़'}</li>
              <li>{lang === 'en' ? 'Volt Green Apple Energy' : 'वोल्ट ग्रीन एप्पल एनर्जी'}</li>
            </ul>
          </div>

          {/* Why ChillDrink */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-white mb-3">
              {lang === 'en' ? 'Chiller Specials' : 'खास सुविधाएं'}
            </div>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>{lang === 'en' ? 'DIY Fizz Mixer Lab' : 'खुद का ड्रिंक बनाएं (DIY)'}</li>
              <li>{lang === 'en' ? 'Free 500g Ice Bag on all orders' : 'हर ऑर्डर पर मुफ़्त बर्फ पाउच'}</li>
              <li>{lang === 'en' ? 'Cricket Match 8-Can Buckets' : 'मैच डे पार्टी बकेट'}</li>
              <li>{lang === 'en' ? 'Zero Sugar Diet Selection' : 'ज़ीरो शुगर डाइट ड्रिंक्स'}</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-white mb-3">
              {lang === 'en' ? '24/7 Thirst Helpline' : 'कस्टमर सपोर्ट'}
            </div>
            <div className="text-xs space-y-2.5 text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>1800-CHILL-SIP (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>support@chilldrink.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Hub #12, Cold Storage Lane, City Center</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} ChillDrink Beverages Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-current inline" />
            <span>for cold drink lovers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
