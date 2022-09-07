import { Cart } from 'components/Cart/Cart';
import { PublicLayout } from 'layout/PublicLayout';

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Cart',
    path: '/cart',
  },
];
const CartPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Cart'>
      <Cart />
    </PublicLayout>
  );
};

export default CartPage;
