"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, Package } from "lucide-react";
import Link from "next/link";

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // where you verify credentials or create the user
    // For now - we instantly route them to the onboarding questionnaire!
    router.push("/get-started");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <div
        className="w-full max-w-md p-8 rounded-3xl bg-white shadow-sm border"
        style={{ borderColor: "#E8EBEF" }}
      >
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: "#6FAEF2" }}
          >
            <Package className="w-6 h-6 text-white" />
          </div>
          <h1
            className="mb-2"
            style={{ fontSize: "1.75rem", color: "#1D3C6E", fontWeight: "600" }}
          >
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p style={{ color: "#1D3C6E", opacity: "0.7" }} className="text-sm">
            {isLogin
              ? "Enter your details to access your account"
              : "Start automating your household essentials"}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                style={{ color: "#1D3C6E" }}
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50"
                  style={{ color: "#1D3C6E" }}
                />
                <input
                  type="text"
                  required
                  placeholder="Jón Jónsson"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 outline-none focus:border-opacity-100 transition-colors"
                  style={{
                    backgroundColor: "#E8EBEF",
                    border: "2px solid transparent",
                    color: "#1D3C6E",
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label
              className="block mb-2 text-sm font-medium"
              style={{ color: "#1D3C6E" }}
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50"
                style={{ color: "#1D3C6E" }}
              />
              <input
                type="email"
                required
                placeholder="jon@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 outline-none focus:border-opacity-100 transition-colors"
                style={{
                  backgroundColor: "#E8EBEF",
                  border: "2px solid transparent",
                  color: "#1D3C6E",
                }}
              />
            </div>
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium"
              style={{ color: "#1D3C6E" }}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50"
                style={{ color: "#1D3C6E" }}
              />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 outline-none focus:border-opacity-100 transition-colors"
                style={{
                  backgroundColor: "#E8EBEF",
                  border: "2px solid transparent",
                  color: "#1D3C6E",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-6 rounded-full text-white transition-all hover:scale-105 flex items-center justify-center gap-2 font-medium"
            style={{ backgroundColor: "#6FAEF2" }}
          >
            <span>{isLogin ? "Log in" : "Sign up"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-8 text-center text-sm">
          <span style={{ color: "#1D3C6E", opacity: "0.7" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold hover:underline"
            style={{ color: "#6FAEF2" }}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
