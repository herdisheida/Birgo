"use client";

import { Calendar, TrendingUp, Check, Trash2, Repeat } from "lucide-react";
import { useState } from "react";
import { useSubscriptionStore } from "@birgo/app/store/subscriptionStore";
import { SubscriptionSettingsProps } from "@birgo/types";

export function SubscriptionSettings({ onSave }: SubscriptionSettingsProps) {
  const {
    selectedProducts,
    subscriptionSettings,
    setSubscriptionSettings,
    updateProductQuantity,
    removeProduct,
  } = useSubscriptionStore();

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onSave?.();
    }, 1000);
  };

  const getNextDeliveryDate = () => {
    const days =
      subscriptionSettings.frequency === "weekly"
        ? 7
        : subscriptionSettings.frequency === "monthly"
          ? 30
          : subscriptionSettings.customDays || 30;
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("is-IS", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getUsageLabel = (quantity: number) => {
    if (quantity <= 3) return "Lítil notkun";
    if (quantity <= 6) return "Miðlungs notkun";
    return "Mikil notkun";
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 w-full">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Stillingar áskriftar
        </h1>
        <p className="text-lg text-slate-500">
          Fínpússaðu sendingartíðni og magn áður en við klárum
        </p>
      </div>

      <div className="space-y-8">
        {/* Tíðni sendinga */}
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Repeat className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Sendingartíðni
              </h2>
              <p className="text-sm text-slate-500">
                Hversu oft viltu fá sendingu?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {(["weekly", "monthly", "custom"] as const).map((freq) => {
              const labels = {
                weekly: "Vikulega",
                monthly: "Mánaðarlega",
                custom: "Sérsníða",
              };
              const isSelected = subscriptionSettings.frequency === freq;

              return (
                <button
                  key={freq}
                  onClick={() => setSubscriptionSettings({ frequency: freq })}
                  className={`py-3.5 px-4 rounded-2xl font-semibold transition-all border-2 ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-100 bg-white text-slate-600 hover:border-blue-200"
                  }`}
                >
                  {labels[freq]}
                </button>
              );
            })}
          </div>

          {subscriptionSettings.frequency === "custom" && (
            <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <label className="font-semibold text-slate-700">
                  Dagar á milli sendinga
                </label>
                <span className="font-bold text-blue-600 text-lg">
                  {subscriptionSettings.customDays || 30} dagar
                </span>
              </div>
              <input
                type="range"
                min="7"
                max="90"
                value={subscriptionSettings.customDays || 30}
                onChange={(e) =>
                  setSubscriptionSettings({
                    customDays: Number(e.target.value),
                  })
                }
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-blue-600"
                style={{
                  background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(((subscriptionSettings.customDays || 30) - 7) / 83) * 100}%, #e2e8f0 ${(((subscriptionSettings.customDays || 30) - 7) / 83) * 100}%, #e2e8f0 100%)`,
                }}
              />
              <div className="flex justify-between text-xs font-medium text-slate-400 mt-3">
                <span>7 dagar</span>
                <span>90 dagar</span>
              </div>
            </div>
          )}

          {/* Sýna næstu afhendingu */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="font-medium text-slate-500 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Áætluð fyrsta sending:
            </span>
            <span className="font-bold text-slate-900">
              {getNextDeliveryDate()}
            </span>
          </div>
        </div>

        {/* Magnaval fyrir hverja vöru */}
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Vörumagn</h2>
              <p className="text-sm text-slate-500">
                Sérsníddu magnið fyrir hverja vöru
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {Object.values(selectedProducts).length === 0 ? (
              <p className="text-center text-slate-500 py-4">
                Engar vörur í körfunni.
              </p>
            ) : (
              Object.values(selectedProducts).map((product) => (
                <div
                  key={product.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        {product.name}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 mt-0.5">
                        Magn í sendingu:{" "}
                        <span className="font-bold text-blue-600">
                          {product.quantity} stk
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-3 py-1.5 rounded-full font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wide">
                        {getUsageLabel(product.quantity)}
                      </span>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                        title="Fjarlægja"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Sleði fyrir magnið */}
                  <div className="px-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={product.quantity}
                      onChange={(e) =>
                        updateProductQuantity(
                          product.id,
                          Number(e.target.value),
                        )
                      }
                      className="w-full h-2.5 rounded-full appearance-none cursor-pointer bg-slate-200"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${((product.quantity - 1) / 9) * 100}%, #e2e8f0 ${((product.quantity - 1) / 9) * 100}%, #e2e8f0 100%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs font-bold text-slate-400 mt-3 px-1">
                      <span>1</span>
                      <span>5</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Vista takki */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={Object.values(selectedProducts).length === 0}
            className="w-full py-5 rounded-2xl bg-slate-900 text-white font-bold text-lg transition-all hover:bg-slate-800 hover:-translate-y-1 shadow-xl disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
          >
            {isSaved ? (
              <>
                <Check className="w-6 h-6 text-green-400" />
                <span>Vistað... Förum í greiðslu</span>
              </>
            ) : (
              <span>Halda áfram í greiðslu</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
