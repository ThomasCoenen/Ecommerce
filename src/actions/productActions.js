import Axios from "axios";
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL } from "../constants/productConstants";

//action to get products
export const listProducts = () => async (dispatch) => {
    //dispatch product list request
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });
    //fetch data from backend.x
    try {
        //AJAX request to get list of products. Capital A?
        const { data } = await Axios.get('/api/favorites');
        //dispatch another action after getting data from backend.
        // by dispatching action we change the STATE of redux and 
        //based on that can update the HomeScrean and show products.
        //Payload to: contains the data from backend
        // console.log(data)
        // JSON.parse(data)
        
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
        // payload = Array.from(data);

    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}

//action to get new arrivals
export const listArrivals = () => async (dispatch) => {
    //dispatch product list request
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });
    //fetch data from backend.x
    try {
        //AJAX request to get list of products. Capital A?
        // const { data } = await Axios.get('/api/newarrivals');
        const { data } = await Axios.get('/api/newarrivals');

        //dispatch another action after getting data from backend.
        // by dispatching action we change the STATE of redux and 
        //based on that can update the HomeScrean and show products.
        //Payload to: contains the data from backend
        // console.log(data)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}

//action to get tops list
export const listTops = () => async (dispatch) => {
    //dispatch product list request
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });
    //fetch data from backend.x
    try {
        //AJAX request to get list of products. Capital A?
        const { data } = await Axios.get('/api/tops');
        //dispatch another action after getting data from backend.
        // by dispatching action we change the STATE of redux and 
        //based on that can update the HomeScrean and show products.
        //Payload to: contains the data from backend
        // console.log(data)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}

//action to get shoes list
export const listShoes = () => async (dispatch) => {
    //dispatch product list request
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });
    //fetch data from backend.x
    try {
        //AJAX request to get list of products. Capital A?
        const { data } = await Axios.get('/api/shoes');
        //dispatch another action after getting data from backend.
        // by dispatching action we change the STATE of redux and 
        //based on that can update the HomeScrean and show products.
        //Payload to: contains the data from backend
        // console.log(data)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}

//action to get shoes list
export const listAccessories = () => async (dispatch) => {
    //dispatch product list request
    dispatch({
        type: PRODUCT_LIST_REQUEST,
    });
    //fetch data from backend.x
    try {
        //AJAX request to get list of products. Capital A?
        const { data } = await Axios.get('/api/accessories');
        //dispatch another action after getting data from backend.
        // by dispatching action we change the STATE of redux and 
        //based on that can update the HomeScrean and show products.
        //Payload to: contains the data from backend
        // console.log(data)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}


//detailsProduct Action products
//This is for ProductScreen
//Get product by its ID from the backend and update redux store based on it
export const detailsProduct = (productId, name) => async (dispatch) => {
    console.log(productId, name)
    //dispatch product details request
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
    //send AJAX request
    try {
        //address of this API is based on the product ID
        //bc axios.get() is aynscrounous and returns a promise u need to
        //use AWAIT before it
        const {data} = await Axios.get(`/api/${name}/${productId}`)
        //dispatch successfull operation and give product info to the
        //action payload. payload is data we get from backend
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch(error) {
        //for payload instead of setting to error.message we will check 
        //error.response isntead. if error.response and 
        //error.response.data.message exists means backend 
        //failed the error message so we will show that error instead of 
        //error.message(which is just the general error)
        dispatch({
            type: PRODUCT_DETAILS_FAIL, 
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    //otherwise render the general error message
                    : error.message
        })
    }
}


//get ALL products action
export const searchAllProducts = (searchname) => async (dispatch) => {
    dispatch({
        type: PRODUCT_SEARCH_REQUEST,
    });
    try {
        const { data } = await Axios.get(`/searchproduct/${searchname}`); 
        // const { data } = await Axios.get(`/api/${name}/${productId}`); 

        dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: PRODUCT_SEARCH_FAIL, payload: error.message})
    }
}

//detailsProduct Action products for searching
//This is for ProductScreen
//Get product by its ID from the backend and update redux store based on it
export const detailsProduct2 = (productId, name) => async (dispatch) => {
    console.log(productId, name)
    //dispatch product details request
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
    //send AJAX request
    try {
        //address of this API is based on the product ID
        //bc axios.get() is aynscrounous and returns a promise u need to
        //use AWAIT before it
        const {data} = await Axios.get(`/api/${name}/${productId}`)
        //dispatch successfull operation and give product info to the
        //action payload. payload is data we get from backend
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch(error) {
        //for payload instead of setting to error.message we will check 
        //error.response isntead. if error.response and 
        //error.response.data.message exists means backend 
        //failed the error message so we will show that error instead of 
        //error.message(which is just the general error)
        dispatch({
            type: PRODUCT_DETAILS_FAIL, 
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    //otherwise render the general error message
                    : error.message
        })
    }
}




//detailsProduct Action newarrivals
// This is for ProductScreen
// Get product by its ID from the backend and update redux store based on it
// export const detailsNewArrivals = (productId) => async (dispatch) => {
//     //dispatch product details request
//     dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
//     //send AJAX request
//     try {
//         const {data} = await Axios.get(`/api/newarrivals/${productId}`)
//         dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
//     } catch(error) {
//         dispatch({
//             type: PRODUCT_DETAILS_FAIL, 
//             payload: 
//                 error.response && error.response.data.message 
//                     ? error.response.data.message 
//                     : error.message
//         })
//     }
// }


// export const detailsOtherProducts = (productId, name) => async (dispatch) => {
//     // alert(name)
//     //dispatch product details request
//     dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
//     //send AJAX request
//     try {
//         const {data} = await Axios.get(`/api/${name}/${productId}`)
//         dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
//     } catch(error) {
//         dispatch({
//             type: PRODUCT_DETAILS_FAIL, 
//             payload: 
//                 error.response && error.response.data.message 
//                     ? error.response.data.message 
//                     : error.message
//         })
//     }
// }






// //detailsProduct Action newarrivals
// // This is for ProductScreen
// // Get product by its ID from the backend and update redux store based on it
// export const detailsTops = (productId) => async (dispatch) => {
//     //dispatch product details request
//     dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
//     //send AJAX request
//     try {
//         const {data} = await Axios.get(`/api/tops/${productId}`)
//         dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
//     } catch(error) {
//         dispatch({
//             type: PRODUCT_DETAILS_FAIL, 
//             payload: 
//                 error.response && error.response.data.message 
//                     ? error.response.data.message 
//                     : error.message
//         })
//     }
// }
