"use client";

import { Calendar, Package, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@birgo/app/store/subscriptionStore";

export default function Subscriptions() {
  const router = useRouter();
  const { selectedProducts, subscriptionSettings } = useSubscriptionStore();

  const orderItems = Object.values(selectedProducts);
  const hasActiveSubscription = orderItems.length > 0;

  const getFrequencyLabel = () => {
    if (subscriptionSettings.frequency === "weekly") return "Weekly";
    if (subscriptionSettings.frequency === "monthly") return "Monthly";
    return `Every ${subscriptionSettings.customDays || 30} days`;
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

  const getTotalPrice = () => {
    return orderItems.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0,
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1
          className="mb-2"
          style={{ fontSize: "2rem", color: "#1D3C6E", fontWeight: "600" }}
        >
          My Subscriptions
        </h1>
        <p style={{ color: "#1D3C6E", opacity: "0.7" }}>
          Manage your automatic deliveries
        </p>
      </div>

      {!hasActiveSubscription ? (
        <div className="p-12 rounded-3xl bg-white text-center">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: "#E8EBEF" }}
          >
            <Package className="w-10 h-10" style={{ color: "#1D3C6E" }} />
          </div>
          <h2
            className="mb-4"
            style={{
              fontSize: "1.5rem",
              color: "#1D3C6E",
              fontWeight: "600",
            }}
          >
            No active subscriptions
          </h2>
          <p className="mb-6" style={{ color: "#1D3C6E", opacity: "0.7" }}>
            Start your first subscription to never run out of essentials
          </p>
          <button
            onClick={() => router.push("/get-started")}
            className="px-8 py-3 rounded-full text-white transition-transform hover:scale-105"
            style={{ backgroundColor: "#6FAEF2" }}
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {/* Active Subscription Card */}
          <div className="p-6 rounded-3xl bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#90C4F4" }}
                >
                  <Calendar className="w-6 h-6" style={{ color: "#1D3C6E" }} />
                </div>
                <div>
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      color: "#1D3C6E",
                      fontWeight: "600",
                    }}
                  >
                    Active Subscription
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: "#1D3C6E", opacity: "0.6" }}
                  >
                    {getFrequencyLabel()} delivery
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push("/subscription")}
                  className="p-2 rounded-full hover:scale-110 transition-transform"
                  style={{ backgroundColor: "#E8EBEF" }}
                >
                  <Edit className="w-5 h-5" style={{ color: "#1D3C6E" }} />
                </button>
              </div>
            </div>

            {/* Next Delivery */}
            <div
              className="p-4 rounded-2xl mb-6"
              style={{ backgroundColor: "#90C4F4" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "#1D3C6E", opacity: "0.7" }}
                  >
                    Next delivery
                  </p>
                  <p
                    style={{
                      fontSize: "1.25rem",
                      color: "#1D3C6E",
                      fontWeight: "600",
                    }}
                  >
                    {getNextDeliveryDate()}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="text-sm mb-1"
                    style={{ color: "#1D3C6E", opacity: "0.7" }}
                  >
                    Total
                  </p>
                  <p
                    style={{
                      fontSize: "1.25rem",
                      color: "#1D3C6E",
                      fontWeight: "600",
                    }}
                  >
                    ${getTotalPrice().toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3
                className="mb-4"
                style={{
                  fontSize: "1.125rem",
                  color: "#1D3C6E",
                  fontWeight: "600",
                }}
              >
                Products ({orderItems.length})
              </h3>
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-2xl"
                    style={{ backgroundColor: "#E8EBEF" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#90C4F4" }}
                      >
                        <Package
                          className="w-5 h-5"
                          style={{ color: "#1D3C6E" }}
                        />
                      </div>
                      <div>
                        <p style={{ color: "#1D3C6E", fontWeight: "600" }}>
                          {item.name}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "#1D3C6E", opacity: "0.6" }}
                        >
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p style={{ color: "#1D3C6E", fontWeight: "600" }}>
                      ${((item.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div
              className="mt-6 pt-6 border-t flex gap-3"
              style={{ borderColor: "#E8EBEF" }}
            >
              <button
                onClick={() => router.push("/subscription")}
                className="flex-1 py-3 rounded-full transition-all hover:scale-105"
                style={{ backgroundColor: "#6FAEF2", color: "white" }}
              >
                Manage Subscription
              </button>
            </div>
          </div>

          {/* Subscription Info */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white text-center">
              <Calendar
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: "#6FAEF2" }}
              />
              <p
                className="text-sm mb-1"
                style={{ color: "#1D3C6E", opacity: "0.7" }}
              >
                Frequency
              </p>
              <p style={{ color: "#1D3C6E", fontWeight: "600" }}>
                {getFrequencyLabel()}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white text-center">
              <Package
                className="w-8 h-8 mx-auto mb-2"
                style={{ color: "#6FAEF2" }}
              />
              <p
                className="text-sm mb-1"
                style={{ color: "#1D3C6E", opacity: "0.7" }}
              >
                Products
              </p>
              <p style={{ color: "#1D3C6E", fontWeight: "600" }}>
                {orderItems.length} items
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white text-center">
              <p className="text-2xl mb-1" style={{ color: "#6FAEF2" }}>
                $
              </p>
              <p
                className="text-sm mb-1"
                style={{ color: "#1D3C6E", opacity: "0.7" }}
              >
                Per delivery
              </p>
              <p style={{ color: "#1D3C6E", fontWeight: "600" }}>
                ${getTotalPrice().toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
