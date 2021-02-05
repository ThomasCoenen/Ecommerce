//reduxThunk makes it possible to send ajax request in 
//our redux actions

import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';
// import data from "./data/data";
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productListReducer, searchProductReducer } from './reducers/productReducers';
import { newArrivalsListReducer, newArrivalsDetailsReducer } from './reducers/newArrivalsReducer';
import { cartReducer } from './reducers/cartReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducers';
// import logger from 'redux-logger'

//initial state
const initialState = { 
//When u refresh page, it doesnt remember that we are singed in so we need
  //to keep our singin info in local storage
  userSignin: {
    //check localStorage for userInfo
    userInfo: localStorage.getItem('userInfo') 
    //if exists, convert it to userInfo object
        ? JSON.parse(localStorage.getItem('userInfo')) 
        : null, //otherwise use null
},
    //default value for cart:
    cart: {
        //read content of localStorage. This is the value u have used in setItem in
        //cartActions. 
        cartItems: localStorage.getItem('cartItems') 
            ? JSON.parse(localStorage.getItem('cartItems')) 
            : [],
        //check local storage for shippingAddress
        shippingAddress: localStorage.getItem('shippingAddress') 
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        //default is paypal
        paymentMethod: 'Paypal'

    }
}

//Reducer
//this is used to get STATIC products from a file
// const reducer = (state, action) => {
//     //load products in the Redux Store
//     return {products: data.products}
// }

//Reducer: combineReducer accepts an object param. this object 
//introduce reducers to Redux store
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    // newArrivalsList: newArrivalsListReducer,
    // newArrivalsDetails: newArrivalsDetailsReducer
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    searchProduct: searchProductReducer
})

//add redux to ChromeDevTools->update compose funct. if doesnt \
//exist use regular compose
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//store
const store = createStore(
    reducer, 
    initialState, 
    // composeEnhancer(applyMiddleware(thunk))
    // composeEnhancer(applyMiddleware(logger))
    composeWithDevTools(applyMiddleware(thunk))

)

export default store;
