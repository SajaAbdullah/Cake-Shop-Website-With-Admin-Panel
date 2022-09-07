import { createContext, useState } from 'react';
import '../styles/styles.scss';
import { Provider } from 'react-redux'
import { store } from '../app/store'

export const CartContext = createContext();

const MyApp = ({ Component, pageProps }) => {
  const [cart, setCart] = useState([]);
  return (
    <Provider store={store}>
      <CartContext.Provider value={{ cart, setCart }}>
      <Component {...pageProps} />
    </CartContext.Provider>
    </Provider>
  );
};

export default MyApp;
