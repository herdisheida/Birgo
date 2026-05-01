import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { z } from 'zod';

// Zod Schemas
export const customerInputSchema = z.object({
  householdSize: z.string().optional(),
  householdType: z.string().optional(),
  productPreferences: z.array(z.string()),
  usageFrequency: z.string().optional(),
});

export const productItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number().min(1),
  price: z.number().optional(),
});

export const productUsageSchema = z.object({
  id: z.string(),
  name: z.string(),
  usage: z.number().min(0).max(100),
});

export const subscriptionSettingsSchema = z.object({
  frequency: z.enum(['weekly', 'monthly', 'custom']),
  customDays: z.number().min(7).max(90).optional(),
  productUsage: z.array(productUsageSchema),
});

export const deliveryAddressSchema = z.object({
  fullName: z.string().optional(),
  street: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
});

export const paymentMethodSchema = z.object({
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
});

// Types
export type CustomerInput = z.infer<typeof customerInputSchema>;
export type ProductItem = z.infer<typeof productItemSchema>;
export type ProductUsage = z.infer<typeof productUsageSchema>;
export type SubscriptionSettings = z.infer<typeof subscriptionSettingsSchema>;
export type DeliveryAddress = z.infer<typeof deliveryAddressSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;

interface SubscriptionStore {
  // Customer Input
  customerInput: CustomerInput;
  setCustomerInput: (input: Partial<CustomerInput>) => void;

  // Selected Products
  selectedProducts: Record<string, ProductItem>;
  addProduct: (product: ProductItem) => void;
  updateProductQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;

  // Subscription Settings
  subscriptionSettings: SubscriptionSettings;
  setSubscriptionSettings: (settings: Partial<SubscriptionSettings>) => void;
  updateProductUsage: (productId: string, usage: number) => void;

  // Checkout
  deliveryAddress: DeliveryAddress;
  setDeliveryAddress: (address: Partial<DeliveryAddress>) => void;

  paymentMethod: PaymentMethod;
  setPaymentMethod: (payment: Partial<PaymentMethod>) => void;

  // Utility
  reset: () => void;
}

const initialState = {
  customerInput: {
    householdSize: undefined,
    householdType: undefined,
    productPreferences: [],
    usageFrequency: undefined,
  },
  selectedProducts: {},
  subscriptionSettings: {
    frequency: 'monthly' as const,
    customDays: 30,
    productUsage: [],
  },
  deliveryAddress: {
    fullName: undefined,
    street: undefined,
    postalCode: undefined,
    city: undefined,
  },
  paymentMethod: {
    cardNumber: undefined,
    expiryDate: undefined,
    cvc: undefined,
  },
};

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set) => ({
      ...initialState,

      // Customer Input
      setCustomerInput: (input) =>
        set((state) => ({
          customerInput: { ...state.customerInput, ...input },
        })),

      // Selected Products
      addProduct: (product) =>
        set((state) => ({
          selectedProducts: {
            ...state.selectedProducts,
            [product.id]: product,
          },
        })),

      updateProductQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            const { [productId]: _, ...rest } = state.selectedProducts;
            return { selectedProducts: rest };
          }
          return {
            selectedProducts: {
              ...state.selectedProducts,
              [productId]: {
                ...state.selectedProducts[productId],
                quantity,
              },
            },
          };
        }),

      removeProduct: (productId) =>
        set((state) => {
          const { [productId]: _, ...rest } = state.selectedProducts;
          return { selectedProducts: rest };
        }),

      // Subscription Settings
      setSubscriptionSettings: (settings) =>
        set((state) => ({
          subscriptionSettings: { ...state.subscriptionSettings, ...settings },
        })),

      updateProductUsage: (productId, usage) =>
        set((state) => {
          const existingUsage = state.subscriptionSettings.productUsage.find(
            (p) => p.id === productId
          );

          if (existingUsage) {
            return {
              subscriptionSettings: {
                ...state.subscriptionSettings,
                productUsage: state.subscriptionSettings.productUsage.map((p) =>
                  p.id === productId ? { ...p, usage } : p
                ),
              },
            };
          } else {
            const product = state.selectedProducts[productId];
            if (!product) return state;

            return {
              subscriptionSettings: {
                ...state.subscriptionSettings,
                productUsage: [
                  ...state.subscriptionSettings.productUsage,
                  { id: productId, name: product.name, usage },
                ],
              },
            };
          }
        }),

      // Checkout
      setDeliveryAddress: (address) =>
        set((state) => ({
          deliveryAddress: { ...state.deliveryAddress, ...address },
        })),

      setPaymentMethod: (payment) =>
        set((state) => ({
          paymentMethod: { ...state.paymentMethod, ...payment },
        })),

      // Utility
      reset: () => set(initialState),
    }),
    {
      name: 'birgo-subscription-storage',
    }
  )
);
