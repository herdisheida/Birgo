"use client";

import { useState } from "react";
import { Settings, User, Bell, Shield, Save, Check } from "lucide-react";

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    autoOrder: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 w-full">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200">
          <Settings className="w-7 h-7 text-slate-700" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Stillingar
          </h1>
          <p className="text-slate-500 text-lg mt-1">
            Hafðu stjórn á þínum upplýsingum og tilkynningum
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Persónuupplýsingar */}
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Persónuupplýsingar
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Fullt nafn
              </label>
              <input
                type="text"
                defaultValue="Jón Jónsson"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Netfang
              </label>
              <input
                type="email"
                defaultValue="jon@netfang.is"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Símanúmer
              </label>
              <input
                type="tel"
                defaultValue="888 8888"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Heimilisfang
              </label>
              <input
                type="text"
                defaultValue="Laugavegur 123, 101 Reykjavík"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700"
              />
            </div>
          </div>
        </div>

        {/* Tilkynningar og Samskipti */}
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <Bell className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-slate-900">Tilkynningar</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="font-semibold text-slate-900">Tölvupóstur</p>
                <p className="text-sm text-slate-500">
                  Fáðu staðfestingar á pöntunum og kvittanir í tölvupósti.
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleNotification("email")}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications.email ? "bg-blue-600" : "bg-slate-300"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${notifications.email ? "left-7" : "left-1"}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="font-semibold text-slate-900">SMS Skilaboð</p>
                <p className="text-sm text-slate-500">
                  Fáðu skilaboð þegar sendingin er á leiðinni til þín.
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleNotification("sms")}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications.sms ? "bg-blue-600" : "bg-slate-300"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${notifications.sms ? "left-7" : "left-1"}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div>
                <p className="font-semibold text-blue-900">
                  Gervigreindar pöntun
                </p>
                <p className="text-sm text-blue-700">
                  Leyfa Birgó að læra á notkun og flýta/seinka sendingum
                  sjálfkrafa.
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleNotification("autoOrder")}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications.autoOrder ? "bg-blue-600" : "bg-slate-300"}`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${notifications.autoOrder ? "left-7" : "left-1"}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Vista takki */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="py-4 px-10 rounded-xl bg-slate-900 text-white font-bold text-lg transition-all hover:bg-slate-800 hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 min-w-[200px]"
          >
            {isSaved ? (
              <>
                <Check className="w-5 h-5 text-green-400" />
                <span>Vistað!</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Vista stillingar</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
