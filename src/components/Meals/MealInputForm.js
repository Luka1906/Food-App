import React,{useContext,useRef} from "react";
import classes from "./MealInputForm.module.css";
import CartContext from "../../store/cart-context";

const MealInputForm = (props) => {
    const inputRef = useRef()
    const submitHandler = event => {
        event.preventDefault()
        const enteredAmount = inputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        props.onAddToCart(enteredAmountNumber)

    }
    return (
        <form onSubmit={submitHandler}> 
        <div className={classes.input}>
            <label className={classes.label} htmlFor="amount">Amount</label>
            <input ref={inputRef} className={classes["input-field"]} type="number" min="1" max="5" step="1" defaultValue="1" ></input>
        </div>
        <button className={classes.formBtn} type="submit">+ Add</button>
        </form>
    )
}

export default MealInputForm