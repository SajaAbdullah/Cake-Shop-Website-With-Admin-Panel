import { ProductsCarousel } from "components/Product/Products/ProductsCarousel";
import { SectionTitle } from "components/shared/SectionTitle/SectionTitle";
import productData from "data/product/product";

export const MostViewed = ({ additionalClass }) => {
  const mostViewed = [...productData].slice(0, 6);

  return (
    <>
      {/* <!-- BEGIN MOST VIEWED --> */}
      <section className={`arrivals ${additionalClass ? additionalClass : ""}`}>
        <SectionTitle
          subTitle="CUstomise Your Cake"
          title="New arrivals"
          body="Choose from a growing library of assets that will include a wide range of boards, cake sizes, decorations, construction elements as well as textiles and patterns"
        />

        <div className="products-items">
          <ProductsCarousel products={mostViewed} />
        </div>
      </section>
      {/* <!-- MOST VIEWED EOF --> */}
    </>
  );
};
