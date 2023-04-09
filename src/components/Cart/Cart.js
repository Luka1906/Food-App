import React, { Fragment, useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItems from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    setIsLoading(true);
    const response = fetch(
      "https://react-http-dbda5-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartContext.items,
        }),
      }
    );
    setIsLoading(false);
    setIsLoaded(true);
    cartContext.clearCart()
  };

  const cartItems = cartContext.items.map((item) => (
    <CartItems
      key={item.key}
      amount={item.amount}
      name={item.name}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));

  const modalActions = (
    <div className={classes["button-wrapper"]}>
      <button className={classes.cartBtn} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.cartBtn} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartContent = (
    <Fragment>
      <ul className={classes.cartItems}>{cartItems}</ul>
      <div className={classes.total}>
        <h2>Total Amount</h2>
        <h2>{totalAmount}</h2>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const loadingContent = <p>Sending order data...</p>;

  const submittedContent = (
    <div className={classes.submitted}>
      <p>Successfully sent the order!</p>
      <button className={`${classes.cartBtn} ${classes.submitBtn}`} onClick={props.onClose} >
        Close
      </button>
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !isLoaded && cartContent}
      {isLoading && loadingContent}
      {isLoaded && submittedContent}
    </Modal>
  );
};
export default Cart;
