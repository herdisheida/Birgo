"use client";

import { Package, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="py-4 px-6 bg-white shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!isHomePage && (
            <button
              onClick={() => router.back()}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              style={{ backgroundColor: "#E8EBEF" }}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: "#1D3C6E" }} />
            </button>
          )}
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#6FAEF2" }}
            >
              <Package className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl"
              style={{ color: "#1D3C6E", fontWeight: "600" }}
            >
              Birgó
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/subscriptions"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{ color: "#1D3C6E" }}
          >
            <Calendar className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">My Subscriptions</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
