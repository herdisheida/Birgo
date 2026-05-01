import { Package, ArrowLeft, Users, Home, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function CustomerInput() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    householdSize: '',
    householdType: '',
    productPreferences: [] as string[],
    usageFrequency: '',
  });

  const householdSizes = ['1 person', '2 people', '3-4 people', '5+ people'];
  const householdTypes = ['Living alone', 'Couple', 'Family with kids', 'Shared apartment'];
  const productCategories = ['Bathroom', 'Kitchen', 'Cleaning', 'Laundry'];
  const usageFrequencies = ['Light use', 'Moderate use', 'Heavy use'];

  const toggleProductPreference = (category: string) => {
    setFormData(prev => ({
      ...prev,
      productPreferences: prev.productPreferences.includes(category)
        ? prev.productPreferences.filter(c => c !== category)
        : [...prev.productPreferences, category]
    }));
  };

  const handleCreatePlan = () => {
    navigate('/selection');
  };

  const isFormComplete = formData.householdSize && formData.householdType &&
                         formData.productPreferences.length > 0 && formData.usageFrequency;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8EBEF' }}>
      {/* Header */}
      <header className="py-4 px-6 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              style={{ backgroundColor: '#E8EBEF' }}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: '#1D3C6E' }} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6FAEF2' }}>
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl" style={{ color: '#1D3C6E', fontWeight: '600' }}>
                Birgó
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="mb-3" style={{ fontSize: '2rem', color: '#1D3C6E', fontWeight: '600' }}>
            Tell us about your household
          </h1>
          <p style={{ color: '#1D3C6E', opacity: '0.7' }}>
            Help us personalize your delivery plan
          </p>
        </div>

        <div className="space-y-6">
          {/* Household Size */}
          <div className="p-6 rounded-3xl bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#90C4F4' }}>
                <Users className="w-5 h-5" style={{ color: '#1D3C6E' }} />
              </div>
              <h2 style={{ fontSize: '1.25rem', color: '#1D3C6E', fontWeight: '600' }}>
                Household size
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {householdSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setFormData(prev => ({ ...prev, householdSize: size }))}
                  className="py-3 px-4 rounded-2xl transition-all hover:scale-105"
                  style={{
                    backgroundColor: formData.householdSize === size ? '#6FAEF2' : '#E8EBEF',
                    color: formData.householdSize === size ? 'white' : '#1D3C6E',
                    fontWeight: formData.householdSize === size ? '600' : '500'
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
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#90C4F4' }}>
                <Home className="w-5 h-5" style={{ color: '#1D3C6E' }} />
              </div>
              <h2 style={{ fontSize: '1.25rem', color: '#1D3C6E', fontWeight: '600' }}>
                Household type
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {householdTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData(prev => ({ ...prev, householdType: type }))}
                  className="py-3 px-4 rounded-2xl transition-all hover:scale-105"
                  style={{
                    backgroundColor: formData.householdType === type ? '#6FAEF2' : '#E8EBEF',
                    color: formData.householdType === type ? 'white' : '#1D3C6E',
                    fontWeight: formData.householdType === type ? '600' : '500'
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
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#90C4F4' }}>
                <Package className="w-5 h-5" style={{ color: '#1D3C6E' }} />
              </div>
              <h2 style={{ fontSize: '1.25rem', color: '#1D3C6E', fontWeight: '600' }}>
                What do you need?
              </h2>
            </div>

            <p className="text-sm mb-4" style={{ color: '#1D3C6E', opacity: '0.7' }}>
              Select all categories that apply
            </p>

            <div className="grid grid-cols-2 gap-3">
              {productCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleProductPreference(category)}
                  className="py-3 px-4 rounded-2xl transition-all hover:scale-105"
                  style={{
                    backgroundColor: formData.productPreferences.includes(category) ? '#6FAEF2' : '#E8EBEF',
                    color: formData.productPreferences.includes(category) ? 'white' : '#1D3C6E',
                    fontWeight: formData.productPreferences.includes(category) ? '600' : '500'
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
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#90C4F4' }}>
                <TrendingUp className="w-5 h-5" style={{ color: '#1D3C6E' }} />
              </div>
              <h2 style={{ fontSize: '1.25rem', color: '#1D3C6E', fontWeight: '600' }}>
                Usage frequency
              </h2>
            </div>

            <p className="text-sm mb-4" style={{ color: '#1D3C6E', opacity: '0.7' }}>
              How quickly do you typically go through household products?
            </p>

            <div className="grid grid-cols-3 gap-3">
              {usageFrequencies.map((frequency) => (
                <button
                  key={frequency}
                  onClick={() => setFormData(prev => ({ ...prev, usageFrequency: frequency }))}
                  className="py-3 px-4 rounded-2xl transition-all hover:scale-105"
                  style={{
                    backgroundColor: formData.usageFrequency === frequency ? '#6FAEF2' : '#E8EBEF',
                    color: formData.usageFrequency === frequency ? 'white' : '#1D3C6E',
                    fontWeight: formData.usageFrequency === frequency ? '600' : '500'
                  }}
                >
                  {frequency}
                </button>
              ))}
            </div>
          </div>

          {/* AI Optimization Message */}
          <div className="p-8 rounded-3xl text-center" style={{ backgroundColor: '#90C4F4' }}>
            <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'white' }}>
              <Sparkles className="w-7 h-7" style={{ color: '#1D3C6E' }} />
            </div>
            <h3 className="mb-2" style={{ fontSize: '1.25rem', color: '#1D3C6E', fontWeight: '600' }}>
              AI-powered optimization
            </h3>
            <p style={{ color: '#1D3C6E', opacity: '0.8' }}>
              We use smart algorithms to learn your patterns and optimize delivery timing,
              so you always have what you need
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleCreatePlan}
            disabled={!isFormComplete}
            className="w-full py-4 rounded-full text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#6FAEF2' }}
          >
            <span>Create my plan</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {!isFormComplete && (
            <p className="text-center text-sm" style={{ color: '#1D3C6E', opacity: '0.6' }}>
              Please complete all sections to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
