import React, { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Cart from "../../Cart/Cart"; // Assuming you import the Cart component
import CartProvider from "../../../store/CartProvider";
import { AuthProvider } from "../../../store/AuthProvider";

const Layout = (props) => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <AuthProvider>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>{props.children}</main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
};

export default Layout;
