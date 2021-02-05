import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function Account(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //redirect user to the Shipping screen after clicking signIn button.
    //check Query String and return it. split str by "=" and get 2nd item. 
    //if doesn't exist return home screen ("/"). 
    const redirect = props.location.search 
        ? props.location.search.split("=")[1] 
        : "/";


    //Get userInfo from REdux store
    const userSignin = useSelector((state) => state.userSignin)
    //get userInfo from userSignin
    const { userInfo, loading, error } = userSignin;

    //get dispatch from he useDispatch Hook in react-redux
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        //when user click on sign in button this will prevent form from 
        //refreshing. This is what we want bc we will use AJAX request to sign
        // in user
        e.preventDefault()
        dispatch(signin(email, password))
    }

    //Use Redirect in USEEffect. After dispatching Signin action userInfo will 
    //be filled. 
    useEffect(() => {
        //accept 2 param(funct that hsould be called), 2nd=array of dependecies
        //check userInfo contains a value means login was successfull
        if (userInfo) {
            //redirect user to the redirect var. 
            //to redirect use: props.history.push
            props.history.push(redirect);
        }
        //dependency=userInfo bc by default userInfo is null bc user is not 
        //signed in, but after disapatching this action userInfo contains a 
        //value. bc the value of userInfo changed, the UseEffect funct will run
        //and user will be redirected to the Home page OR the Redirect 
        //Query String
    }, [props.history, redirect, userInfo])


    return (
    <div>
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Login</h1>
            </div>

                {/* Show message on frontend if user enters wrong signin info. 
                If loading true show loading box. Get loadign and error 
                from userSignin */}
                {loading && <LoadingBox></LoadingBox>}
                {/* this shows u error if u enter wrong signin info */}
                {error && <MessageBox variant="danger">{error}</MessageBox>}


            <div>
                {/* must use htmlFor for react apps */}
                <label htmlFor="email"></label>
                <input 
                    className="forminput"
                    type="email" 
                    id="email" 
                    placeholder="Enter email"
                    // email is required if using HTML5 validation system
                    required
                    onChange={e => setEmail(e.target.value)}>
                </input>
            </div> 
            <div>
                <label htmlFor="password"></label>
                <input 
                    className="forminput"
                    type="password" 
                    id="password" 
                    placeholder="Enter password"
                    // email is required if using HTML5 validation system
                    required
                    onChange={e => setPassword(e.target.value)}>
                </input>
            </div> 
            <div>
                {/* <label /> */}
                {/* type="submit" so when user clicks Submit button then 
                submitHandler will run */}
                <button 
                    className="formbutton" 
                    type="submit"
                    >Sign In
                </button>
            </div>
            {/* <Link to="/register"><h3>Create Account</h3></Link> */}
            <Link to={`/register?redirect=${redirect}`}><h3>Register</h3></Link>
            <Link to="/"><h3>Return to Store</h3></Link>
            <Link to="/forgotpassword"><h3>Forgot your password?</h3></Link>

        </form>
    </div>    
    )
}
