import "../styles/index.css"; // Make sure your global styles are imported here
import { Package } from "lucide-react";
import Link from "next/link";
import { Header } from "./components/Header";

export const metadata = {
  title: "Birgó - Smart Household Delivery",
  description: "Never run out of essentials again.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div
          className="min-h-screen flex flex-col"
          style={{ backgroundColor: "#E8EBEF" }}
        >
          <Header />

          <main className="flex-1">{children}</main>

          {/* Global Footer */}
          <footer
            className="py-8 px-6 mt-auto"
            style={{ backgroundColor: "#1D3C6E" }}
          >
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#6FAEF2" }}
                  >
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className="text-xl text-white"
                    style={{ fontWeight: "600" }}
                  >
                    Birgó
                  </span>
                </div>
                <nav className="flex gap-6 text-white text-sm">
                  <Link
                    href="/about"
                    className="hover:opacity-70 transition-opacity"
                  >
                    About
                  </Link>
                  <a href="#" className="hover:opacity-70 transition-opacity">
                    Contact
                  </a>
                  <a href="#" className="hover:opacity-70 transition-opacity">
                    Privacy
                  </a>
                  <a href="#" className="hover:opacity-70 transition-opacity">
                    Terms
                  </a>
                </nav>
              </div>
              <div className="text-center mt-6 text-white opacity-60 text-sm">
                © 2026 Birgó. Þú gleymir, við reddum!
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
