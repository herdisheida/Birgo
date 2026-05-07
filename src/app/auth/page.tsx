"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, Package } from "lucide-react";

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hér myndi koma alvöru auðkenning (auth) í framtíðinni.
    // Sendum notanda beint í spurningalistann í bili:
    router.push("/get-started");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 bg-slate-50">
      <div className="w-full max-w-md p-10 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 border border-slate-100">
        {/* Haus */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-6 shadow-md">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {isLogin ? "Velkomin/n aftur" : "Stofna aðgang"}
          </h1>
          <p className="text-slate-500">
            {isLogin
              ? "Skráðu þig inn til að sjá þínar áskriftir"
              : "Byrjaðu að einfalda heimilislífið í dag"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Fullt nafn
              </label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Jón Jónsson"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Netfang
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="jon@netfang.is"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Lykilorð
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2"
          >
            <span>{isLogin ? "Skrá inn" : "Nýskráning"}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Skipta á milli Login / Signup */}
        <div className="mt-8 text-center text-sm font-medium">
          <span className="text-slate-500">
            {isLogin ? "Ertu ekki með aðgang?" : "Ertu nú þegar með aðgang?"}
          </span>{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-700 hover:underline transition-all"
          >
            {isLogin ? "Stofna aðgang" : "Skrá inn"}
          </button>
        </div>
      </div>
    </div>
  );
}
