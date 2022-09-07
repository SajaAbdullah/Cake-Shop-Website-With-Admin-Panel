import { Card } from "./Card/Card";
import socialData from "data/social";
import { CartContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [count, setCount] = useState(0);
  const socialLinks = [...socialData];

  const total = cart.reduce(
    (total, item) => total + 50 + Number(item.price) * Number(item.quantity),
    0
  );

  const handleProductQuantity = (change, quantity, id) => {
    console.log(change, quantity, id);
    if (change === "increment") {
      cart.find((item) => item.id === id).quantity = quantity + 1;
      setCount(count + 1);
    }
    if (change === "decrement" && quantity > 1) {
      cart.find((item) => item.id === id).quantity = quantity - 1;
      setCount(count + 1);
    }
  };

  useEffect(() => {
    setCart(cart);
  }, [cart, count]);

  return (
    <>
      {/* <!-- BEGIN CART --> */}
      <div className="cart">
        <div className="wrapper">
          <div className="cart-table">
            <div className="cart-table__box">
              <div className="cart-table__row cart-table__row-head">
                <div className="cart-table__col">Product</div>
                <div className="cart-table__col">Price</div>
                <div className="cart-table__col">Quantity</div>
                <div className="cart-table__col">Total</div>
              </div>

              {cart.map((cart) => (
                <Card
                  onChangeQuantity={(change, quantity) =>
                    handleProductQuantity(change, quantity, cart.id)
                  }
                  key={cart.id}
                  cart={cart}
                />
              ))}
            </div>
          </div>
          <div className="cart-bottom">
            <div className="cart-bottom__promo">
              <p>
                We will provide incredible service and have a good cake in
                quality with also trendy food delivery partner who must be
                deliver your delicious order on time and when you crave for best
                and fresh cake, just dial our number, Freshness and craziness
                delivered at your doorstep.
              </p>
              <div className="contacts-info__social">
                <span>Find us here:</span>
                <ul>
                  {socialLinks.map((social, index) => (
                    <li key={index}>
                      <a href={social.path} target="_blank">
                        <i className={social.icon}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="cart-bottom__total">
              <div className="cart-bottom__total-goods">
                Goods on
                <span>Rs. {total.toFixed(2)}</span>
              </div>
              <div className="cart-bottom__total-promo">
                Delivary Charges Includes
                <span> Rs. 50</span>
              </div>
              <div className="cart-bottom__total-num">
                total:
                <span>Rs. {total.toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <a className="btn">Checkout</a>
              </Link>
            </div>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          src="assets/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- CART EOF   --> */}
    </>
  );
};
