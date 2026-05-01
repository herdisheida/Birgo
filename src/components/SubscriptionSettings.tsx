"use client";

import { Calendar, TrendingUp, Check, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSubscriptionStore } from "@birgo/app/store/subscriptionStore";
import { SubscriptionSettingsProps } from "@birgo/types";

export function SubscriptionSettings({ onSave }: SubscriptionSettingsProps) {
  const {
    selectedProducts,
    subscriptionSettings,
    setSubscriptionSettings,
    updateProductQuantity,
    removeProduct,
  } = useSubscriptionStore();

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onSave?.();
    }, 1000);
  };

  const getNextDeliveryDate = () => {
    const days =
      subscriptionSettings.frequency === "weekly"
        ? 7
        : subscriptionSettings.frequency === "monthly"
          ? 30
          : subscriptionSettings.customDays || 30;
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getUsageLabel = (quantity: number) => {
    if (quantity <= 3) return "Low Usage";
    if (quantity <= 6) return "Medium Usage";
    return "High Usage";
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1
          className="mb-2"
          style={{ fontSize: "2rem", color: "#1D3C6E", fontWeight: "600" }}
        >
          Subscription settings
        </h1>
        <p style={{ color: "#1D3C6E", opacity: "0.7" }}>
          Manage your delivery preferences and product quantities
        </p>
      </div>

      <div className="grid gap-6">
        {/* Next Delivery */}
        <div className="p-6 rounded-3xl bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#90C4F4" }}
            >
              <Calendar className="w-5 h-5" style={{ color: "#1D3C6E" }} />
            </div>
            <h2
              style={{
                fontSize: "1.25rem",
                color: "#1D3C6E",
                fontWeight: "600",
              }}
            >
              Next delivery
            </h2>
          </div>
          <p
            className="text-2xl mb-2"
            style={{ color: "#6FAEF2", fontWeight: "600" }}
          >
            {getNextDeliveryDate()}
          </p>
          <p className="text-sm" style={{ color: "#1D3C6E", opacity: "0.6" }}>
            Your next order will arrive on this date
          </p>
        </div>

        {/* Delivery Frequency */}
        <div className="p-6 rounded-3xl bg-white">
          <h2
            className="mb-4"
            style={{
              fontSize: "1.25rem",
              color: "#1D3C6E",
              fontWeight: "600",
            }}
          >
            Delivery frequency
          </h2>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {(["weekly", "monthly", "custom"] as const).map((freq) => (
              <button
                key={freq}
                onClick={() => setSubscriptionSettings({ frequency: freq })}
                className="py-3 px-4 rounded-2xl transition-all hover:scale-105"
                style={{
                  backgroundColor:
                    subscriptionSettings.frequency === freq
                      ? "#6FAEF2"
                      : "#E8EBEF",
                  color:
                    subscriptionSettings.frequency === freq
                      ? "white"
                      : "#1D3C6E",
                  fontWeight:
                    subscriptionSettings.frequency === freq ? "600" : "500",
                }}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </button>
            ))}
          </div>

          {subscriptionSettings.frequency === "custom" && (
            <div className="mt-4">
              <label
                className="block mb-2 text-sm"
                style={{ color: "#1D3C6E", opacity: "0.7" }}
              >
                Every {subscriptionSettings.customDays || 30} days
              </label>
              <input
                type="range"
                min="7"
                max="90"
                value={subscriptionSettings.customDays || 30}
                onChange={(e) => {
                  setSubscriptionSettings({
                    customDays: Number(e.target.value),
                  });
                }}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #6FAEF2 0%, #6FAEF2 ${(((subscriptionSettings.customDays || 30) - 7) / 83) * 100}%, #E8EBEF ${(((subscriptionSettings.customDays || 30) - 7) / 83) * 100}%, #E8EBEF 100%)`,
                }}
              />
              <div
                className="flex justify-between text-xs mt-1"
                style={{ color: "#1D3C6E", opacity: "0.5" }}
              >
                <span>7 days</span>
                <span>90 days</span>
              </div>
            </div>
          )}
        </div>

        {/* Product Quantities / Usage */}
        <div className="p-6 rounded-3xl bg-white">
          <div className="flex items-center gap-3 mb-6">
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
              Set quantities
            </h2>
          </div>

          <div className="space-y-8">
            {Object.values(selectedProducts).map((product) => (
              <div
                key={product.id}
                className="pb-6 border-b last:border-0"
                style={{ borderColor: "#E8EBEF" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span
                      style={{
                        color: "#1D3C6E",
                        fontWeight: "600",
                        fontSize: "1.125rem",
                      }}
                    >
                      {product.name}
                    </span>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "#1D3C6E", opacity: "0.6" }}
                    >
                      Quantity per delivery:{" "}
                      <span style={{ fontWeight: "700", color: "#6FAEF2" }}>
                        {product.quantity}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ backgroundColor: "#90C4F4", color: "#1D3C6E" }}
                    >
                      {getUsageLabel(product.quantity)}
                    </span>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="text-sm p-2 hover:bg-gray-100 rounded-full transition-colors"
                      style={{ color: "#1D3C6E", opacity: "0.5" }}
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Quantity Slider */}
                <div className="px-1">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={product.quantity}
                    onChange={(e) =>
                      updateProductQuantity(product.id, Number(e.target.value))
                    }
                    className="w-full h-2 rounded-full appearance-none cursor-pointer mb-2"
                    style={{
                      background: `linear-gradient(to right, #6FAEF2 0%, #6FAEF2 ${((product.quantity - 1) / 9) * 100}%, #E8EBEF ${((product.quantity - 1) / 9) * 100}%, #E8EBEF 100%)`,
                    }}
                  />
                  <div
                    className="flex justify-between text-xs font-medium"
                    style={{ color: "#1D3C6E", opacity: "0.5" }}
                  >
                    <span>Low (1)</span>
                    <span>Medium (5)</span>
                    <span>High (10)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-full text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
          style={{ backgroundColor: isSaved ? "#1D3C6E" : "#6FAEF2" }}
        >
          {isSaved ? (
            <>
              <Check className="w-5 h-5" />
              <span>Proceeding to Checkout</span>
            </>
          ) : (
            <span>Save and Continue</span>
          )}
        </button>
      </div>
    </div>
  );
}
