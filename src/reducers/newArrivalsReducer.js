import { NEWARRIVALS_DETAILS_FAIL, NEWARRIVALS_DETAILS_REQUEST, NEWARRIVALS_DETAILS_SUCCESS, NEWARRIVALS_LIST_FAIL, NEWARRIVALS_LIST_REQUEST, NEWARRIVALS_LIST_SUCCESS } from "../constants/newArrivalsConstants";

//product list Reducer
export const newArrivalsListReducer = (
    //DEFAULT STATE
    state = { products: [], loading: true },  
    action
    ) => {
    //check action.type
    //action.type is the values that u enter in actions under type 
    //ie PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL
        switch(action.type) {
            case NEWARRIVALS_LIST_REQUEST:
                //return new state. set loading to true
                return { loading: true};
            case NEWARRIVALS_LIST_SUCCESS:
                //return products. Fetch products which is a variable
                //in the redux store by the data we get from backend
                // return { loading: false, products: action.payload };
                return { loading: false, data: action.payload };
                // return { loading: false, data: action.payload };
            case NEWARRIVALS_LIST_FAIL:
                return { loading: false, error: action.payload };
            default: 
                return state; //defalt returns current state
        }
}

//DetailsProduct Reducer:
export const newArrivalsDetailsReducer = (
    //default value for produc state is an empty obj 
    state = { product: {}, loading: true },
    action
    ) => {
        switch (action.type) {
            case NEWARRIVALS_DETAILS_REQUEST:
                return {loading: true};
            case NEWARRIVALS_DETAILS_SUCCESS:
                return {loading: false, product: action.payload};
            case NEWARRIVALS_DETAILS_FAIL:
                return {loading: false, error: action.payload};
            default: 
                return state;
        }
    }