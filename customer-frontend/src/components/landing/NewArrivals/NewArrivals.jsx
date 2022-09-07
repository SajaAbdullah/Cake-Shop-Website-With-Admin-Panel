import { ProductsCarousel } from "components/Product/Products/ProductsCarousel";
import { SectionTitle } from "components/shared/SectionTitle/SectionTitle";
import productData from "data/product/product";

export const NewArrivals = () => {
  const newArrival = [...productData].filter(
    (arrival) => arrival.isNew === true
  );

  return (
    <>
      {/* <!-- BEGIN NEW ARRIVALS --> */}
      <section className="arrivals">
        <SectionTitle
          subTitle="ORder Your Cake"
          title="Trending Cakes"
          body=""
        />

        <div className="products-items">
          <ProductsCarousel products={newArrival} />
        </div>
      </section>
      {/* <!-- NEW ARRIVALS EOF --> */}
    </>
  );
};
