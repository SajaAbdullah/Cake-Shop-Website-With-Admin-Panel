import Link from "next/link";
import { getToken } from '../../../../services/LocalStorageService';

export const SingleProduct = ({
  product,
  onAddToWish,
  onAddToCart,
  addedInCart,
}) => {
  const { access_token } = getToken();
  const { name, oldPrice, price, image, isSale, isNew, id } = product;
  return (
    <>
      {/* <!-- BEING SINGLE PRODUCT ITEM --> */}
      <div className="products-item">
        <div className="products-item__type">
          {/* {isSale && <span className='products-item__sale'>sale</span>}
          {isNew && <span className='products-item__new'>new</span>} */}
        </div>
        <div className="products-item__img">
          <img src={image} className="js-img" alt="" />
          <div className="products-item__hover">
            <Link href={`/product/${id}`}>
              <a>
                <i className="icon-search"></i>
              </a>
            </Link>
            <div className="products-item__hover-options">
              {/* <button className="addList" onClick={() => onAddToWish(id)}>
                <i className="icon-heart"></i>
              </button> */}
              <button
                disabled={addedInCart}
                className={`addList ${addedInCart ? "added" : ""}`}
                onClick={access_token ? () => onAddToCart(id) : () => console.log("log in please")  }
              >
                <i style={{ marginBottom: "10px" }} className="icon-cart"></i>
                <span
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                    paddingTop: "10px",
                  }}
                >
                  Add to cart
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="products-item__info">
          <Link href={`/product/${id}`}>
            <a>
              <span className="products-item__name">{name}</span>
            </a>
          </Link>
          <span className="products-item__cost">Price : {price}</span>
        </div>
      </div>
      {/* <!-- SINGLE PRODUCT ITEM EOF --> */}
    </>
  );
};
