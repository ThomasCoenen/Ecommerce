import Axios from "axios";
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_DETAILS_REQUEST, USER_DETAILS_FAIL, USER_DETAILS_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS} from "../constants/userConstants";

//Sign in Action
export const signin = (email, password) => async(dispatch) => {
    //dispatch user sign in req
    dispatch({ type: USER_SIGNIN_REQUEST, payload: {email, password}});
    //Do Try/catch bc we are sending an AJAX request
    try {
        //AJAX request fetch data. Post sign signin API is post. 2nd param is
        //the data
        const {data} = await Axios.post('/api/users/signin', {email, password})
        //once we are here the email and PW is correct and the data contains
        // user info and TOKEN. Dispatch success. This data will be used in the
        //signin screen. 
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data})
        //save userdata in local storage. Will kepp user signed in
        //even if they close the browser and open it again. 
        //1st param=key='userInfo', 2nd param=data(must be stringified)
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch(error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: 
            //if response and message exists then return message otherwise 
            //return general error message
                error.response && error.response.data.message 
                ? error.response.data.message 
                //otherwise render the general error message
                : error.message
        })
    }
}


//Register Action
//duplicate signin action and change a few things
export const register = (firstname, lastname, email, password) => async(dispatch) => {
    //dispatch user_register req
    dispatch({ type: USER_REGISTER_REQUEST, payload: {email, password}});
    //Do Try/catch bc we are sending an AJAX request
    try {
        //AJAX request fetch data. Post register API is post. 2nd param is
        //the data we send to backend 
        const {data} = await Axios.post('/api/users/register', {
            firstname, 
            lastname,
            email, 
            password
        })
        //once we are here...
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        //this will update redux store based on user being signed in bc in 
        //app.js we read userSignin to authenticate user
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data})
        //save userdata in local storage. Will kepp user signed in
        //even if they close the browser and open it again. 
        //1st param=key='userInfo', 2nd param=data(must be stringified)
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch(error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: 
            //if response and message exists then return message otherwise 
            //return general error message
                error.response && error.response.data.message 
                ? error.response.data.message 
                //otherwise render the general error message
                : error.message
        })
    }
}

//Signout Action
export const signout = () => (dispatch) => {
    //remove userInfo from LocalStorage
    localStorage.removeItem('userInfo');
    //remove CartItems to when user signout
    localStorage.removeItem('userInfo');
    //when user clicks on signout we dont want them to be able to access
    // payment screen so remove shippingAdress from localstorage
    localStorage.removeItem('shippingAddress');
    dispatch({type: USER_SIGNOUT});
}

//detailsUser Action
//used to get user details info
export const detailsUser = (userId) => async(dispatch, getState) => {
    //dispatch userDetails request
    dispatch({type: USER_DETAILS_REQUEST, payload: userId});
    //get token from getState
    const {userSignin: {userInfo}} = getState();

    try {
        //send ajax request
        const {data} = await Axios.get(
            `/api/users/${userId}`, 
            //2nd params=options 
            {
            headers: {
                Authorization:  `Bearer ${userInfo.token}`
            },
        });
        //after getting data dispatch success action. data is the user info
        dispatch({type: USER_DETAILS_SUCCESS, payload: data});

    } catch(error) {
        //if response and message exists then return message otherwise 
        //return general error message
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message 
                //otherwise render the general error message
                : error.message;
        //dispatch actions
        dispatch({type: USER_DETAILS_FAIL, payload: message })
    }
}

//UpdateUserProfile Action
//remember to update userSIGNin after a user updates profile, bc in the header
// menu we show user name and it comes from userSignin
export const updateUserProfile = (user) => async(dispatch, getState) => {
    dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload: user});
    //get userinfo
    const {userSignin: {userInfo}} = getState();
    try {
        //AJAX req to update user profile. update action so use PUT
        //2nd param=payload of req=user
        const {data} = await Axios.put(
            `/api/users/profile`, 
            user, 
            {
                headers: {Authorization: `Bearer ${userInfo.token}`},
            }
        );

        //dispatch success action
        dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data});
        //remember to update userSIGNin after a user updates profile, bc 
        //in the header menu we show user name and it comes from userSignin
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        //update localstorage
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        //if response and message exists then return message otherwise 
        //return general error message
        const message = 
            error.response && error.response.data.message 
                ? error.response.data.message 
                //otherwise render the general error message
                : error.message;
        dispatch({type: USER_UPDATE_PROFILE_FAIL, payload: message})
    }
};
