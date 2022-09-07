import { Products } from "components/Product/Products/Products";
import { PagingList } from "components/shared/PagingList/PagingList";
import { usePagination } from "components/utils/Pagination/Pagination";
import productData from "data/product/product";
import Slider from "rc-slider";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import { AsideItem } from "../shared/AsideItem/AsideItem";

// React Range
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const options = [
  { value: "highToMin", label: "From expensive to cheap" },
  { value: "minToHigh", label: "From cheap to expensive" },
];
export const Shop = () => {
  const allProducts = [...productData];

  const [productOrder, setProductOrder] = useState(
    allProducts.sort((a, b) => (a.price < b.price ? 1 : -1))
  );

  const [products, setProducts] = useState([...productOrder]);
  const [filter, setFilter] = useState({ isNew: false, isSale: true });

  useEffect(() => {
    setProducts(productOrder);
  }, [productOrder]);

  useEffect(() => {
    if (filter.isNew && filter.isSale) {
      const newPro = productOrder.filter(
        (pd) => pd.isNew === true && pd.isSale === true
      );
      setProducts(newPro);
    } else if (filter.isNew && !filter.isSale) {
      const newPro = productOrder.filter((pd) => pd.isNew === true);
      setProducts(newPro);
    } else if (filter.isSale && !filter.isNew) {
      const newPro = productOrder.filter((pd) => pd.isSale === true);
      setProducts(newPro);
    } else {
      setProducts([...productOrder]);
    }
  }, [filter, productOrder]);
  const recentlyViewed = [...productData].slice(0, 3);
  const todaysTop = [...productData].slice(3, 6);
  const paginate = usePagination(products, 9);

  const handleSort = (value) => {
    if (value === "highToMin") {
      const newOrder = allProducts.sort((a, b) => (a.price < b.price ? 1 : -1));
      setProductOrder(newOrder);
    }
    if (value === "minToHigh") {
      const newOrder = allProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
      setProductOrder(newOrder);
    }
  };

  return (
    <div>
      {/* <!-- BEGIN SHOP --> */}
      <div className="shop">
        <div className="wrapper">
          <div className="shop-content">
            {/* <!-- Shop Aside --> */}
            <div className="shop-aside">
              <div className="shop-aside__item">
                <span className="shop-aside__item-title">Categories</span>
                <ul>
                  <li>
                    <a href="#">
                      Chocolate Cake <span>(04)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Wedding Cakes <span>(04)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Cupcakes <span>(03)</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Birthday Cakes <span>(04)</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="shop-aside__item">
                <span className="shop-aside__item-title">Price</span>
                <div className="range-slider">
                  <Range
                    min={0}
                    max={3000}
                    defaultValue={[0, 3000]}
                    tipFormatter={(value) => `${value}Rs`}
                    allowCross={false}
                    tipProps={{
                      placement: "bottom",
                      prefixCls: "rc-slider-tooltip",
                    }}
                  />
                </div>
              </div>
              <div className="shop-aside__item">
                <span className="shop-aside__item-title">You have viewed</span>
                {recentlyViewed.map((data) => (
                  <AsideItem key={data.id} aside={data} />
                ))}
              </div>
              <div className="shop-aside__item">
                <span className="shop-aside__item-title">Top 3 for today</span>
                {todaysTop.map((data) => (
                  <AsideItem key={data.id} aside={data} />
                ))}
              </div>
            </div>
            {/* <!-- Shop Main --> */}
            <div className="shop-main">
              <div className="shop-main__filter">
                <div
                  className="shop-main__checkboxes"
                  style={{ visibility: "hidden" }}
                >
                  <label className="checkbox-box">
                    <input
                      checked={filter.isSale}
                      onChange={() =>
                        setFilter({ ...filter, isSale: !filter.isSale })
                      }
                      type="checkbox"
                    />
                    <span className="checkmark"></span>
                    SALE
                  </label>
                  <label className="checkbox-box">
                    <input
                      checked={filter.isNew}
                      onChange={() =>
                        setFilter({ ...filter, isNew: !filter.isNew })
                      }
                      type="checkbox"
                    />
                    <span className="checkmark"></span>
                    NEW
                  </label>
                </div>
                <div className="shop-main__select">
                  <Dropdown
                    options={options}
                    className="react-dropdown"
                    onChange={(option) => handleSort(option.value)}
                    value={options[0]}
                  />
                </div>
              </div>
              <div className="shop-main__items">
                <Products products={paginate?.currentData()} />
              </div>

              {/* <!-- PAGINATE LIST --> */}
              <PagingList paginate={paginate} />
            </div>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
        <img
          className="shop-decor js-img"
          src="/assets/img/shop-decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- SHOP EOF   --> */}
    </div>
  );
};
