import Link from 'next/link';

export const AsideItem = ({ aside }) => {
  const { id, image, name, price, star } = aside;
  return (
    <>
      {/* <!-- BEING SHOP ASIDE CARD  --> */}
      <Link href={`/product/${id}`}>
        <a className='shop-aside__item-product'>
          <div className='shop-aside__item-product-img'>
            <img src={image} className='js-img' alt='' />
          </div>
          <div className='shop-aside__item-product-info'>
            <span className='shop-aside__item-product-title'>{name}</span>
            <span className='shop-aside__item-product-price'>Rs. {price}</span>
            <ul className='star-rating'>
              {[...Array(star)].map((star, index) => {
                <li key={index}>
                  <i className='icon-star'></i>
                </li>;
              })}
            </ul>
          </div>
        </a>
      </Link>
      {/* <!-- SHOP ASIDE CARD EOF  --> */}
    </>
  );
};
