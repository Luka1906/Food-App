import React,{useContext} from "react";
import classes from "./MealItems.module.css";
import MealInputForm from "./MealInputForm";
import CartContext from "../../store/cart-context";

const MealItems = (props) => {
    const cartContext = useContext(CartContext)
    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price

        })
     
    }
    return (
        <li className={classes["meal-items"]}>
            <div >
                <h3>{props.name}</h3> 
                <p className={classes.description}>{props.description}</p>
                <h3 className={classes.price}>{price}</h3>
            </div>
            <MealInputForm onAddToCart={addToCartHandler}/>


        </li>
    )
}

export default MealItems