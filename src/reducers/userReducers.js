import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants";

//User Register Reducer
//initial state, action
export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST: 
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            //fill userInfo by action.payload. action.payload comes from user
            // action and will be the data from backend 
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL:
            //fill error w/ the error from back which is in action.payload
            return {loading: false, error: action.payload}
        default: 
            return state //return previous state
    }
}

//User SignIn Reducer
//initial state, action
export const userSigninReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_SIGNIN_REQUEST: 
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            //fill userInfo by action.payload. action.payload comes from user
            // action and will be the data from backend 
            return {loading: false, userInfo: action.payload}
        case USER_SIGNIN_FAIL:
            //fill error w/ the error from back which is in action.payload
            return {loading: false, error: action.payload}
        case USER_SIGNOUT:
            //by setting to empty obj, data in userInfo should be removed
            return {};
        default: 
            return state //return previous state
    }
}

//userDetailsReducer
export const userDetailsReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case USER_DETAILS_REQUEST:
            return {loading: true};
        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload};
        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default: 
            return state;
    }
}

//UserUpdateProfile Reducer
export const userUpdateProfileReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true};       
        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, success: true};     
        case USER_UPDATE_PROFILE_FAIL:
            return {loading: false, error: action.payload};       
        case USER_UPDATE_PROFILE_RESET:
            return {};    
        default: 
            return state;
    }
};