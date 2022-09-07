import { PromoVideo } from "components/shared/PromoVideo/PromoVideo";
import { useState } from "react";
import Link from "next/link";

export const Info = () => {
  const [play, setPlay] = useState(false);
  const url = play
    ? "https://www.youtube.com/embed/K1yp7Q1hH1c?autoplay=1"
    : "";
  return (
    <>
      {/* <!-- BEGIN INFO BLOCKS --> */}
      <div className="info-blocks" style={{ marginTop: "60px" }}>
        <div
          className="info-blocks__item js-img"
          style={{ backgroundImage: `url('/assets/img/info-item-bg1.jpg')` }}
        >
          <div className="wrapper">
            <div className="info-blocks__item-img">
              <img
                src="/assets/img/info-item-img1.jpg"
                className="js-img"
                alt=""
              />
            </div>
            <div className="info-blocks__item-text">
              <span className="saint-text">Who are We</span>
              <h2>We are best cake Providers</h2>
              <p>
              At it’s core, it’s a tool you can use to visually design and price
              cakes. Bake and take is built on the idea of itemisation so every
              aspect of your cake design comes with specific costing and pricing
              settings so you can focus on designing your cakes and let Bake and
              take calculate costing and selling price automatically as you add
              elements.
                
              </p>
              <p>
                Go through each step and design a beautiful cake and order it
              </p>
              <Link href="/shop">
                <a className="btn">Shop now</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- INFO BLOCKS EOF   --> */}
    </>
  );
};
