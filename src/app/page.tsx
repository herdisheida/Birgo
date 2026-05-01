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
import { useSubscriptionStore } from "./store/subscriptionStore";

export default function Home() {
  const { reset } = useSubscriptionStore();

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
            href="/get-started"
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

      {/* ... keep the rest of your sections exactly the same ... */}

      {/* Update pricing section links to use 'href' instead of 'to' */}
      <Link
        href={idx === 3 ? "/selection" : "/get-started"}
        onClick={() => {
          if (idx === 3) reset();
        }}
        className="block w-full py-2 rounded-full transition-all text-sm text-center"
        style={{
          backgroundColor: idx === 3 ? "#6FAEF2" : "white",
          color: idx === 3 ? "white" : "#1D3C6E",
          border: idx === 3 ? "none" : "2px solid #E8EBEF",
        }}
      >
        {idx === 3 ? "Build custom" : "Select"}
      </Link>
    </>
  );
}
