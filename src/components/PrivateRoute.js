//define private route bc unauthorized user shouldnt see profilescreen
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


export default function PrivateRoute({component: Component, ...rest}) {
    //get user info
    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo} = userSignin;

    // pass the ...rest parameters of the original route and define a 
    // render funct. in render funct check user info, if it does exist 
    // render component (this is the component we define in the router 
    // in APP.js), and pass props to it.  redirect user to signin screen bc 
    //user should be logged in to see this page    
    return (
        <Route 
            {...rest} 
            render={(props) => 
                userInfo ? 
                    //Will ONLY render the component if user is signed in
                    (<Component {...props}></Component>) 
                    : 
                    (<Redirect to="/account"/>)
            }
        ></Route>
    )
}
