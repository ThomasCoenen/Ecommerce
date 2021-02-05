import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

//AddToCart Action
//dispatch and getState are functions in redux thunk that make it 
//possible to dispatch an action and get access to the state of the Redux store

//store cart items in local storage so when u refresh it remembers

export const addToCart = (productId, qty, name) => async (dispatch, getState) => {
    //send an AJAX request to server to get info about this product
    //must await for the data bc its an async funct
    //Data is the product
    // const { data } = await Axios.get(`/api/products/${productId}`); 
    const { data } = await Axios.get(`/api/${name}/${productId}`); 
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            //this is the ID. call it product bc we will add it to the DB
            product: data._id,
            qty,
        }
    });
    //Save cartItems in ur LOCAL STORAGE:
    //make it to where when u refresh it remembers what u have in ur cart and 
    //we will store in local storage. SetItem accepts 2 params: a key and a 
    //value. Value should be a STRING not an Object. Need to get access to
    //the cartItem in Redux store. To access this type getState from Redux
    //Thunk.
    //key, value
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};



//Action to Remove from Cart
//accepts productId that were going to delete from cart
export const removeFromCart = (productId) => (dispatch, getState) => { 
    //dispatch cartRemoveItem action
    dispatch({ type: CART_REMOVE_ITEM, payload: productId});
    //update cartItems in local storage. use getState() to get REdux store
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

//action for saving Shipping info in ShippingAddressScreen
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
    //save into local storage
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

//action for Save Payment Method
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data})
    //no need to save local storage bc we dont have many fields like user 
    //address its just about selecting a payment method (radio button)
}
