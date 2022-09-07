import { ProductsCarousel } from "components/Product/Products/ProductsCarousel";
import { SectionTitle } from "components/shared/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import productData from "data/product/product";

export const Trending = () => {
  const trendingProducts = [...productData];
  const [products, setProducts] = useState(trendingProducts);
  const [filterItem, setFilterItem] = useState("cupcakes");

  useEffect(() => {
    const newItems = trendingProducts.filter((pd) =>
      pd.filterItems.includes(filterItem)
    );
    setProducts(newItems);
  }, [filterItem]);

  const filterList = [
    {
      name: "Chocolate Cakes",
      value: "Chocolate",
    },
    {
      name: "Aniversary Cake",
      value: "Aniversary",
    },
    {
      name: "Cup Cakes",
      value: "Cupcakes",
    },
    {
      name: "Birthday Cakes",
      value: "Birthday",
    },
  ];
  return (
    <>
      {/* <!-- BEGIN TRENDING --> */}
      <section className="trending">
        <div className="trending-content">
          <SectionTitle
            subTitle="Delicious"
            title="Experience Flavours"
            body="If you are looking for something unique, order your desired Cake Design  and how many people you are wanting to serve. Let’s see if we can bring it to life."
          />
          <div className="tab-wrap trending-tabs">
            <ul className="nav-tab-list tabs">
              {filterList.map((item) => (
                <li
                  key={item.value}
                  onClick={() => setFilterItem(item.value)}
                  className={item.value === filterItem ? "active" : ""}
                >
                  {item.name}
                </li>
              ))}
            </ul>
            <div className="products-items">
              <ProductsCarousel products={products} />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- TRENDING EOF   --> */}
    </>
  );
};
