import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { register } from '../actions/userActions'

import { Link } from 'react-router-dom'


export default function Register(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')

    //redirect user to the HOME screen after clicking Register button.
    //check Query String and return it. split str by "=" and get 2nd item. 
    //if doesn't exist return home screen ("/"). 
    const redirect = props.location.search 
        ? props.location.search.split("=")[1] 
        : "/";

    //Get userInfo from REdux store
    const userRegister = useSelector((state) => state.userRegister)
    //get userInfo from userSignin
    const { userInfo, loading, error } = userRegister;

    //get dispatch from he useDispatch Hook in react-redux
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        //when user click on sign in button this will prevent form from 
        //refreshing. This is what we want bc we will use AJAX request to sign
        // in user
        e.preventDefault() 
        if(password !== confirmPassword) {
            alert('Passwords do not match')
        } else {
            dispatch(register(firstname, lastname, email, password))
        }
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
                <h1>Register</h1>
            </div>
            <div>
                    <label htmlFor="firstname"></label>
                    <input 
                        className="forminput"
                        type="text" 
                        id="firstname" 
                        placeholder="First Name"
                        // email is required if using HTML5 validation system
                        required
                        onChange={e => setFirstName(e.target.value)}>
                    </input>
                </div> 
                <div>
                    <label htmlFor="lastname"></label>
                    <input 
                        className="forminput"
                        type="text" 
                        id="lastname" 
                        placeholder="Last Name"
                        // email is required if using HTML5 validation system
                        required
                        onChange={e => setLastName(e.target.value)}>
                    </input>
                </div> 

                <div>
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
                    <label htmlFor="confirmPassword"></label>
                    <input 
                        className="forminput"
                        type="password" 
                        id="confirmPassword" 
                        placeholder="Enter Confirm Password"
                        // email is required if using HTML5 validation system
                        required
                        onChange={e => setConfirmPassword(e.target.value)}>
                    </input>
                </div> 
                <div>
                    {/* <label /> */}
                    {/* type="submit" so when user clicks Submit button then 
                    submitHandler will run */}
                    <button 
                        className="formbutton" 
                        type="submit"
                        >Create
                    </button>
            </div>
            {/* <Link to="/account"><h3>Sign In</h3></Link> */}
            <Link to={`/account?redirect=${redirect}`}><h3>Sign In</h3></Link>

            <Link to="/"><h3>Return to Store</h3></Link>
            <Link to="/forgotpassword"><h3>Forgot your password?</h3></Link>
        </form>
    </div>
    )
}
