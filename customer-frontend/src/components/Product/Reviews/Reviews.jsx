import { Card } from "./Card/Card";

export const Reviews = ({ reviews }) => {
  return (
    <>
      {/* <!-- BEING REVIEWS    --> */}
      <div className="product-detail__items">
        {reviews.slice(0, 3).map((review, index) => (
          <Card key={index} review={review} />
        ))}
      </div>
      {/* <!-- Reviews EOF   --> */}
    </>
  );
};
