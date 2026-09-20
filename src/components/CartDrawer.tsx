import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Snowflake, Tag, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem, Language } from '../types';
import { sounds } from '../utils/sound';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: (orderDetails: {
    address: string;
    deliveryTime: string;
    total: number;
    items: CartItem[];
  }) => void;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  lang,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [couponError, setCouponError] = useState('');
  const [address, setAddress] = useState('Flat 402, Sunshine Heights, Main Road');
  const [includeIcePack, setIncludeIcePack] = useState(true);
  const [includeMasalaPouch, setIncludeMasalaPouch] = useState(true);

  if (!isOpen) return null;

  // Subtotal calculation
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const packagingFee = 0; // FREE promotional
  const deliveryFee = subtotal >= 149 || subtotal === 0 ? 0 : 25;
  const discountAmount = appliedDiscount 
    ? (appliedDiscount < 1 ? Math.round(subtotal * appliedDiscount) : appliedDiscount)
    : 0;
  const finalTotal = Math.max(0, subtotal + packagingFee + deliveryFee - discountAmount);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    sounds.playClick();
    if (code === 'PEHLALOVE') {
      if (subtotal < 100) {
        setCouponError(lang === 'en' ? 'Minimum order ₹100 for PEHLALOVE' : 'कम से कम ₹100 का ऑर्डर चाहिए');
        return;
      }
      setAppliedDiscount(50);
      setCouponError('');
      setCouponCode('PEHLALOVE');
    } else if (code === 'CHILL10') {
      setAppliedDiscount(0.10);
      setCouponError('');
      setCouponCode('CHILL10');
    } else {
      setCouponError(lang === 'en' ? 'Invalid promo code. Try PEHLALOVE or CHILL10' : 'गलत कोड। PEHLALOVE या CHILL10 आज़माएं');
    }
  };

  const handleStartCheckout = () => {
    sounds.playCanPop();
    onCheckout({
      address,
      deliveryTime: '15 Mins Chilled Express',
      total: finalTotal,
      items,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => { sounds.playClick(); onClose(); }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full sm:w-auto">
        <div className="w-full sm:w-screen sm:max-w-md bg-white shadow-2xl flex flex-col h-full">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-white leading-tight">
                  {lang === 'en' ? 'Chiller Cart' : 'आपकी ठंडी टोकरी'}
                </h3>
                <div className="text-[11px] text-sky-300 font-medium">
                  {items.length} {lang === 'en' ? 'beverages inside' : 'ड्रिंक्स शामिल हैं'}
                </div>
              </div>
            </div>

            <button
              id="close-cart-btn"
              onClick={() => { sounds.playClick(); onClose(); }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Guaranteed Chilled Banner */}
          <div className="bg-sky-50 border-b border-sky-100 px-4 py-2 flex items-center gap-2 text-xs text-sky-800 font-semibold">
            <Snowflake className="w-3.5 h-3.5 text-sky-600 shrink-0 animate-spin" />
            <span>
              {lang === 'en'
                ? 'Insulated Thermal Box with Dry Ice included'
                : 'थर्माकोल आइस बॉक्स और सूखी बर्फ सुरक्षित'}
            </span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
                  🥤
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-800">
                    {lang === 'en' ? 'Your Chiller Cart is Empty' : 'आपकी टोकरी खाली है'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    {lang === 'en'
                      ? 'Add some frosty colas, masala banta, or mix your own soda to get started!'
                      : 'कड़क कोला, मसाला बंटा या खुद का ड्रिंक बनाएं और रिफ्रेशमेंट पाएं!'}
                  </p>
                </div>
                <button
                  onClick={() => { sounds.playClick(); onClose(); }}
                  className="px-5 py-2.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs cursor-pointer shadow-md"
                >
                  {lang === 'en' ? 'Browse Chilled Drinks' : 'कोल्ड ड्रिंक्स देखें'}
                </button>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex gap-3 items-center"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-white overflow-hidden border border-slate-200 shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {item.selectedSize} ({item.volume})
                      </div>
                      {item.isCustomMix && item.customDetails && (
                        <div className="text-[10px] text-sky-700 bg-sky-100/70 px-1.5 py-0.5 rounded-md mt-1 inline-block">
                          {item.customDetails.base} • {item.customDetails.flavor}
                        </div>
                      )}
                      <div className="text-xs font-black text-slate-900 mt-1">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>

                    {/* Quantity Controllers */}
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-0.5 shrink-0">
                      <button
                        onClick={() => {
                          sounds.playClick();
                          if (item.quantity > 1) {
                            onUpdateQuantity(item.cartItemId, item.quantity - 1);
                          } else {
                            onRemoveItem(item.cartItemId);
                          }
                        }}
                        className="w-6 h-6 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center justify-center font-black cursor-pointer"
                      >
                        {item.quantity === 1 ? <Trash2 className="w-3 h-3 text-red-500" /> : <Minus className="w-3 h-3" />}
                      </button>
                      <span className="w-5 text-center text-xs font-extrabold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          sounds.playClick();
                          onUpdateQuantity(item.cartItemId, item.quantity + 1);
                        }}
                        className="w-6 h-6 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center justify-center font-black cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Complimentary Extras Checkbox */}
                <div className="bg-slate-100/80 rounded-2xl p-3 text-xs space-y-2 border border-slate-200">
                  <div className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px]">
                    {lang === 'en' ? 'Free Chiller Extras' : 'मुफ़्त सामान (चिलर पैक)'}
                  </div>
                  
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={includeIcePack}
                      onChange={(e) => setIncludeIcePack(e.target.checked)}
                      className="rounded accent-sky-600"
                    />
                    <span>🧊 {lang === 'en' ? 'Free 500g Crushed Ice Pouch' : 'मुफ़्त 500 ग्राम बर्फ की थैली'}</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={includeMasalaPouch}
                      onChange={(e) => setIncludeMasalaPouch(e.target.checked)}
                      className="rounded accent-sky-600"
                    />
                    <span>🧂 {lang === 'en' ? 'Free Black Salt & Chaat Masala Pouch' : 'मुफ़्त काला नमक व चाट मसाला पाउच'}</span>
                  </label>
                </div>

                {/* Promo Code Box */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={lang === 'en' ? 'Enter PEHLALOVE or CHILL10' : 'कूपन कोड डालें (PEHLALOVE)'}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 uppercase font-semibold outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      {lang === 'en' ? 'Apply' : 'लागू करें'}
                    </button>
                  </div>

                  {/* Quick coupon pill hints */}
                  <div className="flex gap-2 mt-1.5">
                    <button
                      onClick={() => handleApplyCoupon('PEHLALOVE')}
                      className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-bold hover:bg-emerald-100 cursor-pointer"
                    >
                      🏷️ PEHLALOVE (₹50 OFF)
                    </button>
                    <button
                      onClick={() => handleApplyCoupon('CHILL10')}
                      className="text-[10px] bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-md font-bold hover:bg-sky-100 cursor-pointer"
                    >
                      🏷️ CHILL10 (10% OFF)
                    </button>
                  </div>

                  {couponError && (
                    <div className="text-[11px] text-red-600 mt-1 font-medium">{couponError}</div>
                  )}
                  {appliedDiscount && (
                    <div className="text-[11px] text-emerald-600 mt-1 font-bold">
                      ✓ {lang === 'en' ? 'Coupon applied successfully!' : 'कूपन सफलतापूर्वक लागू हुआ!'}
                    </div>
                  )}
                </div>

                {/* Delivery Address */}
                <div className="pt-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                    {lang === 'en' ? 'Delivery Address (15-Min Express)' : 'डिलीवरी का पता (15 मिनट एक्सप्रेस)'}
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl p-2.5 bg-slate-50 outline-none focus:border-sky-500 font-medium text-slate-800"
                  />
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer with Bill Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-slate-200 shadow-lg space-y-3">
              {/* Bill Details */}
              <div className="text-xs space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Items Subtotal' : 'सामान का मूल्य'}</span>
                  <span className="font-bold text-slate-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? 'Sub-Zero Thermal Packaging' : 'थर्मल आइस पैकिंग'}</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === 'en' ? '15-Min Chilled Delivery' : '15 मिनट डिलीवरी'}</span>
                  <span className="font-bold text-slate-900">
                    {deliveryFee === 0 ? <span className="text-emerald-600">FREE (Above ₹149)</span> : `₹${deliveryFee}`}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>{lang === 'en' ? 'Promo Discount' : 'डिस्काउंट'}</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>{lang === 'en' ? 'Grand Total' : 'कुल राशि'}</span>
                  <span className="text-base text-sky-600">₹{finalTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                id="proceed-checkout-btn"
                onClick={handleStartCheckout}
                className="w-full py-3.5 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-600/25 transition-all cursor-pointer"
              >
                <span>{lang === 'en' ? 'Order Now (15-Min Ice-Cold)' : 'अभी आर्डर करें (15 मिनट में)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>{lang === 'en' ? 'Temperature Guarantee: Cold or Free' : 'गारंटी: ठंडा नहीं तो पैसे वापस'}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
