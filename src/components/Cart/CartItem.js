import classes from "./CartItem.module.css"

const CartItems = (props) => {
    const price = props.price.toFixed(2)

    return (
        <li className={classes['cart-item']}>
        <div>
        <h2 className={classes.name}>{props.name}</h2>
        <span className={classes.price}>{`$${price}`}</span>
        <span className={classes.amount}>x {props.amount}</span>
    </div>
    <div className={classes.actions}>
        <button className={classes.buttons}onClick={props.onRemove}>−</button>
        <button className={classes.buttons} onClick={props.onAdd}>+</button>
      </div>
    </li>
    )
   
}

export default CartItems