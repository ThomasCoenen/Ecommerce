const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL } = require("../constants/productConstants");

//product list Reducer
export const productListReducer = (
    //DEFAULT STATE
    state = { products: [], loading: true },  
    action
    ) => {
    //check action.type
    //action.type is the values that u enter in actions under type 
    //ie PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL
        switch(action.type) {
            case PRODUCT_LIST_REQUEST:
                //return new state. set loading to true
                return { loading: true};
            case PRODUCT_LIST_SUCCESS:
                //return products. Fetch products which is a variable
                //in the redux store by the data we get from backend
                // return { loading: false, products: action.payload };
                let products = []
                // return { loading: false, products: action.payload };
                return { loading: false, products: products.concat(action.payload) };

                // return { loading: false, data: action.payload };
            case PRODUCT_LIST_FAIL:
                return { loading: false, error: action.payload };
            default: 
                return state; //defalt returns current state
        }
}

//DetailsProduct Reducer:
export const productDetailsReducer = (
    //default value for produc state is an empty obj 
    state = { product: {}, loading: true },
    action
    ) => {
        switch (action.type) {
            case PRODUCT_DETAILS_REQUEST:
                return {loading: true};
            case PRODUCT_LIST_SUCCESS:
                return {loading: false, product: action.payload};
            case PRODUCT_DETAILS_FAIL:
                return {loading: false, error: action.payload};
            default: 
                return state;
        }
    }

//SearchProduct Reducer:
export const searchProductReducer = (
    //DEFAULT STATE
    state = { products: [], loading: true },  
    action
    ) => {
    //check action.type
    //action.type is the values that u enter in actions under type 
    //ie PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL
        switch(action.type) {
            case PRODUCT_SEARCH_REQUEST:
                //return new state. set loading to true
                return { loading: true};
            case PRODUCT_SEARCH_SUCCESS:
                //return products. Fetch products which is a variable
                //in the redux store by the data we get from backend
                // return { loading: false, products: action.payload };
                let products = []
                // return { loading: false, products: action.payload };
                return { loading: false, products: products.concat(action.payload) };

                // return { loading: false, data: action.payload };
            case PRODUCT_SEARCH_FAIL:
                return { loading: false, error: action.payload };
            default: 
                return state; //defalt returns current state
        }
}