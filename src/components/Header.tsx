"use client";

import Link from "next/link";
import { Package, User } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  // Hér getum við seinna athugað hvort notandi sé loggaður inn
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-md">
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
          {isLoggedIn && (
            <Link
              href="/subscriptions"
              className={`hover:text-blue-600 transition-colors ${pathname === "/subscriptions" ? "text-blue-600 font-semibold" : ""}`}
            >
              Mínar síður
            </Link>
          )}
        </nav>

        {/* Auth / Get Started takkar */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth"
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">
              {isLoggedIn ? "Mínar síður" : "Innskráning"}
            </span>
          </Link>
          <Link
            href="/get-started"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 shadow-md flex items-center gap-2"
          >
            Byrja núna
          </Link>
        </div>
      </div>
    </header>
  );
}
