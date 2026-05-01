import { Package, Minus, Plus, X, ShoppingBag, Sparkles, Wind, Droplets, Trash2, Zap, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  icon: any;
  category: string;
}

const products: Product[] = [
  { id: '1', name: 'Toilet paper', icon: Wind, category: 'Bathroom' },
  { id: '2', name: 'Paper towels', icon: Wind, category: 'Kitchen' },
  { id: '3', name: 'Toothbrush & toothpaste', icon: Sparkles, category: 'Bathroom' },
  { id: '4', name: 'Laundry detergent', icon: Droplets, category: 'Cleaning' },
  { id: '5', name: 'Hand soap', icon: Droplets, category: 'Bathroom' },
  { id: '6', name: 'Sponges', icon: Zap, category: 'Kitchen' },
  { id: '7', name: 'Dishwasher tablets', icon: Sparkles, category: 'Kitchen' },
  { id: '8', name: 'Cleaning tools', icon: Trash2, category: 'Cleaning' },
];

interface ProductSelectionProps {
  onBack?: () => void;
  onContinue?: () => void;
}

export function ProductSelection({ onBack, onContinue }: ProductSelectionProps) {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addItem = (productId: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [productId]: 1
    }));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setSelectedItems(prev => {
      const current = prev[productId] || 0;
      const newQuantity = current + delta;
      if (newQuantity <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQuantity };
    });
  };

  const removeItem = (productId: string) => {
    setSelectedItems(prev => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  };

  const selectedCount = Object.keys(selectedItems).length;
  const totalItems = Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8EBEF' }}>
      {/* Header */}
      <header className="py-4 px-6 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ backgroundColor: '#E8EBEF' }}
              >
                <ArrowLeft className="w-5 h-5" style={{ color: '#1D3C6E' }} />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6FAEF2' }}>
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl" style={{ color: '#1D3C6E', fontWeight: '600' }}>Birgó</span>
            </div>
          </div>

          {/* Mobile cart button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ backgroundColor: '#90C4F4', color: '#1D3C6E' }}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>{selectedCount}</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="mb-2" style={{ fontSize: '2rem', color: '#1D3C6E', fontWeight: '600' }}>
              Choose your products
            </h1>
            <p style={{ color: '#1D3C6E', opacity: '0.7' }}>
              Select the essentials you need delivered automatically
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => {
              const quantity = selectedItems[product.id] || 0;
              const isAdded = quantity > 0;

              return (
                <div
                  key={product.id}
                  className="p-5 rounded-3xl bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#90C4F4' }}>
                    <product.icon className="w-6 h-6" style={{ color: '#1D3C6E' }} />
                  </div>

                  <h3 className="text-center mb-4 text-sm" style={{ color: '#1D3C6E', fontWeight: '600' }}>
                    {product.name}
                  </h3>

                  {!isAdded ? (
                    <button
                      onClick={() => addItem(product.id)}
                      className="w-full py-2 rounded-full text-sm transition-all hover:scale-105"
                      style={{ backgroundColor: '#6FAEF2', color: 'white' }}
                    >
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ backgroundColor: '#90C4F4' }}
                      >
                        <Minus className="w-4 h-4" style={{ color: '#1D3C6E' }} />
                      </button>
                      <span style={{ color: '#1D3C6E', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{ backgroundColor: '#6FAEF2' }}
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80">
          <div className="sticky top-8 p-6 rounded-3xl bg-white">
            <h2 className="mb-4" style={{ fontSize: '1.25rem', color: '#1D3C6E', fontWeight: '600' }}>
              Your selection
            </h2>

            {selectedCount === 0 ? (
              <div className="text-center py-8" style={{ color: '#1D3C6E', opacity: '0.5' }}>
                <ShoppingBag className="w-12 h-12 mx-auto mb-3" />
                <p className="text-sm">No items selected</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                  {Object.entries(selectedItems).map(([productId, quantity]) => {
                    const product = products.find(p => p.id === productId);
                    if (!product) return null;

                    return (
                      <div
                        key={productId}
                        className="flex items-center justify-between p-3 rounded-2xl"
                        style={{ backgroundColor: '#E8EBEF' }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#90C4F4' }}>
                            <product.icon className="w-4 h-4" style={{ color: '#1D3C6E' }} />
                          </div>
                          <div>
                            <p className="text-sm" style={{ color: '#1D3C6E', fontWeight: '600' }}>
                              {product.name}
                            </p>
                            <p className="text-xs" style={{ color: '#1D3C6E', opacity: '0.6' }}>
                              Qty: {quantity}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(productId)}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          style={{ backgroundColor: '#1D3C6E' }}
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t" style={{ borderColor: '#E8EBEF' }}>
                  <div className="flex justify-between mb-4">
                    <span style={{ color: '#1D3C6E', opacity: '0.7' }}>Total items</span>
                    <span style={{ color: '#1D3C6E', fontWeight: '600' }}>{totalItems}</span>
                  </div>
                  <button
                    onClick={onContinue}
                    className="w-full py-3 rounded-full text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: '#6FAEF2' }}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontSize: '1.25rem', color: '#1D3C6E', fontWeight: '600' }}>
                Your selection
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#E8EBEF' }}
              >
                <X className="w-5 h-5" style={{ color: '#1D3C6E' }} />
              </button>
            </div>

            {selectedCount === 0 ? (
              <div className="text-center py-8" style={{ color: '#1D3C6E', opacity: '0.5' }}>
                <ShoppingBag className="w-12 h-12 mx-auto mb-3" />
                <p className="text-sm">No items selected</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {Object.entries(selectedItems).map(([productId, quantity]) => {
                    const product = products.find(p => p.id === productId);
                    if (!product) return null;

                    return (
                      <div
                        key={productId}
                        className="flex items-center justify-between p-3 rounded-2xl"
                        style={{ backgroundColor: '#E8EBEF' }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#90C4F4' }}>
                            <product.icon className="w-4 h-4" style={{ color: '#1D3C6E' }} />
                          </div>
                          <div>
                            <p className="text-sm" style={{ color: '#1D3C6E', fontWeight: '600' }}>
                              {product.name}
                            </p>
                            <p className="text-xs" style={{ color: '#1D3C6E', opacity: '0.6' }}>
                              Qty: {quantity}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(productId)}
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#1D3C6E' }}
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t" style={{ borderColor: '#E8EBEF' }}>
                  <div className="flex justify-between mb-4">
                    <span style={{ color: '#1D3C6E', opacity: '0.7' }}>Total items</span>
                    <span style={{ color: '#1D3C6E', fontWeight: '600' }}>{totalItems}</span>
                  </div>
                  <button
                    className="w-full py-3 rounded-full text-white"
                    style={{ backgroundColor: '#6FAEF2' }}
                    onClick={() => {
                      setSidebarOpen(false);
                      onContinue?.();
                    }}
                  >
                    Continue
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
