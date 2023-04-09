import React, { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [show, setShow] = useState(false);

  const closeHandler = () => {
    setShow(false);
  };

  const showHandler = () => {
    setShow(true);
  };

  return (
    <CartProvider>
      {show && <Cart onClose={closeHandler} />}
      <Header onShow={showHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
