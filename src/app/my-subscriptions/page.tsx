"use client";

import {
  Calendar,
  Package,
  Edit,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSubscriptionStore } from "@birgo/app/store/subscriptionStore";

export default function Subscriptions() {
  const router = useRouter();
  const { selectedProducts, subscriptionSettings, reset } =
    useSubscriptionStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Nýtt State til að halda utan um vörur sem eru að klárast
  const [runningOutItems, setRunningOutItems] = useState<Set<string>>(
    new Set(),
  );

  const orderItems = Object.values(selectedProducts);
  const hasActiveSubscription = orderItems.length > 0;

  const getFrequencyLabel = () => {
    if (subscriptionSettings.frequency === "weekly") return "Vikulega";
    if (subscriptionSettings.frequency === "monthly") return "Mánaðarlega";
    return `Á ${subscriptionSettings.customDays || 30} daga fresti`;
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

  const getTotalPrice = () => {
    return orderItems.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0,
    );
  };

  const handleDeleteConfirm = () => {
    reset();
    setShowDeleteConfirm(false);
    setRunningOutItems(new Set());
  };

  const markAsRunningOut = (productId: string) => {
    const newSet = new Set(runningOutItems);
    newSet.add(productId);
    setRunningOutItems(newSet);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 w-full">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Mínar síður
          </h1>
          <p className="text-slate-500 text-lg">
            Hafðu stjórn á þínum áskriftum
          </p>
        </div>
      </div>

      {!hasActiveSubscription ? (
        <div className="p-16 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm text-center">
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Engin virk áskrift
          </h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Þú ert ekki með neinar vörur í áskrift í augnablikinu. Byrjaðu núna
            og við sjáum um að þú verðir aldrei uppiskroppa.
          </p>
          <button
            onClick={() => router.push("/get-started")}
            className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-bold transition-all hover:bg-blue-700 hover:scale-105 shadow-md"
          >
            Skoða úrval
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Vinstri Dálkur (Main Content) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Subscription Card */}
            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Heimilisáskrift
                    </h2>
                    <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">
                      Virk
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/subscription")}
                  className="p-3 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900"
                  title="Breyta áskrift"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>

              {/* Status Banner */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Næsta afhending
                    </p>
                    <p className="font-bold text-slate-900">
                      {getNextDeliveryDate()}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-slate-200"></div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Tíðni</p>
                    <p className="font-bold text-slate-900">
                      {getFrequencyLabel()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vörulisti */}
            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Vörur í pakkanum ({orderItems.length})
                </h3>
                <button
                  onClick={() => router.push("/subscription")}
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Breyta magni
                </button>
              </div>

              <div className="space-y-4">
                {orderItems.map((item) => {
                  const isRunningOut = runningOutItems.has(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border transition-colors ${
                        isRunningOut
                          ? "bg-orange-50/50 border-orange-200"
                          : "bg-slate-50 border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-3 sm:mb-0">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                          <Package
                            className={`w-6 h-6 ${isRunningOut ? "text-orange-400" : "text-slate-400"}`}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            Magn:{" "}
                            <span className="font-semibold text-slate-700">
                              {item.quantity}
                            </span>{" "}
                            stk
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full">
                        <p className="font-bold text-slate-900">
                          ${((item.price || 0) * item.quantity).toFixed(2)}
                        </p>

                        {/* NÝTT: "Að klárast" takkinn */}
                        {!isRunningOut ? (
                          <button
                            onClick={() => markAsRunningOut(item.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-sm font-semibold text-slate-600 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-50 transition-all shadow-sm"
                            title="Láttu okkur vita ef þetta er að klárast"
                          >
                            <AlertCircle className="w-4 h-4" />
                            <span>Að klárast?</span>
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-100 text-sm font-bold text-orange-700">
                            <Zap className="w-4 h-4" />
                            <span>Flýtisending skráð</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Hægri Dálkur (Aðgerðir & Samantekt) */}
          <div className="space-y-8">
            {/* Samantekt Card */}
            <div className="p-8 rounded-[2rem] bg-slate-900 text-white shadow-xl">
              <h3 className="text-lg font-bold mb-6">Samantekt</h3>
              <div className="space-y-4 text-slate-300 text-sm mb-6">
                <div className="flex justify-between">
                  <span>Vörur</span>
                  <span className="text-white">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Heimsending</span>
                  <span className="text-white">$4.99</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700/50 flex justify-between items-center mb-8">
                <span className="font-bold text-white">Samtals á mán</span>
                <span className="text-2xl font-extrabold text-blue-400">
                  ${(getTotalPrice() + 4.99).toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => router.push("/subscription")}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md"
              >
                Breyta stillingum
              </button>
            </div>

            {/* Hætta í áskrift Card */}
            <div className="p-6 rounded-[2rem] bg-white border border-red-100 flex flex-col items-center text-center">
              {!showDeleteConfirm ? (
                <>
                  <Trash2 className="w-8 h-8 text-red-400 mb-3" />
                  <p className="text-sm text-slate-500 mb-4">
                    Ef þú þarft ekki lengur á þjónustunni að halda geturðu sagt
                    upp hvenær sem er.
                  </p>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors"
                  >
                    Hætta í áskrift
                  </button>
                </>
              ) : (
                <div className="w-full animate-in fade-in zoom-in duration-200">
                  <p className="font-bold text-slate-900 mb-2">
                    Ertu alveg viss?
                  </p>
                  <p className="text-sm text-slate-500 mb-6">
                    Þessari aðgerð verður ekki snúið við. Allar vörur verða
                    fjarlægðar úr áskriftinni þinni.
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleDeleteConfirm}
                      className="w-full py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-sm"
                    >
                      Já, eyða áskrift
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
                    >
                      Hætta við
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
