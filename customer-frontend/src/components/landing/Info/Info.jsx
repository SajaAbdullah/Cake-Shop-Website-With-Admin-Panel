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
      <div className="info-blocks">
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
              <span className="saint-text">Design With Us</span>
              <h2>Customise Your Own Cake</h2>
              <p>
                Everything we have selected from the cake base to toppings are
                all hand picked after much consideration into 2022 trends.
                EVERYTHING from our signature designs to current trends in the
                cake world are available for you to mix and match.
              </p>
              <p>
                Go through each step and design a beautiful cake. We offer
                standard, gluten free, vegan and sugar free as options to select
                from
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
