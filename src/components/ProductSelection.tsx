"use client";

import { X, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useSubscriptionStore } from "@birgo/app/store/subscriptionStore";
import { products } from "@birgo/constants";
import { ProductSelectionProps } from "@birgo/types";

export function ProductSelection({ onContinue }: ProductSelectionProps) {
  const { customerInput, selectedProducts, addProduct, removeProduct } =
    useSubscriptionStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (
      Object.keys(selectedProducts).length === 0 &&
      customerInput.productPreferences.length > 0
    ) {
      products.forEach((product) => {
        let match = false;
        if (
          customerInput.productPreferences.includes("Bathroom") &&
          product.category === "Bathroom"
        )
          match = true;
        if (
          customerInput.productPreferences.includes("Kitchen") &&
          product.category === "Kitchen"
        )
          match = true;
        if (
          customerInput.productPreferences.includes("Laundry") &&
          product.category === "Laundry"
        )
          match = true;
        if (
          customerInput.productPreferences.includes("Cleaning") &&
          (product.category === "Kitchen" || product.category === "Bathroom")
        )
          match = true;

        if (match) {
          addProduct({
            id: product.id,
            name: product.name,
            quantity: 1, // Default quantity set to 1 here. User modifies later.
            price: 5.99,
          });
        }
      });
    }
  }, [addProduct, customerInput, selectedProducts]);

  const addItem = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addProduct({
        id: product.id,
        name: product.name,
        quantity: 1,
        price: 5.99,
      });
    }
  };

  const selectedCount = Object.keys(selectedProducts).length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">
      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1
              className="mb-2"
              style={{ fontSize: "2rem", color: "#1D3C6E", fontWeight: "600" }}
            >
              Choose your products
            </h1>
            <p style={{ color: "#1D3C6E", opacity: "0.7" }}>
              Select all the items you want delivered
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full mt-2"
            style={{ backgroundColor: "#90C4F4", color: "#1D3C6E" }}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>{selectedCount}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => {
            const isAdded = !!selectedProducts[product.id];

            return (
              <div
                key={product.id}
                className="p-5 rounded-3xl bg-white hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: "#90C4F4" }}
                >
                  <product.icon
                    className="w-6 h-6"
                    style={{ color: "#1D3C6E" }}
                  />
                </div>
                <h3
                  className="text-center mb-4 text-sm"
                  style={{ color: "#1D3C6E", fontWeight: "600" }}
                >
                  {product.name}
                </h3>
                {!isAdded ? (
                  <button
                    onClick={() => addItem(product.id)}
                    className="w-full py-2 rounded-full text-sm transition-all hover:scale-105"
                    style={{ backgroundColor: "#6FAEF2", color: "white" }}
                  >
                    Add
                  </button>
                ) : (
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="w-full py-2 rounded-full text-sm transition-all hover:scale-105"
                    style={{ backgroundColor: "#E8EBEF", color: "#1D3C6E" }}
                  >
                    Remove
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block w-80">
        <div className="sticky top-8 p-6 rounded-3xl bg-white">
          <h2
            className="mb-4"
            style={{ fontSize: "1.25rem", color: "#1D3C6E", fontWeight: "600" }}
          >
            Your selection
          </h2>
          {selectedCount === 0 ? (
            <div
              className="text-center py-8"
              style={{ color: "#1D3C6E", opacity: "0.5" }}
            >
              <ShoppingBag className="w-12 h-12 mx-auto mb-3" />
              <p className="text-sm">No items selected</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {Object.entries(selectedProducts).map(([productId, item]) => {
                  const product = products.find((p) => p.id === productId);
                  if (!product) return null;
                  return (
                    <div
                      key={productId}
                      className="flex items-center justify-between p-3 rounded-2xl"
                      style={{ backgroundColor: "#E8EBEF" }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#90C4F4" }}
                        >
                          <product.icon
                            className="w-4 h-4"
                            style={{ color: "#1D3C6E" }}
                          />
                        </div>
                        <p
                          className="text-sm"
                          style={{ color: "#1D3C6E", fontWeight: "600" }}
                        >
                          {product.name}
                        </p>
                      </div>
                      <button
                        onClick={() => removeProduct(productId)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                        style={{ backgroundColor: "#1D3C6E" }}
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="pt-4 border-t" style={{ borderColor: "#E8EBEF" }}>
                <button
                  onClick={onContinue}
                  className="w-full py-3 rounded-full text-white transition-transform hover:scale-105"
                  style={{ backgroundColor: "#6FAEF2" }}
                >
                  Set Quantities
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2
                style={{
                  fontSize: "1.25rem",
                  color: "#1D3C6E",
                  fontWeight: "600",
                }}
              >
                Your selection
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#E8EBEF" }}
              >
                <X className="w-5 h-5" style={{ color: "#1D3C6E" }} />
              </button>
            </div>
            {selectedCount === 0 ? (
              <div
                className="text-center py-8"
                style={{ color: "#1D3C6E", opacity: "0.5" }}
              >
                <ShoppingBag className="w-12 h-12 mx-auto mb-3" />
                <p className="text-sm">No items selected</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {Object.entries(selectedProducts).map(([productId, item]) => {
                    const product = products.find((p) => p.id === productId);
                    if (!product) return null;
                    return (
                      <div
                        key={productId}
                        className="flex items-center justify-between p-3 rounded-2xl"
                        style={{ backgroundColor: "#E8EBEF" }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#90C4F4" }}
                          >
                            <product.icon
                              className="w-4 h-4"
                              style={{ color: "#1D3C6E" }}
                            />
                          </div>
                          <p
                            className="text-sm"
                            style={{ color: "#1D3C6E", fontWeight: "600" }}
                          >
                            {product.name}
                          </p>
                        </div>
                        <button
                          onClick={() => removeProduct(productId)}
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#1D3C6E" }}
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div
                  className="pt-4 border-t"
                  style={{ borderColor: "#E8EBEF" }}
                >
                  <button
                    className="w-full py-3 rounded-full text-white"
                    style={{ backgroundColor: "#6FAEF2" }}
                    onClick={() => {
                      setSidebarOpen(false);
                      onContinue?.();
                    }}
                  >
                    Set Quantities
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
