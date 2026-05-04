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
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@birgo/app/store/subscriptionStore";
import { products, subscriptionPacks } from "@birgo/constants"; // <-- Imported packs here

export default function Home() {
  const { reset, addProduct } = useSubscriptionStore();
  const router = useRouter();

  // Updated to receive the entire pack object
  const handleBundleClick = (
    e: React.MouseEvent,
    pack: (typeof subscriptionPacks)[0],
  ) => {
    e.preventDefault();
    reset(); // Clear previous selections

    if (pack.id !== "custom") {
      // Loop over the dynamic product IDs from our constants
      pack.products.forEach((id) => {
        const p = products.find((prod) => prod.id === id);
        if (p) {
          // Set default bundle quantity to medium (5)
          addProduct({ id: p.id, name: p.name, quantity: 5, price: 5.99 });
        }
      });
      router.push("/subscription"); // Go straight to subscription quantities
    } else {
      router.push("/selection"); // Custom goes to empty selection
    }
  };

  return (
    <>
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="mb-4"
            style={{
              fontSize: "2.75rem",
              color: "#1D3C6E",
              fontWeight: "600",
              lineHeight: "1.2",
            }}
          >
            Never run out of
            <br />
            essentials again
          </h1>
          <p
            className="mb-6 text-lg"
            style={{ color: "#1D3C6E", opacity: "0.8" }}
          >
            We deliver household products automatically
          </p>
          <Link
            href="/auth"
            onClick={() => reset()}
            className="inline-block px-8 py-3 rounded-full text-white transition-transform hover:scale-105"
            style={{ backgroundColor: "#6FAEF2" }}
          >
            Get Started
          </Link>
          <p
            className="mt-4 text-sm"
            style={{ color: "#1D3C6E", opacity: "0.6" }}
          >
            Þú gleymir, við reddum!
          </p>
        </div>
      </section>

      <section id="how" className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-center mb-10"
            style={{ fontSize: "2rem", color: "#1D3C6E", fontWeight: "600" }}
          >
            How it works
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "#90C4F4" }}
              >
                <Package className="w-8 h-8" style={{ color: "#1D3C6E" }} />
              </div>
              <h3
                className="mb-3"
                style={{
                  fontSize: "1.125rem",
                  color: "#1D3C6E",
                  fontWeight: "600",
                }}
              >
                Choose products
              </h3>
              <p
                className="text-sm"
                style={{ color: "#1D3C6E", opacity: "0.7" }}
              >
                Select the household essentials you use regularly
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "#90C4F4" }}
              >
                <Sparkles className="w-8 h-8" style={{ color: "#1D3C6E" }} />
              </div>
              <h3
                className="mb-3"
                style={{
                  fontSize: "1.125rem",
                  color: "#1D3C6E",
                  fontWeight: "600",
                }}
              >
                Set usage
              </h3>
              <p
                className="text-sm"
                style={{ color: "#1D3C6E", opacity: "0.7" }}
              >
                Tell us how often you use them
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: "#90C4F4" }}
              >
                <RotateCw className="w-8 h-8" style={{ color: "#1D3C6E" }} />
              </div>
              <h3
                className="mb-3"
                style={{
                  fontSize: "1.125rem",
                  color: "#1D3C6E",
                  fontWeight: "600",
                }}
              >
                Get automatic delivery
              </h3>
              <p
                className="text-sm"
                style={{ color: "#1D3C6E", opacity: "0.7" }}
              >
                We deliver before you run out
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-center mb-10"
            style={{ fontSize: "2rem", color: "#1D3C6E", fontWeight: "600" }}
          >
            What we deliver
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Droplets, label: "Soap" },
              { icon: Zap, label: "Cleaning" },
              { icon: Wind, label: "Paper towels" },
              { icon: Trash2, label: "Trash bags" },
            ].map((category, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white text-center hover:scale-105 transition-transform cursor-pointer"
              >
                <category.icon
                  className="w-10 h-10 mx-auto mb-3"
                  style={{ color: "#6FAEF2" }}
                />
                <p
                  className="text-sm"
                  style={{ color: "#1D3C6E", fontWeight: "500" }}
                >
                  {category.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-center mb-10"
            style={{ fontSize: "2rem", color: "#1D3C6E", fontWeight: "600" }}
          >
            Subscription packs
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {/* We map directly over the imported subscriptionPacks */}
            {subscriptionPacks.map((pack) => (
              <div
                key={pack.id}
                className="p-5 rounded-3xl bg-white hover:shadow-xl transition-shadow flex flex-col"
                style={{
                  border: pack.id === "custom" ? "2px solid #6FAEF2" : "none",
                }}
              >
                <h3
                  className="mb-4"
                  style={{
                    fontSize: "1.125rem",
                    color: "#1D3C6E",
                    fontWeight: "600",
                  }}
                >
                  {pack.name}
                </h3>
                <ul className="space-y-2 mb-6 flex-1">
                  {pack.displayItems.map(
                    (item, i) =>
                      item && (
                        <li
                          key={i}
                          className="text-sm"
                          style={{ color: "#1D3C6E", opacity: "0.7" }}
                        >
                          • {item}
                        </li>
                      ),
                  )}
                </ul>
                <button
                  onClick={(e) => handleBundleClick(e, pack)}
                  className="block w-full py-2 rounded-full transition-all text-sm text-center"
                  style={{
                    backgroundColor: pack.id === "custom" ? "#6FAEF2" : "white",
                    color: pack.id === "custom" ? "white" : "#1D3C6E",
                    border: pack.id === "custom" ? "none" : "2px solid #E8EBEF",
                  }}
                >
                  {pack.id === "custom" ? "Build custom" : "Select"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-10 rounded-3xl bg-white text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#90C4F4" }}
            >
              <Bot className="w-8 h-8" style={{ color: "#1D3C6E" }} />
            </div>
            <h2
              className="mb-4"
              style={{ fontSize: "2rem", color: "#1D3C6E", fontWeight: "600" }}
            >
              Smart delivery
            </h2>
            <p className="text-lg" style={{ color: "#1D3C6E", opacity: "0.7" }}>
              We learn your usage patterns and automate deliveries so you never
              have to think about it
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
