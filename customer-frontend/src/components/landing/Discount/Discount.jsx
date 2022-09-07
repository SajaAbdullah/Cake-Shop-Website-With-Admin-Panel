import Link from "next/link";

export const Discount = () => {
  return (
    <>
      {/* <!-- BEGIN DISCOUNT --> */}
      <div
        className="discount js-img"
        style={{
          backgroundImage: `url('/assets/img/discount-bg.jpg')`,
          height: "600px",
        }}
      >
        <div className="wrapper">
          <div className="discount-info">
            <span className="main-text">Who We Are ?</span>
            <p style={{ fontSize: "17px", color: "#000" }}>
            We are not just a bakery, we are not just bakers.
             In fact, we are just like you, a bunch of food lovers fascinated with sweet indulgence,
              who dreamt of creating an appetizing fairy land of divine delicacies that relishes the utmost desires.
            </p>
          </div>
        </div>
      </div>
      {/* <!-- DISCOUNT EOF   --> */}
    </>
  );
};
