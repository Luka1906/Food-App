import {useContext,useEffect,useState} from "react";
import classes from "./HeaderButton.module.css";
import CartIcon from "../Cart/Carticon";
import CartContext from "../../store/cart-context";



const HeaderButton = (props) => {
    const[btnIsAnimated, setBtnIsAnimated] = useState(false);
   
    const cartContext = useContext(CartContext);

    const {items} = cartContext
    
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
      }, 0);

    useEffect(()=> {
        if(items.length > 0) {
            setBtnIsAnimated(true)
        } 
        const timer = setTimeout(() => {
            setBtnIsAnimated(false)  
        }, 300);

        return () => {
            clearTimeout(timer)
        } 

    },[items])
    
    const btnClasses = `${classes.button} ${btnIsAnimated?classes.bump: "" }`
    
    return (
        <button className={btnClasses} onClick={props.onShow}>
        <span className={classes.icon}>
        <CartIcon/>
        </span>
        <span className={classes.cartName}>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
    )
   
}

export default HeaderButton