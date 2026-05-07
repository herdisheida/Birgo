import Link from "next/link";
import { Package } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 py-16 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Birgó
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-8 text-slate-300 font-medium">
          <Link href="/about" className="hover:text-white transition-colors">
            Um okkur
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Skilmálar
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Hafa samband
          </Link>
        </nav>

        {/* Copyright */}
        <div className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Birgó. Þú gleymir, við reddum!
        </div>
      </div>
    </footer>
  );
}
