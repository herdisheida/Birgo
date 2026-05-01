import { useNavigate } from 'react-router';
import { SubscriptionSettings } from '../components/SubscriptionSettings';

export function Subscription() {
  const navigate = useNavigate();

  return (
    <SubscriptionSettings
      onBack={() => navigate('/selection')}
      onSave={() => navigate('/checkout')}
    />
  );
}
