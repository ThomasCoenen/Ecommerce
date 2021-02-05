//orderCreate reducer

import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../constants/orderConstants";

// //default value for state is empty obj, action
// export const orderCreateReducer = (state = {}, action) => {
//     switch(action.type) {
//         case ORDER_CREATE_REQUEST:
//             return {loading: true};
//         case ORDER_CREATE_SUCCESS:
//             //fill order w/ action.payload
//             return {loading: false, success: true, order: action.payload}
//         case ORDER_CREATE_FAIL:
//             return {loading: false, error: action.payload};
//         case ORDER_CREATE_RESET:
//             //return the defualt value(empty obj)
//             return {};
//         default: 
//             return state;
//     }
// };

// //orderDetails Reducer
// //for OrderScreen.js
// //loading=true by default bc at begining of loading orderScreen we need to load
// //data so its true
// export const orderDetailsReducer = (
//     //dont want order={} bc when ORDER_DETAILS_REQUEST happens it changes the 
//     //order from empty Obj to null and it makes the useEffect run again and we
//     // dont want that
//     state = {loading: true, order: {}}, 
//     action) => {
//         switch(action.type) {
//             case ORDER_DETAILS_REQUEST:
//                 return {loading: true};
//             case ORDER_DETAILS_SUCCESS:
//             //fill order w/ action.payload
//                 return {loading: false, order: action.payload};
//             case ORDER_DETAILS_FAIL:
//                 return {loading: false, error: action.payload};
//             default: 
//                 return state;
//         }
// };

// //orderPay reducer
// //update status of Redux based on the payment
// export const orderPayReducer = (state = {}, action) => {
//     switch(action.type) {
//         case ORDER_PAY_REQUEST: 
//             return {loading: true};
//         case ORDER_PAY_SUCCESS:
//             return {loading: false, success: true};
//         case ORDER_PAY_FAIL:
//             return {loading: false, error: action.payload};
//         case ORDER_PAY_RESET:
//             //return default state
//             return {};
//         default: 
//             return state;
//     }
// };


// //Reducer for returning list of orders
// export const orderMineListReducer = (state = {orders: []}, action) => {
//     switch(action.type) {
//         case ORDER_MINE_LIST_REQUEST: 
//             return {loading: true};
//         case ORDER_MINE_LIST_SUCCESS:
//             return {loading: false, orders: action.payload};
//         case ORDER_MINE_LIST_FAIL:
//             return {loading: false, error: action.payload};
//         default: 
//             return state;
//     }
// }


export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
        return { loading: true };
        case ORDER_CREATE_SUCCESS:
        return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
        return {};
        default:
        return state;
    }
};

export const orderDetailsReducer = (
    // state = { loading: true, order: {} },
    //defualt for order is null instead of empty object. if we had it
    //as an empty object it would make useEffect run again and u dont
    //want that
    state = { loading: true},
    action
    ) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
        return { loading: true };
        case ORDER_DETAILS_SUCCESS:
        return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
        default:
        return state;
    }
};

//orderPay reducer
//update status of Redux based on the payment
export const orderPayReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_PAY_REQUEST: 
            return {loading: true};
            // return {loading: true, success: false};

        case ORDER_PAY_SUCCESS:
            return {loading: false, success: true};
        case ORDER_PAY_FAIL:
            return {loading: false, error: action.payload};
        case ORDER_PAY_RESET:
            //return default state
            return {};
        default: 
            return state;
    }
};

//Reducer for returning list of orders
export const orderMineListReducer = (state = {orders: []}, action) => {
    switch(action.type) {
        case ORDER_MINE_LIST_REQUEST: 
            return {loading: true};
        case ORDER_MINE_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_MINE_LIST_FAIL:
            return {loading: false, error: action.payload};
        default: 
            return state;
    }
}
