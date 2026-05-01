import { useNavigate } from 'react-router';
import { ProductSelection } from '../components/ProductSelection';

export function Selection() {
  const navigate = useNavigate();

  return (
    <ProductSelection
      onBack={() => navigate('/')}
      onContinue={() => navigate('/subscription')}
    />
  );
}
