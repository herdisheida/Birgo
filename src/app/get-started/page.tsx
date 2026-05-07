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
  products,
} from "@birgo/constants";

export default function CustomerInput() {
  const router = useRouter();
  const { customerInput, setCustomerInput, addProduct, reset } =
    useSubscriptionStore();

  const toggleProductPreference = (category: string) => {
    const newPreferences = customerInput.productPreferences.includes(category)
      ? customerInput.productPreferences.filter((c) => c !== category)
      : [...customerInput.productPreferences, category];

    setCustomerInput({ productPreferences: newPreferences });
  };

  const handleCreatePlan = () => {
    reset(); // Hreinsum eldri pantanir ef einhverjar eru

    // 1. Snjall útreikningur á magni (1 til 10)
    let qty = 1;

    if (customerInput.householdSize === "2 people") qty += 1;
    else if (customerInput.householdSize === "3-4 people") qty += 3;
    else if (customerInput.householdSize === "5+ people") qty += 5;

    if (customerInput.householdType === "Shared apartment") qty += 1;
    else if (customerInput.householdType === "Family with kids") qty += 2;

    if (customerInput.usageFrequency === "Moderate use") qty += 2;
    else if (customerInput.usageFrequency === "Heavy use") qty += 4;

    qty = Math.min(Math.max(qty, 1), 10);

    // 2. Setjum vörur í körfuna miðað við val
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
          quantity: qty,
          price: 5.99,
        });
      }
    });

    // 3. Förum beint í stillingar og magnaval
    router.push("/subscription");
  };

  const isFormComplete =
    customerInput.householdSize &&
    customerInput.householdType &&
    customerInput.productPreferences.length > 0 &&
    customerInput.usageFrequency;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 w-full">
      {/* Haus */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
          <Sparkles className="w-4 h-4" /> Persónuleg sniðmát
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Segðu okkur aðeins frá heimilinu
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">
          Við notum þessar upplýsingar til að reikna út nákvæmlega hversu mikið
          þú þarft.
        </p>
      </div>

      <div className="space-y-10">
        {/* Fjöldi á heimilinu */}
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Fjöldi á heimilinu
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {householdSizes.map((size) => {
              const isSelected = customerInput.householdSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setCustomerInput({ householdSize: size })}
                  className={`py-4 px-6 rounded-2xl text-left font-semibold transition-all border-2 ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-100 bg-white text-slate-600 hover:border-blue-200"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hústegund */}
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Home className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Hvernig býrðu?</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {householdTypes.map((type) => {
              const isSelected = customerInput.householdType === type;
              return (
                <button
                  key={type}
                  onClick={() => setCustomerInput({ householdType: type })}
                  className={`py-4 px-6 rounded-2xl text-left font-semibold transition-all border-2 ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-slate-100 bg-white text-slate-600 hover:border-indigo-200"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vöruflokkar */}
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <div className="flex flex-col mb-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                <Package className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Hvað viltu fá sent?
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              Veldu alla þá flokka sem eiga við (mátt velja marga)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {productCategories.map((category) => {
              const isSelected =
                customerInput.productPreferences.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => toggleProductPreference(category)}
                  className={`py-4 px-6 rounded-2xl text-left font-semibold transition-all border-2 ${
                    isSelected
                      ? "border-teal-600 bg-teal-50 text-teal-700"
                      : "border-slate-100 bg-white text-slate-600 hover:border-teal-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notkunartíðni */}
        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
          <div className="flex flex-col mb-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Almenn notkun
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              Hversu hratt klárist þið úr heimilisvörum að jafnaði?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {usageFrequencies.map((frequency) => {
              const isSelected = customerInput.usageFrequency === frequency;
              return (
                <button
                  key={frequency}
                  onClick={() =>
                    setCustomerInput({ usageFrequency: frequency })
                  }
                  className={`py-4 px-6 rounded-2xl text-center font-semibold transition-all border-2 ${
                    isSelected
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-slate-100 bg-white text-slate-600 hover:border-orange-200"
                  }`}
                >
                  {frequency}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="pt-6">
          <button
            onClick={handleCreatePlan}
            disabled={!isFormComplete}
            className="w-full py-5 rounded-2xl bg-blue-600 text-white font-bold text-lg transition-all hover:bg-blue-700 hover:-translate-y-1 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3"
          >
            <span>Búa til mína áskrift</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {!isFormComplete && (
            <p className="text-center text-sm font-medium text-slate-500 mt-4">
              Vinsamlegast svaraðu öllum spurningunum til að halda áfram.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
