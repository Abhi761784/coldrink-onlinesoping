import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock, Phone, Snowflake, MapPin, X, Bike } from 'lucide-react';
import { CartItem, Language } from '../types';
import { sounds } from '../utils/sound';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    address: string;
    deliveryTime: string;
    total: number;
    items: CartItem[];
  } | null;
  lang: Language;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orderDetails,
  lang,
}) => {
  const [stage, setStage] = useState(1);
  const [minutesLeft, setMinutesLeft] = useState(14);
  const [isCallingRider, setIsCallingRider] = useState(false);

  useEffect(() => {
    if (!isOpen || !orderDetails) return;

    setStage(1);
    setMinutesLeft(14);
    setIsCallingRider(false);

    // Initial celebration pop
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0284c7', '#38bdf8', '#fbbf24'],
      });
    } catch {
      // Ignore
    }

    // Progression timer simulation
    const t1 = setTimeout(() => {
      setStage(2);
      setMinutesLeft(11);
      sounds.playFizz();
    }, 4000);

    const t2 = setTimeout(() => {
      setStage(3);
      setMinutesLeft(6);
      sounds.playIceClink();
    }, 9000);

    const t3 = setTimeout(() => {
      setStage(4);
      setMinutesLeft(0);
      sounds.playCanPop();
      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 },
        });
      } catch {
        // Ignore
      }
    }, 15000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen, orderDetails]);

  if (!isOpen || !orderDetails) return null;

  const fastForward = () => {
    sounds.playCanPop();
    setStage(4);
    setMinutesLeft(0);
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch {
      // Ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-sky-600 to-blue-700 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🛵</span>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                {lang === 'en' ? 'Live Chilled Order Tracking' : 'लाइव डिलीवरी ट्रैकिंग'}
              </h3>
            </div>
            <div className="text-[11px] sm:text-xs text-sky-100 mt-0.5">
              Order #CHILL-9042 • {lang === 'en' ? 'Sub-Zero Guarantee' : 'बर्फ जैसी ठंडी गारंटी'}
            </div>
          </div>

          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Callout */}
        <div className="p-3.5 sm:p-5 border-b border-slate-100 bg-sky-50/60 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider">
              {lang === 'en' ? 'Estimated Arrival' : 'अनुमानित समय'}
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" />
              <span>{minutesLeft > 0 ? `${minutesLeft} mins` : (lang === 'en' ? 'Arrived!' : 'पहुंच गया!')}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] sm:text-xs text-slate-500 font-medium">
              {lang === 'en' ? 'Internal Cooler Box' : 'कूलर तापमान'}
            </div>
            <div className="text-xs sm:text-sm font-black text-sky-700 flex items-center justify-end gap-1">
              <Snowflake className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-sky-500" />
              <span>-2.4°C Chilled</span>
            </div>
          </div>
        </div>

        {/* Progression Steps */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          
          {/* Step 1 */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                stage >= 1 ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {stage > 1 ? '✓' : '1'}
              </div>
              <div className={`w-0.5 h-8 ${stage > 1 ? 'bg-sky-600' : 'bg-slate-200'}`} />
            </div>
            <div className="pt-0.5">
              <div className="text-xs font-black text-slate-900">
                {lang === 'en' ? 'Order Confirmed & Pulled from -4°C Chiller' : 'ऑर्डर स्वीकृत & -4°C चिलर से निकाला गया'}
              </div>
              <div className="text-[11px] text-slate-500">
                {lang === 'en' ? 'Verified 100% carbonated and ice-cold' : 'बिल्कुल कड़क गैस और बर्फीली ठंडक जांची गई'}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                stage >= 2 ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {stage > 2 ? '✓' : '2'}
              </div>
              <div className={`w-0.5 h-8 ${stage > 2 ? 'bg-sky-600' : 'bg-slate-200'}`} />
            </div>
            <div className="pt-0.5">
              <div className="text-xs font-black text-slate-900">
                {lang === 'en' ? 'Insulated Thermal Packaging with Dry Ice' : 'थर्माकोल बॉक्स में ड्राई आइस के साथ पैक'}
              </div>
              <div className="text-[11px] text-slate-500">
                {lang === 'en' ? 'Free ice pouch and masala sachets enclosed' : 'मुफ़्त बर्फ पाउच और मसाला भी शामिल किया'}
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                stage >= 3 ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {stage > 3 ? '✓' : '3'}
              </div>
              <div className={`w-0.5 h-8 ${stage > 3 ? 'bg-sky-600' : 'bg-slate-200'}`} />
            </div>
            <div className="pt-0.5">
              <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <span>{lang === 'en' ? 'Rider Ramesh on the Way' : 'डिलीवरी राइडर रास्ते में है'}</span>
                {stage === 3 && <Bike className="w-4 h-4 text-sky-600 animate-bounce" />}
              </div>
              <div className="text-[11px] text-slate-500">
                {lang === 'en' ? 'Electric scooter with insulated freezer box' : 'इलेक्ट्रिक स्कूटर पर चिल्ड बॉक्स के साथ आ रहा है'}
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                stage >= 4 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {stage >= 4 ? '✓' : '4'}
              </div>
            </div>
            <div className="pt-0.5">
              <div className={`text-xs font-black ${stage >= 4 ? 'text-emerald-700' : 'text-slate-400'}`}>
                {lang === 'en' ? 'Delivered Cold at Doorstep! 🎉' : 'दरवाज़े पर डिलीवरी पूरी हुई! 🎉'}
              </div>
              <div className="text-[11px] text-slate-500">
                {lang === 'en' ? 'Enjoy your ice-cold refreshments!' : 'अपनी ठंडी ड्रिंक्स का भरपूर मज़ा लें!'}
              </div>
            </div>
          </div>

        </div>

        {/* Order Summary & Delivery Address info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-700 space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div className="line-clamp-1 font-medium">{orderDetails.address}</div>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-200/80 font-bold">
            <span>{orderDetails.items.length} {lang === 'en' ? 'Items Total' : 'ड्रिंक्स'}</span>
            <span className="text-sm font-black text-slate-900">Paid: ₹{orderDetails.total}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
          {stage < 4 && (
            <button
              onClick={fastForward}
              className="text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer"
            >
              ⚡ {lang === 'en' ? 'Fast-Forward Delivery' : 'जल्दी पहुंचाएं'}
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => {
                sounds.playClick();
                setIsCallingRider(true);
                setTimeout(() => setIsCallingRider(false), 3000);
              }}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>
                {isCallingRider
                  ? (lang === 'en' ? 'Connecting to Ramesh...' : 'रमेश से कनेक्ट हो रहे हैं...')
                  : (lang === 'en' ? 'Call Rider' : 'राइडर को फोन करें')}
              </span>
            </button>

            <button
              onClick={() => { sounds.playClick(); onClose(); }}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black cursor-pointer"
            >
              {lang === 'en' ? 'Done' : 'ठीक है'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
