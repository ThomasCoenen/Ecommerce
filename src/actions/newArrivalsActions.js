import Axios from "axios";
import { NEWARRIVALS_DETAILS_FAIL, NEWARRIVALS_DETAILS_REQUEST, NEWARRIVALS_DETAILS_SUCCESS, NEWARRIVALS_LIST_FAIL, NEWARRIVALS_LIST_REQUEST, NEWARRIVALS_LIST_SUCCESS } from "../constants/newArrivalsConstants";

//action to get new arrivals
export const listNewArrivals = () => async (dispatch) => {
    //dispatch product list request
    dispatch({
        type: NEWARRIVALS_LIST_REQUEST,
    });
    //fetch data from backend.x
    try {
        //AJAX request to get list of products. Capital A?
        const { data } = await Axios.get('/api/newarrivals');
        //dispatch another action after getting data from backend.
        // by dispatching action we change the STATE of redux and 
        //based on that can update the HomeScrean and show products.
        //Payload to: contains the data from backend
        // console.log(data)
        dispatch({ type: NEWARRIVALS_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({type: NEWARRIVALS_LIST_FAIL, payload: error.message})
    }
}

//detailsProduct Action newarrivals
//This is for ProductScreen
//Get product by its ID from the backend and update redux store based on it
export const detailsNewArrivals = (productId) => async (dispatch) => {
    //dispatch product details request
    dispatch({type: NEWARRIVALS_DETAILS_REQUEST, payload: productId})
    //send AJAX request
    try {
        const {data} = await Axios.get(`/api/newarrivals/${productId}`)
        dispatch({type: NEWARRIVALS_DETAILS_SUCCESS, payload: data})
    } catch(error) {
        dispatch({
            type: NEWARRIVALS_DETAILS_FAIL, 
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
        })
    }
}
