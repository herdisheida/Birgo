"use client";

import {
  Sparkles,
  RotateCw,
  Droplets,
  Zap,
  Wind,
  Trash2,
  Bot,
  Package,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@birgo/app/store/subscriptionStore";
import { products, subscriptionPacks } from "@birgo/constants";

export default function Home() {
  const { reset, addProduct } = useSubscriptionStore();
  const router = useRouter();

  const handleBundleClick = (
    e: React.MouseEvent,
    pack: (typeof subscriptionPacks)[0],
  ) => {
    e.preventDefault();
    reset();

    if (pack.id !== "custom") {
      pack.products.forEach((id) => {
        const p = products.find((prod) => prod.id === id);
        if (p) addProduct({ id: p.id, name: p.name, quantity: 5, price: 5.99 });
      });
      router.push("/subscription");
    } else {
      router.push("/selection");
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-8">
            <Sparkles className="w-4 h-4" /> Ný og snjallari leið til að versla
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Aldrei aftur uppiskroppa með{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              nauðsynjar
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Við lærum á þína notkun og sendum þér vörurnar sjálfkrafa heim áður
            en þær klárast. Þú gleymir, við reddum!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-started"
              onClick={() => reset()}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg transition-all hover:bg-blue-700 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              Byrja núna <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Vörur / Flokkar */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-slate-900 mb-12">
            Hvað sendum við?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Droplets,
                label: "Sápur & Krem",
                color: "bg-teal-100 text-teal-600",
              },
              {
                icon: Zap,
                label: "Hreingerning",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Wind,
                label: "Pappír",
                color: "bg-indigo-100 text-indigo-600",
              },
              {
                icon: Trash2,
                label: "Ruslapokar",
                color: "bg-purple-100 text-purple-600",
              },
            ].map((category, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-50 text-center hover:-translate-y-1 transition-transform cursor-pointer border border-slate-100"
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${category.color}`}
                >
                  <category.icon className="w-8 h-8" />
                </div>
                <p className="font-semibold text-slate-800">{category.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pakkarnir */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Vinsælir áskriftarpakkar
            </h2>
            <p className="text-slate-600">
              Veldu pakka sem hentar þér, eða settu saman þinn eigin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionPacks.map((pack) => (
              <div
                key={pack.id}
                className={`p-8 rounded-3xl bg-white flex flex-col transition-all hover:shadow-xl ${
                  pack.id === "custom"
                    ? "ring-2 ring-blue-500 shadow-lg relative"
                    : "border border-slate-100"
                }`}
              >
                {pack.id === "custom" && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Sveigjanlegt
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  {pack.name}
                </h3>
                <ul className="space-y-3 mb-8 flex-1">
                  {pack.displayItems.map(
                    (item, i) =>
                      item && (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-slate-600"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          {item}
                        </li>
                      ),
                  )}
                </ul>
                <button
                  onClick={(e) => handleBundleClick(e, pack)}
                  className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
                    pack.id === "custom"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  {pack.id === "custom"
                    ? "Velja vörur sjálf/ur"
                    : "Velja þennan pakka"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mx-auto mb-6 flex items-center justify-center">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Gervigreindin sér um þetta
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Við notum snjöll reiknirit til að læra inn á þína raunverulegu
              notkun. Þannig vitum við nákvæmlega hvenær sápuglasið eða
              klósettrúllan er að verða tóm, og sendum ábótina í tæka tíð.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
