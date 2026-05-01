"use client";

import { MapPin, CreditCard, Calendar, Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@birgo/app/store/subscriptionStore";

export default function Checkout() {
  const router = useRouter();
  const {
    selectedProducts,
    subscriptionSettings,
    deliveryAddress,
    setDeliveryAddress,
    paymentMethod,
    setPaymentMethod,
  } = useSubscriptionStore();

  const [isProcessing, setIsProcessing] = useState(false);

  const orderItems = Object.values(selectedProducts);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0,
  );
  const delivery = 4.99;
  const total = subtotal + delivery;

  const deliveryFrequency =
    subscriptionSettings.frequency === "weekly"
      ? "Weekly"
      : subscriptionSettings.frequency === "monthly"
        ? "Monthly"
        : `Every ${subscriptionSettings.customDays || 30} days`;

  const handleStartSubscription = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      router.push("/subscriptions");
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1
          className="mb-2"
          style={{
            fontSize: "2rem",
            color: "#1D3C6E",
            fontWeight: "600",
          }}
        >
          Complete your subscription
        </h1>
        <p style={{ color: "#1D3C6E", opacity: "0.7" }}>
          Review your order and start your automatic deliveries
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="p-6 rounded-3xl bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#90C4F4" }}
              >
                <MapPin className="w-5 h-5" style={{ color: "#1D3C6E" }} />
              </div>
              <h2
                style={{
                  fontSize: "1.25rem",
                  color: "#1D3C6E",
                  fontWeight: "600",
                }}
              >
                Delivery address
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className="block mb-2 text-sm"
                  style={{ color: "#1D3C6E", opacity: "0.7" }}
                >
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Jón Jónsson"
                  value={deliveryAddress.fullName || ""}
                  onChange={(e) =>
                    setDeliveryAddress({ fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-opacity-100 transition-colors"
                  style={{
                    backgroundColor: "#E8EBEF",
                    border: "2px solid #E8EBEF",
                    color: "#1D3C6E",
                  }}
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm"
                  style={{ color: "#1D3C6E", opacity: "0.7" }}
                >
                  Street address
                </label>
                <input
                  type="text"
                  placeholder="Laugavegur 123"
                  value={deliveryAddress.street || ""}
                  onChange={(e) =>
                    setDeliveryAddress({ street: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-opacity-100 transition-colors"
                  style={{
                    backgroundColor: "#E8EBEF",
                    border: "2px solid #E8EBEF",
                    color: "#1D3C6E",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block mb-2 text-sm"
                    style={{
                      color: "#1D3C6E",
                      opacity: "0.7",
                    }}
                  >
                    Postal code
                  </label>
                  <input
                    type="text"
                    placeholder="101"
                    value={deliveryAddress.postalCode || ""}
                    onChange={(e) =>
                      setDeliveryAddress({ postalCode: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-opacity-100 transition-colors"
                    style={{
                      backgroundColor: "#E8EBEF",
                      border: "2px solid #E8EBEF",
                      color: "#1D3C6E",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm"
                    style={{
                      color: "#1D3C6E",
                      opacity: "0.7",
                    }}
                  >
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Reykjavík"
                    value={deliveryAddress.city || ""}
                    onChange={(e) =>
                      setDeliveryAddress({ city: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-opacity-100 transition-colors"
                    style={{
                      backgroundColor: "#E8EBEF",
                      border: "2px solid #E8EBEF",
                      color: "#1D3C6E",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 rounded-3xl bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#90C4F4" }}
              >
                <CreditCard className="w-5 h-5" style={{ color: "#1D3C6E" }} />
              </div>
              <h2
                style={{
                  fontSize: "1.25rem",
                  color: "#1D3C6E",
                  fontWeight: "600",
                }}
              >
                Payment method
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className="block mb-2 text-sm"
                  style={{ color: "#1D3C6E", opacity: "0.7" }}
                >
                  Card number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={paymentMethod.cardNumber || ""}
                  onChange={(e) =>
                    setPaymentMethod({ cardNumber: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-opacity-100 transition-colors"
                  style={{
                    backgroundColor: "#E8EBEF",
                    border: "2px solid #E8EBEF",
                    color: "#1D3C6E",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block mb-2 text-sm"
                    style={{
                      color: "#1D3C6E",
                      opacity: "0.7",
                    }}
                  >
                    Expiry date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentMethod.expiryDate || ""}
                    onChange={(e) =>
                      setPaymentMethod({ expiryDate: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-opacity-100 transition-colors"
                    style={{
                      backgroundColor: "#E8EBEF",
                      border: "2px solid #E8EBEF",
                      color: "#1D3C6E",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm"
                    style={{
                      color: "#1D3C6E",
                      opacity: "0.7",
                    }}
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={paymentMethod.cvc || ""}
                    onChange={(e) => setPaymentMethod({ cvc: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 outline-none focus:border-opacity-100 transition-colors"
                    style={{
                      backgroundColor: "#E8EBEF",
                      border: "2px solid #E8EBEF",
                      color: "#1D3C6E",
                    }}
                  />
                </div>
              </div>

              <div
                className="mt-4 p-4 rounded-2xl"
                style={{ backgroundColor: "#E8EBEF" }}
              >
                <p
                  className="text-sm"
                  style={{ color: "#1D3C6E", opacity: "0.7" }}
                >
                  🔒 Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-4">
            {/* Subscription Overview */}
            <div className="p-6 rounded-3xl bg-white">
              <h2
                className="mb-4"
                style={{
                  fontSize: "1.25rem",
                  color: "#1D3C6E",
                  fontWeight: "600",
                }}
              >
                Subscription overview
              </h2>

              <div
                className="flex items-center gap-3 mb-4 p-4 rounded-2xl"
                style={{ backgroundColor: "#90C4F4" }}
              >
                <Calendar className="w-5 h-5" style={{ color: "#1D3C6E" }} />
                <div>
                  <p
                    className="text-sm"
                    style={{
                      color: "#1D3C6E",
                      opacity: "0.7",
                    }}
                  >
                    Delivery frequency
                  </p>
                  <p
                    style={{
                      color: "#1D3C6E",
                      fontWeight: "600",
                    }}
                  >
                    {deliveryFrequency}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {orderItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span style={{ color: "#1D3C6E" }}>
                      {item.name} × {item.quantity}
                    </span>
                    <span
                      style={{
                        color: "#1D3C6E",
                        fontWeight: "600",
                      }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="my-4 border-t"
                style={{ borderColor: "#E8EBEF" }}
              />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span
                    style={{
                      color: "#1D3C6E",
                      opacity: "0.7",
                    }}
                  >
                    Subtotal
                  </span>
                  <span style={{ color: "#1D3C6E" }}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span
                    style={{
                      color: "#1D3C6E",
                      opacity: "0.7",
                    }}
                  >
                    Delivery
                  </span>
                  <span style={{ color: "#1D3C6E" }}>
                    ${delivery.toFixed(2)}
                  </span>
                </div>
              </div>

              <div
                className="my-4 border-t"
                style={{ borderColor: "#E8EBEF" }}
              />

              <div className="flex justify-between items-center">
                <span
                  style={{
                    fontSize: "1.125rem",
                    color: "#1D3C6E",
                    fontWeight: "600",
                  }}
                >
                  Total per delivery
                </span>
                <span
                  style={{
                    fontSize: "1.5rem",
                    color: "#6FAEF2",
                    fontWeight: "600",
                  }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleStartSubscription}
                disabled={isProcessing}
                className="w-full mt-6 py-4 rounded-full text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: "#6FAEF2" }}
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Start Subscription</span>
                  </>
                )}
              </button>

              <p
                className="mt-4 text-xs text-center"
                style={{ color: "#1D3C6E", opacity: "0.6" }}
              >
                Cancel anytime, no questions asked
              </p>
            </div>

            {/* Trust Indicators */}
            <div
              className="p-4 rounded-2xl text-center"
              style={{ backgroundColor: "white" }}
            >
              <div
                className="flex justify-center gap-6 text-xs"
                style={{ color: "#1D3C6E", opacity: "0.6" }}
              >
                <span>✓ Free cancellation</span>
                <span>✓ Pause anytime</span>
                <span>✓ Change products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
