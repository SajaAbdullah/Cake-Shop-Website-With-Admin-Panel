export const Card = ({ review }) => {
  const { author, reviewDate, rating, content } = review;
  return (
    <>
      {/* Being Product Review */}
      <div className='review-item'>
        <div className='review-item__head'>
          <div className='review-item__author'>
            <img src={author.image} className='js-img' alt='' />
            <span className='review-item__name'>{author.name}</span>
            <span className='review-item__date'>{reviewDate}</span>
          </div>
          <div className='review-item__rating'>
            <ul className='star-rating'>
              {[...Array(rating)].map((star, index) => {
                return (
                  <li key={index}>
                    <i className='icon-star'></i>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className='review-item__content'>{content}</div>
      </div>
    </>
  );
};
