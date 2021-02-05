//define 3 constants to get list of Products from backend. we do this
//bc of the async nature of AJAX requests. 
//After defining Constants, define Action

//this is for the HomeScrean
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';

//this is for ProductScrean (individual ProductDetails)
export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST';
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS';
export const PRODUCT_DETAILS_FAIL = 'PRODUCT_DETAILS_FAIL';

//this is for SearchScreen (individual ProductDetails)
export const PRODUCT_SEARCH_REQUEST = 'PRODUCT_SEARCH_REQUEST';
export const PRODUCT_SEARCH_SUCCESS = 'PRODUCT_SEARCH_SUCCESS';
export const PRODUCT_SEARCH_FAIL = 'PRODUCT_SEARCH_FAIL';