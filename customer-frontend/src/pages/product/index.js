import { MostViewed } from "components/shared/MostViewed/MostViewed";
import { ProductDetails } from "components/Product/ProductDetails/ProductDetails";

const { PublicLayout } = require("layout/PublicLayout");

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
const ProductPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Order Cake">
      <ProductDetails />
      <MostViewed />
    </PublicLayout>
  );
};

export default ProductPage;
