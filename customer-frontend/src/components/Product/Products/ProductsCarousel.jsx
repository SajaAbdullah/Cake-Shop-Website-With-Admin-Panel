import {
  SlickArrowPrev,
  SlickArrowNext,
} from 'components/utils/SlickArrows/SlickArrows';
import { CartContext } from 'pages/_app';
import { useContext } from 'react';
import Slider from 'react-slick';
import { SingleProduct } from './SingleProduct/SingleProduct';

export const ProductsCarousel = ({ products }) => {
  const { cart, setCart } = useContext(CartContext);

  const handleAddToCart = (id) => {
    const newProduct = products?.find((pd) => pd.id === id);
    setCart([...cart, { ...newProduct, quantity: 1 }]);
  };

  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <SlickArrowPrev />,
    nextArrow: <SlickArrowNext />,
    lazyLoad: 'progressive',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        {products.map((product) => (
          <SingleProduct
            addedInCart={Boolean(cart?.find((pd) => pd.id === product.id))}
            key={product.id}
            product={product}
            onAddToWish={(id) => console.log(id)}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Slider>
    </>
  );
};
