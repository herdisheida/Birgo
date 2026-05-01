import { Package, ArrowLeft, Calendar, TrendingUp, Edit2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSubscriptionStore } from '../store/subscriptionStore';

interface SubscriptionSettingsProps {
  onBack?: () => void;
  onSave?: () => void;
}

export function SubscriptionSettings({ onBack, onSave }: SubscriptionSettingsProps) {
  const {
    selectedProducts,
    subscriptionSettings,
    setSubscriptionSettings,
    updateProductUsage,
    removeProduct,
  } = useSubscriptionStore();

  const [isSaved, setIsSaved] = useState(false);

  // Initialize product usage from selected products if not already set
  useEffect(() => {
    const selectedProductIds = Object.keys(selectedProducts);
    const existingUsageIds = subscriptionSettings.productUsage.map(p => p.id);

    selectedProductIds.forEach(id => {
      if (!existingUsageIds.includes(id)) {
        const product = selectedProducts[id];
        updateProductUsage(id, 50); // Default to 50% usage
      }
    });
  }, [selectedProducts]);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onSave?.();
    }, 1000);
  };

  const getNextDeliveryDate = () => {
    const days = subscriptionSettings.frequency === 'weekly' ? 7 :
                 subscriptionSettings.frequency === 'monthly' ? 30 :
                 subscriptionSettings.customDays || 30;
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getUsageLabel = (usage: number) => {
    if (usage < 30) return 'Low';
    if (usage < 70) return 'Medium';
    return 'High';
  };

  const products = subscriptionSettings.productUsage;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8EBEF' }}>
      {/* Header */}
      <header className="py-4 px-6 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
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
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="mb-2" style={{ fontSize: '2rem', color: '#1D3C6E', fontWeight: '600' }}>
            Subscription settings
          </h1>
          <p style={{ color: '#1D3C6E', opacity: '0.7' }}>
            Manage your delivery preferences and product usage
          </p>
        </div>

        <div className="grid gap-6">
          {/* Next Delivery */}
          <div className="p-6 rounded-3xl bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#90C4F4' }}>
                <Calendar className="w-5 h-5" style={{ color: '#1D3C6E' }} />
              </div>
              <h2 style={{ fontSize: '1.25rem', color: '#1D3C6E', fontWeight: '600' }}>
                Next delivery
              </h2>
            </div>
            <p className="text-2xl mb-2" style={{ color: '#6FAEF2', fontWeight: '600' }}>
              {getNextDeliveryDate()}
            </p>
            <p className="text-sm" style={{ color: '#1D3C6E', opacity: '0.6' }}>
              Your next order will arrive on this date
            </p>
          </div>

          {/* Delivery Frequency */}
          <div className="p-6 rounded-3xl bg-white">
            <h2 className="mb-4" style={{ fontSize: '1.25rem', color: '#1D3C6E', fontWeight: '600' }}>
              Delivery frequency
            </h2>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {(['weekly', 'monthly', 'custom'] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setSubscriptionSettings({ frequency: freq })}
                  className="py-3 px-4 rounded-2xl transition-all hover:scale-105"
                  style={{
                    backgroundColor: subscriptionSettings.frequency === freq ? '#6FAEF2' : '#E8EBEF',
                    color: subscriptionSettings.frequency === freq ? 'white' : '#1D3C6E',
                    fontWeight: subscriptionSettings.frequency === freq ? '600' : '500'
                  }}
                >
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </button>
              ))}
            </div>

            {subscriptionSettings.frequency === 'custom' && (
              <div className="mt-4">
                <label className="block mb-2 text-sm" style={{ color: '#1D3C6E', opacity: '0.7' }}>
                  Every {subscriptionSettings.customDays || 30} days
                </label>
                <input
                  type="range"
                  min="7"
                  max="90"
                  value={subscriptionSettings.customDays || 30}
                  onChange={(e) => {
                    setSubscriptionSettings({ customDays: Number(e.target.value) });
                  }}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6FAEF2 0%, #6FAEF2 ${(((subscriptionSettings.customDays || 30) - 7) / 83) * 100}%, #E8EBEF ${(((subscriptionSettings.customDays || 30) - 7) / 83) * 100}%, #E8EBEF 100%)`
                  }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: '#1D3C6E', opacity: '0.5' }}>
                  <span>7 days</span>
                  <span>90 days</span>
                </div>
              </div>
            )}
          </div>

          {/* Product Usage */}
          <div className="p-6 rounded-3xl bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#90C4F4' }}>
                  <TrendingUp className="w-5 h-5" style={{ color: '#1D3C6E' }} />
                </div>
                <h2 style={{ fontSize: '1.25rem', color: '#1D3C6E', fontWeight: '600' }}>
                  Product usage
                </h2>
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:scale-105 transition-transform"
                style={{ backgroundColor: '#E8EBEF', color: '#1D3C6E' }}
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">Edit products</span>
              </button>
            </div>

            <p className="text-sm mb-6" style={{ color: '#1D3C6E', opacity: '0.6' }}>
              Adjust how quickly you use each product to optimize delivery timing
            </p>

            <div className="space-y-6">
              {products.map((product) => (
                <div key={product.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ color: '#1D3C6E', fontWeight: '600' }}>
                      {product.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: '#90C4F4', color: '#1D3C6E' }}>
                        {getUsageLabel(product.usage)}
                      </span>
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="text-sm hover:underline"
                        style={{ color: '#1D3C6E', opacity: '0.5' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Usage Slider */}
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={product.usage}
                      onChange={(e) => updateUsage(product.id, Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #6FAEF2 0%, #6FAEF2 ${product.usage}%, #E8EBEF ${product.usage}%, #E8EBEF 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs mt-1" style={{ color: '#1D3C6E', opacity: '0.5' }}>
                      <span>Low usage</span>
                      <span>High usage</span>
                    </div>
                  </div>

                  {/* Visual indicator */}
                  <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E8EBEF' }}>
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${product.usage}%`,
                        backgroundColor: product.usage < 30 ? '#90C4F4' : product.usage < 70 ? '#6FAEF2' : '#1D3C6E'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-4 rounded-full text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
            style={{ backgroundColor: isSaved ? '#1D3C6E' : '#6FAEF2' }}
          >
            {isSaved ? (
              <>
                <Check className="w-5 h-5" />
                <span>Changes saved</span>
              </>
            ) : (
              <span>Save changes</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
