//createOrder action

import Axios from "axios";
import {CART_EMPTY} from '../constants/cartConstants';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_SUCCESS } from "../constants/orderConstants"
// import { orderDetailsReducer } from "../reducers/orderReducers";

// //accepts order as a param (will save order in the DB)
// export const createOrder = (order) => async(dispatch, getState) => {
//     //dispatch orderCreateRequest bc we are sendign an AJAX req
//     dispatch({type: ORDER_CREATE_REQUEST, payload: order});
//     //send AJAX request
//     try {
//         //fill userInfo from redux store. GetState returns the whole redux 
//         //store for u and from redux store we get userSignin and from 
//         //userSignin we get userInfo. and userInfo.token contains the token 
//         //that has been filled in the singin process of user
//         const {
//             userSignin: {userInfo},
//         } = getState();
//         //send AJAX request, 
//         //data contains the message and the order
//         const {data} = await Axios.post(
//             '/api/orders', 
//             // `/api/createorder`,
//             //2nd param=request payload=order
//             order, 
//             //3rd param=options
//             {
//                 headers: {
//                     //fill authorization. Bearer token
//                     Authorization: `Bearer ${userInfo.token}`
//                 },
//             }
//         );
//         //dispatch action to create the order
//         dispatch({
//             type: ORDER_CREATE_SUCCESS,
//             payload: data.order
//         });
//         //dispatch action to remove all items from shopping cart
//         dispatch({
//             type: CART_EMPTY
//         });
//         //clean the local storage to
//         localStorage.removeItem('cartItems');

//     } catch (error) {
//         dispatch({ 
//             type: ORDER_CREATE_FAIL,
//             //payload is condition. if error.res exists and error.res
//             payload: 
//                 error.response && error.response.data.message 
//                     ? error.response.data.message 
//                     : error.message
//         });
//     }
// };

// //detailsOrder action
// //for OrderScreen.js
// //return a new funct that accept dispatch and getState. need getState to get
// //token of current user
// export const detailsOrder = (orderId) => async (dispatch, getState) => {
//     //dispatch order details request
//     dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
//     //get userInfo from getState. 
//     //from userSignin in redux store getuserinfo and redux store is getState()
//     const {
//         userSignin: {userInfo},
//     } = getState();

//     try{
//         //send AJAX request and get data using await
//         //2nd param=options
//         const {data} = await Axios.get(
//             `/api/orders/${orderId}`,
//             // `/api/getorders/${orderId}`,

//             {
//                 //this AJAX request is authenticated by having headers and 
//                 //authorization
//                 headers: {
//                     //get userInfo from getState
//                     Authorization: `Bearer ${userInfo.token}`
//                 },
//             }
//         );
//         //dispatch the data to use it in the UI. the data here is the order
//         dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});

//     } catch(error) {
//         //get error message
//         const message = 
//         //if error from web app exists use it, otherwise use general error
//         // (like network error)
//             error.response && error.response.data.message 
//                 ? error.response.data.message 
//                 : error.message;
//         //dispatch fail
//         dispatch({type: ORDER_DETAILS_FAIL, payload: message});
//     }
// };

// //payOrder action
// export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
//     //dispatch order pay request
//     dispatch({type: ORDER_PAY_REQUEST, payload: {order, paymentResult} });
//     //get user info
//     const {userSignin: { userInfo }} = getState();
//     //ajax req
//     try {
//         //ajax req and get get data from this ajax request
//         //use put bc we are calling pay api and type of this api is put.
//         //2nd param for PUT is request payload=paymentResult
//         const {data} = Axios.put(
//             `/api/orders/${order._id}/pay`,
//              paymentResult,
//              //3rd param=options
//              {
//                  headers: {
//                     Authorization: `Bearer ${userInfo.token}`
//                 },
//              }
//         );
//         //dispatch success Payment
//         dispatch({type: ORDER_PAY_SUCCESS, payload: data});
//     } catch (error) {
//         const message = 
//         //if error from web app exists use it, otherwise use general error
//         // (like network error)
//             error.response && error.response.data.message 
//                 ? error.response.data.message 
//                 : error.message;
//         //dispatch fail
//         dispatch({type: ORDER_PAY_FAIL, payload: message});
//     }
// }


// //Action to return orders of current user
// export const listOrderMine = () => async (dispatch, getState) => {
//         //disptach order mine list request
//         dispatch({type: ORDER_MINE_LIST_REQUEST});
//         //get user info
//         const {userSignin:{userInfo}} = getState();
//         try {
//             //send ajax request
//             const {data} = await Axios.get(
//                 'api/orders/mine', 
//                 {
//                     headers: {
//                         Authorization: `Bearer ${userInfo.token}`,
//                     },
//                 }
//             );
//             //dispatch success action
//             dispatch({type:ORDER_MINE_LIST_SUCCESS, payload: data});
//         } catch (error) {
//             const message = 
//             //if error from web app exists use it, otherwise use general error
//             // (like network error)
//                 error.response && error.response.data.message 
//                     ? error.response.data.message 
//                     : error.message;
//             //dispatch fail
//             dispatch({type: ORDER_MINE_LIST_FAIL, payload: message});
//         }
// } 


export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/orders', order, {
        
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });

  const {
    userSignin: { userInfo },
  } = getState();
  try {
    // const { data } = await Axios.get(`/api/orders/${orderId}`, {
    const { data } = await Axios.get(`/getorder/${orderId}`, {

      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

//payOrder action
// export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
export const payOrder = (order, paymentResult) => async (dispatch, getState) => {

    //dispatch order pay request
    dispatch({type: ORDER_PAY_REQUEST, payload: {order, paymentResult} });
    //get user info
    const {userSignin: { userInfo }} = getState();
    try {
        //ajax req and get get data from this ajax request
        //use put bc we are calling pay api and type of this api is put.
        //2nd param for PUT is request payload=paymentResult
        const {data} = Axios.put(
            `/api/orders/${order._id}/pay`,
             paymentResult,
             //3rd param=options
             {
                 headers: {
                    Authorization: `Bearer ${userInfo.token}`
                },
             }
        );
        //dispatch success Payment
        dispatch({type: ORDER_PAY_SUCCESS, payload: data});
        // window.location.reload(); 
    } catch (error) {
        const message = 
        //if error from web app exists use it, otherwise use general error
        // (like network error)
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message;
        //dispatch fail
        dispatch({type: ORDER_PAY_FAIL, payload: message});
        // window.location.reload(); 

    }
}


//Action to return list of orders of current user
export const listOrderMine = () => async (dispatch, getState) => {
    //disptach order mine list request
    dispatch({type: ORDER_MINE_LIST_REQUEST});
    //get user info
    const {userSignin:{userInfo}} = getState();
    try {
        //send ajax request
        const {data} = await Axios.get(
            '/orders/mine', 
            //options:
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        //dispatch success action
        dispatch({type:ORDER_MINE_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message = 
        //if error from web app exists use it, otherwise use general error
        // (like network error)
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message;
        //dispatch fail
        dispatch({type: ORDER_MINE_LIST_FAIL, payload: message});
    }
} 