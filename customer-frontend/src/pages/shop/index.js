import { Subscribe } from "components/shared/Subscribe/Subscribe";
import { Shop } from "components/Shop/Shop";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Order Cake",
    path: "/shop",
  },
];
const ShopPage = () => {
  return (
    <PublicLayout
      breadcrumb={breadcrumbsData}
      breadcrumbTitle="Order Your Cake"
    >
      <Shop />
    </PublicLayout>
  );
};

export default ShopPage;
