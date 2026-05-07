"use client";

import Link from "next/link";
import { Package, User, Settings, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  // Setjum á 'true' til að þú sjáir innskráningar-takkana (Mínar síður og Stillingar)
  const isLoggedIn = true;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
            <Package className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">
            Birgó
          </span>
        </Link>

        {/* Navigation - Falinn á litlum skjám */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link
            href="/"
            className={`hover:text-blue-600 transition-colors ${pathname === "/" ? "text-blue-600 font-semibold" : ""}`}
          >
            Heim
          </Link>
          <Link
            href="/about"
            className={`hover:text-blue-600 transition-colors ${pathname === "/about" ? "text-blue-600 font-semibold" : ""}`}
          >
            Um okkur
          </Link>
        </nav>

        {/* Auth / Get Started / User Menu takkar */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/auth"
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Innskráning</span>
              </Link>
              <Link
                href="/get-started"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 shadow-md flex items-center gap-2"
              >
                Byrja núna
              </Link>
            </>
          ) : (
            <>
              {/* Notandi Innskráður */}
              <Link
                href="/my-subscriptions"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold transition-all ${
                  pathname === "/subscriptions"
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="hidden sm:inline">Mínar síður</span>
              </Link>

              <Link
                href="/settings"
                className={`p-2.5 rounded-full transition-all ${
                  pathname === "/settings"
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
                title="Stillingar"
              >
                <Settings className="w-5 h-5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
