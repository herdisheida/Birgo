import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Selection } from './pages/Selection';
import { Subscription } from './pages/Subscription';
import { Checkout } from './pages/Checkout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
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
    path: '/checkout',
    Component: Checkout,
  },
]);
