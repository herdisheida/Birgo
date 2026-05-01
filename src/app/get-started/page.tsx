"use client";

import {
  Users,
  Home,
  TrendingUp,
  Package,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@birgo/app/store/subscriptionStore";
import {
  householdSizes,
  householdTypes,
  productCategories,
  usageFrequencies,
} from "@birgo/constants";

export default function CustomerInput() {
  const router = useRouter();
  const { customerInput, setCustomerInput } = useSubscriptionStore();

  const toggleProductPreference = (category: string) => {
    const newPreferences = customerInput.productPreferences.includes(category)
      ? customerInput.productPreferences.filter((c) => c !== category)
      : [...customerInput.productPreferences, category];

    setCustomerInput({ productPreferences: newPreferences });
  };

  const handleCreatePlan = () => {
    router.push("/selection");
  };

  const isFormComplete =
    customerInput.householdSize &&
    customerInput.householdType &&
    customerInput.productPreferences.length > 0 &&
    customerInput.usageFrequency;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1
          className="mb-3"
          style={{ fontSize: "2rem", color: "#1D3C6E", fontWeight: "600" }}
        >
          Tell us about your household
        </h1>
        <p style={{ color: "#1D3C6E", opacity: "0.7" }}>
          Help us personalize your delivery plan
        </p>
      </div>

      <div className="space-y-6">
        {/* Household Size */}
        <div className="p-6 rounded-3xl bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#90C4F4" }}
            >
              <Users className="w-5 h-5" style={{ color: "#1D3C6E" }} />
            </div>
            <h2
              style={{
                fontSize: "1.25rem",
                color: "#1D3C6E",
                fontWeight: "600",
              }}
            >
              Household size
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {householdSizes.map((size) => (
              <button
                key={size}
                onClick={() => setCustomerInput({ householdSize: size })}
                className="py-3 px-4 rounded-2xl transition-all hover:scale-105"
                style={{
                  backgroundColor:
                    customerInput.householdSize === size
                      ? "#6FAEF2"
                      : "#E8EBEF",
                  color:
                    customerInput.householdSize === size ? "white" : "#1D3C6E",
                  fontWeight:
                    customerInput.householdSize === size ? "600" : "500",
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Household Type */}
        <div className="p-6 rounded-3xl bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#90C4F4" }}
            >
              <Home className="w-5 h-5" style={{ color: "#1D3C6E" }} />
            </div>
            <h2
              style={{
                fontSize: "1.25rem",
                color: "#1D3C6E",
                fontWeight: "600",
              }}
            >
              Household type
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {householdTypes.map((type) => (
              <button
                key={type}
                onClick={() => setCustomerInput({ householdType: type })}
                className="py-3 px-4 rounded-2xl transition-all hover:scale-105"
                style={{
                  backgroundColor:
                    customerInput.householdType === type
                      ? "#6FAEF2"
                      : "#E8EBEF",
                  color:
                    customerInput.householdType === type ? "white" : "#1D3C6E",
                  fontWeight:
                    customerInput.householdType === type ? "600" : "500",
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Product Preferences */}
        <div className="p-6 rounded-3xl bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#90C4F4" }}
            >
              <Package className="w-5 h-5" style={{ color: "#1D3C6E" }} />
            </div>
            <h2
              style={{
                fontSize: "1.25rem",
                color: "#1D3C6E",
                fontWeight: "600",
              }}
            >
              What do you need?
            </h2>
          </div>

          <p
            className="text-sm mb-4"
            style={{ color: "#1D3C6E", opacity: "0.7" }}
          >
            Select all categories that apply
          </p>

          <div className="grid grid-cols-2 gap-3">
            {productCategories.map((category) => (
              <button
                key={category}
                onClick={() => toggleProductPreference(category)}
                className="py-3 px-4 rounded-2xl transition-all hover:scale-105"
                style={{
                  backgroundColor: customerInput.productPreferences.includes(
                    category,
                  )
                    ? "#6FAEF2"
                    : "#E8EBEF",
                  color: customerInput.productPreferences.includes(category)
                    ? "white"
                    : "#1D3C6E",
                  fontWeight: customerInput.productPreferences.includes(
                    category,
                  )
                    ? "600"
                    : "500",
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Usage Habits */}
        <div className="p-6 rounded-3xl bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#90C4F4" }}
            >
              <TrendingUp className="w-5 h-5" style={{ color: "#1D3C6E" }} />
            </div>
            <h2
              style={{
                fontSize: "1.25rem",
                color: "#1D3C6E",
                fontWeight: "600",
              }}
            >
              Usage frequency
            </h2>
          </div>

          <p
            className="text-sm mb-4"
            style={{ color: "#1D3C6E", opacity: "0.7" }}
          >
            How quickly do you typically go through household products?
          </p>

          <div className="grid grid-cols-3 gap-3">
            {usageFrequencies.map((frequency) => (
              <button
                key={frequency}
                onClick={() => setCustomerInput({ usageFrequency: frequency })}
                className="py-3 px-4 rounded-2xl transition-all hover:scale-105"
                style={{
                  backgroundColor:
                    customerInput.usageFrequency === frequency
                      ? "#6FAEF2"
                      : "#E8EBEF",
                  color:
                    customerInput.usageFrequency === frequency
                      ? "white"
                      : "#1D3C6E",
                  fontWeight:
                    customerInput.usageFrequency === frequency ? "600" : "500",
                }}
              >
                {frequency}
              </button>
            ))}
          </div>
        </div>

        {/* AI Optimization Message */}
        <div
          className="p-8 rounded-3xl text-center"
          style={{ backgroundColor: "#90C4F4" }}
        >
          <div
            className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: "white" }}
          >
            <Sparkles className="w-7 h-7" style={{ color: "#1D3C6E" }} />
          </div>
          <h3
            className="mb-2"
            style={{
              fontSize: "1.25rem",
              color: "#1D3C6E",
              fontWeight: "600",
            }}
          >
            AI-powered optimization
          </h3>
          <p style={{ color: "#1D3C6E", opacity: "0.8" }}>
            We use smart algorithms to learn your patterns and optimize delivery
            timing, so you always have what you need
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleCreatePlan}
          disabled={!isFormComplete}
          className="w-full py-4 rounded-full text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ backgroundColor: "#6FAEF2" }}
        >
          <span>Create my plan</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {!isFormComplete && (
          <p
            className="text-center text-sm"
            style={{ color: "#1D3C6E", opacity: "0.6" }}
          >
            Please complete all sections to continue
          </p>
        )}
      </div>
    </div>
  );
}
