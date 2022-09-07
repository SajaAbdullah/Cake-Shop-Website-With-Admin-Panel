import Link from 'next/link';

export const AboutDiscount = () => {
  return (
    <>
      {/* <!-- BEGIN DISCOUNT --> */}
      <div
        className='discount discount-about js-img'
        style={{ backgroundImage: `url('/assets/img/discount-bg2.jpg')` }}
      >
        <div className='wrapper'>
          <div className='discount-info'>
            <span className='saint-text'>Success story</span>
            <h2>BeShop develops its own brands</h2>
            <p>
              The BeShope network is being developed and improved, taking into
              account all consumer.
            </p>
            <p className='discount-info__sm'>
              Forming the range of stores, we, above all, strive not only to
              meet the format of "home shop", offering each customer the most
              basic household goods, but also to create a unique space of beauty
              and care. BeShope stores offer their customers the widest and
              highest quality selection of products from world-renowned
              manufacturers.
            </p>
            <Link href='/shop'>
              <a className='btn'>Shop now</a>
            </Link>
          </div>
        </div>
      </div>
      {/* <!-- DISCOUNT EOF   --> */}
    </>
  );
};
