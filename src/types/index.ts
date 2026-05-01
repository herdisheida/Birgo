export interface Product {
  id: string;
  name: string;
  icon: any;
  category: string;
}

export interface ProductSelectionProps {
  onBack?: () => void;
  onContinue?: () => void;
}

export interface SubscriptionSettingsProps {
  onBack?: () => void;
  onSave?: () => void;
}
