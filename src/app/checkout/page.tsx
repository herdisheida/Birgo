"use client";

import { MapPin, CreditCard, Calendar, Check, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@birgo/app/store/subscriptionStore";

export default function Checkout() {
  const router = useRouter();
  const {
    selectedProducts,
    subscriptionSettings,
    deliveryAddress,
    setDeliveryAddress,
    paymentMethod,
    setPaymentMethod,
  } = useSubscriptionStore();

  const [isProcessing, setIsProcessing] = useState(false);

  const orderItems = Object.values(selectedProducts);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0,
  );
  const delivery = 4.99;
  const total = subtotal + delivery;

  const deliveryFrequency =
    subscriptionSettings.frequency === "weekly"
      ? "Vikulega"
      : subscriptionSettings.frequency === "monthly"
        ? "Mánaðarlega"
        : `Á ${subscriptionSettings.customDays || 30} daga fresti`;

  const handleStartSubscription = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      router.push("/subscriptions");
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 w-full">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Ganga frá áskrift
        </h1>
        <p className="text-lg text-slate-500">
          Fylltu út upplýsingarnar til að hefja þína sjálfvirku heimsendingu
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Vinstri dálkur (Form) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Afhendingarheimilisfang */}
          <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Afhending</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Fullt nafn
                </label>
                <input
                  type="text"
                  placeholder="Jón Jónsson"
                  value={deliveryAddress.fullName || ""}
                  onChange={(e) =>
                    setDeliveryAddress({ fullName: e.target.value })
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Heimilisfang
                </label>
                <input
                  type="text"
                  placeholder="Laugavegur 123"
                  value={deliveryAddress.street || ""}
                  onChange={(e) =>
                    setDeliveryAddress({ street: e.target.value })
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Póstnúmer
                  </label>
                  <input
                    type="text"
                    placeholder="101"
                    value={deliveryAddress.postalCode || ""}
                    onChange={(e) =>
                      setDeliveryAddress({ postalCode: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Sveitarfélag
                  </label>
                  <input
                    type="text"
                    placeholder="Reykjavík"
                    value={deliveryAddress.city || ""}
                    onChange={(e) =>
                      setDeliveryAddress({ city: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Greiðslumáti */}
          <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Greiðslumáti</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Kortanúmer
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={paymentMethod.cardNumber || ""}
                  onChange={(e) =>
                    setPaymentMethod({ cardNumber: e.target.value })
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 tracking-widest"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Gildistími
                  </label>
                  <input
                    type="text"
                    placeholder="MM/ÁÁ"
                    value={paymentMethod.expiryDate || ""}
                    onChange={(e) =>
                      setPaymentMethod({ expiryDate: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={paymentMethod.cvc || ""}
                    onChange={(e) => setPaymentMethod({ cvc: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-500 leading-relaxed">
                  Greiðsluupplýsingarnar þínar eru dulkóðaðar og sendar í gegnum
                  örugga greiðslugátt. Birgó geymir aldrei kortanúmerið þitt.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hægri dálkur (Samantekt) */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <div className="p-8 rounded-[2rem] bg-slate-900 text-white shadow-xl">
              <h2 className="text-xl font-bold mb-6">Samantekt pöntunar</h2>

              <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-slate-800">
                <Calendar className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Tíðni afhendinga
                  </p>
                  <p className="font-bold text-white">{deliveryFrequency}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {orderItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-slate-300">
                      {item.name}{" "}
                      <span className="text-slate-500">×{item.quantity}</span>
                    </span>
                    <span className="font-bold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-700/50 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Vörur</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Heimsending</span>
                  <span className="text-white">${delivery.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-6 flex justify-between items-center mb-8">
                <span className="font-bold text-white">Samtals</span>
                <span className="text-3xl font-extrabold text-blue-400">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleStartSubscription}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Vinnur úr greiðslu...</span>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Staðfesta áskrift</span>
                  </>
                )}
              </button>

              <p className="mt-6 text-xs text-center text-slate-500">
                Þú getur breytt eða sagt upp áskrift hvenær sem er inni á Mínum
                Síðum, engin binding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
