import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Selection } from './pages/Selection';
import { Subscription } from './pages/Subscription';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { CustomerInput } from './pages/CustomerInput';
import { Subscriptions } from './pages/Subscriptions';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/get-started',
    Component: CustomerInput,
  },
  {
    path: '/selection',
    Component: Selection,
  },
  {
    path: '/subscription',
    Component: Subscription,
  },
  {
    path: '/subscriptions',
    Component: Subscriptions,
  },
  {
    path: '/checkout',
    Component: Checkout,
  },
  {
    path: '/about',
    Component: About,
  },
]);
