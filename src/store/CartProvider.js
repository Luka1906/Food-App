import React,{useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0

}
const cartReducer = (state,action) => {
    if(action.type === "ADD") { 
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItemElement = state.items[existingCartItemIndex];
        console.log(existingCartItemElement)
        let updatedItems;
        if(existingCartItemElement) {
            const updatedItem = {
                ...existingCartItemElement,
                amount: existingCartItemElement.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem

        } else {
            updatedItems = state.items.concat(action.item);
        }
    
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
       
    }
    if(action.type==="REMOVE") {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItemElement = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItemElement.price;
        let updatedItems;

        if(existingCartItemElement.amount > 1) {
            const updatedItem= {
                ...existingCartItemElement, 
                amount: existingCartItemElement.amount - 1
            }
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex] = updatedItem 
        } else {
          
               updatedItems = state.items.filter(item=>item.id !==action.id)
        }
       
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
        

    }

    if(action.type === "CLEAR") {
        return defaultCartState
    }

    return defaultCartState
}
  



const CartProvider = (props) => {
    const [cartState, dispatchCartFunction] = useReducer (cartReducer, defaultCartState)
    
    const addItemToCartHandler = item => {
        console.log(item)
        dispatchCartFunction({type:"ADD", item: item})
    }

    const removeItemFromCartHandler = id => {
        dispatchCartFunction({type:"REMOVE", id: id})
        
    }

    const clearCartHandler = () => {
        dispatchCartFunction({type: "CLEAR"})
    }
    
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler

    }
    return  (
        <CartContext.Provider value ={cartContext}>
           {props.children}
        </CartContext.Provider>
    )
   

}

export default CartProvider